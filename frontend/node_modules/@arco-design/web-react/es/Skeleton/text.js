import React from 'react';
import { isArray } from '../_util/is';
import cs from '../_util/classNames';
export default function text(props) {
    var style = props.style, _a = props.width, width = _a === void 0 ? '60%' : _a, _b = props.rows, rows = _b === void 0 ? 3 : _b, className = props.className, prefixCls = props.prefixCls;
    var classNames = cs(prefixCls + "-text", className);
    var nodes = [];
    function getTextWidth(index) {
        if (isArray(width)) {
            return width[index];
        }
        if (rows - 1 === index) {
            return width;
        }
        return undefined;
    }
    for (var i = 0; i < rows; i++) {
        nodes.push(React.createElement("li", { className: prefixCls + "-text-row", key: i, style: { width: getTextWidth(i) } }));
    }
    return (React.createElement("ul", { className: classNames, style: style }, nodes));
}
