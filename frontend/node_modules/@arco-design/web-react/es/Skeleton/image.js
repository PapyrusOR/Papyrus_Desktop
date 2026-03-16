import React from 'react';
import cs from '../_util/classNames';
export default function image(props) {
    var _a;
    var style = props.style, _b = props.shape, shape = _b === void 0 ? 'square' : _b, size = props.size, _c = props.position, position = _c === void 0 ? 'left' : _c, className = props.className, prefixCls = props.prefixCls;
    var classNames = cs(prefixCls + "-image", (_a = {},
        _a[prefixCls + "-image-" + position] = position,
        _a[prefixCls + "-image-" + shape] = shape,
        _a[prefixCls + "-image-" + size] = size,
        _a), className);
    return React.createElement("div", { className: classNames, style: style });
}
