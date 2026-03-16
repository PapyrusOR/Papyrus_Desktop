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
import React, { forwardRef, useRef, useContext, useCallback, useEffect } from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import useMergeProps from '../_util/hooks/useMergeProps';
import useWatermark from '../_hooks/useWatermark';
var defaultProps = {};
var watermarkOptionsKey = [
    'zIndex',
    'width',
    'height',
    'rotate',
    'image',
    'content',
    'fontStyle',
    'gap',
    'offset',
    'getContainer',
];
export function WatermarkComponent(baseProps, _) {
    var _a;
    var _b;
    var ctx = useContext(ConfigContext);
    var props = useMergeProps(baseProps, defaultProps, (_b = ctx.componentConfig) === null || _b === void 0 ? void 0 : _b.Watermark);
    var containerRef = useRef();
    var getContainer = useCallback(function () {
        var _a;
        return containerRef.current || ((_a = props.getContainer) === null || _a === void 0 ? void 0 : _a.call(props));
    }, [containerRef.current, props.getContainer]);
    var watermarkOptions = watermarkOptionsKey.reduce(function (t, key) {
        if (key in props) {
            t[key] = props[key];
        }
        return t;
    }, {});
    var setWatermark = useWatermark(__assign(__assign({}, watermarkOptions), { getContainer: getContainer })).setWatermark;
    useEffect(function () {
        setWatermark(__assign(__assign({}, watermarkOptions), { getContainer: getContainer }));
    }, [
        props.zIndex,
        props.width,
        props.height,
        props.rotate,
        props.image,
        props.content,
        JSON.stringify(props.fontStyle),
        JSON.stringify(props.gap),
        JSON.stringify(props.offset),
        getContainer,
    ]);
    var prefix = ctx.getPrefixCls('watermark');
    return props.children ? (React.createElement("div", { className: cs("" + prefix, props.className, (_a = {},
            _a[prefix + "-rtl"] = ctx.rtl,
            _a)), style: props.style, ref: containerRef }, props.children)) : null;
}
var Watermark = forwardRef(WatermarkComponent);
export default Watermark;
