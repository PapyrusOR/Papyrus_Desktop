import cs from '../../_util/classNames';
import { isArray } from '../../_util/is';
import { getNow, getSortedDayjsArray } from '../../_util/dayjs';
import { getAvailableDayjsLength } from '../util';
function getDateValue(date, index) {
    if (!date) {
        return undefined;
    }
    if (isArray(date)) {
        return date[index];
    }
}
export default function useClassName(props) {
    var prefixCls = props.prefixCls, value = props.value, rangeValues = props.rangeValues, valueShowHover = props.valueShowHover, isSameTime = props.isSameTime, mode = props.mode, hideNotInViewDates = props.hideNotInViewDates;
    var selectedLength = getAvailableDayjsLength(rangeValues);
    var hoverLength = getAvailableDayjsLength(valueShowHover);
    var sortedRangeValues = selectedLength !== 2 && hoverLength === 2 ? getSortedDayjsArray(valueShowHover) : rangeValues;
    var sortedHoverRangeValues = selectedLength === 2 ? getSortedDayjsArray(valueShowHover) : [];
    function isInRange(current, startDate, endDate) {
        // show placeholder range
        // if (!startDate || !endDate) {
        //   if (startDate) {
        //     return isSameTime(current, startDate) || current.isAfter(startDate);
        //   }
        //   if (endDate) {
        //     return isSameTime(current, endDate) || current.isBefore(endDate);
        //   }
        //   return false;
        // }
        if (startDate && endDate) {
            return (isSameTime(current, startDate) ||
                isSameTime(current, endDate) ||
                current.isBetween(startDate, endDate, null));
        }
    }
    return function getCellClassName(cellDateObj, disabled, utcOffset, timezone) {
        var _a;
        var rangeStart = getDateValue(sortedRangeValues, 0);
        var rangeEnd = getDateValue(sortedRangeValues, 1);
        var hoverRangeStart = getDateValue(sortedHoverRangeValues, 0);
        var hoverRangeEnd = getDateValue(sortedHoverRangeValues, 1);
        var isInView = !cellDateObj.isPrev && !cellDateObj.isNext;
        var selected = value && isSameTime(cellDateObj.time, value);
        var isToday = isSameTime(cellDateObj.time, getNow(utcOffset, timezone));
        var checkIsInView = mode !== 'week' ? isInView : true;
        if (mode === 'week') {
            isToday = getNow(utcOffset, timezone).isSame(cellDateObj.time, 'date');
        }
        if (mode === 'quarter') {
            isToday = getNow(utcOffset, timezone).isSame(cellDateObj.time, 'quarter');
        }
        function getIsRangeStartOrEnd(v) {
            return checkIsInView && !disabled && v && isSameTime(cellDateObj.time, v);
        }
        var isRangeStart = getIsRangeStartOrEnd(rangeStart);
        var isRangeEnd = getIsRangeStartOrEnd(rangeEnd);
        var isRangeStartSelected = getIsRangeStartOrEnd(getDateValue(rangeValues, 0));
        var isRangeEndSelected = getIsRangeStartOrEnd(getDateValue(rangeValues, 1));
        var isHoverRangeStart = getIsRangeStartOrEnd(hoverRangeStart);
        var isHoverRangeEnd = getIsRangeStartOrEnd(hoverRangeEnd);
        var isRangeEdgeInHoverRange = false;
        if (isRangeStart) {
            isRangeEdgeInHoverRange =
                hoverRangeStart &&
                    rangeStart &&
                    hoverRangeStart.isBefore(rangeStart) &&
                    isInRange(rangeStart, hoverRangeStart, hoverRangeEnd);
        }
        else if (isRangeEnd) {
            isRangeEdgeInHoverRange =
                hoverRangeEnd &&
                    rangeEnd &&
                    hoverRangeEnd.isAfter(rangeEnd) &&
                    isInRange(rangeEnd, hoverRangeStart, hoverRangeEnd);
        }
        var isHoverRangeEdgeInRange = false;
        if (isHoverRangeStart) {
            isHoverRangeEdgeInRange =
                hoverRangeStart &&
                    rangeStart &&
                    rangeStart.isBefore(hoverRangeStart) &&
                    isInRange(hoverRangeStart, rangeStart, rangeEnd);
        }
        else if (isHoverRangeEnd) {
            isHoverRangeEdgeInRange =
                hoverRangeEnd &&
                    rangeEnd &&
                    rangeEnd.isAfter(hoverRangeEnd) &&
                    isInRange(hoverRangeEnd, rangeStart, rangeEnd);
        }
        return cs(prefixCls + "-cell", (_a = {},
            _a[prefixCls + "-cell-disabled"] = disabled,
            _a[prefixCls + "-cell-hidden"] = hideNotInViewDates && !isInView,
            _a[prefixCls + "-cell-in-view"] = isInView,
            _a[prefixCls + "-cell-today"] = isToday && isInView,
            _a[prefixCls + "-cell-selected"] = selected || isRangeStartSelected || isRangeEndSelected,
            _a[prefixCls + "-cell-range-start"] = isRangeStart,
            _a[prefixCls + "-cell-range-end"] = isRangeEnd,
            _a[prefixCls + "-cell-in-range"] = checkIsInView && !disabled && isInRange(cellDateObj.time, rangeStart, rangeEnd),
            _a[prefixCls + "-cell-hover-range-start"] = isHoverRangeStart,
            _a[prefixCls + "-cell-hover-range-end"] = isHoverRangeEnd,
            _a[prefixCls + "-cell-hover-in-range"] = checkIsInView && !disabled && isInRange(cellDateObj.time, hoverRangeStart, hoverRangeEnd),
            _a[prefixCls + "-cell-range-edge-in-hover-range"] = isRangeEdgeInHoverRange,
            _a[prefixCls + "-cell-hover-range-edge-in-range"] = isHoverRangeEdgeInRange,
            _a));
    };
}
