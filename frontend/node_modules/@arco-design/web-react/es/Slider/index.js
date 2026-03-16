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
import React, { forwardRef, memo, useContext, useRef, useMemo } from 'react';
import NP, { plus, times, divide } from 'number-precision';
import omit from '../_util/omit';
import SliderButton from './button';
import Marks from './marks';
import Dots from './dots';
import Input from './input';
import Ticks from './ticks';
import { isFunction, isObject, isArray } from '../_util/is';
import { findNearestIndex, formatPercent, getIntervalOffset, needSort, sortNumberArray, } from './utils';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import useMergeValue from '../_util/hooks/useMergeValue';
import { off, on } from '../_util/dom';
import useLegalValue from './hooks/useLegalValue';
import useInterval from './hooks/useInterval';
import useMergeProps from '../_util/hooks/useMergeProps';
import useUpdate from '../_util/hooks/useUpdate';
NP.enableBoundaryChecking(false);
var defaultProps = {
    max: 100,
    min: 0,
    step: 1,
};
function Slider(baseProps, ref) {
    var _a, _b;
    var _c = useContext(ConfigContext), getPrefixCls = _c.getPrefixCls, componentConfig = _c.componentConfig, rtl = _c.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Slider);
    var className = props.className, style = props.style, tooltipVisible = props.tooltipVisible, tooltipPosition = props.tooltipPosition, disabled = props.disabled, min = props.min, max = props.max, propRange = props.range, step = props.step, showTicks = props.showTicks, marks = props.marks, onlyMarkValue = props.onlyMarkValue, vertical = props.vertical, showInput = props.showInput, reverse = props.reverse, getIntervalConfig = props.getIntervalConfig, rest = __rest(props, ["className", "style", "tooltipVisible", "tooltipPosition", "disabled", "min", "max", "range", "step", "showTicks", "marks", "onlyMarkValue", "vertical", "showInput", "reverse", "getIntervalConfig"]);
    var range = !!propRange;
    var rangeConfig = isObject(propRange) ? __assign({}, propRange) : { draggableBar: false };
    var isReverse = rtl ? !reverse : reverse;
    var _d = useInterval({
        min: min,
        max: max,
        onlyMarkValue: onlyMarkValue,
        step: step,
        marks: marks,
        getIntervalConfig: getIntervalConfig,
    }), intervalConfigs = _d.intervalConfigs, markList = _d.markList;
    var _e = useLegalValue({
        isRange: range,
        min: min,
        max: max,
        onlyMarkValue: onlyMarkValue,
        step: step,
        intervalConfigs: intervalConfigs,
        marks: marks,
    }), getLegalValue = _e.getLegalValue, getLegalRangeValue = _e.getLegalRangeValue, isLegalValue = _e.isLegalValue, getNextMarkValue = _e.getNextMarkValue;
    // 受控与非受控值处理
    var _f = __read(useMergeValue(range ? [min, min] : min, {
        defaultValue: props.defaultValue,
        value: props.value,
    }), 2), value = _f[0], setValue = _f[1];
    // 计算合法值
    var curVal = getLegalRangeValue(value);
    var lastVal = useRef(curVal);
    // let [beginVal, endVal] = curVal;
    var reverseOrder = useRef(needSort(curVal));
    // value变化后 更新lastVal
    useUpdate(function () {
        lastVal.current = getLegalRangeValue(value);
    }, [value, getLegalRangeValue]);
    if (reverseOrder.current) {
        curVal = sortNumberArray(curVal);
    }
    var maxVal = curVal[curVal.length - 1];
    var minVal = curVal[0];
    // 是否显示输入框。多点选择不显示 input
    var isShowInput = showInput && !onlyMarkValue && (!range || curVal.length < 3);
    var extraInputProps = useMemo(function () {
        if (isShowInput && (isArray(showInput) || isObject(showInput))) {
            return isArray(showInput) ? __spreadArray([], __read(showInput), false) : [__assign({}, showInput), __assign({}, showInput)];
        }
        return [];
    }, [isShowInput, showInput]);
    // 样式前缀
    var prefixCls = getPrefixCls('slider');
    // ref
    var roadRef = useRef(null);
    var position = useRef({
        left: 0,
        height: 0,
        top: 0,
        width: 0,
    });
    var isDragging = useRef(false);
    var barStartDragVal = useRef(0);
    function getEmitParams(value) {
        var sortedValue = sortNumberArray(value);
        return range ? sortedValue : sortedValue[sortedValue.length - 1];
    }
    function updateValue(val) {
        var copyVal = val.map(function (x) { return getLegalValue(x); });
        lastVal.current = copyVal;
        return copyVal;
    }
    function onChange(val, reason) {
        var newValue = updateValue(val);
        var emitParams = getEmitParams(newValue);
        setValue(emitParams);
        // 在手动修改的情况下才可能出现反序问题。
        if (reason === 'inputValueChange') {
            reverseOrder.current = newValue.some(function (x, i) { return x > newValue[i]; });
        }
        else {
            // 在mousemove 跟 jumpToClick 顺序会保持 [begin,end]
            reverseOrder.current = false;
        }
        if (isFunction(props.onChange)) {
            props.onChange(emitParams);
        }
    }
    function onMouseUp() {
        if (isFunction(props.onAfterChange)) {
            var emitParams = getEmitParams(lastVal.current);
            props.onAfterChange(emitParams);
        }
    }
    function inRange(val) {
        var _a;
        var _b = __read([curVal[0], curVal[curVal.length - 1]], 2), range1 = _b[0], range2 = _b[1];
        if (range1 > range2) {
            _a = __read([range2, range1], 2), range1 = _a[0], range2 = _a[1];
        }
        if (range)
            return val >= range1 && val <= range2;
        return val <= range2;
    }
    // 通过坐标获取值
    function getValueByCoords(x, y) {
        var _a = position.current, left = _a.left, top = _a.top, width = _a.width, height = _a.height;
        var roadLength = width;
        var diff = isReverse ? left + width - x : x - left;
        if (vertical) {
            roadLength = height;
            diff = isReverse ? y - top : top + height - y;
        }
        if (roadLength <= 0) {
            return 0;
        }
        // 通过坐标点偏移算出当前值相对于整个滑动轴的比例位置
        var offset = Math.max(divide(diff, roadLength), 0);
        offset = Math.min(1, offset);
        // 通过偏移值算出当前值在哪个区间
        var currentInterval = intervalConfigs.find(function (config) {
            return offset >= config.beginOffset && offset <= config.endOffset;
        });
        var begin = currentInterval.begin, beginOffset = currentInterval.beginOffset, currentStep = currentInterval.step, endOffset = currentInterval.endOffset, end = currentInterval.end;
        // 当前值对整体来说，多出这个区间的比例
        var currentValueOffset = offset - beginOffset;
        // 这个区间整体的比例
        var currentIntervalOffset = endOffset - beginOffset;
        // 当前在这个区间的值 = （在这个区间的比例（相对于整体） / 这个区间相对于整体的比例）* 这个区间的总值
        var valueInInterval = (currentValueOffset / currentIntervalOffset) * (end - begin);
        // 算出当前值在这个区间的步数
        var stepNum = Math.round(valueInInterval / currentStep);
        // 当前值 = 区间起始值 + 区间步数 * 步长
        return plus(begin, times(stepNum, currentStep));
    }
    function getBarStyle(offsets) {
        var _a, _b, _c;
        var _d = __read(offsets, 2), begin = _d[0], end = _d[1];
        if (begin > end) {
            _a = __read([end, begin], 2), begin = _a[0], end = _a[1];
        }
        var beginOffset = formatPercent(begin);
        var endOffset = formatPercent(1 - end);
        return vertical
            ? (_b = {},
                _b[isReverse ? 'top' : 'bottom'] = beginOffset,
                _b[isReverse ? 'bottom' : 'top'] = endOffset,
                _b) : (_c = {},
            _c[isReverse ? 'right' : 'left'] = beginOffset,
            _c[isReverse ? 'left' : 'right'] = endOffset,
            _c);
    }
    function getBtnStyle(offset) {
        var _a, _b;
        return vertical
            ? (_a = {}, _a[isReverse ? 'top' : 'bottom'] = formatPercent(offset), _a) : (_b = {}, _b[isReverse ? 'right' : 'left'] = formatPercent(offset), _b);
    }
    function getTooltipProps() {
        var tooltipProps = {
            getTooltipContainer: props.getTooltipContainer,
            formatTooltip: props.formatTooltip,
        };
        if ('tooltipPosition' in props) {
            tooltipProps.tooltipPosition = tooltipPosition;
        }
        if ('tooltipVisible' in props) {
            tooltipProps.tooltipVisible = tooltipVisible;
        }
        return tooltipProps;
    }
    function getPosition() {
        position.current = roadRef.current.getBoundingClientRect();
    }
    function onRoadMouseDown(e) {
        getPosition();
        var val = getValueByCoords(e.clientX, e.clientY);
        if (rangeConfig.draggableBar && inRange(val)) {
            barStartDragVal.current = getLegalValue(val);
            on(window, 'mousemove', onBarMouseMove);
            on(window, 'mouseup', onBarMouseUp);
        }
        else {
            handleJumpClick(val);
        }
    }
    // 点击某个位置，快速跳转
    function handleJumpClick(val) {
        if (disabled)
            return;
        var value = getLegalValue(val);
        // 找到 value 临近的两个值。
        var _a = __read(findNearestIndex(value, curVal), 2), beforeIndex = _a[0], nextIndex = _a[1];
        var nearBeginVal = curVal[beforeIndex];
        var nearEndValue = curVal[nextIndex];
        var copyVal = curVal.slice(0);
        if (range && nearEndValue - value > value - nearBeginVal) {
            copyVal[beforeIndex] = value;
            onChange(copyVal, 'jumpToClick');
        }
        else {
            copyVal[nextIndex] = value;
            onChange(copyVal, 'jumpToClick');
        }
        onMouseUp();
    }
    function handleInputChange(val) {
        onChange(val, 'inputValueChange');
        onMouseUp();
    }
    // 拖动开始节点
    function handleMove(x, y, index) {
        isDragging.current = true;
        var copyVal = curVal.slice(0);
        copyVal[index] = getValueByCoords(x, y);
        onChange(copyVal, 'mousemove');
    }
    function handleMoveEnd() {
        isDragging.current = false;
        onMouseUp();
    }
    // 结束节点的 arrow event
    function handleArrowEvent(type, index) {
        if (disabled)
            return;
        var copyVal = curVal.slice(0);
        copyVal[index] = getNextMarkValue(curVal[index], type);
        onChange(copyVal);
    }
    // bar 移动中
    function onBarMouseMove(e) {
        var newVal = getLegalValue(getValueByCoords(e.clientX, e.clientY));
        var offsetVal = newVal - barStartDragVal.current;
        var copyVal = curVal.map(function (x) { return x + offsetVal; });
        if (copyVal.every(function (v) { return isLegalValue(v); })) {
            onChange(copyVal, 'mousemove');
        }
    }
    // bar 停止移动
    function onBarMouseUp() {
        off(window, 'mousemove', onBarMouseMove);
        off(window, 'mouseup', onBarMouseUp);
        onMouseUp();
    }
    return (React.createElement("div", __assign({}, omit(rest, [
        'defaultValue',
        'value',
        'onChange',
        'getTooltipContainer',
        'formatTooltip',
        'onAfterChange',
    ]), { className: cs(prefixCls, (_a = {},
            _a[prefixCls + "-vertical"] = vertical,
            _a[prefixCls + "-with-marks"] = marks,
            _a[prefixCls + "-reverse"] = isReverse,
            _a[prefixCls + "-rtl"] = rtl,
            _a), className), style: style, ref: ref }),
        React.createElement("div", { className: prefixCls + "-wrapper" },
            React.createElement("div", { ref: roadRef, className: cs(prefixCls + "-road", (_b = {},
                    _b[prefixCls + "-road-disabled"] = disabled,
                    _b[prefixCls + "-road-vertical"] = vertical,
                    _b)), onMouseDown: onRoadMouseDown },
                React.createElement("div", { className: prefixCls + "-bar", style: getBarStyle([
                        getIntervalOffset(minVal, intervalConfigs),
                        getIntervalOffset(maxVal, intervalConfigs),
                    ]) }),
                showTicks && (React.createElement(Ticks, { intervalConfigs: intervalConfigs, min: min, max: max, valueRange: [minVal, maxVal], prefixCls: prefixCls, vertical: vertical, reverse: isReverse })),
                React.createElement(Dots, { data: markList, intervalConfigs: intervalConfigs, valueRange: [minVal, maxVal], vertical: vertical, prefixCls: prefixCls, reverse: isReverse, onMouseDown: handleJumpClick }),
                React.createElement(Marks, { data: markList, intervalConfigs: intervalConfigs, vertical: vertical, prefixCls: prefixCls, reverse: isReverse, onMouseDown: handleJumpClick }),
                curVal.map(function (val, index) {
                    if (!range && index !== curVal.length - 1) {
                        return null;
                    }
                    return (React.createElement(SliderButton, __assign({ key: index, style: getBtnStyle(getIntervalOffset(val, intervalConfigs)), disabled: disabled, prefixCls: prefixCls, value: val, maxValue: max, minValue: min, vertical: vertical }, getTooltipProps(), { onMoveBegin: getPosition, onMoving: function (x, y) { return handleMove(x, y, index); }, onMoveEnd: handleMoveEnd, onArrowEvent: function (type) { return handleArrowEvent(type, index); } })));
                })),
            isShowInput && (React.createElement(Input, { min: min, max: max, step: step, value: curVal, range: range, disabled: disabled, prefixCls: prefixCls, onChange: handleInputChange, extra: extraInputProps })))));
}
var SliderComponent = forwardRef(Slider);
SliderComponent.displayName = 'Slider';
export default memo(SliderComponent);
