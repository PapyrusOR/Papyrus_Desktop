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
import React, { useMemo, useContext } from 'react';
import merge from 'lodash/merge';
import cs from '../../../_util/classNames';
import { isObject } from '../../../_util/is';
import { getTimeFormat, methods, getDayjsValue } from '../../../_util/dayjs';
import { ConfigContext } from '../../../ConfigProvider';
import TimePicker from '../../../TimePicker/time-picker';
import Header from '../header';
import Body from '../body';
import MonthPanel from '../month';
import YearPanel from '../year';
import { newArray } from '../../../_util/constant';
import PickerContext from '../../context';
var allDaysInOnePage = 6 * 7;
var getReturn = function (time) {
    return {
        year: time.year(),
        month: time.month() + 1,
        day: time.day(),
        name: time.date(),
        time: time,
    };
};
var getTimeObj = function (time) {
    return __assign(__assign({}, getReturn(methods.startOf(time, 'month'))), { days: time.daysInMonth() });
};
function getAllDaysByTime(props, time) {
    var dayStartOfWeek = props.dayStartOfWeek, isWeek = props.isWeek;
    var current = getTimeObj(time);
    var flatRows = newArray(allDaysInOnePage).map(function () { return ({}); });
    var startIndex = current.day - dayStartOfWeek < 0
        ? 7 + (current.day - dayStartOfWeek)
        : current.day - dayStartOfWeek;
    flatRows[startIndex] = __assign({}, current);
    // pre
    for (var i = 0; i < startIndex; i++) {
        flatRows[startIndex - i - 1] = __assign(__assign({}, getReturn(methods.subtract(current.time, i + 1, 'day'))), { isPrev: true });
    }
    // next
    for (var i = 0; i < allDaysInOnePage - startIndex - 1; i++) {
        flatRows[startIndex + i + 1] = __assign(__assign({}, getReturn(methods.add(current.time, i + 1, 'day'))), { isNext: i >= current.days - 1 });
    }
    var rows = newArray(6).map(function () { return []; });
    for (var i = 0; i < 6; i++) {
        rows[i] = flatRows.slice(i * 7, 7 * (i + 1));
        if (isWeek) {
            var weekTime = rows[i][0].time;
            var weekRows = __spreadArray([], __read(rows[i]), false);
            rows[i].unshift({
                weekRows: weekRows,
                weekOfYear: weekTime.week(),
            });
        }
    }
    return rows;
}
function DatePicker(props) {
    var isWeek = props.isWeek, popupVisible = props.popupVisible, format = props.format, pageShowDate = props.pageShowDate, showTime = props.showTime, style = props.style, timepickerProps = props.timepickerProps, onMouseEnterCell = props.onMouseEnterCell, onMouseLeaveCell = props.onMouseLeaveCell, dateRender = props.dateRender, disabledDate = props.disabledDate, disabledTime = props.disabledTime, value = props.value, rangeValues = props.rangeValues, locale = props.locale, isRangePicker = props.isRangePicker, onSelect = props.onSelect, onTimePickerSelect = props.onTimePickerSelect, onPrev = props.onPrev, onNext = props.onNext, onSuperPrev = props.onSuperPrev, onSuperNext = props.onSuperNext, isSameTime = props.isSameTime, index = props.index, getHeaderOperations = props.getHeaderOperations, setPageShowDate = props.setPageShowDate, timeValue = props.timeValue, hideNotInViewDates = props.hideNotInViewDates, icons = props.icons, isTimePanel = props.isTimePanel, panelMode = props.panelMode, setPanelMode = props.setPanelMode, rest = __rest(props, ["isWeek", "popupVisible", "format", "pageShowDate", "showTime", "style", "timepickerProps", "onMouseEnterCell", "onMouseLeaveCell", "dateRender", "disabledDate", "disabledTime", "value", "rangeValues", "locale", "isRangePicker", "onSelect", "onTimePickerSelect", "onPrev", "onNext", "onSuperPrev", "onSuperNext", "isSameTime", "index", "getHeaderOperations", "setPageShowDate", "timeValue", "hideNotInViewDates", "icons", "isTimePanel", "panelMode", "setPanelMode"]);
    var _a = useContext(ConfigContext), globalLocale = _a.locale, getPrefixCls = _a.getPrefixCls, rtl = _a.rtl;
    var _b = useContext(PickerContext), utcOffset = _b.utcOffset, timezone = _b.timezone, weekStart = _b.weekStart;
    var DATEPICKER_LOCALE = merge(globalLocale.DatePicker, locale);
    var prefixCls = getPrefixCls(isWeek ? 'panel-week' : 'panel-date');
    var classNames = cs(prefixCls);
    var bodyProps = isRangePicker ? { rangeValues: rangeValues } : { value: value };
    var timeFormat = (isObject(showTime) && showTime.format) || getTimeFormat(format);
    var dayjsLocale = globalLocale.dayjsLocale;
    // page data list
    var rows = useMemo(function () {
        return getAllDaysByTime(__assign(__assign({}, props), { dayStartOfWeek: weekStart }), pageShowDate.locale(dayjsLocale));
    }, [pageShowDate.toString(), weekStart, dayjsLocale]);
    var disabledTimeProps;
    if (isRangePicker) {
        disabledTimeProps =
            typeof disabledTime === 'function'
                ? disabledTime(rangeValues[index], index === 0 ? 'start' : 'end')
                : {};
    }
    else {
        disabledTimeProps =
            typeof disabledTime === 'function' ? disabledTime(getDayjsValue(value, format)) : {};
    }
    function renderCalendar() {
        return (React.createElement(Body, __assign({}, rest, bodyProps, { showWeekList: true, isWeek: isWeek, prefixCls: getPrefixCls('picker'), rows: rows, isSameTime: isSameTime || (function (current, target) { return current.isSame(target, 'day'); }), onSelectDate: onSelect, onMouseEnterCell: onMouseEnterCell, onMouseLeaveCell: onMouseLeaveCell, dateRender: dateRender, disabledDate: disabledDate, CALENDAR_LOCALE: DATEPICKER_LOCALE.Calendar, mode: isWeek ? 'week' : 'date', format: format, hideNotInViewDates: hideNotInViewDates })));
    }
    function renderTimePicker() {
        var showTimeProps = isObject(showTime) ? showTime : {};
        return (React.createElement("div", { className: prefixCls + "-timepicker" },
            React.createElement("header", { className: prefixCls + "-timepicker-title" }, DATEPICKER_LOCALE.selectTime),
            React.createElement(TimePicker, __assign({}, timepickerProps, showTimeProps, disabledTimeProps, { hideFooter: true, format: timeFormat, valueShow: timeValue.format(timeFormat), onSelect: onTimePickerSelect, onConfirmValue: props.onConfirmValue, popupVisible: popupVisible, utcOffset: utcOffset, timezone: timezone }))));
    }
    var headerOperations = { onPrev: onPrev, onSuperPrev: onSuperPrev, onNext: onNext, onSuperNext: onSuperNext, DATEPICKER_LOCALE: DATEPICKER_LOCALE };
    function onChangePanel(mode) {
        setPanelMode(mode);
    }
    if (panelMode === 'year') {
        return (React.createElement(YearPanel, __assign({}, getHeaderOperations(panelMode), { pageShowDate: pageShowDate, onSelect: function (_, date) {
                setPanelMode('month');
                setPageShowDate(date);
            }, disabledDate: disabledDate })));
    }
    if (panelMode === 'month') {
        return (React.createElement(MonthPanel, __assign({}, getHeaderOperations(panelMode), { setPageShowDate: setPageShowDate, pageShowDate: pageShowDate, panelMode: panelMode, getHeaderOperations: getHeaderOperations, onSelect: function (_, date) {
                setPanelMode('date');
                setPageShowDate(date);
            }, disabledDate: disabledDate, setPanelMode: setPanelMode })));
    }
    return (React.createElement("div", { className: classNames, style: style }, showTime && isTimePanel ? (renderTimePicker()) : (React.createElement("div", { className: prefixCls + "-inner" },
        React.createElement(Header, __assign({}, headerOperations, { icons: icons, prefixCls: getPrefixCls('picker'), value: pageShowDate, mode: panelMode, onChangePanel: onChangePanel, rtl: rtl })),
        renderCalendar()))));
}
export default DatePicker;
