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
import DatePickerPanel from '../date';
import WeekPickerPanel from '../week';
import MonthPickerPanel from '../month';
import YearPickerPanel from '../year';
import QuarterPickerPanel from '../quarter';
import { ConfigContext } from '../../../ConfigProvider';
import { getNow, getDayjsValue, methods } from '../../../_util/dayjs';
import { isObject } from '../../../_util/is';
import { getFormatByIndex } from '../../util';
import PickerContext from '../../context';
function range(start, end) {
    var result = [];
    for (var i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}
function RangePicker(props) {
    var _a = props.mode, mode = _a === void 0 ? 'date' : _a, showTime = props.showTime, disabledDate = props.disabledDate, disabledTime = props.disabledTime, format = props.format, dateRender = props.dateRender, propsValue = props.value, timeValues = props.timeValues, icons = props.icons, locale = props.locale, pageShowDates = props.pageShowDates, onMouseEnterCell = props.onMouseEnterCell, onMouseLeaveCell = props.onMouseLeaveCell, onSelectTime = props.onTimePickerSelect, onSelectPanel = props.onSelectPanel, onPrev = props.onPrev, onSuperPrev = props.onSuperPrev, onNext = props.onNext, onSuperNext = props.onSuperNext, localeName = props.localeName, popupVisible = props.popupVisible, timepickerProps = props.timepickerProps, getHeaderOperations = props.getHeaderOperations, setRangePageShowDates = props.setRangePageShowDates, disabledTimePickerIndex = props.disabledTimePickerIndex, hideNotInViewDates = props.hideNotInViewDates, isTimePanel = props.isTimePanel, valueShowHover = props.valueShowHover, panelModes = props.panelModes, setPanelModes = props.setPanelModes;
    var getPrefixCls = useContext(ConfigContext).getPrefixCls;
    var prefixCls = getPrefixCls('picker-range');
    var _b = useContext(PickerContext), utcOffset = _b.utcOffset, timezone = _b.timezone;
    var startShowDate = pageShowDates[0] || getNow(utcOffset, timezone);
    var endShowDate = pageShowDates[1] || getNow(utcOffset, timezone);
    var value = getDayjsValue(propsValue, format);
    var basePickerProps = {
        isRangePicker: true,
        rangeValues: value,
        onMouseEnterCell: onMouseEnterCell,
        onMouseLeaveCell: onMouseLeaveCell,
        locale: locale,
        disabledDate: disabledDate,
        onSelect: onSelectPanel,
        dateRender: dateRender,
        getHeaderOperations: getHeaderOperations,
        icons: icons,
        valueShowHover: valueShowHover,
    };
    var startPickerProps = {
        pageShowDate: startShowDate,
        panelMode: panelModes[0],
        setPanelMode: function (m) { return setPanelModes([m, panelModes[1]]); },
        format: getFormatByIndex(format, 0),
    };
    var endPickerProps = {
        pageShowDate: endShowDate,
        panelMode: panelModes[1],
        setPanelMode: function (m) { return setPanelModes([panelModes[0], m]); },
        format: getFormatByIndex(format, 1),
    };
    function renderDate() {
        var startOperations = {
            onPrev: onPrev,
            onSuperPrev: onSuperPrev,
        };
        var endOperations = {
            onNext: onNext,
            onSuperNext: onSuperNext,
        };
        var pickerProps = __assign(__assign({}, basePickerProps), { localeName: localeName, popupVisible: popupVisible, timepickerProps: timepickerProps, getHeaderOperations: getHeaderOperations, hideNotInViewDates: hideNotInViewDates, isTimePanel: isTimePanel });
        if (mode === 'week') {
            return (React.createElement(React.Fragment, null,
                React.createElement(WeekPickerPanel, __assign({ setPageShowDate: function (d) { return setRangePageShowDates([d, d], 0); } }, startOperations, pickerProps, startPickerProps)),
                React.createElement(WeekPickerPanel, __assign({ setPageShowDate: function (d) { return setRangePageShowDates([methods.subtract(d, 1, 'month'), d], 1); } }, endOperations, pickerProps, endPickerProps))));
        }
        var showTimeProps = {
            disabledTime: disabledTime,
            showTime: showTime,
        };
        var disabledTimePickerProps = {};
        // 禁用面板时，TimePicker 被整体禁用同时关闭 hideDisabledOptions 防止用户传 true 导致空白
        if (typeof disabledTimePickerIndex === 'number') {
            disabledTimePickerProps.disabledTime = function () { return ({
                disabledHours: function () { return range(0, 24); },
                disabledMinutes: function () { return range(0, 60); },
                disabledSeconds: function () { return range(0, 60); },
            }); };
            if (isObject(showTime)) {
                var st = __assign(__assign({}, showTime), { defaultValue: undefined });
                disabledTimePickerProps.showTime = __assign(__assign({}, st), { hideDisabledOptions: false });
            }
        }
        return (React.createElement(React.Fragment, null,
            React.createElement(DatePickerPanel, __assign({}, startOperations, pickerProps, showTimeProps, (disabledTimePickerIndex === 0 ? disabledTimePickerProps : {}), { onTimePickerSelect: function (timeString, time) {
                    onSelectTime(0, timeString, time);
                }, index: 0, setPageShowDate: function (d) { return setRangePageShowDates([d, d], 0); }, timeValue: timeValues[0] }, startPickerProps)),
            React.createElement(DatePickerPanel, __assign({}, endOperations, pickerProps, showTimeProps, (disabledTimePickerIndex === 1 ? disabledTimePickerProps : {}), { onTimePickerSelect: function (timeString, time) {
                    onSelectTime(1, timeString, time);
                }, index: 1, setPageShowDate: function (d) { return setRangePageShowDates([methods.subtract(d, 1, 'month'), d], 1); }, timeValue: timeValues[1] }, endPickerProps))));
    }
    function renderMonth() {
        var startOperations = {
            onSuperPrev: onSuperPrev,
        };
        var endOperations = {
            onSuperNext: onSuperNext,
        };
        var pickerProps = basePickerProps;
        return (React.createElement(React.Fragment, null,
            React.createElement(MonthPickerPanel, __assign({ setPageShowDate: function (d) { return setRangePageShowDates([d, d], 0); } }, startOperations, pickerProps, startPickerProps)),
            React.createElement(MonthPickerPanel, __assign({ setPageShowDate: function (d) { return setRangePageShowDates([methods.subtract(d, 1, 'year'), d], 1); } }, endOperations, pickerProps, endPickerProps))));
    }
    function renderYear() {
        var startOperations = {
            onSuperPrev: onSuperPrev,
        };
        var endOperations = {
            onSuperNext: onSuperNext,
        };
        var pickerProps = basePickerProps;
        return (React.createElement(React.Fragment, null,
            React.createElement(YearPickerPanel, __assign({}, startOperations, pickerProps, { pageShowDate: startShowDate })),
            React.createElement(YearPickerPanel, __assign({}, endOperations, pickerProps, { pageShowDate: endShowDate }))));
    }
    function renderQuarter() {
        var startOperations = {
            onSuperPrev: onSuperPrev,
        };
        var endOperations = {
            onSuperNext: onSuperNext,
        };
        var pickerProps = basePickerProps;
        return (React.createElement(React.Fragment, null,
            React.createElement(QuarterPickerPanel, __assign({ setPageShowDate: function (d) { return setRangePageShowDates([d, d], 0); } }, startOperations, pickerProps, startPickerProps)),
            React.createElement(QuarterPickerPanel, __assign({ setPageShowDate: function (d) { return setRangePageShowDates([methods.subtract(d, 1, 'year'), d], 1); } }, endOperations, pickerProps, endPickerProps))));
    }
    return (React.createElement("div", { className: prefixCls },
        React.createElement("div", { className: prefixCls + "-wrapper" },
            (mode === 'date' || mode === 'week') && renderDate(),
            mode === 'month' && renderMonth(),
            mode === 'year' && renderYear(),
            mode === 'quarter' && renderQuarter())));
}
export default RangePicker;
