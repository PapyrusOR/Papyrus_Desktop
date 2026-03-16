import React from 'react';
import IconLeft from '../../../icon/react-icon/IconLeft';
import IconRight from '../../../icon/react-icon/IconRight';
import IconDoubleLeft from '../../../icon/react-icon/IconDoubleLeft';
import IconDoubleRight from '../../../icon/react-icon/IconDoubleRight';
import cs from '../../_util/classNames';
function Header(props) {
    var prefixCls = props.prefixCls, title = props.title, onPrev = props.onPrev, onNext = props.onNext, onSuperPrev = props.onSuperPrev, onSuperNext = props.onSuperNext, mode = props.mode, value = props.value, onChangePanel = props.onChangePanel, _a = props.icons, icons = _a === void 0 ? {} : _a, rtl = props.rtl, DATEPICKER_LOCALE = props.DATEPICKER_LOCALE;
    var showPrev = typeof onPrev === 'function';
    var showSuperPrev = typeof onSuperPrev === 'function';
    var showNext = typeof onNext === 'function';
    var showSuperNext = typeof onSuperNext === 'function';
    var getIconClassName = function (isShow) {
        var _a;
        return cs(prefixCls + "-header-icon", (_a = {}, _a[prefixCls + "-header-icon-hidden"] = !isShow, _a));
    };
    function renderHeaderLabel() {
        var _a = (DATEPICKER_LOCALE === null || DATEPICKER_LOCALE === void 0 ? void 0 : DATEPICKER_LOCALE.Calendar) || {}, monthBeforeYear = _a.monthBeforeYear, monthFormat = _a.monthFormat, yearFormat = _a.yearFormat;
        if (title) {
            return title;
        }
        if (mode === 'date' || mode === 'week') {
            var yearNode = (React.createElement("span", { key: "year-node", className: prefixCls + "-header-label", onClick: function () { return onChangePanel('year'); } }, value.format(yearFormat || 'YYYY')));
            var monthNode = (React.createElement("span", { key: "month-node", className: prefixCls + "-header-label", onClick: function () { return onChangePanel('month'); } }, value.format(monthFormat || 'MM')));
            return monthBeforeYear ? [monthNode, yearNode] : [yearNode, monthNode];
        }
        if (mode === 'month' || mode === 'quarter') {
            return (React.createElement("span", { className: prefixCls + "-header-label", onClick: function () { return onChangePanel('year'); } }, value.format(yearFormat || 'YYYY')));
        }
    }
    var prevDoubleNull = icons.prevDouble === null;
    var prevNull = icons.prev === null;
    var nextNull = icons.next === null;
    var nextDoubleNull = icons.nextDouble === null;
    return (React.createElement("div", { className: prefixCls + "-header" },
        !prevDoubleNull && (React.createElement("div", { className: getIconClassName(showSuperPrev), onClick: onSuperPrev }, showSuperPrev &&
            (prevDoubleNull
                ? null
                : icons.prevDouble || (rtl ? React.createElement(IconDoubleRight, null) : React.createElement(IconDoubleLeft, null))))),
        !prevNull && (React.createElement("div", { className: getIconClassName(showPrev), onClick: onPrev }, showPrev && (prevNull ? null : icons.prev || (rtl ? React.createElement(IconRight, null) : React.createElement(IconLeft, null))))),
        React.createElement("div", { className: prefixCls + "-header-value" }, renderHeaderLabel()),
        !nextNull && (React.createElement("div", { className: getIconClassName(showNext), onClick: onNext }, showNext && (nextNull ? null : icons.next || (rtl ? React.createElement(IconLeft, null) : React.createElement(IconRight, null))))),
        !nextDoubleNull && (React.createElement("div", { className: getIconClassName(showSuperNext), onClick: onSuperNext }, showSuperNext &&
            (nextDoubleNull
                ? null
                : icons.nextDouble || (rtl ? React.createElement(IconDoubleLeft, null) : React.createElement(IconDoubleRight, null)))))));
}
export default Header;
