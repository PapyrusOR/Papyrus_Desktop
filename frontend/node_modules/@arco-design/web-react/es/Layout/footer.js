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
import { ConfigContext } from '../ConfigProvider';
function Footer(props, ref) {
    var className = props.className, children = props.children, rest = __rest(props, ["className", "children"]);
    var getPrefixCls = useContext(ConfigContext).getPrefixCls;
    var prefixCls = getPrefixCls('layout-footer');
    var classNames = cs(prefixCls, className);
    return (React.createElement("footer", __assign({ ref: ref }, rest, { className: classNames }), children));
}
var FooterComponent = forwardRef(Footer);
FooterComponent.displayName = 'LayoutFooter';
export default FooterComponent;
