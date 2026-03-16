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
import React, { useState, useEffect, useContext, forwardRef, useRef, useImperativeHandle, useMemo, } from 'react';
import BTween from 'b-tween';
import dayjs from 'dayjs';
import omit from '../_util/omit';
import cs from '../_util/classNames';
import Countdown from './countdown';
import { isNumber, isFunction } from '../_util/is';
import { ConfigContext } from '../ConfigProvider';
import Skeleton from '../Skeleton';
import useMergeProps from '../_util/hooks/useMergeProps';
var defaultProps = {
    countFrom: 0,
    countDuration: 2000,
};
function Statistic(baseProps, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Statistic);
    var className = props.className, style = props.style, title = props.title, extra = props.extra, groupSeparator = props.groupSeparator, precision = props.precision, prefix = props.prefix, suffix = props.suffix, format = props.format, renderFormat = props.renderFormat, styleValue = props.styleValue, styleDecimal = props.styleDecimal, loading = props.loading, rest = __rest(props, ["className", "style", "title", "extra", "groupSeparator", "precision", "prefix", "suffix", "format", "renderFormat", "styleValue", "styleDecimal", "loading"]);
    var tween = useRef();
    var wrapperRef = useRef();
    var _c = __read(useState('value' in props ? props.value : undefined), 2), value = _c[0], setValue = _c[1];
    var prefixCls = getPrefixCls('statistic');
    var countUp = function (from, to) {
        if (from === void 0) { from = props.countFrom; }
        if (to === void 0) { to = props.value; }
        var countDuration = props.countDuration;
        if (from !== to) {
            tween.current = new BTween({
                from: {
                    value: from,
                },
                to: {
                    value: to,
                },
                duration: countDuration,
                easing: 'quartOut',
                onUpdate: function (keys) {
                    setValue(keys.value.toFixed(precision));
                },
                onFinish: function () {
                    setValue(to);
                },
            });
            tween.current.start();
        }
    };
    useEffect(function () {
        if (props.countUp) {
            if (tween.current) {
                tween.current.stop();
            }
            if (value !== props.value) {
                countUp(Number(value), props.value);
            }
            else {
                countUp();
            }
        }
        else {
            setValue(props.value);
        }
        return function () {
            tween.current && tween.current.stop();
            tween.current = null;
        };
    }, [props.value]);
    useImperativeHandle(ref, function () { return ({
        countUp: countUp,
        getRootDOMNode: function () { return wrapperRef.current; },
    }); });
    var _d = useMemo(function () {
        var _value = value;
        if (format) {
            _value = dayjs(value).format(format);
        }
        if (isNumber(precision) && precision >= 0) {
            _value = Number(value).toFixed(precision);
        }
        var int = String(_value).split('.')[0];
        var decimal = String(_value).split('.')[1];
        if (groupSeparator && isNumber(Number(value))) {
            int = Number(int).toLocaleString('en-US');
        }
        return {
            int: int,
            decimal: decimal,
        };
    }, [format, groupSeparator, precision, value]), int = _d.int, decimal = _d.decimal;
    var valueFormatted = isFunction(renderFormat)
        ? renderFormat
        : function (_, formattedValue) { return formattedValue; };
    var isNumberValue = isNumber(Number(value));
    var eleValueWithPrefix = (React.createElement(React.Fragment, null,
        prefix !== null && prefix !== undefined ? (React.createElement("span", { className: prefixCls + "-value-prefix" }, prefix)) : null,
        valueFormatted(value, isNumberValue ? int : value)));
    return (React.createElement("div", __assign({ className: cs("" + prefixCls, (_a = {}, _a[prefixCls + "-rtl"] = rtl, _a), className), style: style }, omit(rest, ['value', 'countUp', 'countFrom', 'countDuration']), { ref: wrapperRef }),
        title && React.createElement("div", { className: prefixCls + "-title" }, title),
        React.createElement("div", { className: prefixCls + "-content" },
            React.createElement(Skeleton, { animation: true, loading: !!loading, text: { rows: 1, width: '100%' } },
                React.createElement("div", { className: prefixCls + "-value", style: styleValue },
                    isNumberValue ? (React.createElement("span", { className: prefixCls + "-value-int" }, eleValueWithPrefix)) : (eleValueWithPrefix),
                    decimal !== undefined || suffix ? (React.createElement("span", { className: prefixCls + "-value-decimal", style: styleDecimal },
                        isNumber(Number(value)) && decimal !== undefined && "." + decimal,
                        suffix !== null && suffix !== undefined ? (React.createElement("span", { className: prefixCls + "-value-suffix" }, suffix)) : null)) : null)),
            extra && React.createElement("div", { className: prefixCls + "-extra" }, extra))));
}
var ForwardRefStatistic = forwardRef(Statistic);
var StatisticComponent = ForwardRefStatistic;
StatisticComponent.displayName = 'Statistic';
StatisticComponent.Countdown = Countdown;
export default StatisticComponent;
