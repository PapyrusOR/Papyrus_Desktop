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
function Meta(props, ref) {
    var _a;
    var className = props.className, title = props.title, avatar = props.avatar, description = props.description, actionList = props.actionList, others = __rest(props, ["className", "title", "avatar", "description", "actionList"]);
    var getPrefixCls = useContext(ConfigContext).getPrefixCls;
    var prefixCls = getPrefixCls('card-meta');
    var classNames = cs(prefixCls, className);
    return (React.createElement("div", __assign({}, others, { ref: ref, className: classNames }),
        title || description ? (React.createElement("div", { className: prefixCls + "-content" },
            title && React.createElement("div", { className: prefixCls + "-title" }, title),
            description && React.createElement("div", { className: prefixCls + "-description" }, description))) : null,
        avatar || actionList ? (React.createElement("div", { className: cs(prefixCls + "-footer ", (_a = {}, _a[prefixCls + "-footer-only-actions"] = !avatar, _a)) },
            avatar ? React.createElement("div", { className: prefixCls + "-avatar" }, avatar) : null,
            actionList)) : null));
}
var MetaComponent = React.forwardRef(Meta);
MetaComponent.displayName = 'CardMeta';
export default MetaComponent;
