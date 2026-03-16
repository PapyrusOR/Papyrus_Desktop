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
import React from 'react';
import cs from '../_util/classNames';
import Checkbox from '../Checkbox';
import omit from '../_util/omit';
function Option(props, ref) {
    var _a, _b;
    var style = props.style, className = props.className, wrapperClassName = props.wrapperClassName, disabled = props.disabled, prefixCls = props.prefixCls, rtl = props.rtl, propValue = props.value, propChildren = props.children, _isMultipleMode = props._isMultipleMode, _isUserCreatedOption = props._isUserCreatedOption, _isUserCreatingOption = props._isUserCreatingOption, _valueActive = props._valueActive, _valueSelect = props._valueSelect, _onMouseEnter = props._onMouseEnter, _onMouseLeave = props._onMouseLeave, _onClick = props._onClick, rest = __rest(props, ["style", "className", "wrapperClassName", "disabled", "prefixCls", "rtl", "value", "children", "_isMultipleMode", "_isUserCreatedOption", "_isUserCreatingOption", "_valueActive", "_valueSelect", "_onMouseEnter", "_onMouseLeave", "_onClick"]);
    var value = 'value' in props ? propValue : "" + propChildren;
    var childNode = 'children' in props ? propChildren : "" + propValue;
    var isChecked = _isMultipleMode
        ? _valueSelect.indexOf(value) !== -1
        : _valueSelect === value;
    var optionLabelProps = __assign({ style: style, className: cs(prefixCls + "-option", (_a = {},
            _a[prefixCls + "-option-selected"] = isChecked,
            _a[prefixCls + "-option-disabled"] = disabled,
            _a[prefixCls + "-option-hover"] = value === _valueActive,
            _a[prefixCls + "-option-empty"] = (!childNode && childNode !== 0) ||
                (typeof childNode === 'string' && /^\s*$/.test(childNode)),
            _a[prefixCls + "-option-rtl"] = rtl,
            _a), className), onMouseEnter: function (event) {
            _onMouseEnter && _onMouseEnter(value);
            rest.onMouseEnter && rest.onMouseEnter(event);
        }, onMouseLeave: function (event) {
            _onMouseLeave === null || _onMouseLeave === void 0 ? void 0 : _onMouseLeave();
            rest.onMouseLeave && rest.onMouseLeave(event);
        }, onClick: function (event) {
            _onClick && _onClick(value, disabled);
            rest.onClick && rest.onClick(event);
        } }, omit(rest, ['_key', 'extra', 'isSelectOption', 'onClick', 'onMouseEnter', 'onMouseLeave']));
    var wrapperProps = {
        ref: ref,
        role: 'option',
        'aria-selected': isChecked,
    };
    // Mark the option that created/creating by user self
    _isUserCreatedOption && Object.assign(wrapperProps, { 'data-user-created': true });
    _isUserCreatingOption && Object.assign(wrapperProps, { 'data-user-creating': true });
    if (_isMultipleMode) {
        return (React.createElement("li", __assign({}, wrapperProps, { className: cs(prefixCls + "-option-wrapper", (_b = {},
                _b[prefixCls + "-option-wrapper-selected"] = isChecked,
                _b[prefixCls + "-option-wrapper-disabled"] = disabled,
                _b), wrapperClassName) }),
            React.createElement(Checkbox, { "aria-hidden": "true", className: prefixCls + "-checkbox", checked: isChecked, disabled: disabled, onChange: optionLabelProps.onClick }),
            React.createElement("span", __assign({}, optionLabelProps), childNode)));
    }
    return (React.createElement("li", __assign({}, wrapperProps, optionLabelProps), childNode));
}
var ForwordRefOption = React.forwardRef(Option);
var OptionComponent = ForwordRefOption;
OptionComponent.__ARCO_SELECT_OPTION__ = true;
export default OptionComponent;
