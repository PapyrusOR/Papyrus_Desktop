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
import React, { useState, forwardRef, useContext, useEffect } from 'react';
import FocusLock from 'react-focus-lock';
import cs from '../_util/classNames';
import Tooltip from '../Tooltip';
import Button from '../Button';
import IconExclamationCircleFill from '../../icon/react-icon/IconExclamationCircleFill';
import { ConfigContext } from '../ConfigProvider';
import useMergeValue from '../_util/hooks/useMergeValue';
import useMergeProps from '../_util/hooks/useMergeProps';
import { isFunction, isNullOrUndefined } from '../_util/is';
var defaultProps = {
    position: 'top',
    okType: 'primary',
    icon: React.createElement(IconExclamationCircleFill, null),
    blurToHide: true,
    unmountOnExit: true,
    trigger: 'click',
    escToClose: true,
};
function Popconfirm(baseProps, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, locale = _b.locale, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Popconfirm);
    var style = props.style, className = props.className, children = props.children, position = props.position, getPopupContainer = props.getPopupContainer, blurToHide = props.blurToHide, unmountOnExit = props.unmountOnExit, trigger = props.trigger, escToClose = props.escToClose, onVisibleChange = props.onVisibleChange, triggerProps = props.triggerProps, title = props.title, icon = props.icon, okText = props.okText, cancelText = props.cancelText, okType = props.okType, okButtonProps = props.okButtonProps, cancelButtonProps = props.cancelButtonProps, autoFocus = props.autoFocus, focusLock = props.focusLock, content = props.content, rest = __rest(props, ["style", "className", "children", "position", "getPopupContainer", "blurToHide", "unmountOnExit", "trigger", "escToClose", "onVisibleChange", "triggerProps", "title", "icon", "okText", "cancelText", "okType", "okButtonProps", "cancelButtonProps", "autoFocus", "focusLock", "content"]);
    var _c = __read(useMergeValue(false, {
        defaultValue: props.defaultPopupVisible,
        value: props.popupVisible,
    }), 2), popupVisible = _c[0], setPopupVisible = _c[1];
    var _d = __read(useState(false), 2), buttonLoading = _d[0], setLoading = _d[1];
    var prefixCls = getPrefixCls('popconfirm');
    var hasContent = !isNullOrUndefined(content);
    var handleVisibleChange = function (visible) {
        if (!('popupVisible' in props)) {
            setPopupVisible(visible);
        }
        if (triggerProps && triggerProps.onVisibleChange) {
            triggerProps.onVisibleChange(visible);
        }
        onVisibleChange && onVisibleChange(visible);
    };
    var closePopconfirm = function () {
        handleVisibleChange(false);
    };
    var onCancelPopconfirm = function (e) {
        closePopconfirm();
        props.onCancel && props.onCancel(e);
    };
    var onConfirmPopconfirm = function (e) {
        var _onConfirm = props.onOk || props.onConfirm;
        var ret;
        if (_onConfirm) {
            ret = _onConfirm(e);
        }
        if (ret && ret.then) {
            setLoading(true);
            ret.then(function () {
                closePopconfirm();
            }, function (e) {
                setLoading(false);
                console.error(e);
            });
        }
        if (!ret) {
            closePopconfirm();
        }
    };
    var renderPopconfirmContent = function () {
        var element = (React.createElement(React.Fragment, null,
            React.createElement(Button, __assign({ onClick: onCancelPopconfirm, size: "mini" }, cancelButtonProps), cancelText || locale.Popconfirm.cancelText),
            React.createElement(Button, __assign({ loading: buttonLoading, onClick: onConfirmPopconfirm, size: "mini", type: okType }, okButtonProps), okText || locale.Popconfirm.okText)));
        return (React.createElement("div", { className: prefixCls + "-wrapper" },
            React.createElement("div", { className: prefixCls + "-title" },
                icon && React.createElement("span", { className: prefixCls + "-title-icon" }, icon),
                React.createElement("div", { className: prefixCls + "-title-text" }, isFunction(title) ? title() : title)),
            hasContent && (React.createElement("div", { className: prefixCls + "-inner-content" }, isFunction(content) ? content() : content)),
            focusLock ? (React.createElement(FocusLock, { returnFocus: true, as: "div", className: prefixCls + "-btn", crossFrame: false, disabled: !popupVisible, autoFocus: !!autoFocus }, element)) : (React.createElement("div", { className: prefixCls + "-btn" }, element))));
    };
    useEffect(function () {
        if (!popupVisible && buttonLoading) {
            setLoading(false);
        }
        return function () {
            setLoading(false);
        };
    }, [popupVisible]);
    return (React.createElement(Tooltip, __assign({}, rest, { ref: ref, style: __assign({ maxWidth: 350 }, style), className: cs(className, (_a = {},
            _a[prefixCls + "-rtl"] = rtl,
            _a[prefixCls + "-has-content"] = hasContent,
            _a)), prefixCls: prefixCls, getPopupContainer: getPopupContainer, position: position, trigger: trigger, escToClose: escToClose, popupVisible: popupVisible, content: renderPopconfirmContent, unmountOnExit: unmountOnExit, blurToHide: blurToHide, popupHoverStay: true, triggerProps: triggerProps, onVisibleChange: handleVisibleChange, childrenPrefix: prefixCls }), typeof children === 'string' ? React.createElement("span", null, children) : children));
}
var PopconfirmComponent = forwardRef(Popconfirm);
PopconfirmComponent.displayName = 'Popconfirm';
export default PopconfirmComponent;
