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
// 精确 加减乘除
import { plus, minus, times, divide } from 'number-precision';
export function getPrecision(val) {
    var decimal = ("" + val).split('.')[1];
    return (decimal && decimal.length) || 0;
}
export function formatPercent(val) {
    return val * 100 + "%";
}
export function getOffset(val, range) {
    var value = Number(val);
    if (range && !isNaN(value)) {
        var _a = __read(range, 2), min = _a[0], max = _a[1];
        // 精确算出=> (value - min) / (max - min);
        return divide(minus(value, min), minus(max, min));
    }
    return 0;
}
export function valueInRange(val, range) {
    var value = Number(val);
    range.sort(function (a, b) { return a - b; });
    return value >= range[0] && value <= range[1];
}
export function isNotEmpty(val) {
    return val || val === 0;
}
// 把 20% => 0.2
export function rateToFloat(val) {
    var rate = parseFloat(val);
    var fixedRate = rate > 1 ? (rate / 100).toFixed(2) : rate;
    var floatRate = parseFloat(fixedRate);
    if (!isNaN(floatRate) && floatRate >= 0 && floatRate <= 1) {
        return floatRate;
    }
    return undefined;
}
export function getIntervalOffset(val, intervalConfig) {
    // 当前值所在的区间
    var currentInterval = intervalConfig.find(function (config) { return val >= config.begin && val <= config.end; });
    if (currentInterval) {
        var beginOffset = currentInterval.beginOffset, begin = currentInterval.begin, end = currentInterval.end, endOffset = currentInterval.endOffset;
        var offsetInInterval = getOffset(val, [begin, end]);
        // endOffset - beginOffset
        var intervalOffset = minus(endOffset, beginOffset);
        // 当前值在整个滑动轴上占的比例 = 在区间占的比例 * 区间相对于整个轴的比例
        // offsetInInterval* intervalOffset
        var offset = times(offsetInInterval, intervalOffset);
        return plus(beginOffset, offset);
    }
}
// 从小到大排序
export function sortNumberArray(arr) {
    var copyArr = arr.slice(0);
    copyArr.sort(function (a, b) { return a - b; });
    return copyArr;
}
// 是否需要排序
export function needSort(arr) {
    return arr.some(function (x, i) { return x > arr[i + 1]; });
}
// 找到 value 在 array 中的索引。value: 5 ,arrry: [1, 3, 8]， return: 2.
export function findNearestIndex(value, array) {
    var valueIndex = array.indexOf(value);
    if (valueIndex === -1) {
        var arr = sortNumberArray(array.concat(value));
        valueIndex = arr.indexOf(value);
        return [Math.max(valueIndex - 1, 0), Math.min(valueIndex, array.length - 1)];
    }
    return [valueIndex, valueIndex + 1];
}
