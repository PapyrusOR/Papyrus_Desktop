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
import React, { useContext } from 'react';
import { ConfigContext } from '../ConfigProvider';
import useMergeProps from '../_util/hooks/useMergeProps';
import cs from '../_util/classNames';
import Trigger from '../Trigger';
import { Panel } from './panel';
import { colors } from './colors';
import { useColorPicker } from './hooks/useColorPicker';
import { isFunction, isNullOrUndefined } from '../_util/is';
import { getGradientString, renderBackground } from './utils';
var defaultProps = {
    size: 'default',
    presetColors: colors,
};
function ColorPicker(baseProps, ref) {
    var _a = useContext(ConfigContext), getPrefixCls = _a.getPrefixCls, componentConfig = _a.componentConfig, ctxSize = _a.size;
    var props = useMergeProps(baseProps, __assign(__assign({}, defaultProps), { size: ctxSize || defaultProps.size }), componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.ColorPicker);
    var style = props.style, className = props.className, size = props.size, mode = props.mode, disabled = props.disabled, _b = props.disabledAlpha, disabledAlpha = _b === void 0 ? false : _b, _c = props.triggerProps, triggerProps = _c === void 0 ? {} : _c, unmountOnExit = props.unmountOnExit, showText = props.showText, historyColors = props.historyColors, presetColors = props.presetColors, showHistory = props.showHistory, showPreset = props.showPreset, renderFooter = props.renderFooter;
    var prefixCls = getPrefixCls('color-picker');
    var _d = useColorPicker(props), value = _d.value, activeMode = _d.activeMode, gradientColors = _d.gradientColors, activeColorId = _d.activeColorId, activeColorIdRef = _d.activeColorIdRef, popupVisible = _d.popupVisible, color = _d.color, alpha = _d.alpha, onHsvChange = _d.onHsvChange, onAlphaChange = _d.onAlphaChange, onVisibleChange = _d.onVisibleChange, onActiveModeChange = _d.onActiveModeChange, onGradientColorsChange = _d.onGradientColorsChange, onActiveColorIdChange = _d.onActiveColorIdChange;
    var renderInput = function () {
        var _a;
        var customTriggerElement = isFunction(baseProps.triggerElement)
            ? baseProps.triggerElement({ value: value })
            : baseProps.triggerElement;
        if (!isNullOrUndefined(customTriggerElement)) {
            return customTriggerElement;
        }
        var stringifiedValue = typeof value === 'string' ? value : getGradientString(value);
        return (React.createElement("div", { className: cs(prefixCls, className, (_a = {},
                _a[prefixCls + "-size-" + size] = size,
                _a[prefixCls + "-disabled"] = disabled,
                _a)), style: style, ref: ref },
            React.createElement("div", { className: prefixCls + "-preview", style: Array.isArray(value)
                    ? {
                        background: renderBackground(value),
                    }
                    : { backgroundColor: value } }),
            Boolean(showText) && React.createElement("div", { className: prefixCls + "-value" }, stringifiedValue),
            React.createElement("input", { className: prefixCls + "-input", value: stringifiedValue, disabled: disabled, readOnly: true })));
    };
    var renderPanel = function () {
        return (React.createElement(Panel, { value: value, mode: mode, activeMode: activeMode, gradientColors: gradientColors, activeColorId: activeColorId, activeColorIdRef: activeColorIdRef, color: color, alpha: alpha, historyColors: historyColors, presetColors: presetColors, showHistory: showHistory, showPreset: showPreset, onHsvChange: onHsvChange, onAlphaChange: onAlphaChange, onActiveModeChange: onActiveModeChange, onGradientColorsChange: onGradientColorsChange, onActiveColorIdChange: onActiveColorIdChange, disabledAlpha: disabledAlpha, renderFooter: renderFooter }));
    };
    return (React.createElement(Trigger, __assign({ popup: renderPanel, trigger: "click", position: "bl", popupAlign: {
            top: 8,
            bottom: 8,
            left: 8,
            right: 8,
        }, disabled: disabled, popupVisible: popupVisible, classNames: "slideDynamicOrigin", unmountOnExit: unmountOnExit }, triggerProps, { onVisibleChange: onVisibleChange }), renderInput()));
}
var ColorPickerComponent = React.forwardRef(ColorPicker);
ColorPickerComponent.displayName = 'ColorPicker';
export default ColorPickerComponent;
