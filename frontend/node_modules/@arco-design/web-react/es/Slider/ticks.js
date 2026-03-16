import React, { memo, useMemo } from 'react';
import { plus } from 'number-precision';
import { formatPercent, getIntervalOffset, valueInRange } from './utils';
import cs from '../_util/classNames';
export default memo(function Ticks(props) {
    var min = props.min, max = props.max, valueRange = props.valueRange, prefixCls = props.prefixCls, vertical = props.vertical, reverse = props.reverse, intervalConfigs = props.intervalConfigs;
    var stepsMap = new Map();
    var getCurrentSteps = function (interval) {
        var step = interval.step, begin = interval.begin, end = interval.end;
        var stepsLength = Math.floor((end - begin) / step);
        for (var i = 0; i <= stepsLength; i++) {
            var stepVal = plus(i * step, begin);
            if (stepVal <= min || stepVal >= max)
                continue;
            var offset = formatPercent(getIntervalOffset(stepVal, intervalConfigs));
            stepsMap.set(offset, { offset: offset, isActive: valueInRange(stepVal, valueRange) });
        }
    };
    var steps = useMemo(function () {
        stepsMap.clear();
        intervalConfigs.forEach(function (interval) { return getCurrentSteps(interval); });
        return Array.from(stepsMap.values());
    }, [intervalConfigs]);
    return (React.createElement("div", { className: prefixCls + "-ticks" }, steps.map(function (item, index) {
        var _a, _b, _c;
        return (React.createElement("div", { key: index, className: cs(prefixCls + "-tick", (_a = {}, _a[prefixCls + "-tick-active"] = item.isActive, _a)), style: vertical
                ? (_b = {}, _b[reverse ? 'top' : 'bottom'] = item.offset, _b) : (_c = {}, _c[reverse ? 'right' : 'left'] = item.offset, _c) }));
    })));
});
