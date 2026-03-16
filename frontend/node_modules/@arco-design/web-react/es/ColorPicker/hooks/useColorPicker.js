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
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ColorPickerMode } from '../interface';
import { formatInputToHSVA } from '../../_util/color';
import useMergeValue from '../../_util/hooks/useMergeValue';
import useIsFirstRender from '../../_util/hooks/useIsFirstRender';
import { getModeByValue, isGradientMode, isSingleMode } from '../mode';
import { getColorFromHsv, formatRgba, formatHex, getRandomId, isEqualsColors, equalsHsv, mapValueToGradientColor, } from '../utils';
export var useColorPicker = function (props) {
    var _a;
    var _b = props.mode, mode = _b === void 0 ? ColorPickerMode.Single : _b, defaultValue = props.defaultValue, format = props.format, onChange = props.onChange, disabledAlpha = props.disabledAlpha;
    var isFirstRender = useIsFirstRender();
    var _c = __read(useMergeValue(false, {
        defaultValue: props.defaultPopupVisible,
        value: props.popupVisible,
    }), 2), popupVisible = _c[0], setPopupVisible = _c[1];
    var _d = __read(useState(getModeByValue(props.value, defaultValue, mode)), 2), activeMode = _d[0], setActiveMode = _d[1];
    var _e = __read(useMergeValue(activeMode === ColorPickerMode.Gradient ? undefined : '', props), 2), value = _e[0], setValue = _e[1];
    var _f = __read(useState(isGradientMode(activeMode) && Array.isArray(value)
        ? mapValueToGradientColor(value, disabledAlpha)
        : []), 2), _gradientColors = _f[0], _setGradientColors = _f[1];
    var _g = __read(useState((_a = _gradientColors[0]) === null || _a === void 0 ? void 0 : _a.id), 2), _activeColorId = _g[0], _setActiveColorId = _g[1];
    var gradientColorsRef = useRef(_gradientColors);
    var activeColorIdRef = useRef(_activeColorId);
    var gradientColors = gradientColorsRef.current;
    var activeColorId = activeColorIdRef.current;
    var setGradientColors = function (newColors) {
        _setGradientColors(newColors);
        gradientColorsRef.current =
            typeof newColors === 'function' ? newColors(gradientColorsRef.current) : newColors;
    };
    var setActiveColorId = function (newId) {
        _setActiveColorId(newId);
        activeColorIdRef.current = newId;
    };
    var activeColorIndex = useMemo(function () {
        var activeIndex = gradientColors.findIndex(function (item) { return item.id === activeColorId; });
        return activeIndex !== -1 ? activeIndex : 0;
    }, [gradientColors, activeColorId]);
    var formatInput = Array.isArray(value)
        ? formatInputToHSVA(value[activeColorIndex].color)
        : formatInputToHSVA(value);
    var _h = __read(useState({
        h: formatInput.h,
        s: formatInput.s,
        v: formatInput.v,
    }), 2), hsv = _h[0], setHsv = _h[1];
    var _j = __read(useState(formatInput.a), 2), alpha = _j[0], setAlpha = _j[1];
    var color = useMemo(function () { return getColorFromHsv(hsv); }, [hsv]);
    var formatSingleValue = useCallback(function (r, g, b, alpha) {
        return format === 'rgb' ? formatRgba(r, g, b, alpha) : formatHex(r, g, b, alpha);
    }, [format]);
    var formatValue = useMemo(function () {
        if (isSingleMode(activeMode)) {
            var _a = color.rgb, r = _a.r, g = _a.g, b = _a.b;
            return formatSingleValue(r, g, b, alpha);
        }
        return gradientColors.map(function (item) {
            var _a = item.color.rgb, r = _a.r, g = _a.g, b = _a.b;
            return {
                color: formatSingleValue(r, g, b, item.alpha),
                percent: item.percent,
            };
        });
    }, [activeMode, gradientColors, color.rgb, formatSingleValue, alpha]);
    useEffect(function () {
        setValue(formatValue);
        if (!isFirstRender && !isEqualsColors(value, formatValue)) {
            onChange === null || onChange === void 0 ? void 0 : onChange(formatValue);
        }
    }, [formatValue]);
    var onVisibleChange = useCallback(function (newVisible) {
        if (newVisible && value !== formatValue) {
            var h = formatInput.h, s = formatInput.s, v = formatInput.v, a = formatInput.a;
            setHsv({ h: h, s: s, v: v });
            setAlpha(a);
        }
        if (newVisible !== popupVisible) {
            props.onVisibleChange && props.onVisibleChange(newVisible);
            if (!('popupVisible' in props)) {
                setPopupVisible(newVisible);
            }
        }
    }, [props.onVisibleChange, popupVisible, value]);
    var onHsvChange = function (_value) {
        setHsv(_value);
        if (disabledAlpha && alpha !== 100) {
            setAlpha(100);
        }
    };
    var onAlphaChange = function (_value) {
        setAlpha(_value);
    };
    useEffect(function () {
        if (!isGradientMode(activeMode) || !gradientColors.length)
            return;
        if (equalsHsv(gradientColors[activeColorIndex].color.hsv, hsv))
            return;
        var newGradientColors = __spreadArray([], __read(gradientColors), false);
        newGradientColors[activeColorIndex] = __assign(__assign({}, newGradientColors[activeColorIndex]), { color: getColorFromHsv(hsv) });
        setGradientColors(newGradientColors);
    }, [hsv]);
    useEffect(function () {
        if (!isGradientMode(activeMode) || !gradientColors.length)
            return;
        if (gradientColors[activeColorIndex].alpha === alpha)
            return;
        var newGradientColors = __spreadArray([], __read(gradientColors), false);
        newGradientColors[activeColorIndex] = __assign(__assign({}, newGradientColors[activeColorIndex]), { alpha: disabledAlpha ? 100 : alpha });
        setGradientColors(newGradientColors);
    }, [alpha]);
    var onActiveModeChange = function (newMode) {
        var _a;
        if (newMode === activeMode) {
            return;
        }
        if (newMode === ColorPickerMode.Single) {
            setActiveColorId((_a = gradientColors[0]) === null || _a === void 0 ? void 0 : _a.id);
        }
        else {
            setGradientColors([
                {
                    id: getRandomId(),
                    color: color,
                    alpha: alpha,
                    percent: 0,
                },
                {
                    id: getRandomId(),
                    color: color,
                    alpha: alpha,
                    percent: 100,
                },
            ]);
        }
        setActiveMode(newMode);
    };
    return {
        value: value,
        activeMode: activeMode,
        gradientColors: gradientColors,
        gradientColorsRef: gradientColorsRef,
        activeColorId: activeColorId,
        activeColorIdRef: activeColorIdRef,
        popupVisible: popupVisible,
        color: color,
        alpha: alpha,
        onHsvChange: onHsvChange,
        onAlphaChange: onAlphaChange,
        onVisibleChange: onVisibleChange,
        onActiveModeChange: onActiveModeChange,
        onActiveColorIdChange: setActiveColorId,
        onGradientColorsChange: setGradientColors,
    };
};
