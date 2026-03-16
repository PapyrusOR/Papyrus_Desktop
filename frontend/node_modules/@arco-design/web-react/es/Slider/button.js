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
import React, { useState, useContext, memo, useEffect, useRef, useMemo, } from 'react';
import cs from '../_util/classNames';
import { on, off } from '../_util/dom';
import { isFunction, isNumber, isString } from '../_util/is';
import Trigger from '../Trigger';
import { ConfigContext } from '../ConfigProvider';
import useMergeValue from '../_util/hooks/useMergeValue';
import useKeyboardEvent from '../_util/hooks/useKeyboardEvent';
var triggerStyle = { maxWidth: 350 };
var triggerDuration = {
    enter: 300,
    exit: 100,
};
var triggerPopupAlign = {
    left: 12,
    right: 12,
    top: 12,
    bottom: 12,
};
var SliderButton = function (props) {
    var _a;
    // props
    var style = props.style, disabled = props.disabled, prefixCls = props.prefixCls, value = props.value, vertical = props.vertical, tooltipVisible = props.tooltipVisible, tooltipPosition = props.tooltipPosition, formatTooltip = props.formatTooltip, getTooltipContainer = props.getTooltipContainer, onMoving = props.onMoving, onMoveEnd = props.onMoveEnd, onMoveBegin = props.onMoveBegin;
    var getKeyboardEvents = useKeyboardEvent();
    // state
    var _b = __read(useState(false), 2), isActive = _b[0], setIsActive = _b[1];
    var _c = __read(useMergeValue(false, { value: tooltipVisible }), 2), popupVisible = _c[0], setPopupVisible = _c[1];
    var getPrefixCls = useContext(ConfigContext).getPrefixCls;
    var position = useMemo(function () { return tooltipPosition || (vertical ? 'right' : 'top'); }, [tooltipPosition, vertical]);
    var delayTimer = useRef(null);
    var inButtonOrPopup = useRef(false);
    var isDragging = useRef(false);
    var tooltip = useRef(null);
    function handleMouseDown(e) {
        e.stopPropagation();
        if (disabled)
            return;
        moveStart(e);
        setIsActive(true);
        on(window, 'mousemove', moving);
        on(window, 'touchmove', moving);
        on(window, 'mouseup', moveEnd);
        on(window, 'touchend', moveEnd);
        on(window, 'contextmenu', moveEnd);
    }
    // 鼠标移入
    function handleMouseEnter() {
        inButtonOrPopup.current = true;
        clearDelayTimer();
        if (!popupVisible) {
            delayTimer.current = setTimeout(function () {
                updatePopupVisible(true);
            }, 50);
        }
    }
    // 鼠标移出
    function handleMouseLeave() {
        inButtonOrPopup.current = false;
        if (!isDragging.current) {
            clearDelayTimer();
            delayTimer.current = setTimeout(function () {
                updatePopupVisible(false);
            }, 200);
        }
    }
    function moveStart(e) {
        // 如果不阻止默认行为可能会在拖动时产生鼠标选中状态，所以手动处理元素失焦
        e.preventDefault();
        var activeElement = document.activeElement;
        activeElement && activeElement.blur && activeElement.blur();
        isFunction(onMoveBegin) && onMoveBegin();
    }
    function moving(e) {
        isDragging.current = true;
        if (e.type === 'touchstart') {
            e.clientY = e.touches[0].clientY;
            e.clientX = e.touches[0].clientX;
        }
        isFunction(onMoving) && onMoving(e.clientX, e.clientY);
    }
    function moveEnd() {
        isDragging.current = false;
        setIsActive(false);
        offEvents();
        updatePopupVisible(inButtonOrPopup.current);
        isFunction(onMoveEnd) && onMoveEnd();
    }
    function offEvents() {
        clearDelayTimer();
        off(window, 'mousemove', moving);
        off(window, 'touchmove', moving);
        off(window, 'mouseup', moveEnd);
        off(window, 'touchend', moveEnd);
        off(window, 'contextmenu', moveEnd);
    }
    // 清除定时器
    function clearDelayTimer() {
        if (delayTimer.current) {
            clearTimeout(delayTimer.current);
            delayTimer.current = null;
        }
    }
    // 设置 tooltip 显示状态
    function updatePopupVisible(value) {
        if (isDragging.current)
            return;
        var newPopupVisible = 'tooltipVisible' in props ? tooltipVisible : value;
        setPopupVisible(newPopupVisible);
    }
    function handlePopupMouseEnter() {
        inButtonOrPopup.current = true;
        clearDelayTimer();
    }
    var tooltipText = useMemo(function () {
        return isFunction(formatTooltip) ? formatTooltip(value) : value;
    }, [formatTooltip, value]);
    function renderTooltipContent(position) {
        var tooltipPrefixCls = getPrefixCls('tooltip');
        return (React.createElement("div", { className: cs(tooltipPrefixCls + "-content", tooltipPrefixCls + "-content-" + position), onMouseLeave: handleMouseLeave, onMouseEnter: handlePopupMouseEnter, onClick: function (e) {
                e.stopPropagation();
            } },
            React.createElement("div", { className: tooltipPrefixCls + "-content-inner" }, tooltipText)));
    }
    useEffect(function () {
        tooltip && tooltip.current && tooltip.current.updatePopupPosition();
    }, [value]);
    return (React.createElement(Trigger, { style: triggerStyle, classNames: "zoomInFadeOut", duration: triggerDuration, showArrow: true, popupAlign: triggerPopupAlign, ref: tooltip, popup: function () { return renderTooltipContent(position); }, popupVisible: popupVisible, disabled: tooltipVisible === false, getPopupContainer: getTooltipContainer, position: position, childrenPrefix: getPrefixCls('tooltip') },
        React.createElement("div", __assign({ className: cs(prefixCls + "-button", (_a = {}, _a[prefixCls + "-button-active"] = isActive, _a)), onMouseDown: handleMouseDown, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, style: style, role: "slider", "aria-valuemax": props.maxValue, "aria-valuemin": props.minValue, "aria-valuenow": value, "aria-disabled": !!disabled, tabIndex: disabled ? -1 : 0, "aria-valuetext": isString(tooltipText) || isNumber(tooltipText) ? String(tooltipText) : undefined }, getKeyboardEvents({
            onArrowRight: function (e) {
                var _a;
                e.preventDefault();
                (_a = props.onArrowEvent) === null || _a === void 0 ? void 0 : _a.call(props, 'addition');
            },
            onArrowUp: function (e) {
                var _a;
                e.preventDefault();
                (_a = props.onArrowEvent) === null || _a === void 0 ? void 0 : _a.call(props, 'addition');
            },
            onArrowLeft: function (e) {
                var _a;
                e.preventDefault();
                (_a = props.onArrowEvent) === null || _a === void 0 ? void 0 : _a.call(props, 'subtraction');
            },
            onArrowDown: function (e) {
                var _a;
                e.preventDefault();
                (_a = props.onArrowEvent) === null || _a === void 0 ? void 0 : _a.call(props, 'subtraction');
            },
        })))));
};
export default memo(SliderButton);
