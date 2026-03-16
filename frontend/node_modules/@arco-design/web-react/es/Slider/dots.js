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
import React, { memo } from 'react';
import { isObject, isFunction } from '../_util/is';
import { formatPercent, valueInRange, getIntervalOffset } from './utils';
import cs from '../_util/classNames';
var Dots = function (props) {
    var _a = props.data, data = _a === void 0 ? [] : _a, _b = props.valueRange, valueRange = _b === void 0 ? [] : _b, vertical = props.vertical, prefixCls = props.prefixCls, reverse = props.reverse, intervalConfigs = props.intervalConfigs;
    if (!data.length)
        return null;
    return (React.createElement("div", { className: prefixCls + "-dots" }, data.map(function (_a) {
        var _b, _c, _d;
        var key = _a.key, content = _a.content;
        var offset = formatPercent(getIntervalOffset(+key, intervalConfigs));
        return (React.createElement("div", { className: prefixCls + "-dot-wrapper", key: key, style: __assign({}, (vertical
                ? (_b = {}, _b[reverse ? 'top' : 'bottom'] = offset, _b) : (_c = {}, _c[reverse ? 'right' : 'left'] = offset, _c))), onMouseDown: function (e) {
                e.stopPropagation();
                isFunction(props.onMouseDown) && props.onMouseDown(parseFloat(key));
            } }, isObject(content) && content.dot ? (content.dot) : (React.createElement("div", { className: cs(prefixCls + "-dot", (_d = {},
                _d[prefixCls + "-dot-active"] = valueInRange(key, valueRange),
                _d)) }))));
    })));
};
export default memo(Dots);
