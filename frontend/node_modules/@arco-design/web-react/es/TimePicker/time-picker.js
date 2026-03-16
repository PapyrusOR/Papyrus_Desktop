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
import React, { useContext, useCallback } from 'react';
import { padStart } from '../_util/pad';
import { getColumnsFromFormat } from './util';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import { dayjs, getNow, getDayjsValue, toLocal } from '../_util/dayjs';
import Button from '../Button';
import TimeColumn from './time-column';
import PickerContext from './context';
var AMPM = ['am', 'pm'];
function isUse12Hours(props) {
    var _a;
    return (_a = props.use12Hours) !== null && _a !== void 0 ? _a : getColumnsFromFormat(props.format).use12Hours;
}
function TimePicker(props) {
    var _a = props.format, format = _a === void 0 ? 'HH:mm:ss' : _a, onSelect = props.onSelect, popupVisible = props.popupVisible, _b = props.step, step = _b === void 0 ? {} : _b, disabledHours = props.disabledHours, disabledMinutes = props.disabledMinutes, disabledSeconds = props.disabledSeconds, hideDisabledOptions = props.hideDisabledOptions, onConfirmValue = props.onConfirmValue, isRangePicker = props.isRangePicker, confirmBtnDisabled = props.confirmBtnDisabled, propsValueShow = props.valueShow, setValueShow = props.setValueShow, extra = props.extra, disableConfirm = props.disableConfirm, hideFooter = props.hideFooter, _c = props.showNowBtn, showNowBtn = _c === void 0 ? true : _c, scrollSticky = props.scrollSticky;
    var _d = useContext(ConfigContext), getPrefixCls = _d.getPrefixCls, locale = _d.locale;
    var prefixCls = getPrefixCls('timepicker');
    var _e = useContext(PickerContext), utcOffset = _e.utcOffset, timezone = _e.timezone;
    var valueShow = getDayjsValue(propsValueShow, format);
    var ampm = valueShow && valueShow.hour() >= 12 ? 'pm' : 'am';
    var use12Hours = isUse12Hours(props);
    var getShowList = useCallback(function (type) {
        var stepHour = step.hour || 1;
        var stepMinute = step.minute || 1;
        var stepSecond = step.second || 1;
        var list = [];
        if (type === 'hour') {
            for (var i = 0; i < (use12Hours ? 12 : 24); i += stepHour) {
                list.push(i);
            }
            if (use12Hours) {
                list[0] = 12;
            }
        }
        if (type === 'minute') {
            for (var i = 0; i < 60; i += stepMinute) {
                list.push(i);
            }
        }
        if (type === 'second') {
            for (var i = 0; i < 60; i += stepSecond) {
                list.push(i);
            }
        }
        return list;
    }, [step.hour, step.minute, step.second, use12Hours]);
    var HOURS = getShowList('hour');
    var MINUTES = getShowList('minute');
    var SECONDS = getShowList('second');
    var selectedHour = valueShow && valueShow.hour();
    selectedHour = use12Hours ? (selectedHour > 12 ? selectedHour - 12 : selectedHour) : selectedHour;
    if (use12Hours && selectedHour === 0 && ampm === 'am') {
        selectedHour += 12;
    }
    var selectedMinute = valueShow && valueShow.minute();
    var selectedSecond = valueShow && valueShow.second();
    var getDefaultStr = useCallback(function (type) {
        switch (type) {
            case 'hour':
                return typeof disabledHours === 'function'
                    ? padStart(HOURS.find(function (h) { return disabledHours().indexOf(h) === -1; }) || 0, 2, '0')
                    : padStart(HOURS[0], 2, '0');
            case 'minute':
                return typeof disabledMinutes === 'function'
                    ? padStart(MINUTES.find(function (m) { return disabledMinutes(selectedHour).indexOf(m) === -1; }) || 0, 2, '0')
                    : padStart(MINUTES[0], 2, '0');
            case 'second':
                return typeof disabledSeconds === 'function'
                    ? padStart(SECONDS.find(function (s) { return disabledSeconds(selectedHour, selectedMinute).indexOf(s) === -1; }) || 0, 2, '0')
                    : padStart(SECONDS[0], 2, '0');
            default:
                return '00';
        }
    }, [
        HOURS,
        MINUTES,
        SECONDS,
        disabledHours,
        disabledMinutes,
        disabledSeconds,
        selectedHour,
        selectedMinute,
    ]);
    function onHandleSelect(selectedValue, unit) {
        var _a, _b, _c;
        var isUpperCase = getColumnsFromFormat(format).list.indexOf('A') !== -1;
        var _valueShow = valueShow ||
            dayjs(getDefaultStr('hour') + ":" + getDefaultStr('minute') + ":" + getDefaultStr('second'), 'HH:mm:ss');
        var hour = _valueShow.hour();
        var minute = _valueShow.minute();
        var second = _valueShow.second();
        var selectedAmpm = isUpperCase ? ampm.toUpperCase() : ampm;
        var valueFormat = 'HH:mm:ss';
        var newValue;
        if (use12Hours) {
            if (isUpperCase) {
                valueFormat = valueFormat + " A";
            }
            else {
                valueFormat = valueFormat + " a";
            }
        }
        if (use12Hours) {
            hour = hour > 12 ? hour - 12 : hour;
        }
        if (unit === 'hour') {
            if (typeof disabledMinutes === 'function' &&
                disabledMinutes(selectedValue).includes(minute)) {
                minute = (_a = MINUTES.find(function (m) { return disabledMinutes(selectedValue).indexOf(m) === -1; })) !== null && _a !== void 0 ? _a : 0;
            }
            if (typeof disabledSeconds === 'function' &&
                disabledSeconds(selectedValue, minute).includes(second)) {
                second = (_b = SECONDS.find(function (s) { return disabledSeconds(selectedValue, minute).indexOf(s) === -1; })) !== null && _b !== void 0 ? _b : 0;
            }
            newValue = dayjs(selectedValue + ":" + minute + ":" + second + " " + selectedAmpm, valueFormat, 'en');
        }
        if (unit === 'minute') {
            if (typeof disabledSeconds === 'function' &&
                disabledSeconds(hour, selectedValue).includes(second)) {
                second = (_c = SECONDS.find(function (s) { return disabledSeconds(hour, selectedValue).indexOf(s) === -1; })) !== null && _c !== void 0 ? _c : 0;
            }
            newValue = dayjs(hour + ":" + selectedValue + ":" + second + " " + selectedAmpm, valueFormat, 'en');
        }
        if (unit === 'second') {
            newValue = dayjs(hour + ":" + minute + ":" + selectedValue + " " + selectedAmpm, valueFormat, 'en');
        }
        if (unit === 'ampm') {
            newValue = dayjs(hour + ":" + minute + ":" + second + " " + (isUpperCase ? selectedValue.toUpperCase() : selectedValue), valueFormat, 'en');
        }
        newValue = dayjs(newValue, valueFormat).locale(dayjs.locale());
        onSelect &&
            onSelect(toLocal(newValue, utcOffset, timezone).format(format), toLocal(newValue, utcOffset, timezone));
        if (!isRangePicker) {
            setValueShow && setValueShow(newValue);
            if (disableConfirm) {
                onConfirmValue(newValue);
            }
        }
    }
    function onConfirmTime() {
        if (valueShow) {
            onConfirmValue(valueShow);
        }
    }
    function onSelectNow() {
        var now = getNow();
        var zoneNow = getNow(utcOffset, timezone);
        onSelect && onSelect(now.format(format), now);
        if (disableConfirm) {
            onConfirmValue(zoneNow);
        }
        else {
            setValueShow && setValueShow(zoneNow);
        }
    }
    var baseTimeColumnProps = {
        prefixCls: prefixCls,
        onHandleSelect: onHandleSelect,
        popupVisible: popupVisible,
        scrollSticky: scrollSticky,
    };
    function renderHours() {
        var hours = hideDisabledOptions && typeof disabledHours === 'function'
            ? HOURS.filter(function (h) { return disabledHours().indexOf(h) === -1; })
            : HOURS;
        var list = hours.map(function (h) { return ({
            label: padStart("" + h, 2, '0'),
            value: h,
            selected: selectedHour !== undefined && selectedHour === h,
            disabled: typeof disabledHours === 'function' && disabledHours().indexOf(h) !== -1,
        }); });
        return React.createElement(TimeColumn, __assign({}, baseTimeColumnProps, { list: list, value: selectedHour, unit: "hour" }));
    }
    function renderMinutes() {
        var minutes = hideDisabledOptions && typeof disabledMinutes === 'function'
            ? MINUTES.filter(function (h) { return disabledMinutes(selectedHour).indexOf(h) === -1; })
            : MINUTES;
        var list = minutes.map(function (m) { return ({
            label: padStart("" + m, 2, '0'),
            value: m,
            selected: selectedHour !== undefined && selectedMinute === m,
            disabled: typeof disabledMinutes === 'function' && disabledMinutes(selectedHour).indexOf(m) !== -1,
        }); });
        return React.createElement(TimeColumn, __assign({}, baseTimeColumnProps, { list: list, value: selectedMinute, unit: "minute" }));
    }
    function renderSeconds() {
        var seconds = hideDisabledOptions && typeof disabledSeconds === 'function'
            ? SECONDS.filter(function (h) { return disabledSeconds(selectedHour, selectedMinute).indexOf(h) === -1; })
            : SECONDS;
        var list = seconds.map(function (s) { return ({
            label: padStart("" + s, 2, '0'),
            value: s,
            selected: selectedHour !== undefined && selectedSecond === s,
            disabled: typeof disabledSeconds === 'function' &&
                disabledSeconds(selectedHour, selectedMinute).indexOf(s) !== -1,
        }); });
        return React.createElement(TimeColumn, __assign({}, baseTimeColumnProps, { list: list, value: selectedSecond, unit: "second" }));
    }
    function renderAmPm() {
        var isUpperCase = getColumnsFromFormat(format).list.indexOf('A') !== -1;
        var list = AMPM.map(function (a) { return ({
            label: isUpperCase ? a.toUpperCase() : a,
            value: a,
            selected: ampm === a,
        }); });
        return React.createElement(TimeColumn, __assign({}, baseTimeColumnProps, { list: list, value: ampm, unit: "ampm" }));
    }
    var list = getColumnsFromFormat(format).list;
    var classNames = cs(prefixCls);
    var _hideFooter = hideFooter ||
        (disableConfirm && isRangePicker) ||
        (!isRangePicker && disableConfirm && !showNowBtn);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: classNames },
            (list.indexOf('H') !== -1 || list.indexOf('h') !== -1) && renderHours(),
            list.indexOf('m') !== -1 && renderMinutes(),
            list.indexOf('s') !== -1 && renderSeconds(),
            use12Hours && renderAmPm()),
        extra && React.createElement("div", { className: prefixCls + "-footer-extra-wrapper" }, extra),
        !_hideFooter && (React.createElement("div", { className: prefixCls + "-footer-btn-wrapper" },
            !isRangePicker && showNowBtn ? (React.createElement(Button, { size: "mini", onClick: onSelectNow }, locale.TimePicker.now)) : (React.createElement("div", null)),
            !disableConfirm && (React.createElement(Button, { type: "primary", size: "mini", onClick: onConfirmTime, disabled: confirmBtnDisabled || !valueShow }, locale.TimePicker.ok))))));
}
export default TimePicker;
