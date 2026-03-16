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
import Meta from './meta';
import Grid from './grid';
import { ConfigContext } from '../ConfigProvider';
import Spin from '../Spin';
import useMergeProps from '../_util/hooks/useMergeProps';
var defaultProps = {
    size: 'default',
    bordered: true,
};
function Card(baseProps, ref) {
    var _a, _b;
    var _c = useContext(ConfigContext), getPrefixCls = _c.getPrefixCls, loadingElement = _c.loadingElement, componentConfig = _c.componentConfig, rtl = _c.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Card);
    var className = props.className, children = props.children, bordered = props.bordered, loading = props.loading, hoverable = props.hoverable, size = props.size, title = props.title, extra = props.extra, cover = props.cover, actions = props.actions, headerStyle = props.headerStyle, bodyStyle = props.bodyStyle, rest = __rest(props, ["className", "children", "bordered", "loading", "hoverable", "size", "title", "extra", "cover", "actions", "headerStyle", "bodyStyle"]);
    var prefixCls = getPrefixCls('card');
    var actionList = actions && actions.length ? (React.createElement("div", { className: prefixCls + "-actions" },
        React.createElement("div", { className: prefixCls + "-actions-right" }, actions.map(function (action, index) { return (React.createElement("span", { key: "action-" + index, className: prefixCls + "-actions-item" }, action)); })))) : null;
    var isContainGrid = false;
    var isContainMeta = false;
    var handledChildren = React.Children.map(children, function (element) {
        if (element && element.type) {
            if (element.type === Grid) {
                isContainGrid = true;
            }
            else if (element.type === Meta) {
                isContainMeta = true;
                return React.cloneElement(element, { actionList: actionList });
            }
        }
        return element;
    });
    return (React.createElement("div", __assign({}, rest, { ref: ref, className: cs(prefixCls, prefixCls + "-size-" + size, (_a = {},
            _a[prefixCls + "-loading"] = loading,
            _a[prefixCls + "-bordered"] = bordered,
            _a[prefixCls + "-hoverable"] = hoverable,
            _a[prefixCls + "-contain-grid"] = isContainGrid,
            _a[prefixCls + "-rtl"] = rtl,
            _a), className) }),
        title || extra ? (React.createElement("div", { className: cs(prefixCls + "-header", (_b = {}, _b[prefixCls + "-header-no-title"] = !title, _b)), style: headerStyle },
            title && React.createElement("div", { className: prefixCls + "-header-title" }, title),
            extra && React.createElement("div", { className: prefixCls + "-header-extra" }, extra))) : null,
        cover ? React.createElement("div", { className: prefixCls + "-cover" }, cover) : null,
        React.createElement("div", { className: prefixCls + "-body", style: bodyStyle },
            loading ? loadingElement || React.createElement(Spin, null) : handledChildren,
            isContainMeta ? null : actionList)));
}
var ForwardRefCard = React.forwardRef(Card);
var CardComponent = ForwardRefCard;
CardComponent.Meta = Meta;
CardComponent.Grid = Grid;
CardComponent.displayName = 'Card';
export default CardComponent;
