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
import useMergeProps from '../_util/hooks/useMergeProps';
var defaultProps = {
    type: 'horizontal',
    orientation: 'center',
};
function Divider(baseProps, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Divider);
    var children = props.children, style = props.style, className = props.className, type = props.type, orientation = props.orientation, rest = __rest(props, ["children", "style", "className", "type", "orientation"]);
    var prefixCls = getPrefixCls('divider');
    var classNames = cs(prefixCls, prefixCls + "-" + type, (_a = {},
        _a[prefixCls + "-with-text"] = children,
        _a[prefixCls + "-with-text-" + orientation] = children && orientation,
        _a), className);
    return (React.createElement("div", __assign({ role: "separator", ref: ref, className: classNames, style: style }, rest), children && type === 'horizontal' ? (React.createElement("span", { className: prefixCls + "-text " + prefixCls + "-text-" + orientation }, children)) : null));
}
var DividerComponent = forwardRef(Divider);
DividerComponent.displayName = 'Divider';
export default DividerComponent;
