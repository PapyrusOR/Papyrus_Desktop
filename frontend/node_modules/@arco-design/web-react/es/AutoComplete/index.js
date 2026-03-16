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
import React, { useContext, useRef, isValidElement, useState, useImperativeHandle } from 'react';
import cs from '../_util/classNames';
import Input from '../Input';
import { ConfigContext } from '../ConfigProvider';
import useMergeValue from '../_util/hooks/useMergeValue';
import Select from '../Select/select';
import { isSelectOption, isSelectOptGroup } from '../Select/utils';
import { Enter, Esc } from '../_util/keycode';
import omit from '../_util/omit';
import { pickDataAttributes } from '../_util/pick';
import IconLoading from '../../icon/react-icon/IconLoading';
import useMergeProps from '../_util/hooks/useMergeProps';
var IMPOSSIBLE_VALUE = "Autocomplete_" + Math.random();
var Option = Select.Option;
var defaultProps = {
    defaultActiveFirstOption: true,
    triggerElement: React.createElement(Input, null),
};
function AutoComplete(baseProps, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.AutoComplete);
    var style = props.style, className = props.className, children = props.children, data = props.data, defaultValue = props.defaultValue, propValue = props.value, placeholder = props.placeholder, error = props.error, disabled = props.disabled, strict = props.strict, allowClear = props.allowClear, loading = props.loading, defaultActiveFirstOption = props.defaultActiveFirstOption, triggerElement = props.triggerElement, getPopupContainer = props.getPopupContainer, dropdownRender = props.dropdownRender, virtualListProps = props.virtualListProps, onFocus = props.onFocus, onBlur = props.onBlur, onChange = props.onChange, onSearch = props.onSearch, onSelect = props.onSelect, onPressEnter = props.onPressEnter, inputProps = props.inputProps;
    var _c = __read(useMergeValue('', {
        defaultValue: defaultValue,
        value: propValue,
    }), 2), value = _c[0], setValue = _c[1];
    var _d = __read(useState(false), 2), isFocused = _d[0], setIsFocused = _d[1];
    var refInput = useRef(null);
    var refSelect = useRef(null);
    var prefixCls = getPrefixCls('autocomplete');
    var filterOption = 'filterOption' in props
        ? props.filterOption
        : function (inputValue, option) {
            if (strict) {
                return option.props.value.indexOf(inputValue) > -1;
            }
            return option.props.value.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
        };
    var childNodes = React.Children.toArray(children);
    var selectChildren = null;
    if (childNodes.length && (isSelectOption(childNodes[0]) || isSelectOptGroup(childNodes[0]))) {
        selectChildren = children;
    }
    else if (data && data.length) {
        selectChildren = data.map(function (item, index) {
            if (isValidElement(item)) {
                return item;
            }
            if (typeof item === 'string') {
                return (React.createElement(Option, { key: index, value: item }, item));
            }
            if (typeof item === 'object') {
                var _a = item, value_1 = _a.value, name_1 = _a.name;
                return (React.createElement(Option, { key: index, value: value_1, extra: omit(item, ['value', 'name']) }, name_1));
            }
            return null;
        });
    }
    useImperativeHandle(ref, function () { return refInput.current; });
    var usedTriggerElement = typeof triggerElement === 'function' ? triggerElement({ value: value }) : triggerElement;
    var TriggerElement = React.cloneElement(usedTriggerElement, __assign(__assign(__assign({ ref: function (node) {
            refInput.current = node;
            var originRef = usedTriggerElement.ref;
            if (typeof originRef === 'function') {
                originRef(node);
            }
        }, className: cs("" + prefixCls, inputProps && inputProps.className, className), style: style, value: value, placeholder: placeholder, error: error, status: props.status, disabled: disabled, allowClear: allowClear }, inputProps), pickDataAttributes(props)), { 
        // Empty tag to ensure the consistency of the dom structure of input, such that input won't accidentally lose focus due to structure change on input.
        suffix: loading ? (React.createElement(IconLoading, null)) : ((_a = usedTriggerElement === null || usedTriggerElement === void 0 ? void 0 : usedTriggerElement.type) === null || _a === void 0 ? void 0 : _a.displayName) ===
            'Search' ? undefined : ((inputProps === null || inputProps === void 0 ? void 0 : inputProps.suffix) || React.createElement("i", null)), onFocus: function (event) {
            var _a;
            setIsFocused(true);
            onFocus === null || onFocus === void 0 ? void 0 : onFocus(event);
            (_a = inputProps === null || inputProps === void 0 ? void 0 : inputProps.onFocus) === null || _a === void 0 ? void 0 : _a.call(inputProps, event);
        }, onBlur: function (event) {
            var _a;
            setIsFocused(false);
            onBlur === null || onBlur === void 0 ? void 0 : onBlur(event);
            (_a = inputProps === null || inputProps === void 0 ? void 0 : inputProps.onBlur) === null || _a === void 0 ? void 0 : _a.call(inputProps, event);
        }, onKeyDown: function (event) {
            var _a, _b, _c, _d, _e;
            var keyCode = event.keyCode || event.which;
            (_b = (_a = refSelect.current) === null || _a === void 0 ? void 0 : _a.hotkeyHandler) === null || _b === void 0 ? void 0 : _b.call(_a, event);
            if (keyCode === Enter.code && onPressEnter) {
                var activeOption = void 0;
                if (refSelect.current) {
                    activeOption = refSelect.current.getOptionInfoByValue(refSelect.current.activeOptionValue);
                }
                onPressEnter(event, activeOption);
            }
            if (keyCode === Esc.code) {
                (_d = (_c = refInput.current) === null || _c === void 0 ? void 0 : _c.blur) === null || _d === void 0 ? void 0 : _d.call(_c);
            }
            (_e = inputProps === null || inputProps === void 0 ? void 0 : inputProps.onKeyDown) === null || _e === void 0 ? void 0 : _e.call(inputProps, event);
        }, onChange: function (value, event) {
            var _a;
            setValue(value);
            onSearch === null || onSearch === void 0 ? void 0 : onSearch(value);
            onChange === null || onChange === void 0 ? void 0 : onChange(value);
            (_a = inputProps === null || inputProps === void 0 ? void 0 : inputProps.onChange) === null || _a === void 0 ? void 0 : _a.call(inputProps, value, event);
        } }));
    var triggerProps = __assign(__assign({ popupVisible: !!(isFocused && ((data === null || data === void 0 ? void 0 : data.length) || React.Children.count(children))) }, props.triggerProps), { 
        // Other trigger types are not supported yet
        trigger: 'focus', className: [prefixCls + "-popup"].concat(props.triggerProps && props.triggerProps.className) });
    var selectProps = {
        triggerElement: TriggerElement,
        // Guarantee that onChange can always be triggered
        value: IMPOSSIBLE_VALUE,
        inputValue: value,
        defaultActiveFirstOption: defaultActiveFirstOption,
        triggerProps: triggerProps,
        getPopupContainer: getPopupContainer,
        dropdownRender: dropdownRender,
        filterOption: filterOption,
        virtualListProps: virtualListProps,
        notFoundContent: null,
        onChange: function (value, option) {
            var _a, _b;
            setValue(value);
            onChange === null || onChange === void 0 ? void 0 : onChange(value, option);
            value && (onSelect === null || onSelect === void 0 ? void 0 : onSelect(value, option));
            // Blur the input on option change
            (_b = (_a = refInput.current) === null || _a === void 0 ? void 0 : _a.blur) === null || _b === void 0 ? void 0 : _b.call(_a);
        },
    };
    return (React.createElement(Select, __assign({ ref: refSelect }, selectProps), selectChildren));
}
var ForwardRefAutoComplete = React.forwardRef(AutoComplete);
var AutoCompleteComponent = ForwardRefAutoComplete;
AutoCompleteComponent.displayName = 'AutoComplete';
AutoCompleteComponent.Option = Select.Option;
AutoCompleteComponent.OptGroup = Select.OptGroup;
export default AutoCompleteComponent;
