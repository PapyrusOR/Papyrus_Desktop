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
import React, { useContext, useMemo, useState } from 'react';
import { ControlBar } from './control-bar';
import { ConfigContext } from '../ConfigProvider';
import { Palette } from './palette';
import Radio from '../Radio';
import Select from '../Select';
import { InputRgb } from './input-rgb';
import { InputHex } from './input-hex';
import { ColorPickerMode } from './interface';
import { getColorString, hexToRgb, rgbToHsv } from '../_util/color';
import { isGradientMode, isMultiMode } from './mode';
import { getColorByGradients, renderBackground, sortGradientColors } from './utils';
var RadioGroup = Radio.Group;
export var Panel = function (_a) {
    var value = _a.value, mode = _a.mode, activeMode = _a.activeMode, gradientColors = _a.gradientColors, activeColorId = _a.activeColorId, activeColorIdRef = _a.activeColorIdRef, color = _a.color, alpha = _a.alpha, disabledAlpha = _a.disabledAlpha, historyColors = _a.historyColors, presetColors = _a.presetColors, showHistory = _a.showHistory, showPreset = _a.showPreset, renderPreset = _a.renderPreset, renderHistory = _a.renderHistory, renderPickSection = _a.renderPickSection, renderFooter = _a.renderFooter, onHsvChange = _a.onHsvChange, onAlphaChange = _a.onAlphaChange, onActiveModeChange = _a.onActiveModeChange, onGradientColorsChange = _a.onGradientColorsChange, onActiveColorIdChange = _a.onActiveColorIdChange;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, locale = _b.locale;
    var prefixCls = getPrefixCls('color-picker');
    var _c = __read(useState('hex'), 2), format = _c[0], setFormat = _c[1];
    var history = useMemo(function () {
        var set = new Set(historyColors !== null && historyColors !== void 0 ? historyColors : []);
        return Array.from(set);
    }, [historyColors]);
    var _d = color.hsv, h = _d.h, s = _d.s, v = _d.v;
    var _e = color.rgb, r = _e.r, g = _e.g, b = _e.b;
    var onHexInputChange = function (_value) {
        var _rgb = hexToRgb(_value) || {
            r: 255,
            g: 0,
            b: 0,
        };
        var _hsv = rgbToHsv(_rgb.r, _rgb.g, _rgb.b);
        onHsvChange(_hsv);
    };
    var renderModeTag = function () {
        return (React.createElement(RadioGroup, { className: prefixCls + "-panel-control-gradient-tag", type: "button", size: "small", value: activeMode, onChange: onActiveModeChange },
            React.createElement(Radio, { value: ColorPickerMode.Single }, locale.ColorPicker.singleColor),
            React.createElement(Radio, { value: ColorPickerMode.Gradient }, locale.ColorPicker.gradientColor)));
    };
    var handleChange = function (x) {
        var percent = Math.round(x * 100);
        onGradientColorsChange(function (gradientColors) {
            return sortGradientColors(gradientColors.map(function (item) {
                if (item.id === activeColorIdRef.current) {
                    return __assign(__assign({}, item), { percent: percent });
                }
                return item;
            }));
        });
    };
    var renderGradientBar = function () {
        var handleAdd = function (x) {
            var percent = Math.round(x * 100);
            var newColor = getColorByGradients(gradientColors, percent);
            var newColors = sortGradientColors(gradientColors.concat(newColor));
            onGradientColorsChange(newColors);
            onActiveColorIdChange(newColor.id);
            onHsvChange(newColor.color.hsv);
            onAlphaChange(newColor.alpha);
        };
        var handleActive = function (key) {
            var activeColor = gradientColors.find(function (item) { return item.id === key; });
            onActiveColorIdChange(key);
            onHsvChange(activeColor.color.hsv);
            onAlphaChange(activeColor.alpha);
        };
        return (React.createElement("div", { className: prefixCls + "-control-bar-gradient" },
            React.createElement(ControlBar, { multiple: true, value: gradientColors.map(function (_a) {
                    var percent = _a.percent, id = _a.id;
                    return ({
                        value: percent / 100,
                        key: id,
                    });
                }), onAdd: handleAdd, onChange: handleChange, onActive: handleActive, style: {
                    background: renderBackground(value),
                }, renderHandlerStyle: function (key) {
                    if (activeColorId === key) {
                        return {
                            outline: '1px solid rgb(var(--primary-6))',
                        };
                    }
                    return {};
                }, renderHandlerCenterStyle: function (key) {
                    var _a = gradientColors.find(function (item) { return item.id === key; }), _b = _a.color.rgb, r = _b.r, g = _b.g, b = _b.b, alpha = _a.alpha;
                    return {
                        background: getColorString(r, g, b, alpha),
                    };
                } })));
    };
    var renderInput = function () {
        if (format === 'rgb') {
            return (React.createElement(InputRgb, { color: color, alpha: alpha, onHsvChange: onHsvChange, onAlphaChange: onAlphaChange, disabledAlpha: disabledAlpha }));
        }
        return (React.createElement(InputHex, { color: color, alpha: alpha, onHsvChange: onHsvChange, onAlphaChange: onAlphaChange, disabledAlpha: disabledAlpha }));
    };
    var renderColorBlock = function (color) {
        return (React.createElement("div", { key: color, className: prefixCls + "-color-block", onClick: function () {
                onHexInputChange(color);
            } },
            React.createElement("div", { className: prefixCls + "-block", style: { backgroundColor: color } })));
    };
    var renderHistorySec = function () {
        if (renderHistory) {
            return renderHistory();
        }
        if (showHistory) {
            return (React.createElement("div", { className: prefixCls + "-colors-section" },
                React.createElement("div", { className: prefixCls + "-colors-text" }, locale.ColorPicker.history),
                React.createElement("div", { className: prefixCls + "-colors-wrapper" }, (history === null || history === void 0 ? void 0 : history.length) ? (React.createElement("div", { className: prefixCls + "-colors-list" }, history.map(renderColorBlock))) : (React.createElement("span", { className: prefixCls + "-colors-empty" }, locale.ColorPicker.empty)))));
        }
        return null;
    };
    var renderPresetSec = function () {
        if (renderPreset) {
            return renderPreset();
        }
        if (showPreset) {
            return (React.createElement("div", { className: prefixCls + "-colors-section" },
                React.createElement("div", { className: prefixCls + "-colors-text" }, locale.ColorPicker.preset),
                React.createElement("div", { className: prefixCls + "-colors-wrapper" },
                    React.createElement("div", { className: prefixCls + "-colors-list" }, presetColors === null || presetColors === void 0 ? void 0 : presetColors.map(renderColorBlock)))));
        }
        return null;
    };
    var renderColorSec = function () {
        if (renderPickSection) {
            return renderPickSection();
        }
        if (showHistory || showPreset) {
            return (React.createElement("div", { className: prefixCls + "-panel-colors" },
                renderHistorySec(),
                renderPresetSec()));
        }
        return null;
    };
    return (React.createElement("div", { className: prefixCls + "-panel" },
        React.createElement("div", { className: (isMultiMode(mode) || isGradientMode(activeMode)) && prefixCls + "-panel-control-gradient" },
            isMultiMode(mode) && renderModeTag(),
            isGradientMode(activeMode) && renderGradientBar(),
            React.createElement(Palette, { color: color, onChange: function (s, v) {
                    onHsvChange({ h: h, s: s, v: v });
                } })),
        React.createElement("div", { className: prefixCls + "-panel-control" },
            React.createElement("div", { className: prefixCls + "-control-wrapper" },
                React.createElement("div", null,
                    React.createElement(ControlBar, { className: prefixCls + "-control-bar-hue", value: h, onChange: function (h) { return onHsvChange({ h: h, s: s, v: v }); }, renderHandlerCenterStyle: function () { return ({
                            background: getColorString(r, g, b, 1),
                        }); } }),
                    !disabledAlpha && (React.createElement("div", { className: prefixCls + "-control-bar-bg" },
                        React.createElement(ControlBar, { className: prefixCls + "-control-bar-alpha", style: {
                                background: "linear-gradient(to right, rgba(0, 0, 0, 0), rgb(" + r + ", " + g + ", " + b + "))",
                            }, value: alpha, onChange: onAlphaChange, renderHandlerCenterStyle: function () { return ({
                                background: getColorString(r, g, b, alpha),
                            }); } })))),
                React.createElement("div", { className: prefixCls + "-preview", style: { backgroundColor: getColorString(r, g, b, alpha) } })),
            React.createElement("div", { className: prefixCls + "-input-wrapper" },
                React.createElement(Select, { className: prefixCls + "-select-type", size: "mini", options: [
                        {
                            value: 'hex',
                            label: 'Hex',
                        },
                        {
                            value: 'rgb',
                            label: 'RGB',
                        },
                    ], value: format, triggerProps: {
                        className: prefixCls + "-type-dropdown",
                    }, onChange: setFormat }),
                React.createElement("div", { className: prefixCls + "-group-wrapper" }, renderInput()))),
        renderColorSec(),
        typeof renderFooter === 'function' ? renderFooter() : null));
};
