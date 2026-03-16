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
import React, { useState, useContext, forwardRef } from 'react';
import IconCheckCircleFill from '../../icon/react-icon/IconCheckCircleFill';
import IconCloseCircleFill from '../../icon/react-icon/IconCloseCircleFill';
import IconInfoCircleFill from '../../icon/react-icon/IconInfoCircleFill';
import IconExclamationCircleFill from '../../icon/react-icon/IconExclamationCircleFill';
import IconClose from '../../icon/react-icon/IconClose';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import useMergeProps from '../_util/hooks/useMergeProps';
import ArcoCSSTransition from '../_util/CSSTransition';
var defaultProps = {
    showIcon: true,
    type: 'info',
};
function Alert(baseProps, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Alert);
    var style = props.style, className = props.className, action = props.action, _c = props.type, type = _c === void 0 ? 'info' : _c, title = props.title, content = props.content, icon = props.icon, showIcon = props.showIcon, closable = props.closable, closeable = props.closeable, afterClose = props.afterClose, onClose = props.onClose, closeElement = props.closeElement, banner = props.banner, rest = __rest(props, ["style", "className", "action", "type", "title", "content", "icon", "showIcon", "closable", "closeable", "afterClose", "onClose", "closeElement", "banner"]);
    var prefixCls = getPrefixCls('alert');
    var _d = __read(useState(true), 2), visible = _d[0], setVisible = _d[1];
    function renderIcon(type) {
        if (icon) {
            return icon;
        }
        switch (type) {
            case 'info':
                return React.createElement(IconInfoCircleFill, null);
            case 'success':
                return React.createElement(IconCheckCircleFill, null);
            case 'warning':
                return React.createElement(IconExclamationCircleFill, null);
            case 'error':
                return React.createElement(IconCloseCircleFill, null);
            default:
                return null;
        }
    }
    function onHandleClose(e) {
        setVisible(false);
        onClose === null || onClose === void 0 ? void 0 : onClose(e);
    }
    var classNames = cs(prefixCls, prefixCls + "-" + type, (_a = {},
        _a[prefixCls + "-with-title"] = title,
        _a[prefixCls + "-banner"] = banner,
        _a[prefixCls + "-rtl"] = rtl,
        _a), className);
    var _closable = 'closeable' in props ? closeable : closable;
    return (React.createElement(ArcoCSSTransition, { in: visible, timeout: 300, classNames: "zoomInTop", unmountOnExit: true, onExited: function () {
            afterClose === null || afterClose === void 0 ? void 0 : afterClose();
        } },
        React.createElement("div", __assign({ ref: ref, style: style, className: classNames, role: "alert" }, rest),
            showIcon && React.createElement("div", { className: prefixCls + "-icon-wrapper" }, renderIcon(type)),
            React.createElement("div", { className: prefixCls + "-content-wrapper" },
                title && React.createElement("div", { className: prefixCls + "-title" }, title),
                content && React.createElement("div", { className: prefixCls + "-content" }, content)),
            action && React.createElement("div", { className: prefixCls + "-action" }, action),
            _closable && (React.createElement("button", { type: "button", onClick: onHandleClose, className: prefixCls + "-close-btn" }, closeElement || React.createElement(IconClose, null))))));
}
var AlertComponent = forwardRef(Alert);
AlertComponent.displayName = 'Alert';
export default AlertComponent;
