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
import React, { useContext, useEffect, useState } from 'react';
import Input from '../Input';
import { InputAlpha } from './input-alpha';
import { hexToRgb, rgbToHsv } from '../_util/color';
import { ConfigContext } from '../ConfigProvider';
export var InputHex = function (_a) {
    var color = _a.color, alpha = _a.alpha, onHsvChange = _a.onHsvChange, onAlphaChange = _a.onAlphaChange, disabledAlpha = _a.disabledAlpha;
    var getPrefixCls = useContext(ConfigContext).getPrefixCls;
    var prefixCls = getPrefixCls('color-picker');
    var _b = __read(useState(color.hex), 2), hex = _b[0], setHex = _b[1];
    useEffect(function () {
        if (color.hex !== hex) {
            setHex(color.hex);
        }
    }, [color]);
    var onInputChange = function (value) {
        var _a, _b;
        var matchValue = (_b = (_a = value.match(/[a-fA-F0-9]*/g)) === null || _a === void 0 ? void 0 : _a.join('')) !== null && _b !== void 0 ? _b : '';
        if (matchValue !== hex) {
            setHex(matchValue.toUpperCase());
        }
    };
    var onBlur = function () {
        var _rgb = hexToRgb(hex) || {
            r: 255,
            g: 0,
            b: 0,
        };
        var _hsv = rgbToHsv(_rgb.r, _rgb.g, _rgb.b);
        onHsvChange(_hsv);
    };
    var onPaste = function (ev) {
        var text = ev.clipboardData.getData('Text');
        if (text.startsWith('#')) {
            text = text.slice(1);
        }
        onInputChange(text);
        ev.preventDefault();
    };
    return (React.createElement(Input.Group, { className: prefixCls + "-input-group", compact: true },
        React.createElement(Input, { className: prefixCls + "-input-hex", prefix: "#", size: "mini", maxLength: 6, value: hex, onChange: onInputChange, onBlur: onBlur, onPressEnter: onBlur, onPaste: onPaste }),
        !disabledAlpha && React.createElement(InputAlpha, { value: alpha, onChange: onAlphaChange })));
};
