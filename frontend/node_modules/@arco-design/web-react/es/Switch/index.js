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
import React, { useState, useContext, forwardRef } from 'react';
import { SwitchTransition } from 'react-transition-group';
import cs from '../_util/classNames';
import { isArray, isObject } from '../_util/is';
import omit from '../_util/omit';
import { ConfigContext } from '../ConfigProvider';
import IconLoading from '../../icon/react-icon/IconLoading';
import useMergeProps from '../_util/hooks/useMergeProps';
import ArcoCSSTransition from '../_util/CSSTransition';
var defaultProps = {
    type: 'circle',
};
function Switch(baseProps, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, ctxSize = _b.size, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Switch);
    var className = props.className, children = props.children, _c = props.style, style = _c === void 0 ? {} : _c, disabled = props.disabled, propSize = props.size, loading = props.loading, onChange = props.onChange, type = props.type, checkedText = props.checkedText, uncheckedText = props.uncheckedText, checkedIcon = props.checkedIcon, uncheckedIcon = props.uncheckedIcon, rest = __rest(props, ["className", "children", "style", "disabled", "size", "loading", "onChange", "type", "checkedText", "uncheckedText", "checkedIcon", "uncheckedIcon"]);
    var prefixCls = getPrefixCls('switch');
    var size = propSize || ctxSize;
    var _d = __read(useState(props.defaultChecked), 2), checked = _d[0], setChecked = _d[1];
    var mergedChecked = 'checked' in props ? props.checked : checked;
    var onHandleClick = function (event) {
        if (loading) {
            return;
        }
        props.onClick && props.onClick(event);
        if (!('checked' in props)) {
            setChecked(!mergedChecked);
        }
        onChange && onChange(!mergedChecked, event);
    };
    var classNames = cs(prefixCls, size === 'small' ? prefixCls + "-" + size : undefined, (_a = {},
        _a[prefixCls + "-type-" + type] = type,
        _a[prefixCls + "-checked"] = mergedChecked,
        _a[prefixCls + "-loading"] = loading,
        _a[prefixCls + "-rtl"] = rtl,
        _a), className);
    var checkedElement = checkedText;
    var unCheckedElement = uncheckedText;
    // 支持通过 children 传入 checkedText 和 uncheckedText，不过建议直接使用参数 checkedText 和 uncheckedText
    if (children && isArray(children)) {
        checkedElement = children.find(function (child) { return child.key === 'open'; });
        unCheckedElement = children.find(function (child) { return child.key === 'close'; });
    }
    else if (children && isObject(children)) {
        if (children.key === 'open') {
            checkedElement = children;
        }
        else if (children.key === 'close') {
            unCheckedElement = children;
        }
    }
    var extraProps = omit(rest, ['onChange', 'checked', 'error']);
    return (React.createElement("button", __assign({ ref: ref, role: "switch", "aria-checked": !!mergedChecked, tabIndex: loading ? -1 : undefined }, extraProps, { style: style, className: classNames, disabled: disabled, onClick: onHandleClick, type: "button" }),
        React.createElement("div", { className: prefixCls + "-dot" },
            !loading && (checkedIcon || uncheckedIcon) && (React.createElement(SwitchTransition, null,
                React.createElement(ArcoCSSTransition, { key: mergedChecked ? 'checked' : 'unchecked', classNames: "fadeIn", timeout: 200 },
                    React.createElement("span", { className: prefixCls + "-dot-icon" }, mergedChecked ? checkedIcon : uncheckedIcon)))),
            loading && (React.createElement("span", { className: prefixCls + "-dot-icon" },
                React.createElement(IconLoading, null)))),
        size !== 'small' && type !== 'line' && (checkedElement || unCheckedElement) && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: prefixCls + "-text-holder" },
                checkedElement && mergedChecked && checkedElement,
                unCheckedElement && !mergedChecked && unCheckedElement),
            React.createElement(ArcoCSSTransition, { in: mergedChecked, classNames: "switchSlideText", timeout: 200 },
                React.createElement("div", { className: prefixCls + "-text" },
                    checkedElement && mergedChecked && checkedElement,
                    unCheckedElement && !mergedChecked && unCheckedElement))))));
}
var ForwardRefSwitch = forwardRef(Switch);
var SwitchComponent = ForwardRefSwitch;
SwitchComponent.__BYTE_SWITCH = true;
SwitchComponent.displayName = 'Switch';
export default SwitchComponent;
