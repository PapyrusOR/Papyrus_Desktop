var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useMemo, useEffect } from 'react';
import isEqualWith from 'lodash/isEqualWith';
import { isExist } from '../../_util/is';
import { Backspace } from '../../_util/keycode';
import useMergeValue from '../../_util/hooks/useMergeValue';
// 默认长度
var defaultLength = 6;
export default function useVerificationCode(props) {
    var _a = __read(useMergeValue('', props), 2), value = _a[0], setValue = _a[1];
    var length = +props.length > 0 ? +props.length : defaultLength;
    var filledValue = useMemo(function () {
        var newVal = value ? String(value).split('') : [];
        return new Array(length).fill('').map(function (_, index) {
            return isExist(newVal[index]) ? String(newVal[index]) : '';
        });
    }, [value, length]);
    var focusFirstEmptyInput = function () {
        var _a, _b, _c;
        var nodeList = ((_a = props.getInputRefList) === null || _a === void 0 ? void 0 : _a.call(props)) || [];
        if ((nodeList === null || nodeList === void 0 ? void 0 : nodeList.indexOf(document.activeElement)) === -1) {
            return;
        }
        var index = filledValue.findIndex(function (x) { return !x; });
        if (index > -1) {
            var realIndex = Math.min(index, nodeList.length - 1);
            (_c = (_b = nodeList[realIndex]) === null || _b === void 0 ? void 0 : _b.focus) === null || _c === void 0 ? void 0 : _c.call(_b);
        }
    };
    useEffect(function () {
        focusFirstEmptyInput();
    }, [JSON.stringify(filledValue)]);
    var tryUpdateValue = function (newVal) {
        var _a, _b;
        if (!isEqualWith(newVal, value)) {
            setValue(newVal);
            (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, newVal);
            if (newVal.length === length) {
                (_b = props.onFinish) === null || _b === void 0 ? void 0 : _b.call(props, newVal);
            }
        }
    };
    var handlePaste = function (e, index) {
        e.preventDefault();
        var clipboardData = e.clipboardData;
        var text = clipboardData.getData('text');
        if (text) {
            tryUpdateValue(filledValue.slice(0, index).concat(text.split('')).join(''));
        }
    };
    return {
        value: value,
        filledValue: filledValue,
        setValue: tryUpdateValue,
        getInputProps: function (index) {
            var indexVal = String(filledValue[index]);
            return {
                key: index,
                value: indexVal,
                onClick: function (e) {
                    e.preventDefault();
                    if (!filledValue[index]) {
                        focusFirstEmptyInput();
                    }
                },
                onKeyDown: function (e) {
                    var keyCode = e.keyCode || e.which;
                    if (keyCode === Backspace.code) {
                        if (filledValue[index + 1]) {
                            e.preventDefault();
                            // 避免后面的数移位
                            return;
                        }
                        var _index = index;
                        if (!filledValue[index]) {
                            _index -= 1;
                        }
                        var newVal = __spreadArray([], __read(filledValue), false);
                        newVal[_index] = '';
                        tryUpdateValue(newVal.join(''));
                    }
                },
                onChange: function (v) {
                    var char = (v === null || v === void 0 ? void 0 : v.trim()) || '';
                    var newVal = __spreadArray([], __read(filledValue), false);
                    newVal[index] = char.replace(indexVal, '').split('').pop() || '';
                    tryUpdateValue(newVal.join(''));
                },
                onPaste: function (e) {
                    handlePaste(e, index);
                },
            };
        },
    };
}
