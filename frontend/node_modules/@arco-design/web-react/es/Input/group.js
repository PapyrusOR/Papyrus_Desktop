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
import { ConfigContext } from '../ConfigProvider';
var Group = React.forwardRef(function (props, ref) {
    var _a;
    var getPrefixCls = useContext(ConfigContext).getPrefixCls;
    var className = props.className, style = props.style, children = props.children, compact = props.compact, rest = __rest(props, ["className", "style", "children", "compact"]);
    var prefixCls = getPrefixCls('input-group');
    var classNames = cs(prefixCls, (_a = {},
        _a[prefixCls + "-compact"] = compact,
        _a), className);
    return (React.createElement("div", __assign({ ref: ref, className: classNames, style: style }, rest), children));
});
Group.displayName = 'InputGroup';
export default Group;
