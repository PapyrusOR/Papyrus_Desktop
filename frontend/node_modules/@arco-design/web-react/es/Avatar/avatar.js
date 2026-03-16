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
import React, { useImperativeHandle, useRef, useEffect, useContext, forwardRef, } from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import AvatarContext from './context';
import { isNumber } from '../_util/is';
var defaultProps = {
    shape: 'circle',
    autoFixFontSize: true,
    triggerType: 'button',
};
var Avatar = forwardRef(function (props, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var prefixCls = getPrefixCls('avatar');
    var contextProps = useContext(AvatarContext);
    var mergedProps = __assign(__assign(__assign(__assign({}, defaultProps), componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Avatar), contextProps), props);
    var className = mergedProps.className, shape = mergedProps.shape, size = mergedProps.size, children = mergedProps.children, autoFixFontSize = mergedProps.autoFixFontSize, triggerIcon = mergedProps.triggerIcon, triggerIconStyle = mergedProps.triggerIconStyle, triggerType = mergedProps.triggerType, onClick = mergedProps.onClick, rest = __rest(mergedProps, ["className", "shape", "size", "children", "autoFixFontSize", "triggerIcon", "triggerIconStyle", "triggerType", "onClick"]);
    var style = __assign(__assign({}, contextProps.style), props.style);
    var textRef = useRef(null);
    var avatarRef = useRef(null);
    useEffect(function () {
        if (autoFixFontSize) {
            autoFixFontSizeHandler();
        }
    }, [size, children]);
    useImperativeHandle(ref, function () { return avatarRef.current; });
    // auto adjust font size
    function autoFixFontSizeHandler() {
        if (textRef.current) {
            var textWidth = textRef.current.clientWidth;
            var size_1 = props.size || avatarRef.current.offsetWidth;
            var scale = size_1 / (textWidth + 8);
            if (size_1 && scale < 1) {
                textRef.current.style.transform = "scale(" + scale + ") translateX(-50%)";
            }
        }
    }
    var classNames = cs(prefixCls, prefixCls + "-" + shape, (_a = {},
        _a[prefixCls + "-with-trigger-icon"] = triggerIcon,
        _a[prefixCls + "-rtl"] = rtl,
        _a), className);
    var childrenList = React.Children.toArray(children);
    var isImage = childrenList.length === 1 &&
        React.isValidElement(childrenList[0]) &&
        (childrenList[0].type === 'img' || childrenList[0].type === 'picture');
    var _triggerIconStyle = triggerIconStyle || {};
    if (triggerType === 'button' &&
        (!triggerIconStyle || (triggerIconStyle && !triggerIconStyle.color)) &&
        style &&
        style.backgroundColor) {
        _triggerIconStyle.color = style.backgroundColor;
    }
    return (React.createElement("div", __assign({ ref: avatarRef, onClick: onClick }, rest, { style: __assign({ width: size, height: size, fontSize: isNumber(size) ? size / 2 : '' }, style), className: classNames }),
        isImage ? React.createElement("span", { className: prefixCls + "-image" }, children) : null,
        !isImage && (React.createElement("span", { ref: textRef, className: prefixCls + "-text" }, children)),
        triggerIcon && (React.createElement("div", { className: prefixCls + "-trigger-icon-" + triggerType, style: _triggerIconStyle }, triggerIcon))));
});
Avatar.displayName = 'Avatar';
export default Avatar;
