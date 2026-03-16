import React from 'react';
function WeekList(props) {
    var prefixCls = props.prefixCls, weekStart = props.weekStart, isWeek = props.isWeek, CALENDAR_LOCALE = props.CALENDAR_LOCALE;
    var weekList = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    weekList = weekList.slice(weekStart).concat(weekList.slice(0, weekStart));
    if (isWeek) {
        weekList.unshift('');
    }
    var weekLocale = CALENDAR_LOCALE.week.short;
    return (React.createElement("div", { className: prefixCls + "-week-list" }, weekList.map(function (w) { return (React.createElement("div", { className: prefixCls + "-week-list-item", key: w }, w && weekLocale[w])); })));
}
export default WeekList;
