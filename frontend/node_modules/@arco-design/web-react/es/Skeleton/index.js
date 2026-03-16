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
import cs from '../_util/classNames';
import { isObject } from '../_util/is';
import Text from './text';
import Image from './image';
import { ConfigContext } from '../ConfigProvider';
import useMergeProps from '../_util/hooks/useMergeProps';
import { pickDataAttributes } from '../_util/pick';
function getComponentProps(prop) {
    return isObject(prop) ? prop : {};
}
var defaultProps = {
    text: true,
    loading: true,
};
function Skeleton(baseProps, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Skeleton);
    var style = props.style, className = props.className, animation = props.animation, loading = props.loading, image = props.image, text = props.text, children = props.children;
    var imageProps = getComponentProps(image);
    var textProps = getComponentProps(text);
    var prefixCls = getPrefixCls('skeleton');
    var classNames = cs(prefixCls, (_a = {},
        _a[prefixCls + "-animate"] = animation,
        _a[prefixCls + "-rtl"] = rtl,
        _a), className);
    function renderImage() {
        return (image && (React.createElement("div", { className: prefixCls + "-header" },
            React.createElement(Image, __assign({ prefixCls: prefixCls }, imageProps)))));
    }
    function renderText() {
        return (text && (React.createElement("div", { className: prefixCls + "-content" },
            React.createElement(Text, __assign({ prefixCls: prefixCls }, textProps)))));
    }
    return (React.createElement(React.Fragment, null, loading ? (React.createElement("div", __assign({}, pickDataAttributes(props), { className: classNames, style: style, ref: ref }),
        imageProps.position !== 'right' && renderImage(),
        renderText(),
        imageProps.position === 'right' && renderImage())) : (children)));
}
var SkeletonComponent = forwardRef(Skeleton);
SkeletonComponent.displayName = 'Skeleton';
export default SkeletonComponent;
