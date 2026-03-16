import cs from '../../_util/classNames';
import { isArray } from '../../_util/is';
import { getNow } from '../../_util/dayjs';
function getDateValue(date, index) {
    if (!date) {
        return undefined;
    }
    if (isArray(date)) {
        return date[index];
    }
}
export default function useClassName(props) {
    var prefixCls = props.prefixCls, mergedValue = props.mergedValue, rangeValues = props.rangeValues, hoverRangeValues = props.hoverRangeValues, panel = props.panel, isSameTime = props.isSameTime, innerMode = props.innerMode;
    function isInRange(current, startDate, endDate) {
        if (!startDate || !endDate) {
            return false;
        }
        return (isSameTime(current, startDate) ||
            isSameTime(current, endDate) ||
            current.isBetween(startDate, endDate, null, '[]'));
    }
    return function getCellClassName(cellDateObj, disabled) {
        var _a;
        var rangeStart = getDateValue(rangeValues, 0);
        var rangeEnd = getDateValue(rangeValues, 1);
        var hoverRangeStart = getDateValue(hoverRangeValues, 0);
        var hoverRangeEnd = getDateValue(hoverRangeValues, 1);
        var isInView = !cellDateObj.isPrev && !cellDateObj.isNext;
        var rangeAvailable = isInView && panel;
        var isRangeStart = rangeAvailable && rangeStart && isSameTime(cellDateObj.time, rangeStart);
        var isRangeEnd = rangeAvailable && rangeEnd && isSameTime(cellDateObj.time, rangeEnd);
        var nearRangeStart = hoverRangeStart && rangeStart && hoverRangeStart.isBefore(rangeStart);
        var nearRangeEnd = rangeEnd && hoverRangeEnd && hoverRangeEnd.isAfter(rangeEnd);
        var isHoverNearRange = (nearRangeStart && isRangeStart) || (nearRangeEnd && isRangeEnd);
        var isToday = isSameTime(cellDateObj.time, getNow());
        if (!panel && innerMode === 'year') {
            isToday = getNow().isSame(cellDateObj.time, 'date');
        }
        return cs(prefixCls + "-cell", (_a = {},
            _a[prefixCls + "-cell-in-view"] = isInView,
            _a[prefixCls + "-cell-today"] = isToday,
            _a[prefixCls + "-cell-selected"] = mergedValue && isSameTime(cellDateObj.time, mergedValue),
            _a[prefixCls + "-cell-range-start"] = isRangeStart,
            _a[prefixCls + "-cell-range-end"] = isRangeEnd,
            _a[prefixCls + "-cell-in-range"] = rangeAvailable && isInRange(cellDateObj.time, rangeStart, rangeEnd),
            _a[prefixCls + "-cell-in-range-near-hover"] = isHoverNearRange,
            _a[prefixCls + "-cell-hover-range-start"] = rangeAvailable && hoverRangeStart && isSameTime(cellDateObj.time, hoverRangeStart),
            _a[prefixCls + "-cell-hover-range-end"] = rangeAvailable && hoverRangeEnd && isSameTime(cellDateObj.time, hoverRangeEnd),
            _a[prefixCls + "-cell-hover-in-range"] = rangeAvailable && isInRange(cellDateObj.time, hoverRangeStart, hoverRangeEnd),
            _a[prefixCls + "-cell-disabled"] = disabled,
            _a));
    };
}
