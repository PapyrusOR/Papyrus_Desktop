var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import Picker from './picker';
import PickerRange from './picker-range';
import DatePickerPanel from './panels/date';
import MonthPickerPanel from './panels/month';
import YearPickerPanel from './panels/year';
import WeekPickerPanel from './panels/week';
import QuarterPickerPanel from './panels/quarter';
function wrapper(picker, options) {
    var _a;
    return _a = /** @class */ (function (_super) {
            __extends(PickerWrapper, _super);
            function PickerWrapper(props) {
                var _this = _super.call(this, props) || this;
                _this.refPicker = React.createRef();
                return _this;
            }
            PickerWrapper.prototype.focus = function () {
                this.refPicker.current && this.refPicker.current.focus && this.refPicker.current.focus();
            };
            PickerWrapper.prototype.blur = function () {
                this.refPicker.current && this.refPicker.current.blur && this.refPicker.current.blur();
            };
            PickerWrapper.prototype.render = function () {
                return React.createElement(Picker, __assign({}, this.props, { ref: this.refPicker, picker: picker, mode: options.mode }));
            };
            return PickerWrapper;
        }(React.Component)),
        _a.displayName = options.displayName,
        _a;
}
var DatePicker = wrapper(React.createElement(DatePickerPanel, null), {
    displayName: 'DatePicker',
    mode: 'date',
});
var MonthPicker = wrapper(React.createElement(MonthPickerPanel, null), {
    displayName: 'MonthPicker',
    mode: 'month',
});
var YearPicker = wrapper(React.createElement(YearPickerPanel, null), {
    displayName: 'YearPicker',
    mode: 'year',
});
var WeekPicker = wrapper(React.createElement(WeekPickerPanel, null), {
    displayName: 'WeekPicker',
    mode: 'week',
});
var QuarterPicker = wrapper(React.createElement(QuarterPickerPanel, null), {
    displayName: 'QuarterPicker',
    mode: 'quarter',
});
var RangePicker = PickerRange;
export default Object.assign(DatePicker, {
    MonthPicker: MonthPicker,
    YearPicker: YearPicker,
    WeekPicker: WeekPicker,
    QuarterPicker: QuarterPicker,
    RangePicker: RangePicker,
});
