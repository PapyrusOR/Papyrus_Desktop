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
import React, { useRef } from 'react';
import get from 'lodash/get';
import FormItem from './form-item';
import { isFunction, isUndefined } from '../_util/is';
import { isFieldMatch, isSyntheticEvent } from './utils';
import warning from '../_util/warning';
import { FormListContext } from './context';
var isIndexLegal = function (index, value) {
    return !isUndefined(index) && index >= 0 && index < value.length;
};
var List = function (props) {
    var field = props.field, children = props.children, initialValue = props.initialValue;
    var keysRef = useRef({
        id: 0,
        keys: [],
    });
    var extra = 'initialValue' in props ? { initialValue: initialValue } : {};
    var currentKeys = keysRef.current.keys;
    return (React.createElement(FormListContext.Provider, { value: {
            getItemKey: function (fieldKey) {
                var keys = fieldKey === null || fieldKey === void 0 ? void 0 : fieldKey.replace(/\[|\]/g, '.').split('.');
                var startIndex = keys.indexOf(field);
                var index = keys[startIndex + 1];
                return field + "_" + currentKeys.indexOf(index) + "_" + keys.slice(startIndex + 2).join('_');
            },
        } },
        React.createElement(FormItem, __assign({ field: field }, extra, { isFormList: true, rules: props.rules, wrapperCol: { span: 24 }, noStyle: 'noStyle' in props ? props.noStyle : !props.rules, shouldUpdate: function (prev, current, info) {
                var _a, _b;
                if (info && !info.isInner && isFieldMatch(info.field, [field])) {
                    if (((_a = get(prev, field)) === null || _a === void 0 ? void 0 : _a.length) !== ((_b = get(current, field)) === null || _b === void 0 ? void 0 : _b.length)) {
                        // 长度不一致才需要整体渲染，如 form.setfieldsValue('a.100', 'xx')
                        // 修改了某一项的话直接叫给对应的 FormItem 渲染即可
                        return true;
                    }
                }
                return false;
            } }), function (_, store, _a) {
            var _value = _a.value, onChange = _a.onChange;
            var value = _value || [];
            // 为啥 add，move，remove 里不直接用 value，而是又 getFieldValue？
            // 因为用户可能把 add，remove，move 给 memo 了，导致 remove 直接读取的 value 不是最新的
            // 保持和 2.46.0 以前的版本一致
            var add = function (defaultValue, index) {
                var _a;
                if (isSyntheticEvent(defaultValue)) {
                    warning(true, 'Form.List: The event object cannot be used as a parameter of the add method');
                    return;
                }
                var value = ((_a = store.getInnerMethods(true)) === null || _a === void 0 ? void 0 : _a.innerGetFieldValue(field)) || [];
                var key = keysRef.current.id;
                keysRef.current.id += 1;
                var oldValue = value || [];
                var newValue = oldValue;
                if (index !== undefined && index >= 0 && index <= oldValue.length) {
                    currentKeys.splice(index, 0, key);
                    newValue = __spreadArray(__spreadArray(__spreadArray([], __read(oldValue.slice(0, index)), false), [defaultValue], false), __read(oldValue.slice(index)), false);
                }
                else {
                    currentKeys.push(key);
                    newValue = __spreadArray(__spreadArray([], __read(oldValue), false), [defaultValue], false);
                }
                // defaultValue = undefined 时，认为当前字段未被操作过
                onChange(newValue, {
                    isFormList: true,
                    ignore: defaultValue === undefined,
                });
            };
            var remove = function (index) {
                var _a;
                var value = ((_a = store.getInnerMethods(true)) === null || _a === void 0 ? void 0 : _a.innerGetFieldValue(field)) || [];
                var newValue = value.filter(function (_, i) { return i !== index; });
                currentKeys.splice(index, 1);
                onChange(__spreadArray([], __read(newValue), false), { isFormList: true });
            };
            var move = function (fromIndex, toIndex) {
                var _a;
                var value = ((_a = store.getInnerMethods(true)) === null || _a === void 0 ? void 0 : _a.innerGetFieldValue(field)) || [];
                if (fromIndex === toIndex ||
                    !isIndexLegal(fromIndex, value) ||
                    !isIndexLegal(toIndex, value)) {
                    return;
                }
                var fromId = currentKeys[fromIndex];
                currentKeys.splice(fromIndex, 1);
                currentKeys.splice(toIndex, 0, fromId);
                var fromItem = value[fromIndex];
                var newValue = __spreadArray([], __read(value), false);
                newValue.splice(fromIndex, 1);
                newValue.splice(toIndex, 0, fromItem);
                onChange(newValue, { isFormList: true });
            };
            return (isFunction(children) &&
                children(value.map(function (_, index) {
                    var key = currentKeys[index];
                    if (key === undefined) {
                        key = keysRef.current.id;
                        currentKeys.push(key);
                        keysRef.current.id += 1;
                    }
                    return {
                        field: field + "[" + index + "]",
                        key: key,
                    };
                }), {
                    add: add,
                    remove: remove,
                    move: move,
                }));
        })));
};
List.displayName = 'FormList';
export default List;
