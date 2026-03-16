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
import React, { useState, useContext, useEffect, useRef, forwardRef } from 'react';
import IconLoading from '../../icon/react-icon/IconLoading';
import Group from './group';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import useMergeProps from '../_util/hooks/useMergeProps';
var regexTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
function processChildren(children) {
    var childrenList = [];
    var isPrevChildPure = false;
    React.Children.forEach(children, function (child) {
        var isCurrentChildPure = typeof child === 'string' || typeof child === 'number';
        if (isCurrentChildPure && isPrevChildPure) {
            var lastIndex = childrenList.length - 1;
            var lastChild = childrenList[lastIndex];
            childrenList[lastIndex] = "" + lastChild + child;
        }
        else {
            childrenList.push(child);
        }
        isPrevChildPure = isCurrentChildPure;
    });
    return React.Children.map(childrenList, function (child) {
        return typeof child === 'string' ? React.createElement("span", null, child) : child;
    });
}
var defaultProps = {
    htmlType: 'button',
    type: 'default',
    shape: 'square',
};
function Button(baseProps, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, ctxSize = _b.size, autoInsertSpaceInButton = _b.autoInsertSpaceInButton, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Button);
    var style = props.style, className = props.className, children = props.children, htmlType = props.htmlType, type = props.type, status = props.status, size = props.size, shape = props.shape, href = props.href, anchorProps = props.anchorProps, disabled = props.disabled, loading = props.loading, loadingFixedWidth = props.loadingFixedWidth, icon = props.icon, iconOnly = props.iconOnly, onClick = props.onClick, long = props.long, rest = __rest(props, ["style", "className", "children", "htmlType", "type", "status", "size", "shape", "href", "anchorProps", "disabled", "loading", "loadingFixedWidth", "icon", "iconOnly", "onClick", "long"]);
    var iconNode = loading ? React.createElement(IconLoading, null) : icon;
    var _c = __read(useState(false), 2), isTwoCNChar = _c[0], setIsTwoCNChar = _c[1];
    var innerButtonRef = useRef();
    var buttonRef = ref || innerButtonRef;
    useEffect(function () {
        if (autoInsertSpaceInButton && buttonRef && buttonRef.current) {
            var textContent = buttonRef.current.textContent;
            if (regexTwoCNChar.test(textContent)) {
                if (!isTwoCNChar) {
                    setIsTwoCNChar(true);
                }
            }
            else if (isTwoCNChar) {
                setIsTwoCNChar(false);
            }
        }
    }, [buttonRef.current, autoInsertSpaceInButton]);
    var prefixCls = getPrefixCls('btn');
    var _type = type === 'default' ? 'secondary' : type;
    var classNames = cs(prefixCls, prefixCls + "-" + _type, prefixCls + "-size-" + (size || ctxSize), prefixCls + "-shape-" + shape, (_a = {},
        _a[prefixCls + "-long"] = long,
        _a[prefixCls + "-status-" + status] = status,
        _a[prefixCls + "-loading-fixed-width"] = loadingFixedWidth,
        _a[prefixCls + "-loading"] = loading,
        _a[prefixCls + "-link"] = href,
        _a[prefixCls + "-icon-only"] = iconOnly || (!children && children !== 0 && iconNode),
        _a[prefixCls + "-disabled"] = disabled,
        _a[prefixCls + "-two-chinese-chars"] = isTwoCNChar,
        _a[prefixCls + "-rtl"] = rtl,
        _a), className);
    var handleClick = function (event) {
        if (loading || disabled) {
            typeof (event === null || event === void 0 ? void 0 : event.preventDefault) === 'function' && event.preventDefault();
            return;
        }
        onClick && onClick(event);
    };
    var InnerContent = (React.createElement(React.Fragment, null,
        iconNode,
        processChildren(children)));
    if (href) {
        var _anchorProps = __assign({}, anchorProps);
        if (disabled) {
            delete _anchorProps.href;
        }
        else {
            _anchorProps.href = href;
        }
        return (React.createElement("a", __assign({ ref: buttonRef }, rest, _anchorProps, { style: style, className: classNames, onClick: handleClick }), InnerContent));
    }
    return (React.createElement("button", __assign({ ref: buttonRef }, rest, { style: style, className: classNames, type: htmlType, disabled: disabled, onClick: handleClick }), InnerContent));
}
var ForwardRefButton = forwardRef(Button);
var ButtonComponent = ForwardRefButton;
ButtonComponent.__BYTE_BUTTON = true;
ButtonComponent.Group = Group;
ButtonComponent.displayName = 'Button';
export default ButtonComponent;
