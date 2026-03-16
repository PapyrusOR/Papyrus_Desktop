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
import React, { forwardRef, useContext } from 'react';
import Base from './base';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
function ParagraphComponent(props, ref) {
    var _a = props.spacing, spacing = _a === void 0 ? 'default' : _a, className = props.className;
    var getPrefixCls = useContext(ConfigContext).getPrefixCls;
    var prefixCls = getPrefixCls('typography');
    var classNames = spacing === 'close' ? cs(prefixCls + "-spacing-close", className) : className;
    return React.createElement(Base, __assign({}, props, { ref: ref, componentType: "Paragraph", className: classNames }));
}
var Paragraph = forwardRef(ParagraphComponent);
Paragraph.displayName = 'Paragraph';
export default Paragraph;
