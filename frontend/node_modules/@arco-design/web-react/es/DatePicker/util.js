import dayjs from 'dayjs';
import { isArray, isDayjs } from '../_util/is';
import { methods } from '../_util/dayjs';
function getFormat(time) {
    return isDayjs(time) && time.format('HH:mm:ss');
}
export function isTimeArrayChange(prevTime, nextTime) {
    return (getFormat(prevTime[0]) !== getFormat(nextTime[0]) ||
        getFormat(prevTime[1]) !== getFormat(nextTime[1]));
}
export function getAvailableDayjsLength(value) {
    if (!value) {
        return 0;
    }
    if (isArray(value)) {
        if (isDayjs(value[0]) && isDayjs(value[1])) {
            return 2;
        }
        if (!isDayjs(value[0]) && !isDayjs(value[1])) {
            return 0;
        }
        return 1;
    }
    return 0;
}
// https://github.com/react-component/picker/blob/master/src/utils/dateUtil.ts#L234
export function isDisabledDate(cellDate, disabledDate, mode) {
    if (typeof disabledDate !== 'function') {
        return false;
    }
    // Whether cellDate is disabled in range
    var getDisabledFromRange = function (currentMode, start, end) {
        var current = start;
        while (current <= end) {
            var date = void 0;
            switch (currentMode) {
                case 'date': {
                    date = methods.set(cellDate, 'date', current);
                    if (!disabledDate(date)) {
                        return false;
                    }
                    break;
                }
                case 'month': {
                    date = methods.set(cellDate, 'month', current);
                    if (!isDisabledDate(date, disabledDate, 'month')) {
                        return false;
                    }
                    break;
                }
                case 'year': {
                    date = methods.set(cellDate, 'year', current);
                    if (!isDisabledDate(date, disabledDate, 'year')) {
                        return false;
                    }
                    break;
                }
                default:
                    break;
            }
            current += 1;
        }
        return true;
    };
    switch (mode) {
        case 'date':
        case 'week': {
            return disabledDate(cellDate);
        }
        case 'month': {
            var startDate = 1;
            var endDate = cellDate.endOf('month').get('date');
            return getDisabledFromRange('date', startDate, endDate);
        }
        case 'quarter': {
            var startMonth = Math.floor(cellDate.get('month') / 3) * 3;
            var endMonth = startMonth + 2;
            return getDisabledFromRange('month', startMonth, endMonth);
        }
        case 'year': {
            return getDisabledFromRange('month', 0, 11);
        }
        default:
            return false;
    }
}
export function getDefaultWeekStart(dayjsLocale) {
    var _a, _b;
    return ((_b = (_a = dayjs.Ls) === null || _a === void 0 ? void 0 : _a[dayjsLocale]) === null || _b === void 0 ? void 0 : _b.weekStart) || 0;
}
export function getLocaleDayjsValue(date, dayjsLocale) {
    return date ? date.locale(dayjsLocale) : date;
}
export function getFormatByIndex(format, index) {
    return isArray(format) ? format[index] : format;
}
