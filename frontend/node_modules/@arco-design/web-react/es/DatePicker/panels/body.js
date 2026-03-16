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
import React, { useContext } from 'react';
import cs from '../../_util/classNames';
import WeekList from './week-list';
import useCellClassName from '../hooks/useCellClassName';
import PickerContext from '../context';
import { isDisabledDate } from '../util';
function Body(props) {
    var prefixCls = props.prefixCls, isWeek = props.isWeek, disabledDate = props.disabledDate, onSelectDate = props.onSelectDate, dateRender = props.dateRender, onMouseEnterCell = props.onMouseEnterCell, onMouseLeaveCell = props.onMouseLeaveCell, CALENDAR_LOCALE = props.CALENDAR_LOCALE, rows = props.rows, showWeekList = props.showWeekList, isSameTime = props.isSameTime, format = props.format, mode = props.mode;
    var _a = useContext(PickerContext), utcOffset = _a.utcOffset, timezone = _a.timezone, weekStart = _a.weekStart;
    var getCellClassName = useCellClassName(__assign(__assign({}, props), { isSameTime: isSameTime }));
    function renderRow(row) {
        return row.map(function (col, index) {
            if (col.time) {
                var disabled_1 = isDisabledDate(col.time, disabledDate, mode);
                var onClickHandler = function () { return !disabled_1 && onSelectDate(col.time.format(format), col.time); };
                return (React.createElement("div", { key: index, className: getCellClassName(col, disabled_1, utcOffset, timezone), onMouseEnter: function () { return onMouseEnterCell && onMouseEnterCell(col.time, disabled_1); }, onMouseLeave: function () { return onMouseLeaveCell && onMouseLeaveCell(col.time, disabled_1); }, onClick: onClickHandler }, dateRender ? (React.cloneElement(dateRender(col.time))) : (React.createElement("div", { className: prefixCls + "-date" },
                    React.createElement("div", { className: prefixCls + "-date-value" }, col.name)))));
            }
            if ('weekOfYear' in col) {
                return (React.createElement("div", { key: index, className: cs(prefixCls + "-cell", prefixCls + "-cell-week") },
                    React.createElement("div", { className: prefixCls + "-date" },
                        React.createElement("div", { className: prefixCls + "-date-value" }, col.weekOfYear))));
            }
        });
    }
    return (React.createElement(React.Fragment, null,
        showWeekList && (React.createElement(WeekList, { prefixCls: prefixCls, weekStart: weekStart, isWeek: isWeek, CALENDAR_LOCALE: CALENDAR_LOCALE })),
        React.createElement("div", { className: prefixCls + "-body" }, rows.map(function (row, index) {
            var _a;
            return (React.createElement("div", { key: index, className: cs(prefixCls + "-row", (_a = {}, _a[prefixCls + "-row-week"] = isWeek, _a)) }, renderRow(row)));
        }))));
}
export default Body;
