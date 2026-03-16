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
import React, { useMemo } from 'react';
import useKeyboardEvent from '../../_util/hooks/useKeyboardEvent';
import Select from '../../Select';
import Button from '../../Button';
import Radio from '../../Radio';
import IconLeft from '../../../icon/react-icon/IconLeft';
import IconRight from '../../../icon/react-icon/IconRight';
import { getNow } from '../../_util/dayjs';
import { isArray } from '../../_util/is';
function getPopupContainer(node) {
    return node.parentElement;
}
function Header(props) {
    var prefixCls = props.prefixCls, changePageShowDate = props.changePageShowDate, headerValueFormat = props.headerValueFormat, mergedPageShowDate = props.mergedPageShowDate, CALENDAR_LOCALE = props.CALENDAR_LOCALE, move = props.move, innerMode = props.innerMode, changeMode = props.changeMode, headerType = props.headerType, onChangeYear = props.onChangeYear, onChangeMonth = props.onChangeMonth, modes = props.modes;
    var getKeyboardEvents = useKeyboardEvent();
    var modesOptions = isArray(modes)
        ? modes.map(function (m) { return ({
            label: CALENDAR_LOCALE.view[m],
            value: m,
        }); })
        : [];
    var isSelectHeaderType = headerType === 'select';
    var pageShowDateYear = mergedPageShowDate.year();
    var pageShowDateMonth = mergedPageShowDate.month() + 1;
    var optionsYear = useMemo(function () {
        var options = [pageShowDateYear];
        for (var i = 1; i <= 10; i++) {
            options.unshift(pageShowDateYear - i);
        }
        for (var i = 1; i < 10; i++) {
            options.push(pageShowDateYear + i);
        }
        return options;
    }, [pageShowDateYear]);
    var optionsMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    return (React.createElement("div", { className: prefixCls + "-header" },
        React.createElement("div", { className: prefixCls + "-header-left" },
            isSelectHeaderType ? (React.createElement(React.Fragment, null,
                React.createElement(Select, { size: "small", className: prefixCls + "-header-value-year", value: pageShowDateYear, options: optionsYear, onChange: onChangeYear, getPopupContainer: getPopupContainer }),
                innerMode === 'month' && (React.createElement(Select, { size: "small", className: prefixCls + "-header-value-month", value: pageShowDateMonth, options: optionsMonth, onChange: onChangeMonth, getPopupContainer: getPopupContainer })))) : (React.createElement(React.Fragment, null,
                React.createElement("div", __assign({ className: prefixCls + "-header-icon", role: "button", tabIndex: 0, onClick: function () { return changePageShowDate('prev', innerMode); } }, getKeyboardEvents({
                    onPressEnter: function () { return changePageShowDate('prev', innerMode); },
                })),
                    React.createElement(IconLeft, null)),
                React.createElement("div", { className: prefixCls + "-header-value" }, mergedPageShowDate.format(headerValueFormat)),
                React.createElement("div", __assign({ role: "button", tabIndex: 0, className: prefixCls + "-header-icon", onClick: function () { return changePageShowDate('next', innerMode); } }, getKeyboardEvents({
                    onPressEnter: function () { return changePageShowDate('next', innerMode); },
                })),
                    React.createElement(IconRight, null)))),
            React.createElement(Button, { size: "small", onClick: function () { return move(getNow()); } }, CALENDAR_LOCALE.today)),
        React.createElement("div", { className: prefixCls + "-header-right" },
            React.createElement(Radio.Group, { size: "small", type: "button", options: modesOptions, onChange: changeMode, value: innerMode }))));
}
export default Header;
