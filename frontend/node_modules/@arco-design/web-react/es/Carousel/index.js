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
import React, { useContext, useEffect, useImperativeHandle, useRef, useState, } from 'react';
import cs from '../_util/classNames';
import CarouselIndicator from './indicator';
import CarouselArrow from './arrow';
import { ConfigContext } from '../ConfigProvider';
import { useInterval } from '../_util/hooks/useInterval';
import ResizeObserver from '../_util/resizeObserver';
import warning from '../_util/warning';
import omit from '../_util/omit';
import useMergeProps from '../_util/hooks/useMergeProps';
var DEFAULT_AUTO_PLAY_INTERVAL = 3000;
var defaultProps = {
    animation: 'slide',
    indicatorType: 'dot',
    indicatorPosition: 'bottom',
    direction: 'horizontal',
    showArrow: 'always',
    trigger: 'click',
    moveSpeed: 500,
    timingFunc: 'cubic-bezier(0.34, 0.69, 0.1, 1)',
};
function Carousel(baseProps, ref) {
    var _a, _b, _c;
    var _d = useContext(ConfigContext), getPrefixCls = _d.getPrefixCls, componentConfig = _d.componentConfig, rtl = _d.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Carousel);
    var style = props.style, className = props.className, children = props.children, currentIndex = props.currentIndex, animation = props.animation, trigger = props.trigger, direction = props.direction, moveSpeed = props.moveSpeed, timingFunc = props.timingFunc, indicatorType = props.indicatorType, indicatorPosition = props.indicatorPosition, indicatorClassName = props.indicatorClassName, showArrow = props.showArrow, miniRender = props.miniRender, arrowClassName = props.arrowClassName, carousel = props.carousel, icons = props.icons, onChange = props.onChange, rest = __rest(props, ["style", "className", "children", "currentIndex", "animation", "trigger", "direction", "moveSpeed", "timingFunc", "indicatorType", "indicatorPosition", "indicatorClassName", "showArrow", "miniRender", "arrowClassName", "carousel", "icons", "onChange"]);
    // TODO 兼容 autoPlaySpeed， 3.x 移除
    var autoPlay = props.autoPlay;
    if (autoPlay && props.autoPlaySpeed) {
        autoPlay = {
            interval: props.autoPlaySpeed,
        };
        warning(true, "[Arco Carousel] The 'autoPlaySpeed' property will be removed in the next major version, please use 'autoPlay.interval' instead.");
    }
    var childrenList = React.Children.toArray(children).filter(function (child) {
        return React.isValidElement(child);
    });
    var childrenLength = childrenList.length;
    var refDom = useRef(null);
    var refSliderWrapper = useRef(null);
    var refAnimationTimer = useRef(null);
    var _e = __read(useState(typeof currentIndex === 'number' ? getValidIndex(currentIndex) : 0), 2), index = _e[0], setIndex = _e[1];
    var _f = __read(useState(index), 2), previousIndex = _f[0], setPreviousIndex = _f[1];
    var _g = __read(useState(false), 2), isPause = _g[0], setIsPause = _g[1];
    var _h = __read(useState(false), 2), isAnimating = _h[0], setIsAnimating = _h[1];
    var _j = __read(useState(null), 2), slideDirection = _j[0], setSlideDirection = _j[1];
    var _k = __read(useState({
        sliderWrapper: null,
        indicatorWrapper: null,
    }), 2), computedStyle = _k[0], setComputedStyle = _k[1];
    var mergedIndex = typeof currentIndex === 'number' ? getValidIndex(currentIndex) : index;
    var prevIndex = getValidIndex(mergedIndex - 1);
    var nextIndex = getValidIndex(mergedIndex + 1);
    var autoPlayInterval = typeof autoPlay === 'object' && autoPlay.interval
        ? autoPlay.interval
        : DEFAULT_AUTO_PLAY_INTERVAL;
    useEffect(function () {
        return function () { return refAnimationTimer.current && clearTimeout(refAnimationTimer.current); };
    }, []);
    useEffect(function () {
        slideTo({
            targetIndex: mergedIndex,
        });
    }, [mergedIndex]);
    var resetInterval = useInterval(function () {
        slideTo({
            targetIndex: nextIndex,
        });
    }, autoPlay && !isPause && childrenLength > 1 ? autoPlayInterval : null);
    useImperativeHandle(carousel, function () {
        return {
            dom: refDom.current,
            getRootDOMNode: function () { return refDom.current; },
            goto: function (_a) {
                var index = _a.index, isNegative = _a.isNegative, isManual = _a.isManual, resetAutoPlayInterval = _a.resetAutoPlayInterval;
                slideTo({
                    targetIndex: getValidIndex(index),
                    isNegative: isNegative,
                    isManual: isManual,
                    resetAutoPlayInterval: resetAutoPlayInterval,
                });
            },
        };
    });
    function getValidIndex(i) {
        var indexNumber = +i;
        return typeof indexNumber === 'number' && !isNaN(indexNumber)
            ? (indexNumber + childrenLength) % childrenLength
            : i;
    }
    function slideTo(_a) {
        var targetIndex = _a.targetIndex, _b = _a.isNegative, isNegative = _b === void 0 ? false : _b, _c = _a.isManual, isManual = _c === void 0 ? false : _c, _d = _a.resetAutoPlayInterval, resetAutoPlayInterval = _d === void 0 ? false : _d;
        if (!isAnimating && targetIndex !== mergedIndex) {
            setIsAnimating(true);
            setIndex(targetIndex);
            setPreviousIndex(index);
            setSlideDirection(isNegative ? 'negative' : 'positive');
            onChange && onChange(targetIndex, mergedIndex, isManual);
            if (autoPlay && resetAutoPlayInterval) {
                resetInterval();
            }
            refAnimationTimer.current = setTimeout(function () {
                setIsAnimating(false);
                refAnimationTimer.current = null;
            }, moveSpeed);
        }
    }
    function computeStyle() {
        if (animation === 'card') {
            if (refSliderWrapper.current) {
                var sliderElement = refSliderWrapper.current.children[0];
                if (!sliderElement) {
                    return;
                }
                if (direction === 'horizontal') {
                    var totalWidth = refSliderWrapper.current.clientWidth;
                    var sliderWidth = sliderElement.clientWidth;
                    var edge = (totalWidth - sliderWidth) / 2;
                    // deltaZ is TranslateZ(-Zpx) of prev/next slider's style
                    // perspective / (perspective + deltaZ) = x / X
                    var deltaZ = 200;
                    var x = totalWidth / 2;
                    var X = sliderWidth;
                    // avoid getting a huge perspective value
                    var perspective = x + 50 >= X ? deltaZ * 4 : (deltaZ * x) / (X - x);
                    setComputedStyle({
                        sliderWrapper: {
                            perspective: perspective,
                        },
                        indicatorWrapper: {
                            width: 'auto',
                            left: edge,
                            right: edge,
                        },
                    });
                }
                else {
                    var totalHeight = refSliderWrapper.current.clientHeight;
                    var sliderHeight = sliderElement.clientHeight;
                    var edge = (totalHeight - sliderHeight) / 2;
                    // deltaZ is TranslateZ(-Zpx) of prev/next slider's style
                    // perspective / (perspective + deltaZ) = x / X
                    var deltaZ = 200;
                    var y = totalHeight / 2;
                    var Y = sliderHeight;
                    // avoid getting a huge perspective value
                    var perspective = y + 50 >= Y ? deltaZ * 4 : (deltaZ * y) / (Y - y);
                    setComputedStyle({
                        sliderWrapper: {
                            perspective: perspective,
                        },
                        indicatorWrapper: {
                            height: 'auto',
                            top: edge,
                            bottom: edge,
                        },
                    });
                }
            }
        }
        else {
            setComputedStyle({
                sliderWrapper: null,
                indicatorWrapper: null,
            });
        }
    }
    var prefixCls = getPrefixCls('carousel');
    var classNames = cs(prefixCls, prefixCls + "-indicator-position-" + indicatorPosition, (_a = {},
        _a[prefixCls + "-rtl"] = rtl,
        _a), className);
    var eventHandlers = Object.assign({}, autoPlay && (typeof autoPlay !== 'object' || autoPlay.hoverToPause !== false)
        ? {
            onMouseEnter: function () { return setIsPause(true); },
            onMouseLeave: function () { return setIsPause(false); },
        }
        : null);
    var _l = __read([
        function () {
            return slideTo({
                targetIndex: prevIndex,
                isNegative: true,
                isManual: true,
            });
        },
        function () {
            return slideTo({
                targetIndex: nextIndex,
                isManual: true,
            });
        },
    ], 2), slideToPrev = _l[0], slideToNext = _l[1];
    if (rtl) {
        _b = __read([slideToNext, slideToPrev], 2), slideToPrev = _b[0], slideToNext = _b[1];
    }
    return (React.createElement(ResizeObserver, { onResize: computeStyle, getTargetDOMNode: function () { return refDom.current; } },
        React.createElement("div", __assign({ ref: function (_ref) {
                ref = _ref;
                refDom.current = ref;
            }, className: classNames, style: style }, omit(rest, ['autoplay', 'autoPlaySpeed']), eventHandlers),
            React.createElement("div", { ref: refSliderWrapper, style: computedStyle.sliderWrapper, className: cs(prefixCls + "-" + animation, prefixCls + "-" + direction, (_c = {},
                    _c[prefixCls + "-negative"] = slideDirection === 'negative',
                    _c)) }, childrenList.map(function (child, index) {
                var _a;
                var isCurrent = index === mergedIndex;
                var isPrev = index === prevIndex;
                var isNext = index === nextIndex;
                var shouldRenderChild = !miniRender || isCurrent || isPrev || isNext;
                if (!shouldRenderChild) {
                    return null;
                }
                var _b = child.props, childStyle = _b.style, childClassName = _b.className, childOnClick = _b.onClick;
                return React.cloneElement(child, {
                    'aria-hidden': !isCurrent,
                    style: Object.assign({
                        transitionTimingFunction: timingFunc,
                        transitionDuration: moveSpeed + "ms",
                        animationTimingFunction: timingFunc,
                        animationDuration: moveSpeed + "ms",
                    }, childStyle),
                    className: cs(childClassName, (_a = {},
                        _a[prefixCls + "-item-prev"] = isPrev,
                        _a[prefixCls + "-item-next"] = isNext,
                        _a[prefixCls + "-item-current"] = isCurrent,
                        _a[prefixCls + "-item-slide-in"] = animation === 'slide' && slideDirection && isAnimating && isCurrent,
                        _a[prefixCls + "-item-slide-out"] = animation === 'slide' && slideDirection && isAnimating && index === previousIndex,
                        _a)),
                    onClick: function (event) {
                        childOnClick && childOnClick(event);
                        slideTo({
                            targetIndex: index,
                            isNegative: index === prevIndex,
                            isManual: true,
                        });
                    },
                });
            })),
            indicatorType !== 'never' && childrenLength > 1 && (React.createElement("div", { style: computedStyle.indicatorWrapper, className: cs(prefixCls + "-indicator-wrapper", prefixCls + "-indicator-wrapper-" + indicatorPosition) },
                React.createElement(CarouselIndicator, { className: indicatorClassName, type: indicatorType, count: childrenLength, activeIndex: mergedIndex, position: indicatorPosition, trigger: trigger, onSelectIndex: function (index) {
                        return slideTo({
                            targetIndex: index,
                            isNegative: index < mergedIndex,
                            isManual: true,
                        });
                    } }))),
            showArrow !== 'never' && childrenLength > 1 && (React.createElement(CarouselArrow, { className: arrowClassName, direction: direction, showArrow: showArrow, icons: icons, prev: slideToPrev, next: slideToNext })))));
}
var CarouselComponent = React.forwardRef(Carousel);
CarouselComponent.displayName = 'Carousel';
export default CarouselComponent;
