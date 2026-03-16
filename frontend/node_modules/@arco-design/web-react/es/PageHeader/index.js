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
import React, { useContext, useState, useRef } from 'react';
import omit from '../_util/omit';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import IconLeft from '../../icon/react-icon/IconLeft';
import IconRight from '../../icon/react-icon/IconRight';
import Breadcrumb from '../Breadcrumb';
import IconHover from '../_class/icon-hover';
import ResizeObserver from '../_util/resizeObserver';
import useMergeProps from '../_util/hooks/useMergeProps';
import useKeyboardEvent from '../_util/hooks/useKeyboardEvent';
function PageHeader(baseProps) {
    var _a, _b;
    var _c = useContext(ConfigContext), getPrefixCls = _c.getPrefixCls, componentConfig = _c.componentConfig, rtl = _c.rtl;
    var props = useMergeProps(baseProps, {}, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.PageHeader);
    var title = props.title, subTitle = props.subTitle, extra = props.extra, children = props.children, backIcon = props.backIcon, footer = props.footer, breadcrumb = props.breadcrumb, rest = __rest(props, ["title", "subTitle", "extra", "children", "backIcon", "footer", "breadcrumb"]);
    var getKeyboardEvents = useKeyboardEvent();
    var _d = __read(useState(false), 2), pageWrap = _d[0], setPageWrap = _d[1];
    var pageRef = useRef();
    var prefixCls = getPrefixCls('page-header');
    return (React.createElement(ResizeObserver, { onResize: function () {
            if (pageRef.current) {
                setPageWrap(pageRef.current.offsetWidth < 768);
            }
        }, getTargetDOMNode: function () { return pageRef.current; } },
        React.createElement("div", __assign({}, omit(rest, ['onBack']), { ref: pageRef, className: cs("" + prefixCls, (_a = {},
                _a[prefixCls + "-with-breadcrumb"] = breadcrumb,
                _a[prefixCls + "-with-content"] = children,
                _a[prefixCls + "-with-footer"] = footer,
                _a[prefixCls + "-wrap"] = pageWrap,
                _a[prefixCls + "-rtl"] = rtl,
                _a), props.className), style: props.style }),
            React.createElement("div", { className: prefixCls + "-head-wrapper" },
                breadcrumb && React.createElement(Breadcrumb, __assign({}, breadcrumb)),
                React.createElement("div", { className: prefixCls + "-head" },
                    React.createElement("div", { className: cs(prefixCls + "-head-main", (_b = {},
                            _b[prefixCls + "-head-main-with-back"] = backIcon,
                            _b)) },
                        backIcon && (React.createElement(IconHover, __assign({ prefix: prefixCls, tabIndex: 0, role: "button", className: prefixCls + "-back", onClick: props.onBack }, getKeyboardEvents({
                            onPressEnter: props.onBack,
                        })),
                            React.createElement("span", { className: prefixCls + "-back-icon" }, backIcon === true ? rtl ? React.createElement(IconRight, null) : React.createElement(IconLeft, null) : backIcon))),
                        title && React.createElement("div", { className: prefixCls + "-title" }, title),
                        subTitle && (React.createElement(React.Fragment, null,
                            React.createElement("div", { className: prefixCls + "-divider" }),
                            React.createElement("div", { className: prefixCls + "-sub-title" }, subTitle)))),
                    extra && React.createElement("div", { className: prefixCls + "-head-extra" }, extra))),
            children && React.createElement("div", { className: prefixCls + "-content" }, children),
            footer && React.createElement("div", { className: prefixCls + "-footer" }, footer))));
}
PageHeader.displayName = 'PageHeader';
export default PageHeader;
