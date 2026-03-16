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
import React, { forwardRef, useRef, useImperativeHandle, useContext, useState, useEffect, useCallback, } from 'react';
import throttleByRaf from '../_util/throttleByRaf';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import { on, off } from '../_util/dom';
import ResizeObserver from '../_util/resizeObserver';
import { isWindow, isUndefined, isFunction, isObject } from '../_util/is';
import useIsomorphicLayoutEffect from '../_util/hooks/useIsomorphicLayoutEffect';
import useMergeProps from '../_util/hooks/useMergeProps';
function getTargetRect(target) {
    return isWindow(target)
        ? {
            top: 0,
            bottom: window.innerHeight,
        }
        : target.getBoundingClientRect();
}
var defaultProps = {
    offsetTop: 0,
    target: function () { return window; },
};
function Affix(baseProps, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Affix);
    var className = props.className, style = props.style, affixClassName = props.affixClassName, affixStyle = props.affixStyle, offsetTop = props.offsetTop, offsetBottom = props.offsetBottom, target = props.target, targetContainer = props.targetContainer, children = props.children, onChange = props.onChange, rest = __rest(props, ["className", "style", "affixClassName", "affixStyle", "offsetTop", "offsetBottom", "target", "targetContainer", "children", "onChange"]);
    var _c = __read(useState({
        status: 'MEASURE_DONE',
        isFixed: false,
        sizeStyles: {},
        fixedStyles: {},
    }), 2), state = _c[0], setState = _c[1];
    var isFixed = state.isFixed, sizeStyles = state.sizeStyles, fixedStyles = state.fixedStyles;
    var lastIsFixed = useRef(isFixed);
    var prefixCls = getPrefixCls('affix');
    var classNames = cs((_a = {}, _a[prefixCls] = isFixed, _a[prefixCls + "-rtl"] = rtl, _a), affixClassName);
    var wrapperRef = useRef(null);
    var targetRef = useRef(null);
    var updatePosition = useCallback(throttleByRaf(function () {
        setState({
            status: 'MEASURE_START',
            isFixed: false,
            fixedStyles: {},
            sizeStyles: {},
        });
    }), []);
    useIsomorphicLayoutEffect(function () {
        var status = state.status;
        if (status !== 'MEASURE_START' || !wrapperRef.current || !targetRef.current)
            return;
        var offsetType = isUndefined(offsetBottom) ? 'top' : 'bottom';
        var wrapperRect = wrapperRef.current.getBoundingClientRect();
        var targetRect = getTargetRect(targetRef.current);
        var newIsFixed = false;
        var newFixedStyles = {};
        if (offsetType === 'top') {
            newIsFixed = wrapperRect.top - targetRect.top < (offsetTop || 0);
            newFixedStyles = newIsFixed
                ? {
                    position: 'fixed',
                    top: targetRect.top + (offsetTop || 0),
                }
                : {};
        }
        else {
            newIsFixed = targetRect.bottom - wrapperRect.bottom < (offsetBottom || 0);
            newFixedStyles = newIsFixed
                ? {
                    position: 'fixed',
                    bottom: window.innerHeight - targetRect.bottom + (offsetBottom || 0),
                }
                : {};
        }
        var newSizeStyles = newIsFixed
            ? {
                width: wrapperRef.current.offsetWidth,
                height: wrapperRef.current.offsetHeight,
            }
            : {};
        setState({
            status: 'MEASURE_DONE',
            isFixed: newIsFixed,
            sizeStyles: newSizeStyles,
            fixedStyles: __assign(__assign({}, newFixedStyles), newSizeStyles),
        });
        if (newIsFixed !== lastIsFixed.current) {
            lastIsFixed.current = newIsFixed;
            isFunction(onChange) && onChange(newIsFixed);
        }
    }, [state, offsetBottom, offsetTop, onChange]);
    useEffect(function () {
        updatePosition();
        return function () {
            var _a;
            (_a = updatePosition === null || updatePosition === void 0 ? void 0 : updatePosition.cancel) === null || _a === void 0 ? void 0 : _a.call(updatePosition);
        };
    }, [target, targetContainer, offsetBottom, offsetTop, updatePosition]);
    // listen to scroll and resize event of target and update position correspondingly
    useEffect(function () {
        targetRef.current = target && isFunction(target) ? target() : null;
        if (targetRef.current) {
            on(targetRef.current, 'scroll', updatePosition);
            on(targetRef.current, 'resize', updatePosition);
            return function () {
                off(targetRef.current, 'scroll', updatePosition);
                off(targetRef.current, 'resize', updatePosition);
            };
        }
    }, [target, updatePosition]);
    useEffect(function () {
        var container = targetContainer && isFunction(targetContainer) ? targetContainer() : null;
        // listen to scroll event of container if target is not window
        if (targetRef.current !== window && container) {
            on(container, 'scroll', updatePosition);
            return function () {
                off(container, 'scroll', updatePosition);
            };
        }
    }, [targetContainer, updatePosition]);
    useImperativeHandle(ref, function () { return ({
        updatePosition: updatePosition,
        getRootDOMNode: function () {
            return wrapperRef.current;
        },
    }); });
    return (React.createElement(ResizeObserver, { onResize: updatePosition, getTargetDOMNode: function () { return wrapperRef.current; } },
        React.createElement("div", __assign({ className: cs(className), style: style, ref: wrapperRef }, rest),
            isFixed && React.createElement("div", { style: sizeStyles }),
            React.createElement("div", { className: classNames, style: __assign(__assign({}, fixedStyles), (isObject(affixStyle) ? affixStyle : {})) },
                React.createElement(ResizeObserver, { onResize: updatePosition }, children || React.createElement("span", null))))));
}
var AffixComponent = forwardRef(Affix);
AffixComponent.displayName = 'Affix';
export default AffixComponent;
