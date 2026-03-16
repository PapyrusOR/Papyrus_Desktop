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
import TimePicker from './time-picker';
import { isArray, isDayjs } from '../_util/is';
import { toLocal, toTimezone } from '../_util/dayjs';
import omit from '../_util/omit';
import PickerContext from './context';
function RangePicker(props) {
    var _a = props.format, format = _a === void 0 ? 'HH:mm:ss' : _a, onSelect = props.onSelect, focusedInputIndex = props.focusedInputIndex, changeFocusedInputIndex = props.changeFocusedInputIndex, popupVisible = props.popupVisible, onConfirmValue = props.onConfirmValue, _b = props.valueShow, valueShow = _b === void 0 ? [] : _b, setValueShow = props.setValueShow, disableConfirm = props.disableConfirm, rest = __rest(props, ["format", "onSelect", "focusedInputIndex", "changeFocusedInputIndex", "popupVisible", "onConfirmValue", "valueShow", "setValueShow", "disableConfirm"]);
    var _c = useContext(PickerContext), utcOffset = _c.utcOffset, timezone = _c.timezone;
    function onSelectTime(_, time) {
        var zoneValue = valueShow.slice();
        var v = valueShow.map(function (a) { return toLocal(a, utcOffset, timezone); });
        zoneValue[focusedInputIndex] = toTimezone(time, utcOffset, timezone);
        v[focusedInputIndex] = time;
        onSelect &&
            onSelect(v.map(function (t) { return t.format(format); }), v);
        setValueShow(zoneValue);
        if (disableConfirm && isArray(v) && isDayjs(v[0]) && isDayjs(v[1])) {
            onConfirmValue(zoneValue);
        }
    }
    function onConfirmValueInner() {
        if (valueShow.length && (valueShow[0] === undefined || valueShow[1] === undefined)) {
            changeFocusedInputIndex(focusedInputIndex === 0 ? 1 : 0);
        }
        else {
            onConfirmValue(valueShow);
        }
    }
    var timepickerProps = omit(rest, ['defaultValue', 'placeholder', 'value', 'onChange']);
    var currentShowValue = valueShow[focusedInputIndex];
    return (React.createElement(TimePicker, __assign({ onSelect: onSelectTime, value: currentShowValue, format: format, isRangePicker: true, onConfirmValue: onConfirmValueInner, confirmBtnDisabled: !isDayjs(currentShowValue), valueShow: currentShowValue, popupVisible: popupVisible, disableConfirm: disableConfirm }, timepickerProps)));
}
export default RangePicker;
