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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState, useEffect, useRef, useContext, forwardRef, useImperativeHandle, } from 'react';
import { ConfigContext } from '../ConfigProvider';
import cs from '../_util/classNames';
import { isFunction, isNumber, isUndefined, isObject, isString } from '../_util/is';
import ResizeTrigger from './resize-trigger';
import { on, off } from '../_util/dom';
import omit from '../_util/omit';
var DIRECTION_HORIZONTAL = 'horizontal';
var DIRECTION_VERTICAL = 'vertical';
function SplitGroup(props, ref) {
    var _a, _b;
    var panes = props.panes, style = props.style, className = props.className, _c = props.component, component = _c === void 0 ? 'div' : _c, _d = props.direction, direction = _d === void 0 ? 'horizontal' : _d, icon = props.icon, rest = __rest(props, ["panes", "style", "className", "component", "direction", "icon"]);
    var _e = useContext(ConfigContext), getPrefixCls = _e.getPrefixCls, rtl = _e.rtl;
    var defaultOffset = 1 / panes.length;
    var wrapperRef = useRef();
    var recordRef = useRef(new Array(panes.length).fill({
        moving: false,
        startOffset: 0,
        startPosition: 0,
    }));
    var paneContainers = useRef([]);
    var movingIndex = useRef(0);
    var prevOffsets = useRef([]);
    var _f = __read(useState(new Array(panes.length).fill(defaultOffset)), 2), offsets = _f[0], setOffsets = _f[1];
    var _g = __read(useState(false), 2), isMoving = _g[0], setIsMoving = _g[1];
    var _h = __read(useState(new Array(panes.length).fill(0)), 2), triggerSize = _h[0], setTriggerSize = _h[1];
    var _j = __read(useState(new Array(Math.max(panes.length - 1, 0)).fill({ prev: false, next: false })), 2), collapsedStatus = _j[0], setCollapsedStatus = _j[1];
    var prefixCls = getPrefixCls('resizebox-split-group');
    var isHorizontal = direction === DIRECTION_HORIZONTAL;
    var rtlReverse = isHorizontal && rtl;
    var isTriggerHorizontal = !isHorizontal;
    var classNames = cs(prefixCls, prefixCls + "-" + (isHorizontal ? DIRECTION_HORIZONTAL : DIRECTION_VERTICAL), (_a = {}, _a[prefixCls + "-moving"] = isMoving, _a), (_b = {}, _b[prefixCls + "-rtl"] = rtl, _b), className);
    var Tag = component;
    // 获取初始的 offset, 将传入的size 都转为像素值。
    var getInitialOffsets = function () {
        var newOffsets = [];
        panes.forEach(function (pane) {
            var size = pane.size;
            if (!isUndefined(size)) {
                newOffsets.push(formatSize(size));
            }
            else {
                newOffsets.push(undefined);
            }
        });
        // 剩余的空间均分给没有设置 size 的面板
        var noSizeArr = newOffsets.filter(function (size) { return !size; });
        var remainPercent = 1 -
            newOffsets.reduce(function (a, b) {
                var formatA = a || 0;
                var formatB = b || 0;
                return formatA + formatB;
            }, 0);
        var averagePercent = remainPercent / noSizeArr.length;
        newOffsets = newOffsets.map(function (size) {
            if (!isUndefined(size)) {
                return size;
            }
            return averagePercent;
        });
        return newOffsets;
    };
    // 计算每一个面板的占位像素，需要减去前面跟当前伸缩杆的宽度
    var getPaneSize = function (index) {
        var prevTriggerSize = triggerSize[index - 1] || 0;
        var currentTriggerSize = triggerSize[index];
        var baseVal = offsets[index] * 100;
        var unit = '%';
        return "calc(" + baseVal + unit + " - " + (prevTriggerSize + currentTriggerSize) / 2 + "px)";
    };
    // 入参 百分比/像素值 => 全部转化为百分比(响应式)
    function formatSize(size) {
        var totalPX = isHorizontal ? wrapperRef.current.offsetWidth : wrapperRef.current.offsetHeight;
        if (!size || (isNumber(size) && size < 0)) {
            return 0;
        }
        var percent = isString(size) ? parseFloat(size) / totalPX : size;
        return Math.min(percent, 1);
    }
    // 计算阈值，因为伸缩杆会影响到当前面板 跟 下一个面板。所以同时计算两个阈值。
    var getMinAndMax = function (index) {
        var next = Math.min(index + 1, panes.length - 1);
        var totalOffset = offsets[index] + offsets[next];
        var currentMin = formatSize(panes[index].min) || 0;
        var currentMax = formatSize(panes[index].max) || totalOffset;
        var nextMin = formatSize(panes[next].min) || 0;
        var nextMax = formatSize(panes[next].max) || totalOffset;
        //  min 的优先级高于 max
        currentMax = Math.min(totalOffset - nextMin, currentMax);
        nextMax = Math.min(totalOffset - currentMin, nextMax);
        return {
            currentMin: currentMin,
            currentMax: currentMax,
            nextMin: nextMin,
            nextMax: nextMax,
        };
    };
    // 拖拽时，获取新的占位距离。影响当前面板跟下一个面板的占位值。
    var getNewOffsets = function (startOffset, startPosition, currentPosition) {
        var current = movingIndex.current;
        var next = current + 1;
        var newOffsets = __spreadArray([], __read(offsets), false);
        var ratio = rtlReverse ? -1 : 1;
        var currentPercent = offsets[current];
        var nextPercent = offsets[next];
        var totalPercent = currentPercent + nextPercent;
        var _a = getMinAndMax(current), minOffset = _a.currentMin, maxOffset = _a.currentMax;
        var moveOffset = startOffset + formatSize((currentPosition - startPosition) * ratio + "px");
        moveOffset = Math.max(minOffset, moveOffset);
        moveOffset = Math.min(maxOffset, moveOffset);
        newOffsets[current] = moveOffset;
        // 保证 totalOffset = nextOffset + currentOffset  不变。
        newOffsets[next] = totalPercent - moveOffset;
        return newOffsets;
    };
    function onTriggerResize(e, index) {
        var contentRect = e[0].contentRect;
        var currentSize = contentRect[isTriggerHorizontal ? 'height' : 'width'];
        var newTriggerSize = __spreadArray([], __read(triggerSize), false);
        newTriggerSize[index] = currentSize;
        setTriggerSize(newTriggerSize);
    }
    // 判断快速收缩按钮是否展示
    var getCollapsedConfig = function (index) {
        var collapsible = panes[index].collapsible;
        if (!isObject(collapsible)) {
            collapsible = !collapsible ? {} : { prev: true, next: true };
        }
        var prev = collapsible.prev, next = collapsible.next;
        if (!prev && !next) {
            return {};
        }
        if (!collapsedStatus[index]) {
            return {};
        }
        // 传入了prev的配置，或者 没有传入 prev 的配置，但是已经处于向下收缩完毕状态
        var hasPrev = !!prev || (!prev && collapsedStatus[index].next);
        // 传入了next的配置，或者 没有传入 next 的配置，但是已经处于向上收缩完毕状态
        var hasNext = !!next || (!next && collapsedStatus[index].prev);
        return { hasPrev: hasPrev, hasNext: hasNext };
    };
    // 移动开始，记录初始值，绑定移动事件
    function onTriggerMouseDown(e, index) {
        props.onMovingStart && props.onMovingStart(index);
        movingIndex.current = index;
        var currentRecord = recordRef.current[index];
        currentRecord.moving = true;
        currentRecord.startOffset = offsets[index];
        currentRecord.startPosition = isHorizontal ? e.pageX : e.pageY;
        setIsMoving(true);
        on(window, 'mousemove', moving);
        on(window, 'touchmove', moving);
        on(window, 'mouseup', moveEnd);
        on(window, 'touchend', moveEnd);
        on(window, 'contextmenu', moveEnd);
        document.body.style.cursor = isTriggerHorizontal ? 'row-resize' : 'col-resize';
    }
    // 移动中，更新 当前面板跟下一个面板 占位大小
    function moving(e) {
        var index = movingIndex.current;
        var currentRecord = recordRef.current[index];
        var totalPX = isHorizontal ? wrapperRef.current.offsetWidth : wrapperRef.current.offsetHeight;
        if (currentRecord.moving) {
            var newOffsets = getNewOffsets(currentRecord.startOffset, currentRecord.startPosition, isHorizontal ? e.pageX : e.pageY);
            setOffsets(newOffsets);
            prevOffsets.current = newOffsets;
            props.onMoving &&
                props.onMoving(e, newOffsets.map(function (value) { return value * totalPX + "px"; }), index);
        }
    }
    // 移动结束，解除事件绑定
    function moveEnd() {
        var index = movingIndex.current;
        recordRef.current[index].moving = false;
        setIsMoving(false);
        off(window, 'mousemove', moving);
        off(window, 'touchmove', moving);
        off(window, 'mouseup', moveEnd);
        off(window, 'touchend', moveEnd);
        off(window, 'contextmenu', moveEnd);
        document.body.style.cursor = 'default';
        props.onMovingEnd && props.onMovingEnd(index);
    }
    // 点击快速收缩按钮的回调。
    function handleCollapsed(e, index, status, callback) {
        var next = index + 1;
        var newOffset = __spreadArray([], __read(offsets), false);
        var currentOffset = offsets[index];
        var nextOffset = offsets[next];
        var totalOffset = currentOffset + nextOffset;
        var totalPX = isHorizontal ? wrapperRef.current.offsetWidth : wrapperRef.current.offsetHeight;
        var _a = getMinAndMax(index), currentMin = _a.currentMin, nextMin = _a.nextMin;
        // 取消收缩时，应该重置为上一个状态。所以从preOffsets里拿值
        var newCurrentOffset = prevOffsets.current[index];
        var newNextOffset = prevOffsets.current[next];
        // 当前面板的收缩状态。
        var collapsed = collapsedStatus[index][status];
        // 点击向上收缩按钮。收缩态是：currentPane = currentMin;
        if (status === 'prev') {
            // 如果下一个面板不是在收缩状态 或者 下一个面板被手动拖拽到收缩状态
            if (nextOffset !== nextMin || newNextOffset === nextMin) {
                // 当前面板收缩。
                newCurrentOffset = currentMin;
                newNextOffset = totalOffset - currentMin;
                collapsed = true;
            }
            // 点击向下收缩按钮
        }
        else if (currentOffset !== currentMin || newCurrentOffset === currentMin) {
            newCurrentOffset = totalOffset - nextMin;
            newNextOffset = nextMin;
            collapsed = true;
        }
        newOffset[index] = newCurrentOffset;
        newOffset[next] = newNextOffset;
        props.onMoving &&
            props.onMoving(e, newOffset.map(function (value) { return value * totalPX + "px"; }), index);
        props.onMovingEnd && props.onMovingEnd(index);
        setOffsets(newOffset);
        if (isFunction(callback)) {
            callback(e, index, status, collapsed);
        }
    }
    useEffect(function () {
        var offsets = getInitialOffsets();
        setOffsets(offsets);
        prevOffsets.current = offsets;
    }, [JSON.stringify(panes.map(function (item) { return item.size; }))]);
    useImperativeHandle(ref, function () { return wrapperRef.current; }, []);
    useEffect(function () {
        var newCollapsedStatus = [];
        offsets.forEach(function (offset, index) {
            var currentCollapsedStatus = { prev: false, next: false };
            var next = index + 1;
            var _a = getMinAndMax(index), currentMin = _a.currentMin, nextMin = _a.nextMin;
            // 当 offsets 变化时，更新各个面板的 collapsed 状态
            if (offset === currentMin) {
                currentCollapsedStatus.prev = true;
            }
            else if (offsets[next] === nextMin) {
                currentCollapsedStatus.next = true;
            }
            newCollapsedStatus.push(currentCollapsedStatus);
        });
        setCollapsedStatus(newCollapsedStatus);
    }, [offsets]);
    return (React.createElement(Tag, __assign({}, omit(rest, ['onMovingStart', 'onPaneResize', 'onMoving', 'onMovingEnd']), { style: style, className: classNames, ref: wrapperRef }), panes.map(function (pane, index) {
        var content = pane.content, disabled = pane.disabled, trigger = pane.trigger, _a = pane.resizable, resizable = _a === void 0 ? true : _a, _b = pane.collapsible, collapsible = _b === void 0 ? {} : _b;
        var _c = getCollapsedConfig(index), hasPrev = _c.hasPrev, hasNext = _c.hasNext;
        var prevConfig = isObject(collapsible) && isObject(collapsible.prev) ? collapsible.prev : {};
        var nextConfig = isObject(collapsible) && isObject(collapsible.next) ? collapsible.next : {};
        return (React.createElement(React.Fragment, { key: index },
            React.createElement("div", { className: prefixCls + "-pane", style: { flexBasis: getPaneSize(index) }, ref: function (el) { return (paneContainers.current[index] = el); } }, content),
            !disabled && index !== panes.length - 1 && (React.createElement(ResizeTrigger, { className: prefixCls + "-trigger", direction: isTriggerHorizontal ? DIRECTION_HORIZONTAL : DIRECTION_VERTICAL, icon: icon, onResize: function (e) { return onTriggerResize(e, index); }, onMouseDown: function (e) { return onTriggerMouseDown(e, index); }, collapsible: {
                    prev: hasPrev
                        ? {
                            onClick: function (e) { return handleCollapsed(e, index, 'prev', prevConfig.onClick); },
                            icon: prevConfig.icon,
                            collapsed: collapsedStatus[index].prev,
                        }
                        : undefined,
                    next: hasNext
                        ? {
                            onClick: function (e) { return handleCollapsed(e, index, 'next', nextConfig.onClick); },
                            icon: nextConfig.icon,
                            collapsed: collapsedStatus[index].next,
                        }
                        : undefined,
                }, resizable: resizable, renderChildren: trigger }))));
    })));
}
var SplitGroupComponent = forwardRef(SplitGroup);
SplitGroupComponent.displayName = 'ResizeBoxSplitGroup';
export default SplitGroupComponent;
