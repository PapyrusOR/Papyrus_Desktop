import React, { useCallback } from 'react';
import { isFunction, isObject } from '../_util/is';
import IconCheck from '../../icon/react-icon/IconCheck';
import IconExclamation from '../../icon/react-icon/IconExclamation';
import Tooltip from '../Tooltip';
import useId from '../_util/hooks/useId';
var defaultStrokeWidth = {
    mini: 4,
    small: 3,
    default: 4,
    large: 4,
};
var defaultWidth = {
    mini: 16,
    small: 48,
    default: 64,
    large: 80,
};
var CircleProgress = function (props) {
    var size = props.size, _a = props.percent, percent = _a === void 0 ? 0 : _a, prefixCls = props.prefixCls, showText = props.showText, status = props.status, formatText = props.formatText;
    var isLinearGradient = isObject(props.color);
    var width = props.width || defaultWidth[size];
    var strokeWidth = props.strokeWidth || (size === 'mini' ? width / 2 : defaultStrokeWidth[size]);
    var radius = (width - strokeWidth) / 2;
    var perimeter = Math.PI * 2 * radius;
    var center = width / 2;
    var cls = prefixCls + "-circle";
    var svgCls = cls + "-svg";
    var getText = useCallback(function (status) {
        if (isFunction(formatText)) {
            return formatText(percent);
        }
        switch (status) {
            case 'success':
                return React.createElement(IconCheck, null);
            case 'error':
                return React.createElement(IconExclamation, null);
            default:
                return percent + "%";
        }
    }, [formatText, percent]);
    var linearGradientId = useId(prefixCls + "-linear-gradient-");
    var color = isLinearGradient ? "url(#" + linearGradientId + ")" : props.color;
    var dom = (React.createElement("div", { className: cls + "-wrapper", role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": percent, style: { width: width, height: width } },
        React.createElement("svg", { viewBox: "0 0 " + width + " " + width, className: "" + svgCls },
            isLinearGradient && (React.createElement("defs", null,
                React.createElement("linearGradient", { id: linearGradientId, x1: "0", y1: "1", x2: "0", y2: "0" }, Object.keys(props.color)
                    .sort()
                    .map(function (key) {
                    return React.createElement("stop", { offset: key, key: key, stopColor: props.color[key] });
                })))),
            React.createElement("circle", { className: cls + "-mask", fill: "none", cx: center, cy: center, r: radius, strokeWidth: props.pathStrokeWidth || (size === 'mini' ? strokeWidth : Math.max(2, strokeWidth - 2)), style: {
                    stroke: props.pathStrokeColor,
                } }),
            React.createElement("circle", { className: cls + "-path", fill: "none", cx: center, cy: center, r: radius, strokeWidth: strokeWidth, style: {
                    stroke: color,
                    strokeDasharray: perimeter,
                    strokeDashoffset: (percent > 100 ? 100 : 1 - percent / 100) * perimeter,
                } })),
        showText && size !== 'mini' && React.createElement("div", { className: cls + "-text" }, getText(status))));
    // type === line 时候，返回的是一个圆环
    if (size === 'mini' && status === 'success' && props.type === 'circle') {
        dom = (React.createElement("div", { className: cls + "-wrapper", style: { width: width, height: width } },
            React.createElement(IconCheck, { style: { fontSize: width - 2, color: color } })));
    }
    return size === 'mini' && showText ? (React.createElement(Tooltip, { content: React.createElement("div", { className: cls + "-text" }, getText('normal')) }, dom)) : (dom);
};
export default CircleProgress;
