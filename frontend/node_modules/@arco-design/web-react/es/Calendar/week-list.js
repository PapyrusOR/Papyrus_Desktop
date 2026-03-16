import React from 'react';
function WeekList(props) {
    var prefixCls = props.prefixCls, dayStartOfWeek = props.dayStartOfWeek, isWeek = props.isWeek, CALENDAR_LOCALE = props.CALENDAR_LOCALE, panel = props.panel, innerMode = props.innerMode;
    var weekList = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    if (dayStartOfWeek === 0) {
        weekList.unshift('sunday');
    }
    else {
        weekList.push('sunday');
    }
    if (isWeek) {
        weekList.unshift('self');
    }
    var weekLocale = CALENDAR_LOCALE.week[panel || innerMode === 'year' ? 'short' : 'long'];
    return (React.createElement("div", { className: prefixCls + "-week-list" }, weekList.map(function (w) { return (React.createElement("div", { className: prefixCls + "-week-list-item", key: w }, weekLocale[w])); })));
}
export default WeekList;
