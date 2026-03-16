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
export default function IconHover(props) {
    var _a;
    var children = props.children, className = props.className, disabled = props.disabled, prefix = props.prefix, _b = props.size, size = _b === void 0 ? 'default' : _b, rest = __rest(props, ["children", "className", "disabled", "prefix", "size"]);
    var getPrefixCls = useContext(ConfigContext).getPrefixCls;
    var prefixCls = getPrefixCls('icon-hover');
    return (React.createElement("span", __assign({ className: cs(prefixCls, (_a = {},
            _a[prefix + "-icon-hover"] = prefix,
            _a[prefixCls + "-size-" + size] = size && size !== 'default',
            _a[prefixCls + "-disabled"] = disabled,
            _a), className), onClick: props.onClick }, rest), children));
}
