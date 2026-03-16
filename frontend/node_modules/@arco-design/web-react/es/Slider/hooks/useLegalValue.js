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
import { plus, times } from 'number-precision';
import { useCallback } from 'react';
import { isArray, isNumber, isUndefined, isObject, isEmptyObject } from '../../_util/is';
import { getPrecision } from '../utils';
export default function useLegalValue(props) {
    var isRange = props.isRange, min = props.min, max = props.max, onlyMarkValue = props.onlyMarkValue, intervalConfigs = props.intervalConfigs, marks = props.marks;
    var getPrecisionValue = useCallback(function (val) {
        var interval = intervalConfigs.find(function (config) {
            return val >= config.begin && val <= config.end;
        });
        if (interval) {
            var begin = interval.begin, step = interval.step;
            var offsetVal = val - begin;
            var stepNum = Math.round(offsetVal / step);
            var precision = getPrecision(step);
            var currentIntervalPrecision = parseFloat(times(step, stepNum).toFixed(precision));
            return plus(begin, currentIntervalPrecision);
        }
        return val;
    }, [intervalConfigs]);
    // 在只允许选择 marks 中的值的时候，找到离value最接近的值
    var getMarkValue = useCallback(function (val) {
        if (!isObject(marks) || isEmptyObject(marks)) {
            console.warn('marks must be an object when onlyMarkValue is true');
            return min;
        }
        if (marks[val]) {
            return val;
        }
        var keys = Object.keys(marks);
        var diffs = keys.map(function (x) { return Math.abs(val - parseFloat(x)); });
        var minIndex = diffs.indexOf(Math.min.apply(null, diffs));
        return parseFloat(keys[minIndex]);
    }, [marks, min]);
    // 判断值是否在[min, max]区间内，并且满足步长或是标签值
    var getLegalValue = useCallback(function (val) {
        if (isUndefined(val))
            return min;
        if (val <= min)
            return min;
        if (val >= max)
            return max;
        if (onlyMarkValue)
            return getMarkValue(val);
        return getPrecisionValue(val);
    }, [getMarkValue, getPrecisionValue, max, min, onlyMarkValue]);
    var isLegalValue = useCallback(function (val) {
        return getLegalValue(val) === val;
    }, [getLegalValue]);
    // 获取合法的 range value
    var getLegalRangeValue = useCallback(function (val) {
        var _a = __read([min, min], 2), beginVal = _a[0], endVal = _a[1];
        if (isRange) {
            if (isArray(val)) {
                beginVal = getLegalValue(val[0]);
                // endVal = getLegalValue(val[1]);
                return val.map(function (v) {
                    return getLegalValue(v);
                });
            }
            console.error('value must be an array when range is true');
        }
        else if (isNumber(val)) {
            endVal = getLegalValue(val);
        }
        else {
            console.error('value must be a number when range is false');
        }
        return [beginVal, endVal];
    }, [getLegalValue, isRange, min]);
    var getNextMarkValue = useCallback(function (value, type) {
        // arrow Left or arrowRight
        var multi = type === 'subtraction' ? -1 : 1;
        var newValue = plus(value, multi * props.step);
        if (props.onlyMarkValue) {
            var markKeys = Object.keys(props.marks);
            var currentIndex = markKeys.findIndex(function (key) { return Number(key) === value; });
            newValue =
                markKeys[currentIndex + multi] !== undefined
                    ? Number(markKeys[currentIndex + multi])
                    : value;
        }
        return newValue;
    }, [props.marks, props.onlyMarkValue, props.step]);
    return {
        getLegalRangeValue: getLegalRangeValue,
        getLegalValue: getLegalValue,
        isLegalValue: isLegalValue,
        getNextMarkValue: getNextMarkValue,
    };
}
