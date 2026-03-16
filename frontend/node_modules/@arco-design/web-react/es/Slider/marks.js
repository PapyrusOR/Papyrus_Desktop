import React, { memo } from 'react';
import { isObject, isFunction } from '../_util/is';
import { formatPercent, getIntervalOffset, isNotEmpty } from './utils';
var Marks = function (props) {
    var _a = props.data, data = _a === void 0 ? [] : _a, vertical = props.vertical, prefixCls = props.prefixCls, reverse = props.reverse, intervalConfigs = props.intervalConfigs;
    if (!data.length)
        return null;
    return (React.createElement("div", { className: prefixCls + "-marks" }, data.map(function (_a) {
        var _b, _c;
        var key = _a.key, content = _a.content;
        var offset = formatPercent(getIntervalOffset(+key, intervalConfigs));
        var dom = null;
        if (isObject(content) && isNotEmpty(content.text)) {
            dom = content.text;
        }
        else if (isNotEmpty(content)) {
            dom = content;
        }
        return (isNotEmpty(dom) && (React.createElement("div", { className: prefixCls + "-marks-text", "aria-hidden": true, key: key, style: vertical
                ? (_b = {}, _b[reverse ? 'top' : 'bottom'] = offset, _b) : (_c = {}, _c[reverse ? 'right' : 'left'] = offset, _c), onMouseDown: function (e) {
                e.stopPropagation();
                isFunction(props.onMouseDown) && props.onMouseDown(parseFloat(key));
            } }, dom)));
    })));
};
export default memo(Marks);
