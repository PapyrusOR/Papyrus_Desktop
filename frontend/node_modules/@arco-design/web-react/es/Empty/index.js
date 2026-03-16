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
import React, { memo, useContext, forwardRef } from 'react';
import IconEmpty from '../../icon/react-icon/IconEmpty';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import useMergeProps from '../_util/hooks/useMergeProps';
function Empty(baseProps, ref) {
    var _a = useContext(ConfigContext), getPrefixCls = _a.getPrefixCls, globalLocale = _a.locale, componentConfig = _a.componentConfig;
    var props = useMergeProps(baseProps, {}, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Empty);
    var style = props.style, className = props.className, description = props.description, icon = props.icon, imgSrc = props.imgSrc, rest = __rest(props, ["style", "className", "description", "icon", "imgSrc"]);
    var prefixCls = getPrefixCls('empty');
    var classNames = cs(prefixCls, className);
    var noData = globalLocale.Empty.noData;
    var alt = typeof description === 'string' ? description : 'empty';
    return (React.createElement("div", __assign({ ref: ref, className: classNames, style: style }, rest),
        React.createElement("div", { className: prefixCls + "-wrapper" },
            React.createElement("div", { className: prefixCls + "-image" }, imgSrc ? React.createElement("img", { alt: alt, src: imgSrc }) : icon || React.createElement(IconEmpty, null)),
            React.createElement("div", { className: prefixCls + "-description" }, description || noData))));
}
var EmptyComponent = forwardRef(Empty);
EmptyComponent.displayName = 'Empty';
export default memo(EmptyComponent);
