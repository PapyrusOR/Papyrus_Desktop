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
import Meta from './meta';
import { ConfigContext } from '../ConfigProvider';
import cs from '../_util/classNames';
import useMergeProps from '../_util/hooks/useMergeProps';
var defaultProps = {
    actionLayout: 'horizontal',
};
function Item(baseProps, ref) {
    var _a = useContext(ConfigContext), getPrefixCls = _a.getPrefixCls, componentConfig = _a.componentConfig;
    var props = useMergeProps(baseProps, defaultProps, componentConfig && componentConfig['List.Item']);
    var children = props.children, className = props.className, actions = props.actions, extra = props.extra, actionLayout = props.actionLayout, rest = __rest(props, ["children", "className", "actions", "extra", "actionLayout"]);
    var prefixCls = getPrefixCls('list');
    var baseClassName = prefixCls + "-item";
    var metaContent = [];
    var mainContent = [];
    React.Children.forEach(children, function (element) {
        if (element && element.type && element.type === Meta) {
            metaContent.push(element);
        }
        else {
            mainContent.push(element);
        }
    });
    var content = mainContent.length ? (React.createElement("div", { className: baseClassName + "-content" }, mainContent)) : null;
    var extraContent = extra ? (React.createElement("div", { className: baseClassName + "-extra-content" }, extra)) : null;
    var actionsContent = actions && actions.length ? (React.createElement("div", { className: baseClassName + "-action" }, actions.map(function (action, i) { return (React.createElement("li", { key: baseClassName + "-action-" + i }, action)); }))) : null;
    return (React.createElement("div", __assign({ role: "listitem", ref: ref, className: cs(baseClassName, className) }, rest),
        React.createElement("div", { className: baseClassName + "-main" },
            metaContent,
            content,
            actionLayout === 'vertical' ? actionsContent : null),
        actionLayout === 'horizontal' ? actionsContent : null,
        extraContent));
}
var ForwardRefItem = React.forwardRef(Item);
var ItemComponent = ForwardRefItem;
ItemComponent.displayName = 'ListItem';
ItemComponent.Meta = Meta;
export default ItemComponent;
