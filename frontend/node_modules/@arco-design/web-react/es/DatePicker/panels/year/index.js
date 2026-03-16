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
import React, { useContext } from 'react';
import merge from 'lodash/merge';
import { dayjs, getNow } from '../../../_util/dayjs';
import cs from '../../../_util/classNames';
import { ConfigContext } from '../../../ConfigProvider';
import Header from '../header';
import Body from '../body';
import { newArray } from '../../../_util/constant';
import PickerContext from '../../context';
function YearPicker(props) {
    var pageShowDate = props.pageShowDate, style = props.style, onMouseEnterCell = props.onMouseEnterCell, onMouseLeaveCell = props.onMouseLeaveCell, dateRender = props.dateRender, disabledDate = props.disabledDate, value = props.value, locale = props.locale, isRangePicker = props.isRangePicker, onSelect = props.onSelect, rangeValues = props.rangeValues, onSuperPrev = props.onSuperPrev, onSuperNext = props.onSuperNext, format = props.format, icons = props.icons, rest = __rest(props, ["pageShowDate", "style", "onMouseEnterCell", "onMouseLeaveCell", "dateRender", "disabledDate", "value", "locale", "isRangePicker", "onSelect", "rangeValues", "onSuperPrev", "onSuperNext", "format", "icons"]);
    var _a = useContext(ConfigContext), globalLocale = _a.locale, getPrefixCls = _a.getPrefixCls, rtl = _a.rtl;
    var DATEPICKER_LOCALE = merge(globalLocale.DatePicker, locale);
    var CALENDAR_LOCALE = DATEPICKER_LOCALE.Calendar;
    var _b = useContext(PickerContext), utcOffset = _b.utcOffset, timezone = _b.timezone;
    var prefixCls = getPrefixCls('panel-year');
    var classNames = cs(prefixCls);
    var bodyProps = isRangePicker ? { rangeValues: rangeValues } : { value: value };
    var showYear = pageShowDate ? pageShowDate.year() : getNow(utcOffset, timezone).year();
    var startYear = Math.floor(showYear / 10) * 10 - 1;
    var groupRow = newArray(3).map(function (_) { return ''; });
    var rows = newArray(4)
        .map(function (_) { return groupRow; })
        .map(function (arr, i) {
        return arr.map(function (_, j) {
            return {
                name: startYear + i * 3 + j,
                time: dayjs("" + (startYear + i * 3 + j), 'YYYY').endOf('year'),
                isPrev: i === 0 && j === 0,
                isNext: i === 3 && j === 2,
            };
        });
    });
    function renderCalendar() {
        return (React.createElement(Body, __assign({}, rest, bodyProps, { prefixCls: getPrefixCls('picker'), rows: rows, onSelectDate: onSelect, isSameTime: function (current, target) { return current.isSame(target, 'year'); }, onMouseEnterCell: onMouseEnterCell, onMouseLeaveCell: onMouseLeaveCell, dateRender: dateRender, disabledDate: disabledDate, CALENDAR_LOCALE: CALENDAR_LOCALE, mode: "year", format: format })));
    }
    var headerOperations = { onSuperPrev: onSuperPrev, onSuperNext: onSuperNext };
    return (React.createElement("div", { className: classNames, style: style },
        React.createElement(Header, __assign({ prefixCls: getPrefixCls('picker'), icons: icons, title: rows[0][1].name + " - " + rows[3][2].name, rtl: rtl }, headerOperations)),
        renderCalendar()));
}
export default YearPicker;
