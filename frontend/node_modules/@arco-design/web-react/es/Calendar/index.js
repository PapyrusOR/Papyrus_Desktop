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
import React, { useState, useContext, useMemo } from 'react';
import merge from 'lodash/merge';
import { ConfigContext } from '../ConfigProvider';
import cs from '../_util/classNames';
import Month, { getAllDaysByTime } from './month';
import Year from './year';
import Header from './header/header';
import PanelHeader from './header/panel-header';
import useMergeProps from '../_util/hooks/useMergeProps';
import { getDayjsValue, getNow, methods } from '../_util/dayjs';
import { pickDataAttributes } from '../_util/pick';
function getFormat(mode, panel) {
    return mode === 'month' || (mode === 'year' && !panel) ? 'YYYY-MM-DD' : 'YYYY-MM';
}
var defaultProps = {
    dayStartOfWeek: 0,
    panelWidth: 265,
    defaultMode: 'month',
    headerType: 'button',
    modes: ['month', 'year'],
};
function Calendar(baseProps) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, globalLocale = _b.locale, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Calendar);
    var style = props.style, className = props.className, dayStartOfWeek = props.dayStartOfWeek, panel = props.panel, locale = props.locale, panelWidth = props.panelWidth, panelTodayBtn = props.panelTodayBtn, defaultPageShowDate = props.defaultPageShowDate, propsValue = props.value, propsPageShowDate = props.pageShowDate, defaultValue = props.defaultValue, propsMode = props.mode, defaultMode = props.defaultMode, onChange = props.onChange, onPanelChange = props.onPanelChange, headerRender = props.headerRender, headerType = props.headerType, modes = props.modes, panelOperations = props.panelOperations;
    var CALENDAR_LOCALE = merge(globalLocale.Calendar, locale);
    var prefixCls = getPrefixCls('calendar');
    var _c = __read(useState(propsMode || defaultMode), 2), mode = _c[0], setMode = _c[1];
    var innerMode = propsMode || mode;
    var format = getFormat(innerMode, panel);
    var _d = __read(useState(getDayjsValue(propsValue || defaultValue, format)), 2), value = _d[0], setValue = _d[1];
    var _e = __read(useState(getDayjsValue(defaultPageShowDate, format) || value || getNow()), 2), pageShowDate = _e[0], setPageShowDate = _e[1];
    var mergedPageShowDate = (getDayjsValue(propsPageShowDate, format) || pageShowDate);
    var mergedValue = 'value' in props ? getDayjsValue(propsValue, format) : value;
    // page data list
    var pageData = useMemo(function () {
        return getAllDaysByTime(props, mergedPageShowDate);
    }, [mergedPageShowDate.toString(), innerMode, dayStartOfWeek]);
    // value / pageShowDate / pageData
    function move(time) {
        setValue(time);
        onChange && onChange(time);
        onChangePageDate(time);
    }
    function onChangePageDate(time) {
        setPageShowDate(time);
        onPanelChange && onPanelChange(time);
    }
    function selectHandler(time, disabled) {
        if (!disabled) {
            move(time);
        }
    }
    var headerValueFormat = '';
    if (innerMode === 'month') {
        headerValueFormat = CALENDAR_LOCALE.formatMonth;
    }
    else if (innerMode === 'year') {
        headerValueFormat = CALENDAR_LOCALE.formatYear;
    }
    function changePageShowDate(type, unit) {
        var newPageShowDate;
        if (type === 'prev') {
            newPageShowDate = methods.subtract(mergedPageShowDate, 1, unit);
        }
        if (type === 'next') {
            newPageShowDate = methods.add(mergedPageShowDate, 1, unit);
        }
        setPageShowDate(newPageShowDate);
        onPanelChange && onPanelChange(newPageShowDate);
    }
    function onChangeYear(year) {
        var newValue = methods.set(mergedPageShowDate, 'year', year);
        setPageShowDate(newValue);
        onPanelChange && onPanelChange(newValue);
    }
    function onChangeMonth(month) {
        var newValue = methods.set(mergedPageShowDate, 'month', month - 1);
        setPageShowDate(newValue);
        onPanelChange && onPanelChange(newValue);
    }
    function changeMode(mode) {
        setMode(mode);
    }
    var classNames = cs(prefixCls, innerMode === 'month' ? prefixCls + "-mode-month" : prefixCls + "-mode-year", (_a = {},
        _a[prefixCls + "-panel"] = panel && (innerMode === 'month' || innerMode === 'year'),
        _a[prefixCls + "-rtl"] = rtl,
        _a), className);
    var baseStyle = panel ? { width: panelWidth } : {};
    var baseHeaderProps = {
        prefixCls: prefixCls,
        changePageShowDate: changePageShowDate,
        headerValueFormat: headerValueFormat,
        mergedPageShowDate: mergedPageShowDate,
        modes: modes,
        innerMode: innerMode,
        panelOperations: panelOperations,
    };
    return (React.createElement("div", __assign({ className: classNames, style: __assign(__assign({}, style), baseStyle) }, pickDataAttributes(props)),
        typeof headerRender === 'function' ? (headerRender({
            value: mergedValue,
            pageShowDate: mergedPageShowDate,
            onChangeMode: changeMode,
            onChange: move,
            onChangePageDate: onChangePageDate,
        })) : panel ? (React.createElement(PanelHeader, __assign({}, baseHeaderProps))) : (React.createElement(Header, __assign({}, baseHeaderProps, { CALENDAR_LOCALE: CALENDAR_LOCALE, move: move, innerMode: innerMode, changeMode: changeMode, onChangeYear: onChangeYear, onChangeMonth: onChangeMonth, headerType: headerType }))),
        innerMode === 'month' && (React.createElement("div", { className: prefixCls + "-body" },
            React.createElement(Month, __assign({}, props, { prefixCls: prefixCls, pageData: pageData, mergedValue: mergedValue, innerMode: innerMode, selectHandler: selectHandler, mergedPageShowDate: mergedPageShowDate, CALENDAR_LOCALE: CALENDAR_LOCALE })))),
        innerMode === 'year' && (React.createElement("div", { className: prefixCls + "-body" },
            React.createElement(Year, __assign({}, props, { prefixCls: prefixCls, pageData: pageData, mergedPageShowDate: mergedPageShowDate, innerMode: innerMode, mergedValue: mergedValue, selectHandler: selectHandler, CALENDAR_LOCALE: CALENDAR_LOCALE })))),
        panelTodayBtn && panel && (React.createElement("div", { className: prefixCls + "-footer-btn-wrapper", onClick: function () { return move(getNow()); } }, CALENDAR_LOCALE.today))));
}
Calendar.displayName = 'Calendar';
export default Calendar;
