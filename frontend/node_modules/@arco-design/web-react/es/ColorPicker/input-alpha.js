import React, { useContext } from 'react';
import InputNumber from '../InputNumber';
import { ConfigContext } from '../ConfigProvider';
export var InputAlpha = function (_a) {
    var value = _a.value, onChange = _a.onChange;
    var getPrefixCls = useContext(ConfigContext).getPrefixCls;
    var prefixCls = getPrefixCls('color-picker');
    return (React.createElement(InputNumber, { className: prefixCls + "-input-alpha", size: "mini", min: 0, max: 100, value: Math.round(value * 100), suffix: "%", onChange: function (a) { return onChange(a / 100); } }));
};
