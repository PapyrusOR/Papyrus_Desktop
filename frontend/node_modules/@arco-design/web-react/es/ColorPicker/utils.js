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
import { formatInputToHSVA, formatInputToRGBA, hsvToRgb, rgbToHex, rgbToHsv, rgbaToHex, } from '../_util/color';
export var sortGradientColors = function (gradientColors) {
    return gradientColors.sort(function (a, b) {
        return a.percent - b.percent;
    });
};
export var mix = function (source, target, progress) {
    return Object.keys(source).reduce(function (previousObject, currentKey) {
        var _a;
        return (__assign(__assign({}, previousObject), (_a = {}, _a[currentKey] = source[currentKey] + (target[currentKey] - source[currentKey]) * progress, _a)));
    }, __assign({}, source));
};
export var getGradientString = function (value) {
    return value.map(function (_a) {
        var color = _a.color, percent = _a.percent;
        return color + " " + percent + "%";
    }).join(', ');
};
export var renderGradientBackground = function (value) {
    return "linear-gradient(to right, " + getGradientString(value) + ")";
};
export var renderBackground = function (value) {
    return Array.isArray(value) ? renderGradientBackground(value) : value;
};
export var formatRgba = function (r, g, b, a) {
    return a < 1 ? "rgba(" + r + ", " + g + ", " + b + ", " + a.toFixed(2) + ")" : "rgb(" + r + ", " + g + ", " + b + ")";
};
export var formatHex = function (r, g, b, a) {
    return a < 1 ? "#" + rgbaToHex(r, g, b, a) : "#" + rgbToHex(r, g, b);
};
export var getColorFromHsv = function (hsv) {
    var rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
    var hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    return {
        hsv: hsv,
        rgb: rgb,
        hex: hex,
    };
};
export var getRandomId = function () { return Math.random().toFixed(10).slice(2); };
export var mapValueToGradientColor = function (value, disabledAlpha) {
    return value.map(function (item) {
        var formatInput = formatInputToHSVA(item.color);
        return {
            id: getRandomId(),
            color: getColorFromHsv(formatInput),
            alpha: disabledAlpha ? 100 : formatInput.a,
            percent: item.percent,
        };
    });
};
export var getColorByGradients = function (gradientColors, percent, id) {
    var index = gradientColors.findIndex(function (item) { return item.percent === percent; });
    if (index !== -1) {
        return __assign(__assign({}, gradientColors[index]), { id: id !== null && id !== void 0 ? id : getRandomId() });
    }
    var latterColorIndex = gradientColors.findIndex(function (item) { return item.percent > percent; });
    var previousColorIndex = latterColorIndex - 1;
    var _a = gradientColors[previousColorIndex], previousColor = _a.color, previousAlpha = _a.alpha, previousPercent = _a.percent;
    var _b = gradientColors[latterColorIndex], latterColor = _b.color, latterAlpha = _b.alpha, latterPercent = _b.percent;
    var interpolatedColor = mix(__assign(__assign({}, previousColor.rgb), { a: previousAlpha }), __assign(__assign({}, latterColor.rgb), { a: latterAlpha }), (percent - previousPercent) / (latterPercent - previousPercent));
    var r = interpolatedColor.r, g = interpolatedColor.g, b = interpolatedColor.b, a = interpolatedColor.a;
    return {
        id: id !== null && id !== void 0 ? id : getRandomId(),
        color: getColorFromHsv(rgbToHsv(r, g, b)),
        alpha: a,
        percent: percent,
    };
};
export var equalsHsv = function (a, b) {
    return a.h === b.h && a.s === b.s && a.v === b.v;
};
export var equalsRgba = function (a, b) {
    return a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a;
};
export var isEqualsColors = function (colorA, colorB) {
    if (typeof colorA === 'string' && typeof colorB === 'string') {
        return colorA === colorB;
    }
    if (Array.isArray(colorA) && Array.isArray(colorB)) {
        return (colorA.length === colorB.length &&
            colorA.every(function (itemA, index) {
                var itemB = colorB[index];
                return (equalsRgba(formatInputToRGBA(itemA.color), formatInputToRGBA(itemB.color)) &&
                    itemA.percent === itemB.percent);
            }));
    }
    return false;
};
