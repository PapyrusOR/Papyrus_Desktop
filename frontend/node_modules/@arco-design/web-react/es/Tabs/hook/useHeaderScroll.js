import { useRef, useEffect } from 'react';
import { on, off } from '../../_util/dom';
export default function useHeaderScroll(props) {
    var headerWrapperRef = props.headerWrapperRef, headerOffset = props.headerOffset, align = props.align, isScrollable = props.isScrollable, direction = props.direction, onScroll = props.onScroll, onScrollStart = props.onScrollStart, onScrollEnd = props.onScrollEnd;
    var headerOffsetRef = useRef(headerOffset);
    headerOffsetRef.current = headerOffset;
    var rafIdRef = useRef(null);
    var endTimerRef = useRef(null);
    var scrollingRef = useRef(false);
    var pendingOffsetRef = useRef(null);
    var scheduleScrollEnd = function () {
        if (endTimerRef.current != null) {
            window.clearTimeout(endTimerRef.current);
        }
        endTimerRef.current = window.setTimeout(function () {
            scrollingRef.current = false;
            if (onScrollEnd)
                onScrollEnd();
            endTimerRef.current = null;
        }, 80);
    };
    function scheduleOffset(offsetX, offsetY) {
        if (!isScrollable)
            return;
        pendingOffsetRef.current = { x: offsetX, y: offsetY };
        if (!scrollingRef.current) {
            scrollingRef.current = true;
            if (onScrollStart)
                onScrollStart();
        }
        if (rafIdRef.current == null) {
            rafIdRef.current = window.requestAnimationFrame(function () {
                rafIdRef.current = null;
                var pending = pendingOffsetRef.current;
                if (pending) {
                    var offset = 0;
                    if (direction === 'vertical') {
                        offset = headerOffsetRef.current + pending.y;
                    }
                    else {
                        offset =
                            align === 'left'
                                ? headerOffsetRef.current + pending.x
                                : headerOffsetRef.current - pending.x;
                    }
                    if (onScroll)
                        onScroll(offset);
                    pendingOffsetRef.current = null;
                }
                scheduleScrollEnd();
            });
        }
        else {
            scheduleScrollEnd();
        }
    }
    function onOffset(offsetX, offsetY) {
        scheduleOffset(offsetX, offsetY);
    }
    // wheel
    var lastWheelDirectionRef = useRef('x');
    function onWheel(e) {
        if (!isScrollable)
            return;
        e.preventDefault();
        var deltaX = e.deltaX, deltaY = e.deltaY;
        var offset = 0;
        var absX = Math.abs(deltaX);
        var absY = Math.abs(deltaY);
        if (absX === absY) {
            offset = lastWheelDirectionRef.current === 'x' ? deltaX : deltaY;
        }
        else if (absX > absY) {
            offset = deltaX;
            lastWheelDirectionRef.current = 'x';
        }
        else {
            offset = deltaY;
            lastWheelDirectionRef.current = 'y';
        }
        onOffset(offset, offset);
    }
    // touch
    var positionRef = useRef({
        clientX: 0,
        clientY: 0,
    });
    var getPosition = function (e) {
        return e && e.touches && e.touches.length && e.touches[0];
    };
    var onTouchMove = function (e) {
        if (e.cancelable)
            e.preventDefault();
        var position = getPosition(e);
        if (!position)
            return;
        var _a = positionRef.current, clientX = _a.clientX, clientY = _a.clientY;
        // 往右移动的距离
        var offsetX = position.clientX - clientX;
        // 往下移动的距离
        var offsetY = position.clientY - clientY;
        onOffset(-offsetX, -offsetY);
    };
    var onTouchMoveEnd = function () {
        off(document.documentElement, 'touchmove', onTouchMove);
        off(window, 'touchend', onTouchMoveEnd);
        scheduleScrollEnd();
    };
    var onTouchStart = function (e) {
        if (!isScrollable)
            return;
        var position = getPosition(e);
        if (!position)
            return;
        positionRef.current = {
            clientX: position.clientX,
            clientY: position.clientY,
        };
        on(document.documentElement, 'touchmove', onTouchMove, { passive: false });
        on(window, 'touchend', onTouchMoveEnd, { passive: false });
        if (!scrollingRef.current) {
            scrollingRef.current = true;
            if (onScrollStart)
                onScrollStart();
        }
    };
    var eventProxy = useRef(null);
    eventProxy.current = { onWheel: onWheel, onTouchStart: onTouchStart };
    useEffect(function () {
        var node = headerWrapperRef.current;
        if (!node)
            return;
        var wheelListener = function (e) {
            eventProxy.current.onWheel(e);
        };
        var touchStartListener = function (e) {
            eventProxy.current.onTouchStart(e);
        };
        on(node, 'wheel', wheelListener, { passive: false });
        on(node, 'touchstart', touchStartListener, { passive: true });
        return function () {
            off(node, 'wheel', wheelListener);
            off(node, 'touchstart', touchStartListener);
            off(document.documentElement, 'touchmove', onTouchMove);
            off(window, 'touchend', onTouchMoveEnd);
            if (rafIdRef.current != null) {
                window.cancelAnimationFrame(rafIdRef.current);
                rafIdRef.current = null;
            }
            if (endTimerRef.current != null) {
                window.clearTimeout(endTimerRef.current);
                endTimerRef.current = null;
            }
            pendingOffsetRef.current = null;
            scrollingRef.current = false;
        };
    }, [headerWrapperRef.current, isScrollable]);
}
