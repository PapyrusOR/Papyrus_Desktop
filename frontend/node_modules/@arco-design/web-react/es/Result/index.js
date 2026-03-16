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
import React, { forwardRef, useContext } from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import IconCheck from '../../icon/react-icon/IconCheck';
import IconExclamation from '../../icon/react-icon/IconExclamation';
import IconInfo from '../../icon/react-icon/IconInfo';
import IconClose from '../../icon/react-icon/IconClose';
import Image404 from './404';
import Image403 from './403';
import Image500 from './500';
import useMergeProps from '../_util/hooks/useMergeProps';
var defaultIcons = {
    success: React.createElement(IconCheck, null),
    info: React.createElement(IconInfo, null),
    warning: React.createElement(IconExclamation, null),
    error: React.createElement(IconClose, null),
    '404': React.createElement(Image404, null),
    '403': React.createElement(Image403, null),
    '500': React.createElement(Image500, null),
};
var defaultProps = {
    status: 'info',
};
function Result(baseProps, ref) {
    var _a, _b;
    var _c = useContext(ConfigContext), getPrefixCls = _c.getPrefixCls, componentConfig = _c.componentConfig, rtl = _c.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Result);
    var className = props.className, style = props.style, status = props.status, title = props.title, subTitle = props.subTitle, extra = props.extra, children = props.children, propsIcon = props.icon, rest = __rest(props, ["className", "style", "status", "title", "subTitle", "extra", "children", "icon"]);
    var prefixCls = getPrefixCls('result');
    var icon = 'icon' in props ? propsIcon : defaultIcons[status];
    return (React.createElement("div", __assign({ ref: ref, className: cs(prefixCls, (_a = {},
            _a[prefixCls + "-is-" + status] = status,
            _a[prefixCls + "-rtl"] = rtl,
            _a), className), style: style }, rest),
        icon && (React.createElement("div", { className: prefixCls + "-icon" },
            React.createElement("span", { className: cs(prefixCls + "-icon-tip", (_b = {},
                    _b[prefixCls + "-icon-" + status] = status,
                    _b[prefixCls + "-icon-custom"] = status === null,
                    _b)) }, icon))),
        title && React.createElement("div", { className: prefixCls + "-title" }, title),
        subTitle && React.createElement("div", { className: prefixCls + "-subtitle" }, subTitle),
        extra && React.createElement("div", { className: prefixCls + "-extra" }, extra),
        children && React.createElement("div", { className: prefixCls + "-content" }, children)));
}
var ResultRef = forwardRef(Result);
ResultRef.displayName = 'Result';
export default ResultRef;
