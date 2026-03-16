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
import React, { useContext, forwardRef } from 'react';
import { isNumber } from '../_util/is';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import Avatar from './avatar';
import Popover from '../Popover';
import AvatarContext from './context';
import useMergeProps from '../_util/hooks/useMergeProps';
var defaultProps = {
    shape: 'circle',
    autoFixFontSize: true,
};
function Group(baseProps, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig['Avatar.Group']);
    var className = props.className, style = props.style, children = props.children, size = props.size, shape = props.shape, autoFixFontSize = props.autoFixFontSize, zIndexAscend = props.zIndexAscend, maxCount = props.maxCount, maxStyle = props.maxStyle, maxPopoverTriggerProps = props.maxPopoverTriggerProps, rest = __rest(props, ["className", "style", "children", "size", "shape", "autoFixFontSize", "zIndexAscend", "maxCount", "maxStyle", "maxPopoverTriggerProps"]);
    var prefixCls = getPrefixCls('avatar-group');
    var classNames = cs(prefixCls, (_a = {},
        _a[prefixCls + "-rtl"] = rtl,
        _a), className);
    var childrenArr = React.Children.toArray(children);
    var avatarCount = childrenArr.length;
    var avatarsToRender = childrenArr;
    if (isNumber(maxCount) && maxCount >= 0 && avatarCount > maxCount) {
        var avatarsInPopover = childrenArr.slice(maxCount);
        avatarsToRender = childrenArr.slice(0, maxCount);
        avatarsToRender.push(React.createElement(Avatar, { key: "_arco_avatar_group_popup", style: maxStyle, className: prefixCls + "-max-count-avatar" },
            React.createElement(Popover, { triggerProps: maxPopoverTriggerProps, content: React.createElement(AvatarContext.Provider, { value: { size: size, shape: shape, autoFixFontSize: autoFixFontSize } },
                    React.createElement("div", { className: prefixCls + "-popover" }, avatarsInPopover)) },
                "+",
                avatarsInPopover.length)));
    }
    return (React.createElement("div", __assign({ ref: ref, style: style, className: classNames }, rest), avatarsToRender.map(function (item, index) {
        var isFirst = rtl ? index === avatarsToRender.length - 1 : index === 0;
        var stackedStyle = {
            zIndex: zIndexAscend ? index + 1 : avatarCount - index,
            marginLeft: size ? (!isFirst ? -size / 4 : 0) : '',
        };
        return (React.createElement(AvatarContext.Provider, { key: index, value: { size: size, shape: shape, autoFixFontSize: autoFixFontSize, style: stackedStyle } }, item));
    })));
}
var AvatarGroupComponent = forwardRef(Group);
AvatarGroupComponent.displayName = 'AvatarGroup';
export default AvatarGroupComponent;
