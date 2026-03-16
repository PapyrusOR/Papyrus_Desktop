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
import React, { useContext } from 'react';
import cs from '../_util/classNames';
import Item from './item';
import { ConfigContext } from '../ConfigProvider';
import Spin from '../Spin';
import useMergeProps from '../_util/hooks/useMergeProps';
var getDefaultPosition = function (position, index, mode, direction) {
    var map = ['left', 'right'];
    if (direction === 'horizontal') {
        map = ['top', 'bottom'];
    }
    var res = mode === 'alternate' ? position || map[index % 2] : mode;
    return map.indexOf(res) > -1 ? res : map[0];
};
var defaultProps = {
    mode: 'left',
    direction: 'vertical',
    pendingDot: React.createElement(Spin, { size: 12 }),
    labelPosition: 'same',
};
function Timeline(baseProps, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig, rtl = _b.rtl;
    if (rtl) {
        defaultProps.mode = 'right';
    }
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Timeline);
    var className = props.className, mode = props.mode, reverse = props.reverse, children = props.children, style = props.style, direction = props.direction, pending = props.pending, labelPosition = props.labelPosition, pendingDot = props.pendingDot, rest = __rest(props, ["className", "mode", "reverse", "children", "style", "direction", "pending", "labelPosition", "pendingDot"]);
    var prefixCls = getPrefixCls('timeline');
    var items = React.Children.map(children, function (child) {
        if (child && child.type && child.type.isTimelineItem) {
            return child;
        }
        return null;
    }) || [];
    if (pending) {
        items.push(React.createElement(Item, { lineType: "dashed", dot: pendingDot }, pending === true ? '' : pending));
    }
    if (reverse) {
        items.reverse();
    }
    return (React.createElement("div", __assign({ role: "list" }, rest, { ref: ref, className: cs(prefixCls, prefixCls + "-" + mode, prefixCls + "-direction-" + direction, (_a = {}, _a[prefixCls + "-rtl"] = rtl, _a), className), style: style }), items.map(function (child, index) {
        var _a;
        if (!child) {
            return null;
        }
        var position = child.props.position;
        var lineType = child.props.lineType;
        if (pending) {
            if (reverse) {
                if (index === 0) {
                    lineType = 'dashed';
                }
            }
            else if (items.length - 2 === index) {
                lineType = 'dashed';
            }
        }
        return React.cloneElement(child, {
            key: index,
            className: cs(child.props.className, (_a = {},
                _a[prefixCls + "-item-last"] = items.length - 1 === index,
                _a)),
            labelPosition: labelPosition,
            position: getDefaultPosition(position, index, mode, direction),
            direction: direction,
            lineType: lineType,
        });
    })));
}
var ForwardRefTimeline = React.forwardRef(Timeline);
var TimelineComponent = ForwardRefTimeline;
TimelineComponent.displayName = 'Timeline';
TimelineComponent.Item = Item;
export default TimelineComponent;
