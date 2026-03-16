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
import useKeyboardEvent from '../_util/hooks/useKeyboardEvent';
import cs from '../_util/classNames';
import IconClose from '../../icon/react-icon/IconClose';
import IconLoading from '../../icon/react-icon/IconLoading';
import omit from '../_util/omit';
import { ConfigContext } from '../ConfigProvider';
import IconHover from '../_class/icon-hover';
import useMergeProps from '../_util/hooks/useMergeProps';
// 色板里的 12 个颜色
var COLORS = [
    'red',
    'orangered',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'arcoblue',
    'purple',
    'pinkpurple',
    'magenta',
    'gray',
];
var defaultProps = {
    size: 'default',
};
function Tag(baseProps, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var getKeyboardEvents = useKeyboardEvent();
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Tag);
    var className = props.className, style = props.style, children = props.children, color = props.color, closable = props.closable, checkable = props.checkable, defaultChecked = props.defaultChecked, size = props.size, onClose = props.onClose, onCheck = props.onCheck, icon = props.icon, closeIcon = props.closeIcon, bordered = props.bordered, __closeIconProps = props.__closeIconProps, rest = __rest(props, ["className", "style", "children", "color", "closable", "checkable", "defaultChecked", "size", "onClose", "onCheck", "icon", "closeIcon", "bordered", "__closeIconProps"]);
    var prefixCls = getPrefixCls('tag');
    var _c = __read(useState('visible' in props ? props.visible : true), 2), visible = _c[0], setVisible = _c[1];
    var _d = __read(useState('checked' in props ? props.checked : defaultChecked), 2), checked = _d[0], setChecked = _d[1];
    var _e = __read(useState(), 2), loading = _e[0], setLoading = _e[1];
    // controlled
    var mergedChecked = 'checked' in props ? props.checked : checked;
    var mergedVisible = 'visible' in props ? props.visible : visible;
    function onHandleClose(e) {
        var ret = onClose && onClose(e);
        if (ret && ret.then) {
            setLoading(true);
            ret
                .then(function () {
                setLoading(false);
                setVisible(false);
            })
                .catch(function () {
                setLoading(false);
            });
        }
        else {
            setVisible(false);
        }
    }
    function onHandleCheck() {
        var newChecked = !mergedChecked;
        if (!('checked' in props)) {
            setChecked(newChecked);
        }
        onCheck && onCheck(newChecked);
    }
    var _color = color ? (COLORS.indexOf(color) !== -1 ? color : '') : '';
    var _checked = checkable ? mergedChecked : true;
    var classNames = cs(prefixCls, (_a = {},
        _a[prefixCls + "-loading"] = loading,
        _a[prefixCls + "-hide"] = !mergedVisible,
        _a[prefixCls + "-" + _color] = _color,
        _a[prefixCls + "-checkable"] = checkable,
        _a[prefixCls + "-checked"] = _checked,
        _a[prefixCls + "-size-" + size] = size,
        _a[prefixCls + "-bordered"] = bordered,
        _a[prefixCls + "-custom-color"] = _checked && color && !_color,
        _a[prefixCls + "-rtl"] = rtl,
        _a), className);
    var colorStyle = __assign({}, style);
    if (color && !_color && _checked) {
        colorStyle.backgroundColor = color;
        colorStyle.borderColor = color;
    }
    var otherProps = omit(rest, ['visible']);
    if (checkable) {
        otherProps.onClick = onHandleCheck;
    }
    return (React.createElement("div", __assign({ ref: ref, style: colorStyle, className: classNames }, otherProps),
        icon && React.createElement("span", { className: prefixCls + "-icon" }, icon),
        React.createElement("span", { className: prefixCls + "-content" }, children),
        closable && !loading && closeIcon !== null && (React.createElement(IconHover, __assign({ prefix: prefixCls, className: prefixCls + "-close-btn", onClick: onHandleClose, role: "button", tabIndex: 0 }, getKeyboardEvents({ onPressEnter: onHandleClose }), { "aria-label": "Close" }, __closeIconProps), closeIcon !== undefined ? closeIcon : React.createElement(IconClose, null))),
        loading && (React.createElement("span", { className: prefixCls + "-loading-icon" },
            React.createElement(IconLoading, null)))));
}
var TagComponent = forwardRef(Tag);
TagComponent.displayName = 'Tag';
export default TagComponent;
