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
import React, { useContext, useRef, useEffect, useCallback, useMemo, useState, useImperativeHandle, } from 'react';
import FocusLock from 'react-focus-lock';
import ArcoCSSTransition from '../_util/CSSTransition';
import { findDOMNode } from '../_util/react-dom';
import IconClose from '../../icon/react-icon/IconClose';
import cs from '../_util/classNames';
import Button from '../Button';
import Portal from '../Portal';
import ConfigProvider, { ConfigContext } from '../ConfigProvider';
import IconHover from '../_class/icon-hover';
import { isObject } from '../_util/is';
import useOverflowHidden from '../_util/hooks/useOverflowHidden';
import useMergeProps from '../_util/hooks/useMergeProps';
import omit from '../_util/omit';
import { Esc } from '../_util/keycode';
import { isServerRendering, contains } from '../_util/dom';
var defaultProps = {
    placement: 'right',
    width: 250,
    height: 250,
    escToExit: true,
    mask: true,
    closable: true,
    maskClosable: true,
    mountOnEnter: true,
    getPopupContainer: function () { return document.body; },
};
function Drawer(baseProps, ref) {
    var _a, _b, _c, _d;
    var context = useContext(ConfigContext);
    var locale = context.locale, getPrefixCls = context.getPrefixCls, componentConfig = context.componentConfig, rtl = context.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Drawer);
    var style = props.style, className = props.className, children = props.children, wrapClassName = props.wrapClassName, maskStyle = props.maskStyle, headerStyle = props.headerStyle, bodyStyle = props.bodyStyle, title = props.title, footer = props.footer, okText = props.okText, cancelText = props.cancelText, width = props.width, height = props.height, placement = props.placement, mask = props.mask, visible = props.visible, closable = props.closable, maskClosable = props.maskClosable, confirmLoading = props.confirmLoading, mountOnEnter = props.mountOnEnter, unmountOnExit = props.unmountOnExit, afterOpen = props.afterOpen, afterClose = props.afterClose, getPopupContainer = props.getPopupContainer, escToExit = props.escToExit, propGetChildrenPopupContainer = props.getChildrenPopupContainer, focusLock = props.focusLock, autoFocus = props.autoFocus, okButtonProps = props.okButtonProps, cancelButtonProps = props.cancelButtonProps, zIndex = props.zIndex, closeIcon = props.closeIcon, rest = __rest(props, ["style", "className", "children", "wrapClassName", "maskStyle", "headerStyle", "bodyStyle", "title", "footer", "okText", "cancelText", "width", "height", "placement", "mask", "visible", "closable", "maskClosable", "confirmLoading", "mountOnEnter", "unmountOnExit", "afterOpen", "afterClose", "getPopupContainer", "escToExit", "getChildrenPopupContainer", "focusLock", "autoFocus", "okButtonProps", "cancelButtonProps", "zIndex", "closeIcon"]);
    var drawerWrapperRef = useRef(null);
    var contentWrapperRef = useRef(null);
    var _e = __read(useState(false), 2), shouldReComputeFixed = _e[0], setShouldReComputeFixed = _e[1];
    var _f = __read(useState(), 2), popupZIndex = _f[0], setPopupZIndex = _f[1];
    var prefixCls = getPrefixCls('drawer');
    // Record whether is exiting, to prevent `onCancel` being unnecessarily triggered when mask is clicked during the period.
    var _g = __read(useState(false), 2), inExit = _g[0], setInExit = _g[1];
    // Record whether it's opened to avoid element shaking during animation caused by focus lock.
    var _h = __read(useState(false), 2), isOpened = _h[0], setIsOpened = _h[1];
    // Record whether the drawer has ever been opened.
    var isFirstRender = useRef(true);
    var _j = __read(useState(false), 2), isRendered = _j[0], setIsRendered = _j[1];
    var getContainer = useCallback(function () {
        var container = getPopupContainer === null || getPopupContainer === void 0 ? void 0 : getPopupContainer();
        return (findDOMNode(container) || document.body);
    }, [getPopupContainer]);
    var isFixed = useMemo(function () {
        return !isServerRendering && getContainer() === document.body;
    }, [shouldReComputeFixed, getContainer]);
    // visible || inExit: 完全退出后在重置 overflow
    useOverflowHidden(getContainer, { hidden: (visible || inExit) && mask });
    useImperativeHandle(ref, function () { return drawerWrapperRef.current; });
    useEffect(function () {
        // 初始就是展示，且设置了 getPopupContainer 时，组件挂载后重新执行下 isFixed 的计算逻辑，避免 getPopupContainer 返回的节点还未挂载，导致 isFixed 为true，样式表现错误的问题。
        if (visible && props.getPopupContainer) {
            // Recompute `isFixed` to avoid style error resulting from truthy `isFixed` value due to the custom container dom is not mounted yet.
            setShouldReComputeFixed(true);
        }
    }, []);
    useEffect(function () {
        if (visible && isFirstRender.current) {
            isFirstRender.current = false;
            setIsRendered(true);
        }
    }, [visible]);
    useEffect(function () {
        var _a;
        if (autoFocus && visible) {
            // https://github.com/arco-design/arco-design/pull/1439
            if (contains(document.body, drawerWrapperRef.current)) {
                (_a = drawerWrapperRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            }
        }
    }, [visible, autoFocus]);
    var initPopupZIndex = function () {
        var _a;
        if (visible && popupZIndex === undefined) {
            if (drawerWrapperRef.current) {
                // Set zIndex for nested drawer components based on zIndex of wrapper
                var zIndex_1 = +((_a = window.getComputedStyle(drawerWrapperRef.current, null)) === null || _a === void 0 ? void 0 : _a.zIndex);
                if (!isNaN(zIndex_1)) {
                    setPopupZIndex(zIndex_1 + 1);
                }
            }
        }
    };
    var element = (React.createElement("div", { className: prefixCls + "-scroll", 
        // tabIndex => https://github.com/arco-design/arco-design/issues/2121
        // use -1 => https://github.com/arco-design/arco-design/issues/2404
        tabIndex: -1 },
        title !== null && (React.createElement("div", { className: prefixCls + "-header", style: headerStyle },
            React.createElement("div", { className: prefixCls + "-header-title" }, title))),
        closable &&
            (closeIcon !== undefined ? (React.createElement("span", { onClick: props.onCancel, className: prefixCls + "-close-icon" }, closeIcon)) : (React.createElement(IconHover, { onClick: props.onCancel, className: prefixCls + "-close-icon" },
                React.createElement(IconClose, null)))),
        React.createElement("div", { ref: function (node) {
                contentWrapperRef.current = node;
                initPopupZIndex();
            }, style: bodyStyle, className: cs(prefixCls + "-content", (_a = {},
                _a[prefixCls + "-content-nofooter"] = footer === null,
                _a[prefixCls + "-content-noheader"] = title === null,
                _a)) },
            React.createElement(ConfigProvider, __assign({}, context, { zIndex: popupZIndex || 1050, getPopupContainer: function (node) {
                    return typeof propGetChildrenPopupContainer === 'function'
                        ? propGetChildrenPopupContainer(node)
                        : contentWrapperRef.current;
                } }), children)),
        footer !== null &&
            (footer ? (React.createElement("div", { className: prefixCls + "-footer" }, footer)) : (React.createElement("div", { className: prefixCls + "-footer" },
                React.createElement(Button, __assign({ onClick: props.onCancel }, cancelButtonProps), cancelText || locale.Drawer.cancelText),
                React.createElement(Button, __assign({ type: "primary", loading: confirmLoading, onClick: props.onOk }, okButtonProps), okText || locale.Drawer.okText))))));
    var globalFocusLockConfig = context.focusLock.drawer;
    var globalFocusLock = !!globalFocusLockConfig;
    var globalAutoFocus = isObject(globalFocusLockConfig) && globalFocusLockConfig.autoFocus;
    var innerFocusLock = focusLock !== undefined ? focusLock : globalFocusLock;
    var innerAutoFocus = autoFocus !== undefined ? autoFocus : globalAutoFocus;
    // Only enable FocusLock when drawer is fully opened, to avoid element shaking.
    var dom = innerFocusLock ? (React.createElement(FocusLock, { as: "span", disabled: !isOpened, crossFrame: false, autoFocus: innerAutoFocus }, element)) : (element);
    var forceRender = isFirstRender.current ? !mountOnEnter : isRendered;
    if (!visible && !forceRender) {
        return null;
    }
    return (React.createElement(Portal, { forceRender: forceRender, visible: visible, getContainer: getPopupContainer },
        React.createElement("div", __assign({}, omit(rest, ['onCancel', 'onOk']), { ref: drawerWrapperRef, onKeyDown: function (e) {
                var _a;
                var keyCode = e.keyCode || e.which;
                if (keyCode === Esc.code) {
                    if (escToExit && visible) {
                        (_a = props.onCancel) === null || _a === void 0 ? void 0 : _a.call(props, e);
                    }
                }
            }, className: cs(prefixCls + "-wrapper", (_b = {},
                _b[prefixCls + "-no-mask"] = !mask,
                _b[prefixCls + "-wrapper-hide"] = !visible,
                _b), wrapClassName), style: isFixed
                ? { position: 'fixed', zIndex: zIndex }
                : { zIndex: zIndex || 'inherit', position: 'absolute' } }),
            mask ? (React.createElement(ArcoCSSTransition, { in: visible, appear: true, timeout: 300, classNames: "fadeInStandard", mountOnEnter: mountOnEnter, unmountOnExit: unmountOnExit },
                React.createElement("div", { className: prefixCls + "-mask", style: maskStyle, onClick: function (e) {
                        if (!inExit && maskClosable) {
                            props.onCancel && props.onCancel(e);
                        }
                    } }))) : null,
            React.createElement(ArcoCSSTransition, { in: visible, appear: true, timeout: 300, classNames: {
                    top: 'slideTop',
                    bottom: 'slideBottom',
                    left: 'slideLeft',
                    right: 'slideRight',
                }[placement], mountOnEnter: mountOnEnter, unmountOnExit: unmountOnExit, onEnter: function (e) {
                    if (!e)
                        return;
                    e.parentNode.style.display = 'block';
                    setInExit(false);
                }, onEntered: function () {
                    setIsOpened(true);
                    afterOpen === null || afterOpen === void 0 ? void 0 : afterOpen();
                }, onExit: function () {
                    setIsOpened(false);
                    setInExit(true);
                }, onExited: function (e) {
                    if (!e)
                        return;
                    setInExit(false);
                    e.parentNode.style.display = ''; // don't set display='none'
                    if (unmountOnExit) {
                        setIsRendered(false);
                    }
                    afterClose === null || afterClose === void 0 ? void 0 : afterClose();
                } },
                React.createElement("div", { className: cs(prefixCls, className, (_c = {}, _c[prefixCls + "-rtl"] = rtl, _c)), style: Object.assign(placement === 'left' || placement === 'right' ? { width: width } : { height: height }, (_d = {}, _d[placement] = 0, _d), style) },
                    React.createElement("div", { className: prefixCls + "-inner" },
                        React.createElement(ConfigProvider, __assign({}, context, { effectGlobalModal: false, effectGlobalNotice: false, zIndex: popupZIndex || 1050 }), dom)))))));
}
var DrawerComponent = React.forwardRef(Drawer);
DrawerComponent.displayName = 'Drawer';
export default DrawerComponent;
