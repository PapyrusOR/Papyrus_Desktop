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
import React, { useRef, useState, useContext, useEffect } from 'react';
import Input from '../Input';
import { isFunction, isUndefined, isObject } from '../_util/is';
import { ConfigContext } from '../ConfigProvider';
function PageJumper(props) {
    var defaultInputText = props.simple ? props.current : undefined;
    var locale = useContext(ConfigContext).locale;
    var _a = __read(useState(defaultInputText), 2), inputText = _a[0], setInputText = _a[1];
    var inputRef = useRef();
    useEffect(function () {
        if (props.simple) {
            setInputText(props.current);
        }
    }, [props.simple, props.current]);
    var handleChange = function (val) {
        var value = parseInt(val, 10);
        setInputText(isNaN(value) ? undefined : value);
    };
    var handleJump = function () {
        var onPageChange = props.onPageChange, totalPages = props.totalPages, current = props.current, simple = props.simple;
        if (isUndefined(inputText)) {
            return;
        }
        if (inputText === current) {
            if (!simple) {
                setInputText(undefined);
            }
            return;
        }
        var page = isNaN(Number(inputText)) ? current : Number(inputText);
        if (page < 1) {
            page = 1;
        }
        else if (page > totalPages) {
            page = totalPages;
        }
        setInputText(simple ? page : undefined);
        isFunction(onPageChange) && onPageChange(page);
    };
    var onFocus = function () {
        var input = inputRef.current.dom;
        if (String(inputText) && input) {
            input.setSelectionRange(0, String(inputText).length);
        }
    };
    var rootPrefixCls = props.rootPrefixCls, totalPages = props.totalPages, simple = props.simple, size = props.size, disabled = props.disabled;
    var prefixCls = rootPrefixCls + "-jumper";
    var inputConfig = __assign({ showJumper: true }, (isObject(simple) ? simple : {}));
    return (React.createElement("div", { className: "" + prefixCls },
        !simple && React.createElement("span", { className: prefixCls + "-text-goto" }, locale.Pagination.goto),
        inputConfig.showJumper ? (React.createElement(Input, { _ignorePropsFromGlobal: true, ref: function (ref) { return (inputRef.current = ref); }, className: prefixCls + "-input", value: !isUndefined(inputText) ? inputText.toString() : undefined, size: size, disabled: disabled || !totalPages, onChange: handleChange, onPressEnter: handleJump, onFocus: onFocus, onBlur: handleJump })) : (React.createElement("span", null, inputText)),
        !simple && React.createElement("span", { className: prefixCls + "-text-goto-suffix" }, locale.Pagination.page),
        simple && (React.createElement(React.Fragment, null,
            React.createElement("span", { className: prefixCls + "-separator" }, "/"),
            React.createElement("span", null, totalPages)))));
}
export default PageJumper;
