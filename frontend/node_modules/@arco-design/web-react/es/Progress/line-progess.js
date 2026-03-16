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
import React, { useCallback } from 'react';
import cs from '../_util/classNames';
import { isFunction, isObject } from '../_util/is';
import IconExclamationCircleFill from '../../icon/react-icon/IconExclamationCircleFill';
var getBackground = function (color, percent) {
    if (isObject(color)) {
        var val = Object.keys(color)
            .map(function (key) { return color[key] + " " + key; })
            .join(',');
        var sizeProps = percent ? { backgroundSize: (100 * 100) / percent + "%" } : {};
        return __assign({ backgroundImage: "linear-gradient(to right, " + val + ")" }, sizeProps);
    }
    return {
        backgroundColor: color,
    };
};
var defaultStrokeWidth = {
    small: 3,
    default: 4,
    large: 8,
};
function LineProgress(props) {
    var _a, _b;
    var 
    // textInside,
    type = props.type, prefixCls = props.prefixCls, buffer = props.buffer, percent = props.percent, color = props.color, animation = props.animation, bufferColor = props.bufferColor, formatText = props.formatText, trailColor = props.trailColor, _c = props.showText, showText = _c === void 0 ? true : _c, _d = props.size, size = _d === void 0 ? 'default' : _d, _e = props.status, status = _e === void 0 ? 'normal' : _e;
    var strokeWidth = props.strokeWidth || defaultStrokeWidth[size];
    var cls = prefixCls + "-" + type;
    var height = strokeWidth;
    var isFinish = status === 'success' || status === 'error' || percent >= 100;
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
        React.createElement("div", { className: cls + "-outer", role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": percent, style: { height: height, backgroundColor: trailColor } },
            buffer && !isFinish && (React.createElement("div", { className: cls + "-inner-buffer", style: __assign({ width: (percent > 0 ? percent + 10 : 0) + "%" }, getBackground(bufferColor)) })),
            React.createElement("div", { className: cs(cls + "-inner", (_a = {}, _a[cls + "-inner-animate"] = animation, _a)), style: __assign({ width: percent + "%" }, getBackground(color, percent)) })),
        showText && (React.createElement("div", { className: cs(cls + "-text", (_b = {}, _b[cls + "-text-with-icon"] = status, _b)) }, getText()))));
}
export default LineProgress;
