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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useCallback } from 'react';
import cs from '../_util/classNames';
import { isFunction } from '../_util/is';
import IconExclamationCircleFill from '../../icon/react-icon/IconExclamationCircleFill';
export var StepsProgress = function (props) {
    var _a;
    var prefixCls = props.prefixCls, percent = props.percent, color = props.color, type = props.type, formatText = props.formatText, trailColor = props.trailColor, _b = props.showText, showText = _b === void 0 ? true : _b, _c = props.size, size = _c === void 0 ? 'default' : _c, _d = props.status, status = _d === void 0 ? 'normal' : _d;
    var strokeWidth = props.strokeWidth || (size === 'small' ? 8 : 4);
    var cls = prefixCls + "-" + type;
    var height = strokeWidth;
    var getText = useCallback(function () {
        if (isFunction(formatText)) {
            return formatText(percent);
        }
        switch (status) {
            case 'error':
                return (React.createElement("span", null,
                    percent,
                    "% ",
                    React.createElement(IconExclamationCircleFill, null)));
            default:
                return percent + "%";
        }
    }, [formatText, percent, status]);
    return (React.createElement("div", { className: cls + "-wrapper" },
        React.createElement("div", { className: cls + "-outer", role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": percent, style: { height: height } }, __spreadArray([], __read(new Array(props.steps)), false).map(function (_, index) {
            var _a;
            var isActive = percent > (100 / props.steps) * index;
            return (React.createElement("div", { key: index, className: cs(cls + "-item", (_a = {},
                    _a[cls + "-item-active"] = isActive,
                    _a)), style: {
                    backgroundColor: isActive ? color : trailColor || '',
                } }));
        })),
        showText && (React.createElement("div", { className: cs(cls + "-text", (_a = {}, _a[cls + "-text-with-icon"] = status, _a)) }, getText()))));
};
export default StepsProgress;
