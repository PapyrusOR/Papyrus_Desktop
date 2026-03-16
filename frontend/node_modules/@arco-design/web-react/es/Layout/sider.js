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
import React, { forwardRef, useContext, useEffect, createContext, useRef, useMemo, useState, } from 'react';
import cs from '../_util/classNames';
import IconLeft from '../../icon/react-icon/IconLeft';
import IconRight from '../../icon/react-icon/IconRight';
import { ConfigContext } from '../ConfigProvider';
import ResizeBox from '../ResizeBox';
import { isArray, isNumber } from '../_util/is';
import ResponsiveObserve, { responsiveMap } from '../_util/responsiveObserve';
import useMergeValue from '../_util/hooks/useMergeValue';
export var SiderContext = createContext({
    siderCollapsed: false,
    collapsedWidth: 64,
});
var generateId = (function () {
    var i = 0;
    return function (prefix) {
        if (prefix === void 0) { prefix = ''; }
        i += 1;
        return "" + prefix + i;
    };
})();
function Sider(props, ref) {
    var _a;
    var _b;
    var children = props.children, className = props.className, style = props.style, _c = props.theme, theme = _c === void 0 ? 'light' : _c, trigger = props.trigger, reverseArrow = props.reverseArrow, _d = props.collapsedWidth, collapsedWidth = _d === void 0 ? 48 : _d, _e = props.width, width = _e === void 0 ? 200 : _e, collapsible = props.collapsible, resizeDirections = props.resizeDirections, onSiderMount = props.onSiderMount, onSiderUnmount = props.onSiderUnmount, breakpoint = props.breakpoint, onBreakpoint = props.onBreakpoint, onCollapse = props.onCollapse, _f = props.resizeBoxProps, resizeBoxProps = _f === void 0 ? {} : _f;
    var uniqueId = generateId('arco-sider-');
    var getPrefixCls = useContext(ConfigContext).getPrefixCls;
    var prefixCls = getPrefixCls('layout-sider');
    var _g = __read(useMergeValue(false, {
        value: 'collapsed' in props ? props.collapsed : undefined,
        defaultValue: props.defaultCollapsed,
    }), 2), collapsed = _g[0], setCollapsed = _g[1];
    // Parsing props width from number to string, to be used as css property value.
    // Using px as the default unit
    var propsWidth = isNumber(width) ? width + "px" : String(width);
    var _collapsedWidth = isNumber(collapsedWidth) ? "" + collapsedWidth : String(collapsedWidth);
    var _h = __read(useState(collapsed ? _collapsedWidth : propsWidth), 2), siderWidth = _h[0], setSiderWidth = _h[1];
    var refResponsiveHandlerToken = useRef(null);
    // 提供给 ResponsiveHandler，使得其可以获得最新的 state 值
    var refStateForResponsiveHandler = useRef(null);
    refStateForResponsiveHandler.current = {
        breakpoint: breakpoint,
        collapsed: collapsed,
        onCollapse: onCollapse,
        onBreakpoint: onBreakpoint,
    };
    useEffect(function () {
        onSiderMount && onSiderMount(uniqueId);
        if (collapsible && breakpoint in responsiveMap) {
            refResponsiveHandlerToken.current = ResponsiveObserve.subscribe(function (screens, breakpointChecked) {
                var _a = refStateForResponsiveHandler.current, breakpoint = _a.breakpoint, collapsed = _a.collapsed, onCollapse = _a.onCollapse, onBreakpoint = _a.onBreakpoint;
                if (!breakpointChecked || breakpointChecked === breakpoint) {
                    var nextCollapsed = !screens[breakpoint];
                    if (nextCollapsed !== collapsed) {
                        setCollapsed(nextCollapsed);
                        onCollapse && onCollapse(nextCollapsed, 'responsive');
                    }
                    onBreakpoint && onBreakpoint(nextCollapsed);
                }
            });
        }
        return function () {
            onSiderUnmount && onSiderUnmount(uniqueId);
            if (refResponsiveHandlerToken.current) {
                ResponsiveObserve.unsubscribe(refResponsiveHandlerToken.current);
            }
        };
    }, []);
    useEffect(function () {
        // Parsing collapsed width from number to string, to be used as css property value.
        // Using px as the default unit
        var _collapsedWidth = isNumber(collapsedWidth)
            ? collapsedWidth + "px"
            : String(collapsedWidth);
        setSiderWidth(collapsed ? _collapsedWidth : propsWidth);
    }, [collapsed, propsWidth, collapsedWidth]);
    var resizable = (resizeDirections && isArray(resizeDirections)) || ((_b = resizeBoxProps.directions) === null || _b === void 0 ? void 0 : _b.length);
    var TagName = resizable ? ResizeBox : 'aside';
    var renderTrigger = function () {
        var _a;
        var triggerIcon = trigger ||
            (collapsed ? (reverseArrow ? (React.createElement(IconLeft, null)) : (React.createElement(IconRight, null))) : reverseArrow ? (React.createElement(IconRight, null)) : (React.createElement(IconLeft, null)));
        return collapsible && trigger !== null ? (React.createElement("div", { style: { width: siderWidth }, className: cs(prefixCls + "-trigger", (_a = {},
                _a[prefixCls + "-trigger-light"] = theme === 'light',
                _a)), onClick: function () {
                setCollapsed(!collapsed);
                onCollapse && onCollapse(!collapsed, 'clickTrigger');
            } }, triggerIcon)) : null;
    };
    var resizeProps = useMemo(function () {
        if (resizable) {
            return __assign(__assign({ component: 'aside' }, resizeBoxProps), { width: siderWidth, directions: resizeDirections, onMoving: function (event, size) {
                    var _a;
                    setSiderWidth(size.width + "px");
                    (_a = resizeBoxProps === null || resizeBoxProps === void 0 ? void 0 : resizeBoxProps.onMoving) === null || _a === void 0 ? void 0 : _a.call(resizeBoxProps, event, size);
                } });
        }
        return {};
    }, [resizable, resizeDirections, siderWidth, resizeBoxProps]);
    return (React.createElement(SiderContext.Provider, { value: {
            siderCollapsed: collapsed,
            collapsedWidth: collapsedWidth,
        } },
        React.createElement(TagName, __assign({ ref: ref, style: __assign({ width: siderWidth }, style), className: cs(prefixCls, (_a = {},
                _a[prefixCls + "-light"] = theme === 'light',
                _a[prefixCls + "-has-trigger"] = trigger !== null && collapsible,
                _a[prefixCls + "-collapsed"] = collapsed,
                _a), className) }, resizeProps),
            React.createElement("div", { className: prefixCls + "-children" }, children),
            renderTrigger())));
}
var ForwardRefSider = forwardRef(Sider);
var SiderComponent = ForwardRefSider;
SiderComponent.displayName = 'LayoutSider';
SiderComponent.__ARCO_SIGN__ = 'sider';
export default SiderComponent;
