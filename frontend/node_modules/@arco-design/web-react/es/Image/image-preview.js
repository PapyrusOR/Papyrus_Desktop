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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import React, { forwardRef, useContext, useRef, useState, useImperativeHandle, useEffect, useCallback, useMemo, } from 'react';
import ArcoCSSTransition from '../_util/CSSTransition';
import { findDOMNode } from '../_util/react-dom';
import useMergeProps from '../_util/hooks/useMergeProps';
import useMergeValue from '../_util/hooks/useMergeValue';
import cs from '../_util/classNames';
import { on, off, isServerRendering } from '../_util/dom';
import ResizeObserver from '../_util/resizeObserver';
import IconLoading from '../../icon/react-icon/IconLoading';
import IconZoomOut from '../../icon/react-icon/IconZoomOut';
import IconZoomIn from '../../icon/react-icon/IconZoomIn';
import IconFullscreen from '../../icon/react-icon/IconFullscreen';
import IconClose from '../../icon/react-icon/IconClose';
import IconRotateLeft from '../../icon/react-icon/IconRotateLeft';
import IconRotateRight from '../../icon/react-icon/IconRotateRight';
import IconOriginalSize from '../../icon/react-icon/IconOriginalSize';
import ConfigProvider, { ConfigContext } from '../ConfigProvider';
import useImageStatus from './utils/hooks/useImageStatus';
import PreviewScales, { defaultScales } from './utils/getScale';
import getFixTranslate from './utils/getFixTranslate';
import ImagePreviewToolbar from './image-preview-toolbar';
import Portal from '../Portal';
import { PreviewGroupContext } from './previewGroupContext';
import ImagePreviewArrow from './image-preview-arrow';
import useOverflowHidden from '../_util/hooks/useOverflowHidden';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Esc } from '../_util/keycode';
import useUpdate from '../_util/hooks/useUpdate';
import { isUndefined } from '../_util/is';
var ROTATE_STEP = 90;
var defaultProps = {
    maskClosable: true,
    closable: true,
    breakPoint: 316,
    actionsLayout: [
        'fullScreen',
        'rotateRight',
        'rotateLeft',
        'zoomIn',
        'zoomOut',
        'originalSize',
        'extra',
    ],
    getPopupContainer: function () { return document.body; },
    escToExit: true,
    scales: defaultScales,
    resetTranslate: true,
};
function Preview(baseProps, ref) {
    var _a;
    var _b = useContext(PreviewGroupContext), previewGroup = _b.previewGroup, previewUrlMap = _b.previewUrlMap, currentIndex = _b.currentIndex, setCurrentIndex = _b.setCurrentIndex, infinite = _b.infinite, previewPropsMap = _b.previewPropsMap;
    var mergedPreviewProps = previewGroup ? previewPropsMap.get(currentIndex) : {};
    var mergedProps = useMergeProps(baseProps, defaultProps, mergedPreviewProps);
    var className = mergedProps.className, style = mergedProps.style, src = mergedProps.src, defaultVisible = mergedProps.defaultVisible, maskClosable = mergedProps.maskClosable, closable = mergedProps.closable, breakPoint = mergedProps.breakPoint, actions = mergedProps.actions, actionsLayout = mergedProps.actionsLayout, getPopupContainer = mergedProps.getPopupContainer, onVisibleChange = mergedProps.onVisibleChange, scales = mergedProps.scales, escToExit = mergedProps.escToExit, _c = mergedProps.imgAttributes, imgAttributes = _c === void 0 ? {} : _c, imageRender = mergedProps.imageRender, _d = mergedProps.extra, extraNode = _d === void 0 ? null : _d, resetTranslate = mergedProps.resetTranslate;
    var mergedSrc = previewGroup ? previewUrlMap.get(currentIndex) : src;
    var _e = __read(useState(mergedSrc), 2), previewImgSrc = _e[0], setPreviewImgSrc = _e[1];
    var _f = __read(useMergeValue(false, {
        defaultValue: defaultVisible,
        value: mergedProps.visible,
    }), 2), visible = _f[0], setVisible = _f[1];
    var globalContext = useContext(ConfigContext);
    var getPrefixCls = globalContext.getPrefixCls, locale = globalContext.locale, rtl = globalContext.rtl;
    var prefixCls = getPrefixCls('image');
    var previewPrefixCls = prefixCls + "-preview";
    var classNames = cs(previewPrefixCls, (_a = {},
        _a[previewPrefixCls + "-hide"] = !visible,
        _a[previewPrefixCls + "-rtl"] = rtl,
        _a), className);
    var refImage = useRef();
    var refImageContainer = useRef();
    var refWrapper = useRef();
    var refRootWrapper = useRef();
    var keyboardEventOn = useRef(false);
    var refMoveData = useRef({
        pageX: 0,
        pageY: 0,
        originX: 0,
        originY: 0,
    });
    var _g = useImageStatus('loading'), isLoading = _g.isLoading, isLoaded = _g.isLoaded, setStatus = _g.setStatus;
    var _h = __read(useState(false), 2), toolbarSimple = _h[0], setToolbarSimple = _h[1];
    var _j = __read(useState({ x: 0, y: 0 }), 2), translate = _j[0], setTranslate = _j[1];
    var _k = __read(useState(1), 2), scale = _k[0], setScale = _k[1];
    var _l = __read(useState(false), 2), scaleValueVisible = _l[0], setScaleValueVisible = _l[1];
    var _m = __read(useState(0), 2), rotate = _m[0], setRotate = _m[1];
    var _o = __read(useState(false), 2), moving = _o[0], setMoving = _o[1];
    var previewScales = useMemo(function () {
        return new PreviewScales(scales);
    }, []);
    var onLoad = imgAttributes.onLoad, onError = imgAttributes.onError, onMouseDown = imgAttributes.onMouseDown, imgStyle = imgAttributes.style, imgClassName = imgAttributes.className, restImgAttributes = __rest(imgAttributes, ["onLoad", "onError", "onMouseDown", "style", "className"]);
    // Reset image params
    function reset() {
        setTranslate({ x: 0, y: 0 });
        setScale(1);
        setRotate(0);
    }
    useImperativeHandle(ref, function () { return ({
        reset: reset,
        getRootDOMNode: function () { return refRootWrapper.current; },
    }); });
    var _p = __read(useState(), 2), container = _p[0], setContainer = _p[1];
    var getContainer = useCallback(function () { return container; }, [container]);
    useEffect(function () {
        var container = getPopupContainer === null || getPopupContainer === void 0 ? void 0 : getPopupContainer();
        var containerDom = (findDOMNode(container) || document.body);
        setContainer(containerDom);
    }, [getPopupContainer]);
    useOverflowHidden(getContainer, { hidden: visible });
    var isFixed = useMemo(function () { return !isServerRendering && container === document.body; }, [container]);
    // Jump to image at the specified index
    function jumpTo(index) {
        var previewListLen = previewUrlMap.size;
        if (infinite) {
            index %= previewListLen;
            if (index < 0)
                index = previewListLen - Math.abs(index);
        }
        if (index !== currentIndex && index >= 0 && index <= previewListLen - 1) {
            setCurrentIndex(index);
        }
    }
    function onPrev() {
        jumpTo(currentIndex - 1);
    }
    function onNext() {
        jumpTo(currentIndex + 1);
    }
    // Anticlockwise rotation
    function onRotateLeft() {
        setRotate(rotate === 0 ? 360 - ROTATE_STEP : rotate - ROTATE_STEP);
    }
    // Clockwise rotation
    function onRotateRight() {
        setRotate((rotate + ROTATE_STEP) % 360);
    }
    // Scale
    var hideScaleTimer = useRef(null);
    var showScaleValue = function () {
        !scaleValueVisible && setScaleValueVisible(true);
        hideScaleTimer.current && clearTimeout(hideScaleTimer.current);
        hideScaleTimer.current = setTimeout(function () {
            setScaleValueVisible(false);
        }, 1000);
    };
    var onScaleChange = function (newScale) {
        if (scale !== newScale) {
            setScale(newScale);
            showScaleValue();
        }
    };
    function onZoomIn() {
        var newScale = previewScales.getNextScale(scale, 'zoomIn');
        onScaleChange(newScale);
    }
    function onZoomOut() {
        var newScale = previewScales.getNextScale(scale, 'zoomOut');
        onScaleChange(newScale);
    }
    function onWheelZoom(e) {
        if (e.deltaY > 0) {
            // 缩小
            if (scale >= previewScales.minScale) {
                // e.preventDefault();
                onZoomOut();
            }
        }
        else if (scale <= previewScales.maxScale) {
            // e.preventDefault();
            onZoomIn();
        }
    }
    function onResetScale() {
        onScaleChange(1);
    }
    function onFullScreen() {
        var wrapperRect = refWrapper.current.getBoundingClientRect();
        var imgRect = refImage.current.getBoundingClientRect();
        var newHeightScale = wrapperRect.height / (imgRect.height / scale);
        var newWidthScale = wrapperRect.width / (imgRect.width / scale);
        var newScale = Math.max(newHeightScale, newWidthScale);
        onScaleChange(newScale);
    }
    // Image container is clicked
    function onOutsideImgClick(e) {
        if (e.target === e.currentTarget && maskClosable) {
            close();
        }
    }
    // Close button is clicked.
    function onCloseClick() {
        close();
    }
    function close() {
        if (visible) {
            onVisibleChange && onVisibleChange(false, visible);
            isUndefined(mergedProps.visible) && setVisible(false);
        }
    }
    function onWrapperResize(entry) {
        if (entry && entry.length) {
            var wrapperRect = entry[0].contentRect;
            var nextSimple = wrapperRect.width < breakPoint;
            setToolbarSimple(nextSimple);
        }
    }
    // Check the translate and correct it if needed
    var checkAndFixTranslate = function () {
        if (!refWrapper.current || !refImage.current)
            return;
        var wrapperRect = refWrapper.current.getBoundingClientRect();
        var imgRect = refImage.current.getBoundingClientRect();
        var _a = __read(getFixTranslate(wrapperRect, imgRect, translate.x, translate.y, scale), 2), x = _a[0], y = _a[1];
        if (x !== translate.x || y !== translate.y) {
            setTranslate({
                x: x,
                y: y,
            });
        }
    };
    // Update position on moving if needed
    var onMoving = function (e) {
        if (visible && moving) {
            e.preventDefault && e.preventDefault();
            var _a = refMoveData.current, originX = _a.originX, originY = _a.originY, pageX = _a.pageX, pageY = _a.pageY;
            var nextX = originX + (e.pageX - pageX) / scale;
            var nextY = originY + (e.pageY - pageY) / scale;
            setTranslate({
                x: nextX,
                y: nextY,
            });
        }
    };
    var onMoveEnd = function (e) {
        e.preventDefault && e.preventDefault();
        setMoving(false);
    };
    function onImgLoaded(e) {
        setStatus('loaded');
        onLoad && onLoad(e);
    }
    function onImgLoadError(e) {
        setStatus('error');
        onError && onError(e);
    }
    // Record position data on move start
    var onMoveStart = function (e) {
        var _a;
        (_a = e.preventDefault) === null || _a === void 0 ? void 0 : _a.call(e);
        setMoving(true);
        var ev = e.type === 'touchstart' ? e.touches[0] : e;
        refMoveData.current.pageX = ev.pageX;
        refMoveData.current.pageY = ev.pageY;
        refMoveData.current.originX = translate.x;
        refMoveData.current.originY = translate.y;
        onMouseDown === null || onMouseDown === void 0 ? void 0 : onMouseDown(e);
    };
    useEffect(function () {
        if (visible && moving) {
            on(document, 'mousemove', onMoving, false);
            on(document, 'mouseup', onMoveEnd, false);
        }
        return function () {
            off(document, 'mousemove', onMoving, false);
            off(document, 'mouseup', onMoveEnd, false);
        };
    }, [visible, moving]);
    // Correct translate after moved
    useEffect(function () {
        if (resetTranslate && !moving) {
            checkAndFixTranslate();
        }
    }, [moving, translate]);
    // Correct translate when scale changes
    useEffect(function () {
        if (resetTranslate) {
            checkAndFixTranslate();
        }
    }, [scale]);
    // Reset when preview is opened
    useEffect(function () {
        if (visible) {
            reset();
        }
    }, [visible]);
    // Reset on first mount or image switches
    useEffect(function () {
        setPreviewImgSrc(mergedSrc);
        setStatus(mergedSrc ? 'loading' : 'loaded');
        reset();
    }, [mergedSrc]);
    useUpdate(function () {
        previewScales.updateScale(scales);
        setScale(1);
    }, [scales]);
    // Close when pressing esc
    useEffect(function () {
        var onKeyDown = function (e) {
            if (e) {
                switch (e.key) {
                    case Esc.key:
                        if (escToExit) {
                            close();
                        }
                        break;
                    case ArrowRight.key:
                        onNext();
                        break;
                    case ArrowLeft.key:
                        onPrev();
                        break;
                    case ArrowUp.key:
                        onZoomIn();
                        break;
                    case ArrowDown.key:
                        onZoomOut();
                        break;
                    default:
                }
            }
        };
        if (visible && !moving && !keyboardEventOn.current) {
            keyboardEventOn.current = true;
            on(document, 'keydown', onKeyDown);
        }
        return function () {
            keyboardEventOn.current = false;
            off(document, 'keydown', onKeyDown);
        };
    }, [visible, escToExit, moving, currentIndex, scale]);
    var defaultActions = [
        {
            key: 'fullScreen',
            name: locale.ImagePreview.fullScreen,
            content: React.createElement(IconFullscreen, null),
            onClick: onFullScreen,
        },
        {
            key: 'rotateRight',
            name: locale.ImagePreview.rotateRight,
            content: React.createElement(IconRotateRight, null),
            onClick: onRotateRight,
        },
        {
            key: 'rotateLeft',
            name: locale.ImagePreview.rotateLeft,
            content: React.createElement(IconRotateLeft, null),
            onClick: onRotateLeft,
        },
        {
            key: 'zoomIn',
            name: locale.ImagePreview.zoomIn,
            content: React.createElement(IconZoomIn, null),
            onClick: onZoomIn,
            disabled: scale === previewScales.maxScale,
        },
        {
            key: 'zoomOut',
            name: locale.ImagePreview.zoomOut,
            content: React.createElement(IconZoomOut, null),
            onClick: onZoomOut,
            disabled: scale === previewScales.minScale,
        },
        {
            key: 'originalSize',
            name: locale.ImagePreview.originalSize,
            content: React.createElement(IconOriginalSize, null),
            onClick: onResetScale,
        },
    ];
    var renderImage = function () {
        var _a;
        var _b;
        var image = (React.createElement("img", __assign({ onWheel: onWheelZoom, ref: refImage, className: cs(imgClassName, previewPrefixCls + "-img", (_a = {},
                _a[previewPrefixCls + "-img-moving"] = moving,
                _a)), style: __assign(__assign({}, imgStyle), { transform: "translate(" + translate.x + "px, " + translate.y + "px) rotate(" + rotate + "deg)" }), key: previewImgSrc, src: previewImgSrc }, restImgAttributes, { onLoad: onImgLoaded, onError: onImgLoadError, onMouseDown: function (event) {
                // only trigger onMoveStart when press mouse left button
                event.button === 0 && onMoveStart(event);
            } })));
        return (_b = imageRender === null || imageRender === void 0 ? void 0 : imageRender(image)) !== null && _b !== void 0 ? _b : image;
    };
    return (React.createElement(Portal, { visible: visible, forceRender: false, getContainer: getContainer },
        React.createElement(ConfigProvider, __assign({}, globalContext, { getPopupContainer: function () { return refWrapper.current; } }),
            React.createElement("div", { className: classNames, style: __assign(__assign({}, (style || {})), (isFixed ? {} : { zIndex: 'inherit', position: 'absolute' })), ref: refRootWrapper },
                React.createElement(ArcoCSSTransition, { in: visible, timeout: 400, appear: true, classNames: "fadeImage", mountOnEnter: true, unmountOnExit: false, onEnter: function (e) {
                        if (!e)
                            return;
                        e.parentNode.style.display = 'block';
                        e.style.display = 'block';
                    }, onExited: function (e) {
                        if (!e)
                            return;
                        e.parentNode.style.display = '';
                        e.style.display = 'none';
                    } },
                    React.createElement("div", { className: previewPrefixCls + "-mask" })),
                visible && (React.createElement(ResizeObserver, { onResize: onWrapperResize, getTargetDOMNode: function () { return refWrapper.current; } },
                    React.createElement("div", { ref: refWrapper, className: previewPrefixCls + "-wrapper", onClick: onOutsideImgClick },
                        React.createElement("div", { ref: refImageContainer, className: previewPrefixCls + "-img-container", style: { transform: "scale(" + scale + ", " + scale + ")" }, onClick: onOutsideImgClick },
                            renderImage(),
                            isLoading && (React.createElement("div", { className: previewPrefixCls + "-loading" },
                                React.createElement(IconLoading, null)))),
                        React.createElement(ArcoCSSTransition, { in: scaleValueVisible, timeout: 400, appear: true, classNames: "fadeImage", unmountOnExit: true },
                            React.createElement("div", { className: previewPrefixCls + "-scale-value" },
                                (scale * 100).toFixed(0),
                                "%")),
                        isLoaded && (React.createElement(ImagePreviewToolbar, { prefixCls: prefixCls, previewPrefixCls: previewPrefixCls, actions: actions, actionsLayout: actionsLayout, defaultActions: defaultActions, simple: toolbarSimple })),
                        closable && (React.createElement("div", { className: previewPrefixCls + "-close-btn", onClick: onCloseClick },
                            React.createElement(IconClose, null))),
                        previewGroup && (React.createElement(ImagePreviewArrow, { previewCount: previewUrlMap.size, current: currentIndex, infinite: infinite, onPrev: onPrev, onNext: onNext })),
                        extraNode)))))));
}
var PreviewComponent = forwardRef(Preview);
PreviewComponent.displayName = 'ImagePreview';
export default PreviewComponent;
