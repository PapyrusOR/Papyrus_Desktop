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
import React, { forwardRef, useState, useEffect, useContext, memo } from 'react';
import BTween from 'b-tween';
import { pickDataAttributes } from '../_util/pick';
import cs from '../_util/classNames';
import IconToTop from '../../icon/react-icon/IconToTop';
import { ConfigContext } from '../ConfigProvider';
import { on, off } from '../_util/dom';
import throttleByRaf from '../_util/throttleByRaf';
import useMergeProps from '../_util/hooks/useMergeProps';
import useKeyboardEvent from '../_util/hooks/useKeyboardEvent';
import ArcoCSSTransition from '../_util/CSSTransition';
var defaultProps = {
    visibleHeight: 400,
    easing: 'quartOut',
    duration: 400,
    target: function () { return window; },
};
function BackTop(baseProps, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var getKeyboardEvents = useKeyboardEvent();
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.BackTop);
    var prefixCls = getPrefixCls('backtop');
    var _c = __read(useState(false), 2), visible = _c[0], setVisible = _c[1];
    var getTarget = function (target) {
        return target === window ? document.documentElement : target;
    };
    useEffect(function () {
        var target = props.target && props.target();
        var scrollHandler = throttleByRaf(function () {
            var visibleHeight = props.visibleHeight;
            var scrollTop = getTarget(target).scrollTop;
            setVisible(scrollTop >= visibleHeight);
        });
        on(target, 'scroll', scrollHandler);
        scrollHandler();
        return function () {
            scrollHandler.cancel && scrollHandler.cancel();
            off(target, 'scroll', scrollHandler);
        };
    }, [props.target, props.visibleHeight]);
    var scrollToTop = function () {
        var targetDom = props.target && props.target();
        var t = getTarget(targetDom);
        var scrollTop = t.scrollTop;
        var tween = new BTween({
            from: { scrollTop: scrollTop },
            to: { scrollTop: 0 },
            easing: props.easing,
            duration: props.duration,
            onUpdate: function (keys) {
                t.scrollTop = keys.scrollTop;
            },
        });
        tween.start();
        props.onClick && props.onClick();
    };
    return (React.createElement("div", __assign({}, pickDataAttributes(props), { ref: ref, className: cs("" + prefixCls, (_a = {}, _a[prefixCls + "-rtl"] = rtl, _a), props.className), style: props.style, onClick: scrollToTop }, getKeyboardEvents({
        onPressEnter: scrollToTop,
    })),
        React.createElement(ArcoCSSTransition, { in: visible, timeout: 100, classNames: "fadeIn", unmountOnExit: true }, props.children || (React.createElement("button", { className: prefixCls + "-button" },
            React.createElement(IconToTop, null))))));
}
var BackTopRef = forwardRef(BackTop);
BackTopRef.displayName = 'BackTop';
export default memo(BackTopRef);
