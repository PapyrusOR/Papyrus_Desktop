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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState, useContext, forwardRef } from 'react';
import get from 'lodash/get';
import cs from '../_util/classNames';
import Sider, { SiderContext } from './sider';
import Header from './header';
import Footer from './footer';
import Content from './content';
import { ConfigContext } from '../ConfigProvider';
import useMergeProps from '../_util/hooks/useMergeProps';
export { SiderContext };
function Layout(baseProps, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig;
    var props = useMergeProps(baseProps, {}, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Layout);
    var className = props.className, hasSider = props.hasSider, children = props.children, rest = __rest(props, ["className", "hasSider", "children"]);
    var _c = __read(useState([]), 2), siders = _c[0], setSiders = _c[1];
    var prefixCls = getPrefixCls('layout');
    var classNames = cs(prefixCls, (_a = {},
        _a[prefixCls + "-has-sider"] = typeof hasSider === 'boolean' ? hasSider : siders.length > 0,
        _a), className);
    return (React.createElement("section", __assign({ ref: ref }, rest, { className: classNames }), React.Children.map(children, function (child) {
        // child?.props?.sign: Compatible with custom components
        var sign = get(child, 'type.__ARCO_SIGN__') || get(child, 'props.sign');
        if (child && sign === 'sider') {
            return React.cloneElement(child, {
                onSiderMount: function (id) { return setSiders(__spreadArray(__spreadArray([], __read(siders), false), [id], false)); },
                onSiderUnmount: function (id) { return setSiders(siders.filter(function (currentId) { return currentId !== id; })); },
            });
        }
        return child;
    })));
}
var ForwardRefLayout = forwardRef(Layout);
var LayoutComponent = ForwardRefLayout;
LayoutComponent.displayName = 'Layout';
LayoutComponent.Sider = Sider;
LayoutComponent.Header = Header;
LayoutComponent.Footer = Footer;
LayoutComponent.Content = Content;
export default LayoutComponent;
