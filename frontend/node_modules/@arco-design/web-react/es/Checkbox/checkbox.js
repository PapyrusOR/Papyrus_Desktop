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
import React, { useContext, useCallback, useRef, useEffect } from 'react';
import Group, { CheckboxGroupContext } from './group';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import useCheckbox from './useCheckbox';
import useMergeValue from '../_util/hooks/useMergeValue';
import omit from '../_util/omit';
import Hover from '../_class/icon-hover';
import IconCheck from './icon-check';
import useMergeProps from '../_util/hooks/useMergeProps';
import { isFunction, isNullOrUndefined } from '../_util/is';
function Checkbox(baseProps, ref) {
    var _a;
    var inputRef = useRef(null);
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var props = useMergeProps(baseProps, {}, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Checkbox);
    var context = useContext(CheckboxGroupContext);
    var prefixCls = getPrefixCls('checkbox');
    var onGroupChange = context.onGroupChange;
    var mergeProps = __assign({}, props);
    if (context.isCheckboxGroup) {
        mergeProps.checked = context.checkboxGroupValue.indexOf(props.value) !== -1;
        mergeProps.disabled = 'disabled' in props ? props.disabled : context.disabled;
    }
    var disabled = mergeProps.disabled, children = mergeProps.children, className = mergeProps.className, value = mergeProps.value, style = mergeProps.style, indeterminate = mergeProps.indeterminate, error = mergeProps.error, rest = __rest(mergeProps, ["disabled", "children", "className", "value", "style", "indeterminate", "error"]);
    var _c = __read(useMergeValue(false, {
        value: mergeProps.checked,
        defaultValue: mergeProps.defaultChecked,
    }), 2), checked = _c[0], setChecked = _c[1];
    var classNames = cs(prefixCls, (_a = {},
        _a[prefixCls + "-disabled"] = !!disabled,
        _a[prefixCls + "-indeterminate"] = !!indeterminate,
        _a[prefixCls + "-checked"] = checked,
        _a[prefixCls + "-rtl"] = rtl,
        _a.error = error,
        _a), className);
    useEffect(function () {
        context.registerValue(value);
        return function () {
            context.unRegisterValue(value);
        };
    }, [value]);
    var onChange = useCallback(function (e) {
        e.persist();
        e.stopPropagation();
        setChecked(e.target.checked);
        if (context.isCheckboxGroup) {
            onGroupChange && onGroupChange(props.value, e.target.checked, e);
        }
        props.onChange && props.onChange(e.target.checked, e);
    }, [onGroupChange, context.isCheckboxGroup, props.onChange, props.value]);
    var onLabelClick = React.useCallback(function (e) {
        if (isFunction(props.children)) {
            // 避免children中含有表单元素造成label无法触发input的onchange的情况
            e.preventDefault();
            inputRef.current && inputRef.current.click();
        }
        rest.onClick && rest.onClick(e);
    }, [props.children, rest.onClick]);
    var icon = React.createElement(IconCheck, { className: prefixCls + "-mask-icon" });
    if (mergeProps.icon) {
        if (React.isValidElement(mergeProps.icon)) {
            icon = React.cloneElement(mergeProps.icon, {
                className: prefixCls + "-mask-icon",
            });
        }
        else {
            icon = mergeProps.icon;
        }
    }
    return (React.createElement("label", __assign({ ref: ref, "aria-disabled": disabled }, omit(rest, ['onChange']), { onClick: onLabelClick, className: classNames, style: style }),
        React.createElement("input", { value: value, disabled: !!disabled, ref: inputRef, checked: !!checked, onChange: onChange, 
            // To avoid triggering onChange twice in Select if it's used in Select option.
            onClick: function (e) { return e.stopPropagation(); }, type: "checkbox" }),
        isFunction(children) ? (children({ checked: checked, indeterminate: indeterminate })) : (React.createElement(React.Fragment, null,
            React.createElement(Hover, { prefix: prefixCls, className: prefixCls + "-mask-wrapper", disabled: checked || disabled || indeterminate },
                React.createElement("div", { className: prefixCls + "-mask" }, icon)),
            !isNullOrUndefined(children) && React.createElement("span", { className: prefixCls + "-text" }, children)))));
}
var CheckboxComponent = React.forwardRef(Checkbox);
CheckboxComponent.displayName = 'Checkbox';
CheckboxComponent.Group = Group;
CheckboxComponent.useCheckbox = useCheckbox;
export default CheckboxComponent;
