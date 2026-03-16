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
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, isValidElement, } from 'react';
import AnchorContext from './context';
import { ConfigContext } from '../ConfigProvider';
import cs from '../_util/classNames';
import { isString, isObject, isUndefined, isNull } from '../_util/is';
import useMergeProps from '../_util/hooks/useMergeProps';
var DISPLAY_NAME = 'AnchorLink';
var defaultProps = {
    href: '#',
};
function isNamedComponent(type) {
    return isObject(type) && type.hasOwnProperty('displayName');
}
function Link(baseProps, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig;
    var _c = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig['Anchor.Link']), className = _c.className, style = _c.style, href = _c.href, title = _c.title, children = _c.children, rest = __rest(_c, ["className", "style", "href", "title", "children"]);
    var anchorContext = useContext(AnchorContext);
    var currentLink = anchorContext.currentLink, addLink = anchorContext.addLink, removeLink = anchorContext.removeLink, onLinkClick = anchorContext.onLinkClick, direction = anchorContext.direction;
    var prefixCls = getPrefixCls('anchor-link');
    var classNames = cs(prefixCls, (_a = {},
        _a[prefixCls + "-active"] = currentLink === href,
        _a), className);
    var linkRef = useRef(null);
    useImperativeHandle(ref, function () { return linkRef.current; }, []);
    useEffect(function () {
        addLink && addLink(href, linkRef.current);
        return function () {
            removeLink && removeLink(href);
        };
    }, [href]);
    return (React.createElement("div", __assign({ className: classNames, style: style, ref: linkRef }, rest),
        !isUndefined(title) && !isNull(title) && (React.createElement("a", { className: prefixCls + "-title", title: isString(title) ? title : '', href: href, "data-href": href, onClick: function (e) {
                onLinkClick && onLinkClick(e, href);
            } }, title)),
        children &&
            direction !== 'horizontal' &&
            React.Children.map(children, function (item) {
                return (isValidElement(item) &&
                    isNamedComponent(item.type) &&
                    item.type.displayName === DISPLAY_NAME &&
                    item);
            })));
}
var AnchorLinkComponent = forwardRef(Link);
AnchorLinkComponent.displayName = DISPLAY_NAME;
export default AnchorLinkComponent;
