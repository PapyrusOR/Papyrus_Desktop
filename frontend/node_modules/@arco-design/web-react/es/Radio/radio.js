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
import React, { useContext, useRef } from 'react';
import cs from '../_util/classNames';
import Group, { RadioGroupContext } from './group';
import { ConfigContext } from '../ConfigProvider';
import omit from '../_util/omit';
import useMergeValue from '../_util/hooks/useMergeValue';
import IconHover from '../_class/icon-hover';
import useMergeProps from '../_util/hooks/useMergeProps';
import { isFunction, isNullOrUndefined } from '../_util/is';
function Radio(baseProps) {
    var _a;
    var inputRef = useRef(null);
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var props = useMergeProps(baseProps, {}, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Radio);
    var context = useContext(RadioGroupContext);
    var prefixCls = getPrefixCls('radio');
    var mergeProps = __assign({}, props);
    if (context.group) {
        mergeProps.checked = context.value === props.value;
        mergeProps.disabled = 'disabled' in props ? props.disabled : context.disabled;
    }
    var disabled = mergeProps.disabled, children = mergeProps.children, value = mergeProps.value, style = mergeProps.style, className = mergeProps.className, rest = __rest(mergeProps, ["disabled", "children", "value", "style", "className"]);
    var _c = __read(useMergeValue(false, {
        value: mergeProps.checked,
        defaultValue: mergeProps.defaultChecked,
    }), 2), checked = _c[0], setChecked = _c[1];
    var classNames = cs("" + prefixCls + (context.type === 'button' ? '-button' : ''), (_a = {},
        _a[prefixCls + "-checked"] = checked,
        _a[prefixCls + "-disabled"] = disabled,
        _a[prefixCls + "-rtl"] = rtl,
        _a), className);
    var onChange = function (event) {
        var onChange = mergeProps.onChange, value = mergeProps.value;
        if (disabled) {
            return;
        }
        if (context.group) {
            context.onChangeValue && context.onChangeValue(value, event);
        }
        else if (!('checked' in props) && !checked) {
            setChecked(true);
        }
        !checked && onChange && onChange(true, event);
    };
    var onLabelClick = React.useCallback(function (e) {
        if (isFunction(props.children)) {
            // 避免children中含有表单元素造成label无法触发input的onchange的情况
            e.preventDefault();
            inputRef.current && inputRef.current.click();
        }
        rest.onClick && rest.onClick(e);
    }, [props.children, rest.onClick]);
    return (React.createElement("label", __assign({}, omit(rest, ['checked', 'onChange']), { onClick: onLabelClick, style: style, className: classNames }),
        React.createElement("input", __assign({ ref: inputRef, disabled: disabled, value: value || '', type: "radio" }, (context.name ? { name: context.name } : {}), { checked: checked, onChange: function (event) {
                event.persist();
                onChange(event);
            }, onClick: function (e) {
                e.stopPropagation();
            } })),
        isFunction(children) ? (children({ checked: checked })) : context.type === 'radio' ? (React.createElement(React.Fragment, null,
            React.createElement(IconHover, { prefix: prefixCls, className: prefixCls + "-mask-wrapper", disabled: checked || disabled },
                React.createElement("div", { className: prefixCls + "-mask" })),
            !isNullOrUndefined(children) && React.createElement("span", { className: prefixCls + "-text" }, children))) : (context.type === 'button' && React.createElement("span", { className: prefixCls + "-button-inner" }, children))));
}
Radio.__BYTE_RADIO = true;
Radio.displayName = 'Radio';
Radio.Group = Group;
Radio.GroupContext = RadioGroupContext;
export default Radio;
