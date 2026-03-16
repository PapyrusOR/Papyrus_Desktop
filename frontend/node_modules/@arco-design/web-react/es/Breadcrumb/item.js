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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import React, { useState } from 'react';
import { pickDataAttributes } from '../_util/pick';
import cs from '../_util/classNames';
import Dropdown from '../Dropdown';
import IconDown from '../../icon/react-icon/IconDown';
import omit from '../_util/omit';
import { isString } from '../_util/is';
function Item(props) {
    var _a, _b;
    var children = props.children, style = props.style, className = props.className, prefixCls = props.prefixCls, droplist = props.droplist, dropdownProps = props.dropdownProps, href = props.href, onClick = props.onClick, _c = props.tagName, tagName = _c === void 0 ? 'div' : _c, rest = __rest(props, ["children", "style", "className", "prefixCls", "droplist", "dropdownProps", "href", "onClick", "tagName"]);
    var _d = __read(useState(false), 2), dropdownVisible = _d[0], setDropdownVisible = _d[1];
    var TagName = isString(href) ? 'a' : tagName;
    var dom = (React.createElement(TagName, __assign({ href: href, onClick: onClick, role: "listitem", style: style, className: cs(prefixCls + "-item", (_a = {},
            _a[prefixCls + "-item-with-dropdown"] = droplist,
            _a), className) }, pickDataAttributes(rest)),
        children,
        droplist && (React.createElement("span", { "aria-hidden": true, className: cs(prefixCls + "-item-dropdown-icon", (_b = {},
                _b[prefixCls + "-item-dropdown-icon-active"] = dropdownVisible,
                _b)) },
            React.createElement(IconDown, null)))));
    return droplist ? (React.createElement(Dropdown, __assign({ droplist: droplist, onVisibleChange: function (visible) {
            setDropdownVisible(visible);
            dropdownProps && dropdownProps.onVisibleChange && dropdownProps.onVisibleChange(visible);
        } }, omit(dropdownProps, ['onVisibleChange'])), dom)) : (dom);
}
Item.displayName = 'BreadcrumbItem';
export default Item;
