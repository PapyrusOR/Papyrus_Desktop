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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
import React, { useRef, useImperativeHandle, useContext, forwardRef, useState, } from 'react';
import IconClose from '../../../icon/react-icon/IconClose';
import IconHover from '../../_class/icon-hover';
import cs from '../../_util/classNames';
import { Enter, Tab } from '../../_util/keycode';
import omit from '../../_util/omit';
import { ConfigContext } from '../../ConfigProvider';
import { isArray } from '../../_util/is';
function DateInput(_a, ref) {
    var _b;
    var allowClear = _a.allowClear, error = _a.error, status = _a.status, style = _a.style, className = _a.className, disabled = _a.disabled, _c = _a.placeholder, placeholder = _c === void 0 ? [] : _c, _d = _a.value, value = _d === void 0 ? [] : _d, popupVisible = _a.popupVisible, format = _a.format, propSize = _a.size, onClear = _a.onClear, editable = _a.editable, inputValue = _a.inputValue, onPressEnter = _a.onPressEnter, onPressTab = _a.onPressTab, onChange = _a.onChange, separator = _a.separator, suffixIcon = _a.suffixIcon, changeFocusedInputIndex = _a.changeFocusedInputIndex, focusedInputIndex = _a.focusedInputIndex, isPlaceholder = _a.isPlaceholder, prefix = _a.prefix, _e = _a.inputProps, inputProps = _e === void 0 ? [] : _e, onBlur = _a.onBlur, rest = __rest(_a, ["allowClear", "error", "status", "style", "className", "disabled", "placeholder", "value", "popupVisible", "format", "size", "onClear", "editable", "inputValue", "onPressEnter", "onPressTab", "onChange", "separator", "suffixIcon", "changeFocusedInputIndex", "focusedInputIndex", "isPlaceholder", "prefix", "inputProps", "onBlur"]);
    var _f = useContext(ConfigContext), getPrefixCls = _f.getPrefixCls, ctxSize = _f.size, locale = _f.locale, rtl = _f.rtl;
    var input0 = useRef(null);
    var input1 = useRef(null);
    var refRootWrapper = useRef(null);
    var _g = __read(useState([false, false]), 2), focused = _g[0], setFocused = _g[1];
    var disabled1 = isArray(disabled) ? disabled[0] : disabled;
    var disabled2 = isArray(disabled) ? disabled[1] : disabled;
    useImperativeHandle(ref, function () { return ({
        focus: function (index) {
            var focusedIndex = typeof index === 'number' ? index : focusedInputIndex;
            var focusElement = focusedIndex === 0 ? input0 : input1;
            if ((focusedInputIndex === 0 && !disabled1) || (focusedInputIndex === 1 && !disabled2)) {
                focusElement.current && focusElement.current.focus && focusElement.current.focus();
            }
        },
        blur: function () {
            if (focusedInputIndex === 0) {
                input0.current && input0.current.blur && input0.current.blur();
            }
            if (focusedInputIndex === 1) {
                input1.current && input1.current.blur && input1.current.blur();
            }
        },
        getRootDOMNode: function () {
            return refRootWrapper.current;
        },
    }); });
    function changeFocusedInput(e, index) {
        var _a, _b;
        (_b = (_a = inputProps === null || inputProps === void 0 ? void 0 : inputProps[index]) === null || _a === void 0 ? void 0 : _a.onClick) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        if (focusedInputIndex !== index) {
            changeFocusedInputIndex(index);
        }
    }
    function onKeyDown(e, index) {
        var _a, _b;
        var keyCode = e.keyCode || e.which;
        (_b = (_a = inputProps === null || inputProps === void 0 ? void 0 : inputProps[index]) === null || _a === void 0 ? void 0 : _a.onKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        if (keyCode === Enter.code) {
            onPressEnter === null || onPressEnter === void 0 ? void 0 : onPressEnter();
        }
        if (keyCode === Tab.code) {
            // e.preventDefault(); // fix: cannot move focus away from the component with tab
            onPressTab && onPressTab(e);
        }
    }
    function onChangeInput(e, index) {
        var _a, _b;
        e.stopPropagation();
        (_b = (_a = inputProps === null || inputProps === void 0 ? void 0 : inputProps[index]) === null || _a === void 0 ? void 0 : _a.onChange) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        onChange && onChange(e);
    }
    function onBlurInput(e, index) {
        var _a, _b;
        setFocused(function (prev) {
            prev[index] = false;
            return __spreadArray([], __read(prev), false);
        });
        (_b = (_a = inputProps === null || inputProps === void 0 ? void 0 : inputProps[index]) === null || _a === void 0 ? void 0 : _a.onBlur) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        onBlur === null || onBlur === void 0 ? void 0 : onBlur(e);
    }
    function onFocusInput(e, index) {
        var _a, _b;
        if (index === 0 || index === 1) {
            setFocused(function (prev) {
                prev[index] = true;
                return __spreadArray([], __read(prev), false);
            });
            if (focusedInputIndex !== index) {
                changeFocusedInputIndex(index, true);
            }
        }
        (_b = (_a = inputProps === null || inputProps === void 0 ? void 0 : inputProps[index]) === null || _a === void 0 ? void 0 : _a.onFocus) === null || _b === void 0 ? void 0 : _b.call(_a, e);
    }
    var prefixCls = getPrefixCls('picker');
    var size = propSize || ctxSize;
    var mergedFocused = focused[0] || focused[1] || !!popupVisible;
    var inputStatus = status || (error ? 'error' : undefined);
    var inputClassNames = cs(prefixCls, prefixCls + "-range", prefixCls + "-size-" + size, (_b = {},
        _b[prefixCls + "-focused"] = mergedFocused,
        _b[prefixCls + "-disabled"] = disabled1 && disabled2,
        _b[prefixCls + "-" + inputStatus] = inputStatus,
        _b[prefixCls + "-rtl"] = rtl,
        _b[prefixCls + "-has-prefix"] = prefix,
        _b), className);
    var getInputValue = function (index) {
        var valueText = value[index]
            ? value[index].locale(locale.dayjsLocale).format(isArray(format) ? format[index] : format)
            : '';
        if (inputValue) {
            return index === focusedInputIndex ? inputValue : valueText;
        }
        return valueText;
    };
    var readOnlyProps = editable ? {} : { readOnly: true };
    function getFocusInputClassName(index) {
        var _a;
        return cs(prefixCls + "-input", (_a = {},
            _a[prefixCls + "-input-active"] = focusedInputIndex === index,
            _a[prefixCls + "-input-placeholder"] = isPlaceholder && focusedInputIndex === index,
            _a));
    }
    return (React.createElement("div", __assign({ style: style, ref: refRootWrapper, className: inputClassNames }, omit(rest, ['onChange', 'onPressEnter'])),
        prefix && React.createElement("div", { className: prefixCls + "-prefix" }, prefix),
        React.createElement("div", { className: getFocusInputClassName(0) },
            React.createElement("input", __assign({ ref: input0 }, inputProps[0], { disabled: disabled1, placeholder: placeholder[0], value: getInputValue(0), onChange: function (e) { return onChangeInput(e, 0); }, onKeyDown: function (e) { return onKeyDown(e, 0); }, onClick: function (e) { return changeFocusedInput(e, 0); }, onBlur: function (e) { return onBlurInput(e, 0); }, onFocus: function (e) { return onFocusInput(e, 0); } }, readOnlyProps))),
        React.createElement("span", { className: prefixCls + "-separator" }, separator || '-'),
        React.createElement("div", { className: getFocusInputClassName(1) },
            React.createElement("input", __assign({ ref: input1 }, inputProps[1], { disabled: disabled2, placeholder: placeholder[1], value: getInputValue(1), onChange: function (e) { return onChangeInput(e, 1); }, onKeyDown: function (e) { return onKeyDown(e, 1); }, onClick: function (e) { return changeFocusedInput(e, 1); }, onBlur: function (e) { return onBlurInput(e, 1); }, onFocus: function (e) { return onFocusInput(e, 1); } }, readOnlyProps))),
        React.createElement("div", { className: prefixCls + "-suffix" },
            allowClear && value.length === 2 && (React.createElement(IconHover, { prefix: prefixCls, onClick: onClear, className: prefixCls + "-clear-icon" },
                React.createElement(IconClose, null))),
            React.createElement("span", { className: prefixCls + "-suffix-icon" }, suffixIcon))));
}
export default forwardRef(DateInput);
