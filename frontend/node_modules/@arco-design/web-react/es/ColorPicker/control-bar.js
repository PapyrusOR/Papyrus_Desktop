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
import { useControlBlock } from './hooks/useControlBlock';
import cs from '../_util/classNames';
export var ControlBar = function (_a) {
    var className = _a.className, style = _a.style, _b = _a.multiple, multiple = _b === void 0 ? false : _b, value = _a.value, onActive = _a.onActive, onAdd = _a.onAdd, onChange = _a.onChange, renderHandlerStyle = _a.renderHandlerStyle, renderHandlerCenterStyle = _a.renderHandlerCenterStyle;
    var getPrefixCls = useContext(ConfigContext).getPrefixCls;
    var prefixCls = getPrefixCls('color-picker');
    var _c = useControlBlock({
        multiple: multiple,
        value: multiple
            ? value.map(function (item) { return ({
                value: [item.value / 100, 0],
                key: item.key,
            }); })
            : [value, 0],
        onChange: function (pos) { return onChange(pos[0]); },
        onAdd: function (pos) { return onAdd(pos[0]); },
        onActive: onActive,
    }), blockRef = _c.blockRef, handlerRef = _c.handlerRef, onMouseDown = _c.onMouseDown;
    var renderHandler = function () {
        var render = function (x, key, index) {
            return (React.createElement("div", { key: key, ref: handlerRef, className: prefixCls + "-handler", style: __assign({ left: x * 100 + "%" }, renderHandlerStyle === null || renderHandlerStyle === void 0 ? void 0 : renderHandlerStyle(key, index)), "data-key": key },
                React.createElement("div", { className: prefixCls + "-handler-center", style: renderHandlerCenterStyle === null || renderHandlerCenterStyle === void 0 ? void 0 : renderHandlerCenterStyle(key, index), "data-key": key })));
        };
        return multiple
            ? value.map(function (item, index) {
                return render(item.value, item.key, index);
            })
            : render(value);
    };
    return (React.createElement("div", { ref: blockRef, style: style, className: cs(prefixCls + "-control-bar", className), onMouseDown: onMouseDown }, renderHandler()));
};
