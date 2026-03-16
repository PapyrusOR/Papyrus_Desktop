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
import React, { forwardRef, useRef, useContext, Fragment } from 'react';
import cs from '../_util/classNames';
import InputComponent from '../Input/input-element';
import { ConfigContext } from '../ConfigProvider';
import useMergeProps from '../_util/hooks/useMergeProps';
import useVerificationCode from '../_hooks/useVerificationCode';
var defaultProps = {
    length: 6,
};
export function VerificationCodeComponent(baseProps, _) {
    var _a;
    var _b;
    var ctx = useContext(ConfigContext);
    var props = useMergeProps(baseProps, defaultProps, (_b = ctx.componentConfig) === null || _b === void 0 ? void 0 : _b.VerificationCode);
    var size = props.size, separator = props.separator, status = props.status, length = props.length, masked = props.masked, disabled = props.disabled;
    var focusEleRefList = useRef([]);
    var _c = useVerificationCode({
        defaultValue: props.defaultValue,
        value: props.value,
        length: length,
        getInputRefList: function () { return focusEleRefList.current; },
        onChange: props.onChange,
        onFinish: props.onFinish,
    }), value = _c.value, filledValue = _c.filledValue, getInputProps = _c.getInputProps;
    var prefix = ctx.getPrefixCls('verification-code');
    var prefixInput = ctx.getPrefixCls('input');
    return (React.createElement("div", { className: cs("" + prefix, props.className, (_a = {},
            _a[prefix + "-rtl"] = ctx.rtl,
            _a)), style: props.style }, filledValue.map(function (v, index) {
        var _a;
        var _b = getInputProps(index), onChange = _b.onChange, onClick = _b.onClick, onPaste = _b.onPaste, onKeyDown = _b.onKeyDown, restInputProps = __rest(_b, ["onChange", "onClick", "onPaste", "onKeyDown"]);
        return (React.createElement(Fragment, { key: index },
            React.createElement(InputComponent, __assign({ disabled: props.disabled, readOnly: props.readOnly, className: cs(prefixInput, prefix + "-input", (_a = {},
                    _a[prefixInput + "-size-" + size] = size,
                    _a[prefixInput + "-" + status] = status,
                    _a[prefixInput + "-disabled"] = disabled,
                    _a[prefixInput + "-rtl"] = ctx.rtl,
                    _a)), ref: function (node) {
                    focusEleRefList.current[index] = node === null || node === void 0 ? void 0 : node.dom;
                } }, restInputProps, { onClick: !props.readOnly ? onClick : undefined, onPaste: !props.readOnly ? onPaste : undefined, onKeyDown: !props.readOnly ? onKeyDown : undefined, onChange: !props.readOnly
                    ? function (inputValue) {
                        if (props.validate) {
                            var result = props === null || props === void 0 ? void 0 : props.validate({ inputValue: inputValue, index: index, value: value });
                            if (result !== false) {
                                onChange(typeof result === 'string' ? result : inputValue);
                            }
                        }
                        else {
                            onChange(inputValue);
                        }
                    }
                    : undefined, type: masked ? 'password' : 'text' })), separator === null || separator === void 0 ? void 0 :
            separator({ index: index, character: v })));
    })));
}
var VerificationCode = forwardRef(VerificationCodeComponent);
export default VerificationCode;
