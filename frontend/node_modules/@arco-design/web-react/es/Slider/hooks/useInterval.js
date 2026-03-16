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
import { useMemo } from 'react';
import { isNumber, isFunction } from '../../_util/is';
import { rateToFloat } from '../utils';
function getIntervals(nums) {
    if (nums.length < 2) {
        return [];
    }
    var result = [];
    for (var i = 1; i < nums.length; i++) {
        var begin = nums[i - 1];
        var end = nums[i];
        result.push([begin, end]);
    }
    return result;
}
function useInterval(props) {
    var _a = props.marks, marks = _a === void 0 ? {} : _a, getIntervalConfig = props.getIntervalConfig, max = props.max, min = props.min;
    var _b = useMemo(function () {
        var markKeys = Object.keys(marks)
            .filter(function (key) { return isNumber(+key) && +key >= min && +key <= max; })
            .sort(function (a, b) { return (+a > +b ? 1 : -1); });
        var markList = markKeys.map(function (key) { return ({ key: key, content: marks[key] }); });
        var markValues = markKeys.map(function (key) { return +key; });
        // 如果没有传入marks，那么就等于只有一个区间，就是 [min,max]
        if (markValues.length === 0) {
            markValues = [min, max];
        }
        else {
            if (markValues[0] > min) {
                markValues.unshift(min);
                // 传入了 marks 需要显示首尾断点
                markList.unshift({ key: "" + min, content: '' });
            }
            if (markValues.slice(-1)[0] < max) {
                markValues.push(max);
                markList.push({ key: "" + max, content: '' });
            }
        }
        var markIntervals = getIntervals(markValues);
        return { markIntervals: markIntervals, markList: markList };
    }, [marks, min, max]), markIntervals = _b.markIntervals, markList = _b.markList;
    var intervalConfigs = useMemo(function () {
        if (!isFunction(getIntervalConfig)) {
            return [{ begin: min, end: max, step: props.step, beginOffset: 0, endOffset: 1, width: 1 }];
        }
        var getStepAndWidth = function (_a, index) {
            var _b = __read(_a, 2), begin = _b[0], end = _b[1];
            var config = { step: props.step, width: 0 };
            var customConfig = getIntervalConfig([begin, end], index) || {};
            var step = customConfig.step;
            var width = rateToFloat(customConfig.width);
            // 如果用户传入了step
            if (isNumber(step) && step) {
                config.step = step;
            }
            // 用户传入了width
            if (isNumber(width) && width) {
                config.width = width;
            }
            return config;
        };
        var remainWidth = 1;
        var remainLen = max - min;
        var stepAndWidthConfig = markIntervals.map(function (_a, index) {
            var _b = __read(_a, 2), begin = _b[0], end = _b[1];
            var stepAndWidth = getStepAndWidth([begin, end], index);
            var width = stepAndWidth.width;
            // 主要是计算出剩余的 width 和 剩余的长度
            if (width) {
                width = Math.min(remainWidth, width);
                var len = end - begin;
                remainLen -= len;
                remainWidth -= width;
            }
            return { width: width, step: stepAndWidth.step };
        });
        // 所有区间都有自定义宽度但仍有剩余的时候，最后一个区间的宽度需要校准
        if (stepAndWidthConfig.every(function (_a) {
            var width = _a.width;
            return width;
        }) && remainWidth) {
            var lastIntervalConfig = stepAndWidthConfig[markIntervals.length - 1];
            lastIntervalConfig.width += remainWidth;
        }
        var allConfigs = [];
        markIntervals.forEach(function (_a, index) {
            var _b = __read(_a, 2), begin = _b[0], end = _b[1];
            var _c = stepAndWidthConfig[index], step = _c.step, width = _c.width;
            var config = { begin: begin, end: end, step: step, beginOffset: 0, endOffset: 0, width: width };
            // 用户没有配置 width，按照区间长度来分配剩余的width
            if (!config.width) {
                config.width = remainWidth * ((end - begin) / remainLen);
            }
            var prevIndex = allConfigs.length - 1;
            // 当前区间的 beginOffset 是前一个区间的 endOffset
            if (allConfigs[prevIndex]) {
                config.beginOffset = allConfigs[prevIndex].endOffset;
            }
            config.endOffset = Math.min(1, config.beginOffset + config.width);
            allConfigs.push(config);
        });
        return allConfigs;
    }, [getIntervalConfig, markIntervals, max, min, props.step]);
    return {
        intervalConfigs: intervalConfigs,
        markList: markList,
    };
}
export default useInterval;
