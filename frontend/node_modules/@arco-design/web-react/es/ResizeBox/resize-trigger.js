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
import React, { useContext, useRef } from 'react';
import cs from '../_util/classNames';
import ResizeObserver from '../_util/resizeObserver';
import { ConfigContext } from '../ConfigProvider';
import IconDragDotVertical from '../../icon/react-icon/IconDragDotVertical';
import IconDragDot from '../../icon/react-icon/IconDragDot';
import IconCaretRight from '../../icon/react-icon/IconCaretRight';
import IconCaretLeft from '../../icon/react-icon/IconCaretLeft';
import IconCaretDown from '../../icon/react-icon/IconCaretDown';
import IconCareUp from '../../icon/react-icon/IconCaretUp';
import { isFunction, isObject } from '../_util/is';
import omit from '../_util/omit';
export default function ResizeTrigger(props) {
    var _a, _b;
    var className = props.className, direction = props.direction, icon = props.icon, onMouseDown = props.onMouseDown, onResize = props.onResize, children = props.children, _c = props.collapsible, collapsible = _c === void 0 ? {} : _c, _d = props.resizable, resizable = _d === void 0 ? true : _d, renderChildren = props.renderChildren, rest = __rest(props, ["className", "direction", "icon", "onMouseDown", "onResize", "children", "collapsible", "resizable", "renderChildren"]);
    var _e = useContext(ConfigContext), getPrefixCls = _e.getPrefixCls, rtl = _e.rtl;
    var prefixCls = getPrefixCls('resizebox-trigger');
    var isHorizontal = direction === 'horizontal';
    var rtlReverse = rtl && !isHorizontal;
    var classNames = cs(prefixCls, prefixCls + "-" + (isHorizontal ? 'horizontal' : 'vertical'), (_a = {}, _a[prefixCls + "-not-resizable"] = !resizable, _a), (_b = {}, _b[prefixCls + "-rtl"] = rtl, _b), className);
    var refDiv = useRef();
    var verticalTriggerIcon = rtlReverse
        ? [React.createElement(IconCaretRight, { key: "prev" }), React.createElement(IconCaretLeft, { key: "next" })]
        : [React.createElement(IconCaretLeft, { key: "prev" }), React.createElement(IconCaretRight, { key: "next" })];
    var prevCollapsedConfig = isObject(collapsible.prev)
        ? __assign(__assign({}, collapsible.prev), { icon: collapsible.prev.icon || (isHorizontal ? React.createElement(IconCareUp, null) : verticalTriggerIcon[0]) }) : {};
    var nextCollapsedConfig = isObject(collapsible.next)
        ? __assign(__assign({}, collapsible.next), { icon: collapsible.next.icon || (isHorizontal ? React.createElement(IconCaretDown, null) : verticalTriggerIcon[1]) }) : {};
    var renderPrevCollapsedTrigger = function () {
        // 1. 传入了prev
        // 当前不在收缩状态，或者在反方向收缩状态时展示
        if ((prevCollapsedConfig.icon && !prevCollapsedConfig.collapsed) ||
            nextCollapsedConfig.collapsed) {
            return (React.createElement("span", { className: cs(prefixCls + "-icon", cs(prefixCls + "-prev")), onClick: prevCollapsedConfig.onClick }, prevCollapsedConfig.icon));
        }
        return React.createElement("span", { className: cs(prefixCls + "-icon-empty") });
    };
    var renderNextCollapsedTrigger = function () {
        if ((nextCollapsedConfig.icon && !nextCollapsedConfig.collapsed) ||
            prevCollapsedConfig.collapsed) {
            return (React.createElement("span", { className: cs(prefixCls + "-icon", cs(prefixCls + "-next")), onClick: nextCollapsedConfig.onClick }, nextCollapsedConfig.icon));
        }
        return React.createElement("span", { className: cs(prefixCls + "-icon-empty") });
    };
    var renderResizeTrigger = function () {
        if (resizable) {
            return (React.createElement("span", { className: prefixCls + "-icon" }, icon || (isHorizontal ? React.createElement(IconDragDot, null) : React.createElement(IconDragDotVertical, null))));
        }
        return React.createElement("span", { className: cs(prefixCls + "-icon-empty") });
    };
    var prev = renderPrevCollapsedTrigger();
    var trigger = renderResizeTrigger();
    var next = renderNextCollapsedTrigger();
    var renderIcon = function () {
        return (React.createElement("div", { className: prefixCls + "-icon-wrapper" },
            prev,
            trigger,
            next));
    };
    if (!resizable) {
        return (React.createElement("div", { className: classNames }, isFunction(renderChildren)
            ? renderChildren(prev, trigger, next)
            : children || renderIcon()));
    }
    return (React.createElement(ResizeObserver, { onResize: onResize, getTargetDOMNode: function () { return refDiv.current; } },
        React.createElement("div", __assign({ ref: refDiv }, omit(rest, ['style']), { className: classNames, onMouseDown: onMouseDown }), isFunction(renderChildren)
            ? renderChildren(prev, trigger, next)
            : children || renderIcon())));
}
