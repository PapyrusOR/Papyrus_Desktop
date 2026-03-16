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
import cs from '../_util/classNames';
import Item from './item';
import { ConfigContext } from '../ConfigProvider';
import Menu from '../Menu';
import IconObliqueLine from '../../icon/react-icon/IconObliqueLine';
import omit from '../_util/omit';
import useMergeProps from '../_util/hooks/useMergeProps';
import { isEmptyReactNode } from '../_util/is';
var defaultItemRender = function (route, routes, paths) {
    if (routes.indexOf(route) === routes.length - 1) {
        return React.createElement("span", null, route.breadcrumbName);
    }
    return React.createElement("a", { href: "#/" + paths.join('/').replace(/^\//, '') }, route.breadcrumbName);
};
var defaultProps = {
    separator: React.createElement(IconObliqueLine, null),
};
function Breadcrumb(baseProps, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Breadcrumb);
    var className = props.className, children = props.children, style = props.style, routes = props.routes, maxCount = props.maxCount, separator = props.separator, rest = __rest(props, ["className", "children", "style", "routes", "maxCount", "separator"]);
    var prefixCls = getPrefixCls('breadcrumb');
    var itemRender = 'itemRender' in props ? props.itemRender : defaultItemRender;
    var Ellipses = (React.createElement("span", { "aria-label": "ellipses of breadcrumb items", className: prefixCls + "-item-ellipses" }, "..."));
    var Separator = (React.createElement("span", { "aria-hidden": true, className: prefixCls + "-item-separator" }, separator));
    var getValidChild = function (itemToRender, delta, index) {
        var SeparatorWithKey = React.cloneElement(Separator, { key: index + "_separator" });
        // Show ellipses
        if (delta > 0) {
            if (index === 0) {
                return [itemToRender, SeparatorWithKey, Ellipses];
            }
            if (index > delta) {
                return [SeparatorWithKey, itemToRender];
            }
            return null;
        }
        return index === 0 ? [itemToRender] : [SeparatorWithKey, itemToRender];
    };
    var getItemsByRoute = function () {
        var paths = [];
        var delta = routes.length - maxCount;
        return routes.map(function (route, index) {
            paths.push((route.path || '').replace(/^\//, ''));
            var droplist = route.children ? (React.createElement(Menu, null, route.children.map(function (item) {
                return (React.createElement(Menu.Item, { key: item.path || item.breadcrumbName }, itemRender(item, routes, paths)));
            }))) : null;
            return getValidChild(React.createElement(Item, { prefixCls: prefixCls, key: route.path || route.breadcrumbName, droplist: droplist }, itemRender(route, routes, paths)), delta, index);
        });
    };
    var getItemsByChildren = function () {
        var _children = [];
        React.Children.forEach(children, function (child) {
            if (!isEmptyReactNode(child)) {
                _children.push(child);
            }
        });
        var delta = _children.length - maxCount;
        return React.Children.map(_children, function (child, index) {
            return getValidChild(React.cloneElement(child, {
                prefixCls: prefixCls,
            }), delta, index);
        });
    };
    return (React.createElement("div", __assign({ role: "list", ref: ref, style: style, className: cs(prefixCls, (_a = {}, _a[prefixCls + "-rtl"] = rtl, _a), className) }, omit(rest, ['itemRender'])), routes && routes.length ? getItemsByRoute() : getItemsByChildren()));
}
var ForwardRefBreadcrumb = forwardRef(Breadcrumb);
var BreadcrumbComponent = ForwardRefBreadcrumb;
BreadcrumbComponent.displayName = 'Breadcrumb';
BreadcrumbComponent.Item = Item;
export default BreadcrumbComponent;
