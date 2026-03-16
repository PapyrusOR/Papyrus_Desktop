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
import React, { forwardRef, useState, useEffect, useContext, useRef } from 'react';
import dayjs from 'dayjs';
import { getDayjsValue, getNow } from '../_util/dayjs';
import cs from '../_util/classNames';
import { getDateString } from './util';
import { ConfigContext } from '../ConfigProvider';
import { isFunction } from '../_util/is';
function Countdown(props, ref) {
    var getPrefixCls = useContext(ConfigContext).getPrefixCls;
    var className = props.className, style = props.style, title = props.title, styleValue = props.styleValue, value = props.value, onFinish = props.onFinish, renderFormat = props.renderFormat, _a = props.format, format = _a === void 0 ? 'HH:mm:ss' : _a, _b = props.start, start = _b === void 0 ? true : _b;
    var dayjsValue = getDayjsValue(value, format) || dayjs();
    var now = getDayjsValue(props.now, format);
    var prefixCls = getPrefixCls('statistic');
    var _c = __read(useState(dayjsValue.diff(now, 'millisecond')), 2), valueDiff = _c[0], setValueDiff = _c[1];
    var _d = __read(useState(getDateString(Math.max(valueDiff, 0), format)), 2), valueShow = _d[0], setValueShow = _d[1];
    var timerRef = useRef(null);
    var stopTimer = function () {
        clearInterval(timerRef.current);
        timerRef.current = null;
    };
    var startTimer = function () {
        timerRef.current = setInterval(function () {
            var _valueDiff = dayjsValue.diff(getNow());
            var _value = dayjsValue.diff(getNow(), 'millisecond');
            if (_value <= 0) {
                stopTimer();
                onFinish === null || onFinish === void 0 ? void 0 : onFinish();
            }
            var valueShow = getDateString(Math.max(_value, 0), format);
            setValueShow(valueShow);
            setValueDiff(_valueDiff);
        }, 1000 / 30);
    };
    useEffect(function () {
        if (!timerRef.current && start) {
            if (dayjsValue.valueOf() >= Date.now()) {
                startTimer();
            }
        }
        return function () {
            stopTimer();
        };
    }, [props.start]);
    var valueShowNode = isFunction(renderFormat) ? renderFormat(valueDiff, valueShow) : valueShow;
    return (React.createElement("div", { ref: ref, className: cs("" + prefixCls, prefixCls + "-countdown", className), style: style },
        title && React.createElement("div", { className: prefixCls + "-title" }, title),
        React.createElement("div", { className: prefixCls + "-content" },
            React.createElement("div", { className: prefixCls + "-value", style: styleValue }, valueShowNode))));
}
var CountdownComponent = forwardRef(Countdown);
CountdownComponent.displayName = 'StatisticCountdown';
export default CountdownComponent;
