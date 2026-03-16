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
import React, { useContext, useState, useRef, useImperativeHandle, useMemo, } from 'react';
import cs from '../_util/classNames';
import Search from './search';
import TextArea from './textarea';
import Password from './password';
import { ConfigContext } from '../ConfigProvider';
import { isUndefined, isString, isObject } from '../_util/is';
import useMergeValue from '../_util/hooks/useMergeValue';
import InputComponent from './input-element';
import Group from './group';
import { contains } from '../_util/dom';
import useMergeProps from '../_util/hooks/useMergeProps';
var keepFocus = function (e) {
    e.target.tagName !== 'INPUT' && e.preventDefault();
};
var inputAddon = function (className, node, style, onClick) {
    if (style === void 0) { style = {}; }
    return node ? (React.createElement("span", { style: style, className: className, onClick: onClick }, node)) : null;
};
export function formatValue(value, maxLength) {
    var str = value !== null && !isUndefined(value) && !isString(value) ? String(value) : value || '';
    if (maxLength) {
        return str.slice(0, maxLength);
    }
    return str;
}
function Input(baseProps, ref) {
    var _a, _b, _c;
    var _d = useContext(ConfigContext), getPrefixCls = _d.getPrefixCls, ctxSize = _d.size, componentConfig = _d.componentConfig, rtl = _d.rtl;
    var props = useMergeProps(baseProps, {}, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Input);
    var className = props.className, propsStyle = props.style, addBefore = props.addBefore, addAfter = props.addAfter, suffix = props.suffix, prefix = props.prefix, beforeStyle = props.beforeStyle, afterStyle = props.afterStyle, height = props.height, disabled = props.disabled, maxLength = props.maxLength, showWordLimit = props.showWordLimit, allowClear = props.allowClear, propsAutoWidth = props.autoWidth;
    var autoWidth = propsAutoWidth
        ? __assign({ minWidth: 0, maxWidth: '100%' }, (isObject(propsAutoWidth) ? propsAutoWidth : {})) : null;
    var style = __assign({ minWidth: autoWidth === null || autoWidth === void 0 ? void 0 : autoWidth.minWidth, maxWidth: autoWidth === null || autoWidth === void 0 ? void 0 : autoWidth.maxWidth, width: autoWidth && 'auto' }, propsStyle);
    var trueMaxLength = isObject(maxLength) ? maxLength.length : maxLength;
    var mergedMaxLength = isObject(maxLength) && maxLength.errorOnly ? undefined : trueMaxLength;
    var _e = __read(useState(false), 2), focus = _e[0], setFocus = _e[1];
    var inputRef = useRef();
    var rootNodeRef = useRef();
    var inputWrapperRef = useRef();
    var _f = __read(useMergeValue('', {
        defaultValue: 'defaultValue' in props ? formatValue(props.defaultValue, mergedMaxLength) : undefined,
        value: 'value' in props ? formatValue(props.value, mergedMaxLength) : undefined,
    }), 2), value = _f[0], setValue = _f[1];
    useImperativeHandle(ref, function () {
        var _a, _b, _c;
        return ({
            focus: (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus,
            blur: (_b = inputRef.current) === null || _b === void 0 ? void 0 : _b.blur,
            dom: (_c = inputRef.current) === null || _c === void 0 ? void 0 : _c.dom,
            getRootDOMNode: function () { var _a; return rootNodeRef.current || ((_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.dom); },
        });
    }, []);
    var onChange = function (value, e) {
        if (!('value' in props)) {
            setValue(value);
        }
        props.onChange && props.onChange(value, e);
    };
    var prefixCls = getPrefixCls('input');
    var size = props.size || ctxSize;
    var isCustomHeight = 'height' in props;
    var suffixElement = suffix;
    var valueLength = value ? value.length : 0;
    var lengthError = useMemo(function () {
        if (!mergedMaxLength && trueMaxLength) {
            return valueLength > trueMaxLength;
        }
        return false;
    }, [valueLength, trueMaxLength, mergedMaxLength]);
    if (trueMaxLength && showWordLimit) {
        var _g = __read(rtl ? [trueMaxLength, valueLength] : [valueLength, trueMaxLength], 2), leftWord = _g[0], rightWord = _g[1];
        suffixElement = (React.createElement("span", { className: cs(prefixCls + "-word-limit", (_a = {},
                _a[prefixCls + "-word-limit-error"] = lengthError,
                _a)) },
            leftWord,
            "/",
            rightWord));
    }
    var classnames = cs(prefixCls + "-group-wrapper", prefixCls + "-group-wrapper-" + size, (_b = {},
        _b[prefixCls + "-custom-height"] = isCustomHeight,
        _b[prefixCls + "-has-suffix"] = suffixElement,
        _b[prefixCls + "-group-wrapper-disabled"] = disabled,
        _b[prefixCls + "-group-wrapper-rtl"] = rtl,
        _b[prefixCls + "-group-wrapper-autowidth"] = autoWidth,
        _b), className);
    var status = props.status || (props.error || lengthError ? 'error' : undefined);
    var needWrapper = addBefore || addAfter || suffixElement || prefix;
    var inputElement = (React.createElement(InputComponent, __assign({ ref: inputRef }, props, { autoFitWidth: !!autoWidth, style: style, status: status, onFocus: function (e) {
            setFocus(true);
            props.onFocus && props.onFocus(e);
        }, onBlur: function (e) {
            setFocus(false);
            props.onBlur && props.onBlur(e);
        }, onChange: onChange, prefixCls: prefixCls, value: value, hasParent: !!needWrapper || allowClear, size: size })));
    var innerWrapperClassnames = cs(prefixCls + "-inner-wrapper", (_c = {},
        _c[prefixCls + "-inner-wrapper-" + status] = status,
        _c[prefixCls + "-inner-wrapper-disabled"] = disabled,
        _c[prefixCls + "-inner-wrapper-focus"] = focus,
        _c[prefixCls + "-inner-wrapper-has-prefix"] = prefix,
        _c[prefixCls + "-inner-wrapper-" + size] = size,
        _c[prefixCls + "-clear-wrapper"] = allowClear,
        _c[prefixCls + "-inner-wrapper-rtl"] = rtl,
        _c));
    return needWrapper ? (React.createElement("div", { ref: rootNodeRef, className: classnames, style: __assign(__assign({}, style), (isCustomHeight ? { height: height } : {})) },
        React.createElement("span", { className: prefixCls + "-group" },
            inputAddon(prefixCls + "-group-addbefore", addBefore, beforeStyle),
            React.createElement("span", { className: innerWrapperClassnames, ref: inputWrapperRef, onMouseDown: function (e) {
                    // 直接的点击input的时候，不阻止默认行为，避免无法选中输入框里的输入文本
                    if (e.target.tagName !== 'INPUT') {
                        // 当使用React.Portal挂载的组件（tooltip, popover等）放在prefix，suffix里是，弹层中的内容无法被选中。
                        // contains 判断如果不包含在当前dom节点，则不阻止默认行为。
                        if (inputWrapperRef.current && contains(inputWrapperRef.current, e.target)) {
                            e.preventDefault();
                        }
                    }
                }, onClick: function (e) {
                    // 当使用React.Portal挂载的组件（tooltip, popover等）放在prefix，suffix里时，弹出层被点击时，不应该focus input。
                    if (inputWrapperRef.current && contains(inputWrapperRef.current, e.target)) {
                        inputRef.current && inputRef.current.focus();
                    }
                } },
                inputAddon(prefixCls + "-group-prefix", prefix),
                inputElement,
                inputAddon(prefixCls + "-group-suffix", suffixElement)),
            inputAddon(prefixCls + "-group-addafter", addAfter, afterStyle)))) : allowClear ? (React.createElement("span", { ref: rootNodeRef, className: cs(className, innerWrapperClassnames), style: __assign(__assign({}, style), (isCustomHeight ? { height: height } : {})), onMouseDown: keepFocus, onClick: function () {
            inputRef.current && inputRef.current.focus();
        } }, inputElement)) : (inputElement);
}
var InputElement = React.forwardRef(Input);
InputElement.displayName = 'Input';
InputElement.Search = Search;
InputElement.TextArea = TextArea;
InputElement.Password = Password;
InputElement.Group = Group;
export default InputElement;
