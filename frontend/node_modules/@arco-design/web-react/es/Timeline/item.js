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
import React, { useEffect, useRef, useContext } from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import useMergeProps from '../_util/hooks/useMergeProps';
var defaultProps = {
    dotType: 'solid',
    lineType: 'solid',
};
function Item(baseProps, ref) {
    var _a, _b;
    var _c = useContext(ConfigContext), getPrefixCls = _c.getPrefixCls, componentConfig = _c.componentConfig;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig['Timeline.Item']);
    var children = props.children, className = props.className, style = props.style, label = props.label, position = props.position, dot = props.dot, dotColor = props.dotColor, dotType = props.dotType, lineType = props.lineType, lineColor = props.lineColor, direction = props.direction, labelPosition = props.labelPosition, _d = props.autoFixDotSize, autoFixDotSize = _d === void 0 ? true : _d, rest = __rest(props, ["children", "className", "style", "label", "position", "dot", "dotColor", "dotType", "lineType", "lineColor", "direction", "labelPosition", "autoFixDotSize"]);
    var dotRef = useRef();
    var prefixCls = getPrefixCls('timeline');
    var autoFixSize = function () {
        if (dotRef.current) {
            var dotWidth = dotRef.current.offsetWidth;
            var scale = 16 / dotWidth; // 16 是允许的节点最大宽度。
            if (scale < 1) {
                dotRef.current.style.transform = "translateX(-50%) translateY(-50%) scale(" + scale + ")";
            }
        }
    };
    useEffect(function () {
        autoFixDotSize && autoFixSize();
    }, [props]);
    var labelDom = label && React.createElement("div", { className: prefixCls + "-item-label" }, label);
    return (React.createElement("div", __assign({ ref: ref, role: "listitem" }, rest, { className: cs(prefixCls + "-item", (_a = {},
            _a[prefixCls + "-item-" + direction + "-" + position] = direction,
            _a[prefixCls + "-item-label-" + labelPosition] = labelPosition,
            _a), className), style: style }),
        React.createElement("div", { className: prefixCls + "-item-dot-wrapper" },
            React.createElement("div", { className: prefixCls + "-item-dot-line " + prefixCls + "-item-dot-line-is-" + direction, style: __assign((_b = {}, _b["" + (direction === 'horizontal' ? 'borderTopStyle' : 'borderLeftStyle')] = lineType, _b), (lineColor ? { borderColor: lineColor } : {})) }),
            React.createElement("div", { className: prefixCls + "-item-dot-content" }, dot ? (React.createElement("div", { className: prefixCls + "-item-dot-custom", ref: dotRef }, dot)) : (React.createElement("div", { className: cs(prefixCls + "-item-dot", prefixCls + "-item-dot-" + dotType), style: dotType === 'solid' ? { backgroundColor: dotColor } : { borderColor: dotColor } })))),
        React.createElement("div", { className: prefixCls + "-item-content-wrapper" },
            children && React.createElement("div", { className: prefixCls + "-item-content" }, children),
            labelPosition !== 'relative' && labelDom),
        labelPosition === 'relative' && labelDom));
}
var ForwardRefItem = React.forwardRef(Item);
var TimelineItem = ForwardRefItem;
TimelineItem.displayName = 'TimelineItem';
TimelineItem.isTimelineItem = true;
export default TimelineItem;
