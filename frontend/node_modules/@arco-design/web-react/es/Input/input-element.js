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
import React, { useRef, useImperativeHandle, useEffect, useState } from 'react';
import cs from '../_util/classNames';
import omit from '../_util/omit';
import ResizeObserver from '../_util/resizeObserver';
import IconClose from '../../icon/react-icon/IconClose';
import IconHover from '../_class/icon-hover';
import { isFunction, isObject } from '../_util/is';
import useComposition from './useComposition';
import useKeyboardEvent from '../_util/hooks/useKeyboardEvent';
import fillNBSP from '../_util/fillNBSP';
// 设置 input 元素缓冲宽度，避免 autoWidth.minWidth < padding + border 时，content 区域宽度为0，光标会看不到
// 后续可考虑是否作为 autoWidth 的一个配置项暴露
var inputContentWidth = 2;
// 从 input 标签获取影响到宽度计算的"文本样式属性"和“布局”属性 https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_text
// 为什么不是直接把 input 标签的类名设置给 mirror 元素？避免用户对 input 类名自定义样式会影响到 mirror
// 仅在 mounted 的时候执行一次
var getStyleFromInput = function (input) {
    if (!input) {
        return {};
    }
    var computeStyle = window.getComputedStyle(input);
    var cssKeys = [
        'font',
        'letterSpacing',
        'overflow',
        'tabSize',
        'textIndent',
        'textTransform',
        'whiteSpace',
        'wordBreak',
        'wordSpacing',
        'paddingLeft',
        'paddingRight',
        'borderLeft',
        'borderRight',
        'boxSizing',
    ];
    return cssKeys.reduce(function (t, n) {
        t[n] = computeStyle[n];
        return t;
    }, {});
};
var InputComponent = React.forwardRef(function (props, ref) {
    var _a;
    var allowClear = props.allowClear, disabled = props.disabled, placeholder = props.placeholder, className = props.className, style = props.style, height = props.height, prefixCls = props.prefixCls, hasParent = props.hasParent, size = props.size, value = props.value, autoFitWidth = props.autoFitWidth, onClear = props.onClear, readOnly = props.readOnly, onChange = props.onChange, onKeyDown = props.onKeyDown, onPressEnter = props.onPressEnter, propMaxLength = props.maxLength, clearIcon = props.clearIcon, rest = __rest(props, ["allowClear", "disabled", "placeholder", "className", "style", "height", "prefixCls", "hasParent", "size", "value", "autoFitWidth", "onClear", "readOnly", "onChange", "onKeyDown", "onPressEnter", "maxLength", "clearIcon"]);
    var otherProps = omit(rest, [
        'error',
        'status',
        'showWordLimit',
        'className',
        'defaultValue',
        'addBefore',
        'addAfter',
        'afterStyle',
        'beforeStyle',
        'prefix',
        'suffix',
        'normalize',
        'normalizeTrigger',
        'autoWidth',
    ]);
    var _b = __read(useState(), 2), inputComputeStyle = _b[0], setInputComputeStyle = _b[1];
    var getKeyboardEvents = useKeyboardEvent();
    var refInput = useRef();
    var refInputMirror = useRef();
    var refPrevInputWidth = useRef(null);
    var maxLength = isObject(propMaxLength)
        ? propMaxLength.errorOnly
            ? undefined
            : propMaxLength.length
        : propMaxLength;
    var normalizeHandler = function (type) {
        var handler;
        var normalizeTrigger = props.normalizeTrigger || ['onBlur'];
        if (Array.isArray(normalizeTrigger) &&
            normalizeTrigger.indexOf(type) > -1 &&
            isFunction(props.normalize)) {
            handler = props.normalize;
        }
        return handler;
    };
    var _c = useComposition({
        value: value,
        maxLength: maxLength,
        onChange: onChange,
        onKeyDown: onKeyDown,
        onPressEnter: onPressEnter,
        normalizeHandler: normalizeHandler,
    }), compositionValue = _c.compositionValue, valueChangeHandler = _c.valueChangeHandler, compositionHandler = _c.compositionHandler, keyDownHandler = _c.keyDownHandler, triggerValueChangeCallback = _c.triggerValueChangeCallback;
    var inputClassNames = cs(prefixCls, prefixCls && (_a = {},
        _a[prefixCls + "-size-" + size] = size,
        _a[prefixCls + "-" + props.status] = props.status,
        _a[prefixCls + "-disabled"] = disabled,
        _a[prefixCls + "-autowidth"] = autoFitWidth,
        _a), hasParent ? undefined : className);
    var inputProps = __assign(__assign({ 'aria-invalid': props.status === 'error' || undefined }, otherProps), { readOnly: readOnly, maxLength: maxLength, disabled: disabled, placeholder: placeholder, value: compositionValue || value || '', className: inputClassNames, onKeyDown: keyDownHandler, onChange: valueChangeHandler, onCompositionStart: function (e) {
            var _a;
            (_a = rest.onCompositionStart) === null || _a === void 0 ? void 0 : _a.call(rest, e);
            compositionHandler(e);
        }, onCompositionUpdate: function (e) {
            var _a;
            (_a = rest.onCompositionUpdate) === null || _a === void 0 ? void 0 : _a.call(rest, e);
            compositionHandler(e);
        }, onCompositionEnd: function (e) {
            var _a;
            (_a = rest.onCompositionEnd) === null || _a === void 0 ? void 0 : _a.call(rest, e);
            compositionHandler(e);
        }, onBlur: function (e) {
            var _a;
            (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, e);
            var normalize = normalizeHandler('onBlur');
            normalize && triggerValueChangeCallback(normalize(e.target.value), e);
        } });
    useImperativeHandle(ref, function () {
        return {
            dom: refInput.current,
            getRootDOMNode: function () { return refInput.current; },
            focus: function () {
                refInput.current && refInput.current.focus && refInput.current.focus();
            },
            blur: function () {
                refInput.current && refInput.current.blur && refInput.current.blur();
            },
        };
    }, []);
    var updateInputWidth = function () {
        if (refInputMirror.current && refInput.current) {
            var width = refInputMirror.current.offsetWidth;
            refInput.current.style.width = width + inputContentWidth + "px";
        }
    };
    // Set the initial width of <input>, and subsequent updates are triggered by ResizeObserver
    useEffect(function () {
        if (autoFitWidth) {
            if (!isObject(autoFitWidth) || !autoFitWidth.pure) {
                setInputComputeStyle(getStyleFromInput(refInput === null || refInput === void 0 ? void 0 : refInput.current));
            }
            updateInputWidth();
        }
    }, [autoFitWidth]);
    // Here also need placeholder to trigger updateInputWidth after user-input is cleared
    var mirrorValue = inputProps.value || placeholder;
    var handleClear = function (e) {
        if (refInput.current && refInput.current.focus) {
            refInput.current.focus();
        }
        triggerValueChangeCallback('', e);
        onClear === null || onClear === void 0 ? void 0 : onClear();
    };
    return (React.createElement(React.Fragment, null,
        allowClear ? (React.createElement(React.Fragment, null,
            React.createElement("input", __assign({ ref: refInput }, inputProps)),
            !readOnly && !disabled && allowClear && value ? (clearIcon !== undefined ? (React.createElement("span", __assign({ tabIndex: 0, className: prefixCls + "-clear-icon" }, getKeyboardEvents({ onPressEnter: handleClear }), { onClick: function (e) {
                    e.stopPropagation();
                    handleClear(e);
                }, onMouseDown: function (e) {
                    e.preventDefault();
                } }), clearIcon)) : (React.createElement(IconHover, __assign({ tabIndex: 0, className: prefixCls + "-clear-icon" }, getKeyboardEvents({ onPressEnter: handleClear }), { onClick: function (e) {
                    e.stopPropagation();
                    handleClear(e);
                } }),
                React.createElement(IconClose
                // keep focus status
                , { 
                    // keep focus status
                    onMouseDown: function (e) {
                        e.preventDefault();
                    } })))) : null)) : (React.createElement("input", __assign({ ref: refInput }, inputProps, { style: hasParent
                ? {}
                : __assign(__assign({ minWidth: isObject(autoFitWidth) ? autoFitWidth.minWidth : undefined, maxWidth: isObject(autoFitWidth) ? autoFitWidth.maxWidth : undefined }, style), ('height' in props ? { height: height } : {})) }))),
        autoFitWidth && (React.createElement(ResizeObserver, { getTargetDOMNode: function () { return refInputMirror.current; }, onResize: function () {
                var inputWidth = refInputMirror.current.offsetWidth;
                if (typeof autoFitWidth === 'object') {
                    var delay = typeof autoFitWidth.delay === 'function'
                        ? autoFitWidth.delay(inputWidth, refPrevInputWidth.current)
                        : autoFitWidth.delay;
                    delay ? setTimeout(updateInputWidth, delay) : updateInputWidth();
                }
                else {
                    updateInputWidth();
                }
                refPrevInputWidth.current = inputWidth;
            } },
            React.createElement("span", { className: cs(prefixCls + "-mirror"), style: hasParent
                    ? inputComputeStyle
                    : __assign(__assign(__assign({}, inputComputeStyle), style), ('height' in props ? { height: height } : {})), ref: refInputMirror }, fillNBSP(mirrorValue))))));
});
InputComponent.displayName = 'InputComponent';
export default InputComponent;
