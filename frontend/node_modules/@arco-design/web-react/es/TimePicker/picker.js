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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useContext, useRef, useState } from 'react';
import cs from '../_util/classNames';
import Trigger from '../Trigger';
import { isArray, isDayjs } from '../_util/is';
import { ConfigContext } from '../ConfigProvider';
import { getDayjsValue, getSortedDayjsArray, isDayjsArrayChange, isDayjsChange, isValidTimeString, toLocal, toTimezone, } from '../_util/dayjs';
import IconClockCircle from '../../icon/react-icon/IconClockCircle';
import Input from '../_class/picker/input';
import InputRange from '../_class/picker/input-range';
import useMergeProps from '../_util/hooks/useMergeProps';
import usePrevious from '../_util/hooks/usePrevious';
import useUpdate from '../_util/hooks/useUpdate';
import PickerContext from './context';
import { getFormatTime } from './util';
import { pickDataAttributes } from '../_util/pick';
function getFormat(props) {
    return props.format || 'HH:mm:ss';
}
var defaultProps = {
    allowClear: true,
    position: 'bl',
    format: 'HH:mm:ss',
    editable: true,
    order: true,
    scrollSticky: true,
};
var triggerPopupAlign = { bottom: 4 };
var Picker = function (baseProps) {
    var _a = useContext(ConfigContext), locale = _a.locale, getPrefixCls = _a.getPrefixCls, componentConfig = _a.componentConfig, rtl = _a.rtl;
    if (rtl) {
        defaultProps.position = 'br';
    }
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.TimePicker);
    var _b = props.allowClear, allowClear = _b === void 0 ? true : _b, className = props.className, disableConfirm = props.disableConfirm, style = props.style, placeholder = props.placeholder, getPopupContainer = props.getPopupContainer, disabled = props.disabled, position = props.position, isRangePicker = props.isRangePicker, picker = props.picker, error = props.error, status = props.status, triggerElement = props.triggerElement, triggerProps = props.triggerProps, propsValue = props.value, onChange = props.onChange, icons = props.icons, size = props.size, editable = props.editable, unmountOnExit = props.unmountOnExit, order = props.order, utcOffset = props.utcOffset, timezone = props.timezone;
    var format = getFormat(props);
    var prefixCls = getPrefixCls('timepicker');
    function getDefaultValue() {
        var value;
        if (props.value) {
            value = getDayjsValue(props.value, format, utcOffset, timezone);
        }
        else if (props.defaultValue) {
            value = getDayjsValue(props.defaultValue, format, utcOffset, timezone);
        }
        return value;
    }
    var _c = __read(useState(false), 2), popupVisible = _c[0], setPopupVisible = _c[1];
    var _d = __read(useState(getDefaultValue()), 2), value = _d[0], setValue = _d[1];
    var _e = __read(useState(), 2), valueShow = _e[0], setValueShow = _e[1];
    var _f = __read(useState(), 2), inputValue = _f[0], setInputValue = _f[1];
    var _g = __read(useState(0), 2), focusedInputIndex = _g[0], setFocusedInputIndex = _g[1];
    // controlled mode / uncontrolled mode
    var mergedValue = 'value' in props ? getDayjsValue(propsValue, format, utcOffset, timezone) : value;
    var mergedPopupVisible = 'popupVisible' in props ? props.popupVisible : popupVisible;
    var previousUtcOffset = usePrevious(utcOffset);
    var previousTimezone = usePrevious(timezone);
    // when timezone or utcOffset change changed
    useUpdate(function () {
        if (value && (previousUtcOffset !== utcOffset || timezone !== previousTimezone)) {
            var localValue = isArray(value)
                ? value.map(function (v) { return toLocal(v, previousUtcOffset, previousTimezone); })
                : toLocal(value, previousUtcOffset, previousTimezone);
            var zoneValue = isArray(localValue)
                ? localValue.map(function (v) { return toTimezone(v, utcOffset, timezone); })
                : toTimezone(localValue, utcOffset, timezone);
            setValue(zoneValue);
        }
    }, [utcOffset, previousUtcOffset, timezone, previousTimezone]);
    var refInput = useRef(null);
    function focusInput(index) {
        refInput.current && refInput.current.focus && refInput.current.focus(index);
    }
    function changeFocusedInputIndex(index) {
        setFocusedInputIndex(index);
        setTimeout(function () { return focusInput(index); });
    }
    function onVisibleChange(visible) {
        if (visible) {
            setOpen(visible, function () {
                setTimeout(function () { return focusInput(); });
            });
        }
        else {
            setOpen(false);
        }
    }
    function setOpen(visible, callback) {
        setPopupVisible(visible);
        setInputValue(undefined);
        callback === null || callback === void 0 ? void 0 : callback();
        if (!visible) {
            setValueShow(undefined);
        }
    }
    function onConfirmValue(vs) {
        var newValue = isRangePicker && order && isArray(vs)
            ? getSortedDayjsArray(vs.map(function (v) { return getFormatTime(v); }))
            : vs;
        setValue(newValue);
        setValueShow(undefined);
        setInputValue(undefined);
        onHandleChange(newValue);
        if (!disableConfirm) {
            setOpen(false);
        }
    }
    function onHandleChange(vs) {
        if (isArray(vs) && isDayjsArrayChange(mergedValue, vs)) {
            onChange &&
                onChange(vs.map(function (t) { return toLocal(t, utcOffset, timezone).format(format); }), vs.map(function (t) { return toLocal(t, utcOffset, timezone); }));
        }
        if (isDayjs(vs) && isDayjsChange(mergedValue, vs)) {
            onChange &&
                onChange(toLocal(vs, utcOffset, timezone).format(format), toLocal(vs, utcOffset, timezone));
        }
    }
    function renderPopup(panelOnly) {
        var vs = isRangePicker
            ? isArray(valueShow) && valueShow.length
                ? valueShow
                : mergedValue
            : valueShow || mergedValue;
        return (React.createElement("div", { className: cs(prefixCls + "-container", panelOnly ? className : ''), style: panelOnly ? style : {}, onClick: function () { return focusInput(); } }, React.cloneElement(picker, __assign(__assign({}, props), { format: format, inputValue: inputValue, setInputValue: setInputValue, onConfirmValue: onConfirmValue, setValueShow: setValueShow, valueShow: vs, value: mergedValue, popupVisible: mergedPopupVisible, focusedInputIndex: focusedInputIndex, changeFocusedInputIndex: changeFocusedInputIndex }))));
    }
    function onChangeInput(e) {
        var newInputValue = e.target.value;
        if (!popupVisible) {
            setPopupVisible(true);
        }
        setInputValue(newInputValue);
        confirmInputValue(newInputValue);
    }
    function confirmInputValue(newInputValue) {
        var newInputDayjs = getDayjsValue(newInputValue, format);
        if (isRangePicker) {
            var newValueShow = __spreadArray([], __read((isArray(valueShow) ? valueShow : value || [])), false);
            if (isValidTimeString(newInputValue, format)) {
                newValueShow[focusedInputIndex] = newInputDayjs;
                var localDayjsArray = newValueShow.map(function (nv) { return toLocal(nv, utcOffset, timezone); });
                props.onSelect &&
                    props.onSelect(localDayjsArray.map(function (la) { return la && la.format(format); }), localDayjsArray);
                setValueShow(newValueShow);
                setInputValue(undefined);
            }
        }
        else if (isValidTimeString(newInputValue, format)) {
            var localDayjs = toLocal(newInputDayjs, utcOffset, timezone);
            props.onSelect && props.onSelect(localDayjs.format(format), localDayjs);
            setValueShow(newInputDayjs);
            setInputValue(undefined);
        }
    }
    function onPressEnter() {
        if (isRangePicker) {
            if (isArray(valueShow) && valueShow.length) {
                if (inputValue && !isValidTimeString(inputValue, format)) {
                    setOpen(false);
                }
                else if (valueShow[0] === undefined || valueShow[1] === undefined) {
                    changeFocusedInputIndex(focusedInputIndex === 0 ? 1 : 0);
                }
                else if (valueShow.length === 2) {
                    onConfirmValue(valueShow);
                }
            }
            else {
                setOpen(false);
            }
        }
        else {
            onConfirmValue(valueShow || mergedValue);
        }
    }
    function onClear(e) {
        e.stopPropagation();
        onConfirmValue(undefined);
        onChange && onChange(undefined, undefined);
        props.onClear && props.onClear();
    }
    var rangePickerPlaceholder = isRangePicker && isArray(placeholder) ? placeholder : locale.TimePicker.placeholders;
    var inputPlaceHolder = placeholder || locale.TimePicker.placeholder;
    var suffixIcon = (icons && icons.inputSuffix) || React.createElement(IconClockCircle, null);
    var baseInputProps = __assign({ style: style, className: className, popupVisible: mergedPopupVisible, format: format, disabled: disabled, error: error, status: status, size: size, onPressEnter: onPressEnter, onClear: onClear, suffixIcon: suffixIcon, editable: editable, allowClear: allowClear, prefix: props.prefix }, pickDataAttributes(props));
    return (React.createElement(PickerContext.Provider, { value: { utcOffset: utcOffset, timezone: timezone } }, triggerElement === null ? (renderPopup(true)) : (React.createElement(Trigger, __assign({ popup: function () { return renderPopup(); }, trigger: "click", clickToClose: false, position: position, disabled: disabled, popupAlign: triggerPopupAlign, getPopupContainer: getPopupContainer, onVisibleChange: onVisibleChange, popupVisible: mergedPopupVisible, classNames: "slideDynamicOrigin", unmountOnExit: !!unmountOnExit }, triggerProps), triggerElement ||
        (isRangePicker ? (React.createElement(InputRange, __assign({}, baseInputProps, { ref: refInput, placeholder: rangePickerPlaceholder, value: (isArray(valueShow) && valueShow.length ? valueShow : mergedValue), onChange: onChangeInput, inputValue: inputValue, changeFocusedInputIndex: changeFocusedInputIndex, focusedInputIndex: focusedInputIndex }))) : (React.createElement(Input, __assign({}, baseInputProps, { ref: refInput, placeholder: inputPlaceHolder, value: (valueShow || mergedValue), inputValue: inputValue, onChange: onChangeInput }))))))));
};
export default Picker;
