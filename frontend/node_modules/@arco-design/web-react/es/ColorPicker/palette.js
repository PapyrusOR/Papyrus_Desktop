import React, { useContext, useMemo } from 'react';
import { ConfigContext } from '../ConfigProvider';
import { useControlBlock } from './hooks/useControlBlock';
import { hsvToRgb } from '../_util/color';
export var Palette = function (_a) {
    var color = _a.color, onChange = _a.onChange;
    var getPrefixCls = useContext(ConfigContext).getPrefixCls;
    var prefixCls = getPrefixCls('color-picker');
    var _b = color.hsv, h = _b.h, s = _b.s, v = _b.v;
    var _c = useControlBlock({
        value: [s, 1 - v],
        onChange: function (value) { return onChange(value[0], 1 - value[1]); },
    }), blockRef = _c.blockRef, handlerRef = _c.handlerRef, onMouseDown = _c.onMouseDown;
    var hueColor = useMemo(function () {
        var rgb = hsvToRgb(h, 1, 1);
        return "rgb(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ")";
    }, [h]);
    var renderHandler = function () {
        return (React.createElement("div", { ref: handlerRef, className: prefixCls + "-handler", style: {
                top: (1 - v) * 100 + "%",
                left: s * 100 + "%",
            } }));
    };
    return (React.createElement("div", { ref: blockRef, className: prefixCls + "-palette", style: { backgroundColor: hueColor }, onMouseDown: onMouseDown }, renderHandler()));
};
