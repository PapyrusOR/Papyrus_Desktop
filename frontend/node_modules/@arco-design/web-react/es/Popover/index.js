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
import Tooltip from '../Tooltip';
import { ConfigContext } from '../ConfigProvider';
import useMergeProps from '../_util/hooks/useMergeProps';
import cs from '../_util/classNames';
import { isFunction, isEmptyReactNode } from '../_util/is';
var defaultProps = {
    position: 'top',
    trigger: 'hover',
    unmountOnExit: true,
};
function Popover(baseProps, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Popover);
    var style = props.style, className = props.className, children = props.children, position = props.position, getPopupContainer = props.getPopupContainer, trigger = props.trigger, defaultPopupVisible = props.defaultPopupVisible, popupVisible = props.popupVisible, triggerProps = props.triggerProps, unmountOnExit = props.unmountOnExit, onVisibleChange = props.onVisibleChange, content = props.content, title = props.title, rest = __rest(props, ["style", "className", "children", "position", "getPopupContainer", "trigger", "defaultPopupVisible", "popupVisible", "triggerProps", "unmountOnExit", "onVisibleChange", "content", "title"]);
    var prefixCls = getPrefixCls('popover');
    var usedTitle = isFunction(title) ? title() : title;
    var usedContent = isFunction(content) ? content() : content;
    var renderContent = isEmptyReactNode(usedTitle, true) && isEmptyReactNode(usedContent, true) ? null : (React.createElement("div", { className: cs(prefixCls + "-inner", (_a = {}, _a[prefixCls + "-inner-rtl"] = rtl, _a)) },
        usedTitle ? React.createElement("div", { className: prefixCls + "-title" }, usedTitle) : null,
        React.createElement("div", { className: prefixCls + "-inner-content" }, usedContent)));
    return (React.createElement(Tooltip, __assign({}, rest, { ref: ref, style: __assign({ maxWidth: 350 }, style), className: className, prefixCls: prefixCls, getPopupContainer: getPopupContainer, position: position, trigger: trigger, content: renderContent, popupHoverStay: true, unmountOnExit: unmountOnExit, triggerProps: triggerProps, defaultPopupVisible: defaultPopupVisible, onVisibleChange: onVisibleChange || (triggerProps ? triggerProps.onVisibleChange : undefined), childrenPrefix: prefixCls }, ('popupVisible' in props ? { popupVisible: popupVisible } : {})), typeof children === 'string' ? React.createElement("span", null, children) : children));
}
var PopoverComponent = forwardRef(Popover);
PopoverComponent.displayName = 'Popover';
export default PopoverComponent;
