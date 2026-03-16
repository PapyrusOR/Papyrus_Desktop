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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { cloneElement, forwardRef, useContext, useState, useEffect, useMemo, useRef, } from 'react';
import cs from '../_util/classNames';
import { isArray, isFunction, isUndefined, isObject } from '../_util/is';
import Grid from '../Grid';
import { VALIDATE_STATUS, } from './interface';
import Control from './control';
import { FormItemContext as RawFormItemContext, FormContext, FormListContext, } from './context';
import { ConfigContext } from '../ConfigProvider';
import omit from '../_util/omit';
import FormItemLabel from './form-label';
import { formatValidateMsg } from './utils';
import ArcoCSSTransition from '../_util/CSSTransition';
var Row = Grid.Row;
var Col = Grid.Col;
// 错误提示文字
var FormItemTip = function (_a) {
    var _b;
    var prefixCls = _a.prefixCls, help = _a.help, propsErrors = _a.errors, warnings = _a.warnings;
    var errorTip = propsErrors.map(function (item, i) {
        if (item) {
            return (React.createElement("div", { key: i, role: "alert" }, item.message));
        }
    });
    var warningTip = [];
    warnings.map(function (item, i) {
        warningTip.push(React.createElement("div", { key: i, role: "alert", className: prefixCls + "-message-help-warning" }, item));
    });
    var isHelpTip = !isUndefined(help) || !!warningTip.length;
    var visible = isHelpTip || !!errorTip.length;
    return (visible && (React.createElement(ArcoCSSTransition, { in: visible, appear: true, classNames: "formblink", timeout: 300, unmountOnExit: true },
        React.createElement("div", { className: cs(prefixCls + "-message", (_b = {},
                _b[prefixCls + "-message-help"] = isHelpTip,
                _b)) }, !isUndefined(help) ? (help) : (React.createElement(React.Fragment, null,
            errorTip.length > 0 && errorTip,
            warningTip.length > 0 && warningTip))))));
};
var Item = function (props, ref) {
    var _a, _b, _c, _d;
    var _e, _f;
    var _g = useContext(ConfigContext), getPrefixCls = _g.getPrefixCls, prefix = _g.prefixCls;
    var topFormContext = useContext(RawFormItemContext);
    var formListContext = useContext(FormListContext);
    var _h = __read(useState(null), 2), errors = _h[0], setErrors = _h[1];
    var _j = __read(useState(null), 2), warnings = _j[0], setWarnings = _j[1];
    var formContext = useContext(FormContext);
    var prefixCls = formContext.prefixCls || getPrefixCls('form');
    var formLayout = props.layout || formContext.layout;
    var labelAlign = props.labelAlign || formContext.labelAlign;
    var isDestroyed = useRef(false);
    // update error status
    var updateInnerFormItem = function (field, params) {
        if (params === void 0) { params = {}; }
        if (isDestroyed.current) {
            return;
        }
        var _a = params || {}, errors = _a.errors, warnings = _a.warnings;
        setErrors(function (innerErrors) {
            var newErrors = __assign({}, (innerErrors || {}));
            if (errors) {
                newErrors[field] = errors;
            }
            else {
                delete newErrors[field];
            }
            return newErrors;
        });
        setWarnings(function (current) {
            var newVal = __assign({}, (current || {}));
            if (warnings && warnings.length) {
                newVal[field] = warnings;
            }
            else {
                delete newVal[field];
            }
            return newVal;
        });
    };
    var updateFormItem = isObject(props.noStyle) && props.noStyle.showErrorTip && topFormContext.updateFormItem
        ? topFormContext.updateFormItem
        : updateInnerFormItem;
    useEffect(function () {
        isDestroyed.current = false;
        return function () {
            isDestroyed.current = true;
            setErrors(null);
            setWarnings(null);
        };
    }, []);
    var contextProps = __assign(__assign({}, formContext), { validateMessages: formContext.validateMessages &&
            formatValidateMsg(formContext.validateMessages, {
                label: props.label,
            }), prefixCls: prefixCls, updateFormItem: updateFormItem, disabled: 'disabled' in props ? props.disabled : formContext.disabled });
    var label = props.label, extra = props.extra, className = props.className, style = props.style, validateStatus = props.validateStatus, hidden = props.hidden, rest = __rest(props, ["label", "extra", "className", "style", "validateStatus", "hidden"]);
    var labelClassNames = cs(prefixCls + "-label-item", (_a = {},
        _a[prefixCls + "-label-item-left"] = labelAlign === 'left',
        _a));
    var errorInfo = errors ? Object.values(errors) : [];
    var warningInfo = warnings
        ? Object.values(warnings).reduce(function (total, next) { return total.concat(next); }, [])
        : [];
    var itemStatus = useMemo(function () {
        if (validateStatus) {
            return validateStatus;
        }
        if (errorInfo.length) {
            return VALIDATE_STATUS.error;
        }
        if (warningInfo.length) {
            return VALIDATE_STATUS.warning;
        }
        return undefined;
    }, [errors, warnings, validateStatus]);
    var hasHelp = useMemo(function () {
        return !isUndefined(props.help) || warningInfo.length > 0;
    }, [props.help, warnings]);
    var classNames = cs(prefixCls + "-item", (_b = {},
        _b[prefixCls + "-item-error"] = hasHelp || (!validateStatus && itemStatus === VALIDATE_STATUS.error),
        _b[prefixCls + "-item-status-" + itemStatus] = itemStatus,
        _b[prefixCls + "-item-has-help"] = hasHelp,
        _b[prefixCls + "-item-hidden"] = hidden,
        _b[prefixCls + "-item-has-feedback"] = itemStatus && props.hasFeedback,
        _b), prefixCls + "-layout-" + formLayout, className);
    var cloneElementWithDisabled = function () {
        var _a, _b;
        var field = props.field, children = props.children;
        var disabled = 'disabled' in props ? props.disabled : formContext.disabled;
        if (isFunction(children)) {
            return (React.createElement(Control, __assign({ disabled: disabled }, props, (field ? { key: field, _key: field } : {})), function () {
                var rest = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    rest[_i] = arguments[_i];
                }
                return children.apply(void 0, __spreadArray([], __read(rest), false));
            }));
        }
        if (isArray(children)) {
            var childrenDom = React.Children.map(children, function (child, i) {
                var key = (isObject(child) && child.key) || i;
                var existChildDisabled = isObject(child) && 'disabled' in child.props;
                var childProps = !isUndefined(disabled) && !existChildDisabled ? { key: key, disabled: disabled } : { key: key };
                return isObject(child) ? cloneElement(child, childProps) : child;
            });
            return (React.createElement(Control, __assign({}, props, { field: undefined }), childrenDom));
        }
        if (React.Children.count(children) === 1) {
            if (field) {
                var key = ((_a = formListContext === null || formListContext === void 0 ? void 0 : formListContext.getItemKey) === null || _a === void 0 ? void 0 : _a.call(formListContext, field)) || field;
                return (React.createElement(Control, __assign({ disabled: disabled }, props, { key: key, _key: key }), children));
            }
            if (isObject(children)) {
                // Compatible Form.Control
                if ((_b = children.type) === null || _b === void 0 ? void 0 : _b.isFormControl) {
                    return children;
                }
                var existChildDisabled = 'disabled' in children.props;
                var childProps = !existChildDisabled && !isUndefined(disabled) ? { disabled: disabled } : null;
                return (React.createElement(Control, __assign({}, props, { field: undefined }), !childProps ? children : cloneElement(children, childProps)));
            }
        }
        return children;
    };
    var FormItemContext = RawFormItemContext;
    var newFormContext = __assign({}, formContext);
    if (!props.noStyle) {
        newFormContext.wrapperCol = undefined;
        newFormContext.labelCol = undefined;
    }
    return (React.createElement(FormContext.Provider, { value: newFormContext },
        React.createElement(FormItemContext.Provider, { value: contextProps }, props.noStyle ? (cloneElementWithDisabled()) : (React.createElement(Row, __assign({ ref: ref }, omit(rest, [
            'tooltip',
            'children',
            'prefixCls',
            'store',
            'initialValue',
            'field',
            'labelCol',
            'wrapperCol',
            'colon',
            'disabled',
            'rules',
            'trigger',
            'triggerPropName',
            'validateTrigger',
            'noStyle',
            'required',
            'hasFeedback',
            'help',
            'normalize',
            'formatter',
            'getValueFromEvent',
            'shouldUpdate',
            'field',
            'isInner',
            'labelAlign',
            'layout',
            'requiredSymbol',
            'isFormList',
        ]), { className: classNames, div: formLayout !== 'horizontal', style: style }),
            label ? (React.createElement(Col, __assign({}, (props.labelCol || formContext.labelCol), { className: cs(labelClassNames, (_e = props.labelCol) === null || _e === void 0 ? void 0 : _e.className, (_f = formContext.labelCol) === null || _f === void 0 ? void 0 : _f.className, (_c = {},
                    _c[prefixCls + "-label-item-flex"] = !props.labelCol && !formContext.labelCol,
                    _c)) }),
                React.createElement(FormItemLabel, { tooltip: props.tooltip, htmlFor: props.field && formContext.getFormElementId(props.field), label: label, prefix: prefix, requiredSymbol: 'requiredSymbol' in props ? props.requiredSymbol : formContext.requiredSymbol, required: props.required, rules: props.rules, showColon: 'colon' in props ? props.colon : formContext.colon }))) : null,
            React.createElement(Col, __assign({ className: cs(prefixCls + "-item-wrapper", (_d = {},
                    _d[prefixCls + "-item-wrapper-flex"] = !props.wrapperCol && !formContext.wrapperCol,
                    _d)) }, (props.wrapperCol || formContext.wrapperCol)),
                cloneElementWithDisabled(),
                React.createElement(FormItemTip, { prefixCls: prefixCls, help: props.help, errors: errorInfo, warnings: warningInfo }),
                extra && React.createElement("div", { className: prefixCls + "-extra" }, extra)))))));
};
var ItemComponent = forwardRef(Item);
ItemComponent.defaultProps = {
    trigger: 'onChange',
    triggerPropName: 'value',
};
ItemComponent.displayName = 'FormItem';
export default ItemComponent;
