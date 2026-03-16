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
import React from 'react';
import { padStart } from '../_util/pad';
import { dayjs } from '../_util/dayjs';
import Month from './month';
import useCellClassName from './hooks/useCellClassName';
var MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
].map(function (month, index) {
    return {
        name: month,
        value: index,
    };
});
var monthGroup = Array(3);
for (var i = 0; i < 3; i++) {
    monthGroup[i] = MONTHS.slice(i * 4, 4 * (i + 1));
}
var monthGroupPanel = Array(4);
for (var i = 0; i < 4; i++) {
    monthGroupPanel[i] = MONTHS.slice(i * 3, 3 * (i + 1));
}
function Year(props) {
    var prefixCls = props.prefixCls, mergedPageShowDate = props.mergedPageShowDate, panel = props.panel, onMouseEnterCell = props.onMouseEnterCell, disabledDate = props.disabledDate, monthRender = props.monthRender, selectHandler = props.selectHandler, innerMode = props.innerMode, CALENDAR_LOCALE = props.CALENDAR_LOCALE;
    var getCellClassName = useCellClassName(__assign(__assign({}, props), { isSameTime: function (current, target) { return current.isSame(target, 'month'); } }));
    var showYear = mergedPageShowDate.year();
    var mg = panel ? monthGroupPanel : monthGroup;
    return (React.createElement("div", { className: prefixCls + "-year" }, mg.map(function (row, rowIndex) { return (React.createElement("div", { className: prefixCls + "-year-row", key: rowIndex }, row.map(function (col) {
        var time = dayjs(showYear + "-" + padStart(col.value + 1, 2, '0') + "-01");
        var disabled = typeof disabledDate === 'function' && disabledDate(time);
        var divProps = panel ? { onClick: function () { return selectHandler(time, disabled); } } : {};
        return (React.createElement("div", { key: col.value, className: getCellClassName(__assign(__assign({}, col), { time: time }), disabled), onMouseEnter: function () { return onMouseEnterCell && onMouseEnterCell(time, disabled); } }, monthRender ? (React.cloneElement(monthRender(time), divProps)) : panel ? (React.createElement("div", __assign({ className: prefixCls + "-date" }, divProps),
            React.createElement("div", { className: prefixCls + "-date-value" }, CALENDAR_LOCALE.month.short[col.name]))) : (React.createElement("div", { className: prefixCls + "-month-with-days" },
            React.createElement("div", { className: prefixCls + "-month-title" }, CALENDAR_LOCALE.month.long[col.name]),
            React.createElement(Month, __assign({}, props, { cell: true, value: col.value, innerMode: innerMode }))))));
    }))); })));
}
export default Year;
