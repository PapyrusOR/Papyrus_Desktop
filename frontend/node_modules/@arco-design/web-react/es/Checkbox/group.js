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
import React, { createContext, useContext, useCallback, useState, } from 'react';
import Checkbox from './checkbox';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import useMergeValue from '../_util/hooks/useMergeValue';
import { isArray, isObject } from '../_util/is';
import { pickTriggerPropsFromRest } from '../_util/constant';
var defaultContextValue = {
    isCheckboxGroup: false,
    checkboxGroupValue: [],
    onGroupChange: function () { },
    registerValue: function () { },
    unRegisterValue: function () { },
};
export var CheckboxGroupContext = createContext(defaultContextValue);
export var ClearCheckboxGroupContext = function (_a) {
    var children = _a.children;
    return React.createElement(CheckboxGroupContext.Provider, { children: children, value: defaultContextValue });
};
function Group(props) {
    var _a;
    var _b = __read(useMergeValue([], {
        defaultValue: 'defaultValue' in props ? props.defaultValue || [] : undefined,
        value: 'value' in props ? props.value || [] : undefined,
    }), 2), value = _b[0], setValue = _b[1];
    var _c = __read(useState([]), 2), allOptionValues = _c[0], setAllOptionValues = _c[1];
    var _d = useContext(ConfigContext), getPrefixCls = _d.getPrefixCls, rtl = _d.rtl;
    var disabled = props.disabled, options = props.options, style = props.style, className = props.className, error = props.error, children = props.children, _e = props.direction, direction = _e === void 0 ? 'horizontal' : _e;
    var prefixCls = getPrefixCls('checkbox');
    var classNames = cs(prefixCls + "-group", (_a = {},
        _a[prefixCls + "-group-is-error"] = error,
        _a[prefixCls + "-group-direction-" + direction] = direction,
        _a[prefixCls + "-group-rtl"] = rtl,
        _a), className);
    var onChange = useCallback(function (optionValue, checked, e) {
        var newVal = value.slice();
        if (checked) {
            newVal.push(optionValue);
        }
        else {
            newVal.splice(value.indexOf(optionValue), 1);
        }
        setValue(newVal);
        props.onChange &&
            props.onChange(newVal.filter(function (v) { return allOptionValues.indexOf(v) > -1; }), e);
    }, [value, props.onChange, allOptionValues]);
    return (React.createElement("span", __assign({ className: classNames, style: style }, pickTriggerPropsFromRest(props)),
        React.createElement(CheckboxGroupContext.Provider, { value: {
                isCheckboxGroup: true,
                checkboxGroupValue: value,
                onGroupChange: onChange,
                disabled: disabled,
                registerValue: function (value) {
                    setAllOptionValues(function (allOptionValues) {
                        return Array.from(new Set(__spreadArray(__spreadArray([], __read(allOptionValues), false), [value], false)));
                    });
                },
                unRegisterValue: function (value) {
                    setAllOptionValues(function (allOptionValues) {
                        return allOptionValues.filter(function (x) { return x !== value; });
                    });
                },
            } }, isArray(options)
            ? options.map(function (option) {
                var label = isObject(option) ? option.label : option;
                var checkValue = isObject(option) ? option.value : option;
                var icon = isObject(option) ? option.icon : undefined;
                return (React.createElement(Checkbox, { disabled: disabled || (isObject(option) && option.disabled), key: checkValue, value: checkValue, icon: icon }, label));
            })
            : children)));
}
Group.displayName = 'CheckboxGroup';
export default Group;
