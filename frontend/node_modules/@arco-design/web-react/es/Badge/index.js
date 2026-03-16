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
import React, { useContext, forwardRef } from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import { isObject } from '../_util/is';
import Count from './count';
import useMergeProps from '../_util/hooks/useMergeProps';
import ArcoCSSTransition from '../_util/CSSTransition';
var InnerColors = [
    'red',
    'orangered',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'arcoblue',
    'purple',
    'pinkpurple',
    'magenta',
    'gray',
];
var defaultProps = {
    count: 0,
    maxCount: 99,
};
function Badge(baseProps, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Badge);
    var count = props.count, text = props.text, className = props.className, dotClassName = props.dotClassName, dot = props.dot, maxCount = props.maxCount, color = props.color, propsDotStyle = props.dotStyle, offset = props.offset, style = props.style, status = props.status, children = props.children, restProps = __rest(props, ["count", "text", "className", "dotClassName", "dot", "maxCount", "color", "dotStyle", "offset", "style", "status", "children"]);
    var prefixCls = getPrefixCls('badge');
    var dotStyle = __assign({}, (propsDotStyle || {}));
    var _c = __read(offset || [], 2), leftOffset = _c[0], topOffset = _c[1];
    if (leftOffset) {
        dotStyle.marginRight = -leftOffset;
    }
    if (topOffset) {
        dotStyle.marginTop = topOffset;
    }
    var getDom = function () {
        var _a, _b;
        if (isObject(count)) {
            return (React.createElement("span", { className: cs(prefixCls + "-custom-dot", dotClassName), style: dotStyle }, count));
        }
        var colorStyle = !color || InnerColors.indexOf(color) > -1 ? {} : { backgroundColor: color };
        // display a red dot if color and status are NOT set
        if (text && !color && !status) {
            return (React.createElement("span", { className: cs(prefixCls + "-text", dotClassName), style: dotStyle }, text));
        }
        if (status || (color && typeof count === 'number' && count <= 0)) {
            return (React.createElement("span", { className: prefixCls + "-status-wrapper" },
                React.createElement("span", { className: cs(prefixCls + "-status-dot", (_a = {},
                        _a[prefixCls + "-status-" + status] = status,
                        _a[prefixCls + "-color-" + color] = color,
                        _a), dotClassName), style: __assign(__assign({}, colorStyle), dotStyle) }),
                text && React.createElement("span", { className: prefixCls + "-status-text" }, text)));
        }
        if ((dot || color) && typeof count === 'number' && count > 0) {
            return (React.createElement(ArcoCSSTransition, { classNames: "badge-zoom", in: dot || !!color, timeout: 200, appear: true, mountOnEnter: true, unmountOnExit: true },
                React.createElement("span", { className: cs(prefixCls + "-dot", (_b = {},
                        _b[prefixCls + "-color-" + color] = color,
                        _b), dotClassName), style: __assign(__assign({}, colorStyle), dotStyle) })));
        }
        return (React.createElement(Count, { prefixCls: prefixCls, className: cs(prefixCls + "-number", dotClassName), style: __assign(__assign({}, colorStyle), dotStyle), maxCount: maxCount, count: count }));
    };
    return (React.createElement("span", __assign({ className: cs(prefixCls, (_a = {},
            _a[prefixCls + "-status"] = status,
            _a[prefixCls + "-no-children"] = !children,
            _a[prefixCls + "-rtl"] = rtl,
            _a), className), ref: ref, style: style }, restProps),
        children,
        getDom()));
}
var BadgeComponent = forwardRef(Badge);
BadgeComponent.displayName = 'Badge';
export default BadgeComponent;
