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
import TimePickerPopup from './time-picker';
import RangePickerPopup from './range-picker';
function wrapper(picker, displayName, type) {
    var _a;
    return _a = /** @class */ (function (_super) {
            __extends(PickerWrapper, _super);
            function PickerWrapper() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            PickerWrapper.prototype.render = function () {
                return React.createElement(Picker, __assign({}, this.props, { picker: picker, isRangePicker: type === 'range' }));
            };
            return PickerWrapper;
        }(React.Component)),
        _a.displayName = displayName,
        _a;
}
var TimePicker = wrapper(React.createElement(TimePickerPopup, null), 'TimePicker');
var RangePicker = wrapper(React.createElement(RangePickerPopup, null), 'TimePickerRangePicker', 'range');
Object.assign(TimePicker, { RangePicker: RangePicker });
export default TimePicker;
