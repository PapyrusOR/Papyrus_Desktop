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
import React, { useState, useRef, useContext, forwardRef, useEffect } from 'react';
import cs from '../_util/classNames';
import omit from '../_util/omit';
import { ConfigContext } from '../ConfigProvider';
import ResponsiveObserve, { responsiveArray, } from '../_util/responsiveObserve';
import useMergeProps from '../_util/hooks/useMergeProps';
import { RowContext } from './context';
var defaultProps = {
    gutter: 0,
    align: 'start',
    justify: 'start',
};
function Row(baseProps, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig['Grid.Row']);
    var className = props.className, style = props.style, children = props.children, div = props.div, align = props.align, justify = props.justify, gutter = props.gutter, rest = __rest(props, ["className", "style", "children", "div", "align", "justify", "gutter"]);
    var _c = __read(useState({
        xs: true,
        sm: true,
        md: true,
        lg: true,
        xl: true,
        xxl: true,
        xxxl: true,
    }), 2), screens = _c[0], setScreens = _c[1];
    var token = useRef();
    useEffect(function () {
        token.current = ResponsiveObserve.subscribe(function (screens) {
            // Responsive Gutter
            if ((!Array.isArray(gutter) && typeof gutter === 'object') ||
                (Array.isArray(gutter) && (typeof gutter[0] === 'object' || typeof gutter[1] === 'object'))) {
                setScreens(screens);
            }
        });
        return function () {
            ResponsiveObserve.unsubscribe(token.current);
        };
    }, []);
    function getGutter(gutter) {
        var result = 0;
        if (typeof gutter === 'object') {
            for (var i = 0; i < responsiveArray.length; i++) {
                var breakpoint = responsiveArray[i];
                if (screens[breakpoint] && gutter[breakpoint] !== undefined) {
                    result = gutter[breakpoint];
                    break;
                }
            }
        }
        else {
            result = gutter;
        }
        return result;
    }
    var prefixCls = getPrefixCls('row');
    var classNames = cs((_a = {},
        _a["" + prefixCls] = !div,
        _a[prefixCls + "-align-" + align] = align,
        _a[prefixCls + "-justify-" + justify] = justify,
        _a[prefixCls + "-rtl"] = rtl,
        _a), className);
    var marginStyle = {};
    var gutterHorizontal = getGutter(Array.isArray(gutter) ? gutter[0] : gutter);
    var gutterVertical = getGutter(Array.isArray(gutter) ? gutter[1] : 0);
    if ((gutterHorizontal || gutterVertical) && !div) {
        var marginHorizontal = -gutterHorizontal / 2;
        var marginVertical = -gutterVertical / 2;
        if (marginHorizontal) {
            marginStyle.marginLeft = marginHorizontal;
            marginStyle.marginRight = marginHorizontal;
        }
        if (marginVertical) {
            marginStyle.marginTop = marginVertical;
            marginStyle.marginBottom = marginVertical;
        }
    }
    return (React.createElement("div", __assign({ ref: ref }, omit(rest, ['gutter']), { style: __assign(__assign({}, style), marginStyle), className: classNames }),
        React.createElement(RowContext.Provider, { value: { gutter: [gutterHorizontal, gutterVertical], div: div } }, children)));
}
var RowComponent = forwardRef(Row);
RowComponent.displayName = 'Row';
export default RowComponent;
