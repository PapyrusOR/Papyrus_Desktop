var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import React, { memo, useEffect, useState } from 'react';
import InputNumber from '../InputNumber';
import cs from '../_util/classNames';
var Input = function (props) {
    var _a;
    var value = props.value, range = props.range, min = props.min, max = props.max, step = props.step, disabled = props.disabled, prefixCls = props.prefixCls, onChange = props.onChange, _b = props.extra, extra = _b === void 0 ? [] : _b;
    var baseProps = {
        min: min,
        max: max,
        step: step,
        disabled: disabled,
    };
    var _c = __read(useState(value), 2), innerValue = _c[0], setInnerValue = _c[1];
    var beginExtraProps = extra[0];
    var endExtraProps = range ? extra[1] : extra[0];
    useEffect(function () {
        setInnerValue(value);
    }, [value]);
    var handleChange = function (val) {
        onChange === null || onChange === void 0 ? void 0 : onChange(val);
    };
    var handleBlur = function () {
        setInnerValue(__spreadArray([], __read(value), false).sort(function (a, b) { return a - b; }));
    };
    return (React.createElement("div", { className: cs(prefixCls + "-input", (_a = {}, _a[prefixCls + "-input-group"] = range, _a)), onBlur: handleBlur },
        range && [
            React.createElement(InputNumber, __assign({}, __assign(__assign({ hideControl: true }, beginExtraProps), baseProps), { value: innerValue[0], key: 0, onChange: function (val, reason) {
                    // eslint-disable-next-line no-self-compare
                    if (!(isNaN(val) && val !== val)) {
                        handleChange([val, innerValue[1]]);
                        (beginExtraProps === null || beginExtraProps === void 0 ? void 0 : beginExtraProps.onChange) && (beginExtraProps === null || beginExtraProps === void 0 ? void 0 : beginExtraProps.onChange(val, reason));
                    }
                } })),
            React.createElement("div", { key: 1, className: prefixCls + "-input-range" },
                React.createElement("span", { className: prefixCls + "-input-range-content" })),
        ],
        React.createElement(InputNumber, __assign({}, __assign(__assign({ hideControl: true }, endExtraProps), baseProps), { key: 2, value: innerValue[1], onChange: function (val, reason) {
                // eslint-disable-next-line no-self-compare
                if (!(isNaN(val) && val !== val)) {
                    handleChange([innerValue[0], val]);
                    (endExtraProps === null || endExtraProps === void 0 ? void 0 : endExtraProps.onChange) && (endExtraProps === null || endExtraProps === void 0 ? void 0 : endExtraProps.onChange(val, reason));
                }
            } }))));
};
export default memo(Input);
