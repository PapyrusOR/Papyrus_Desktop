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
import React, { useRef, useContext } from 'react';
import cs from '../_util/classNames';
import omit from '../_util/omit';
import { ConfigContext } from '../ConfigProvider';
function TabPane(props, ref) {
    var shouldRender = useRef(false);
    var getPrefixCls = useContext(ConfigContext).getPrefixCls;
    var children = props.children, className = props.className, style = props.style, lazyload = props.lazyload, isActive = props.isActive, rest = __rest(props, ["children", "className", "style", "lazyload", "isActive"]);
    var prefixCls = getPrefixCls('tabs');
    shouldRender.current = lazyload ? shouldRender.current || isActive : true;
    return (shouldRender.current && (React.createElement("div", __assign({ ref: ref }, omit(rest, ['destroyOnHide', 'title', 'closable']), { className: cs(prefixCls + "-pane", className), style: style }), children)));
}
var TabPaneRef = React.forwardRef(TabPane);
TabPaneRef.displayName = 'TabPane';
TabPaneRef.isTabPane = true;
export default TabPaneRef;
