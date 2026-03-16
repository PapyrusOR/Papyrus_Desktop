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
import originDayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import AdvancedFormat from 'dayjs/plugin/advancedFormat';
import weekYear from 'dayjs/plugin/weekYear';
import QuarterOfYear from 'dayjs/plugin/quarterOfYear';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { isDayjs, isArray, isUndefined } from '../_util/is';
var isMoment = originDayjs()._isAMomentObject;
if (isMoment) {
    originDayjs.extend = function () { };
}
var overwriteIsDayjs = function (_, Dayjs, dayjs) {
    dayjs = function (date, c) {
        if (isDayjs(date)) {
            return date.clone();
        }
        var cfg = typeof c === 'object' ? c : {};
        cfg.date = date;
        cfg.args = arguments; // eslint-disable-line prefer-rest-params
        return new Dayjs(cfg);
    };
    var proto = Dayjs.prototype;
    var old$Utils = proto.$utils;
    proto.$utils = function () {
        var newUtils = old$Utils();
        newUtils.i = isDayjs;
        return newUtils;
    };
    dayjs.isDayjs = isDayjs;
};
originDayjs.extend(overwriteIsDayjs);
originDayjs.extend(customParseFormat);
originDayjs.extend(isBetween);
originDayjs.extend(weekOfYear);
originDayjs.extend(AdvancedFormat);
originDayjs.extend(weekYear);
originDayjs.extend(QuarterOfYear);
originDayjs.extend(utc);
originDayjs.extend(timezone);
export var dayjs = originDayjs;
function startOfWeekTimestamp(date, weekStart) {
    // 计算 date 与前一个 weekStart 日期的间隔
    var diff = (date.day() - weekStart + 7) % 7;
    var startOfWeek = date.clone().startOf('day').subtract(diff, 'day');
    return startOfWeek.valueOf();
}
function isSameWeekMoment(date1, date2, weekStart) {
    return startOfWeekTimestamp(date1, weekStart) === startOfWeekTimestamp(date2, weekStart);
}
// 兼容 moment
export var methods = {
    add: function (time, value, unit) {
        return isMoment ? time.clone().add(value, unit) : time.add(value, unit);
    },
    subtract: function (time, value, unit) {
        return isMoment ? time.clone().subtract(value, unit) : time.subtract(value, unit);
    },
    startOf: function (time, unit) {
        return isMoment ? time.clone().startOf(unit) : time.startOf(unit);
    },
    endOf: function (time, unit) {
        return isMoment ? time.clone().endOf(unit) : time.endOf(unit);
    },
    set: function (time, unit, value) {
        return isMoment ? time.clone().set(unit, value) : time.set(unit, value);
    },
    isSameWeek: function (date1, date2, weekStart, localeName) {
        return isMoment
            ? isSameWeekMoment(date1, date2, weekStart)
            : date1.locale(__assign(__assign({}, dayjs.Ls[localeName]), { weekStart: weekStart })).isSame(date2, 'week');
    },
};
// convert timezone to utcOffset
// https://github.com/iamkun/dayjs/blob/dev/src/plugin/timezone/index.js#L3
var typeToPos = {
    year: 0,
    month: 1,
    day: 2,
    hour: 3,
    minute: 4,
    second: 5,
};
// Cache time-zone lookups from Intl.DateTimeFormat,
// as it is a *very* slow method.
var dtfCache = {};
var getDateTimeFormat = function (timezone, timeZoneName) {
    var key = timezone + "|" + (timeZoneName || 'short');
    var dtf = dtfCache[key];
    if (!dtf) {
        dtf = new Intl.DateTimeFormat('en-US', {
            hour12: false,
            timeZone: timezone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
        dtfCache[key] = dtf;
    }
    return dtf;
};
var makeFormatParts = function (timestamp, timezone) {
    var date = new Date(timestamp);
    var dtf = getDateTimeFormat(timezone);
    return dtf.formatToParts(date);
};
var tzOffset = function (timestamp, timezone) {
    var formatResult = makeFormatParts(timestamp, timezone);
    var filled = [];
    for (var i = 0; i < formatResult.length; i += 1) {
        var _a = formatResult[i], type = _a.type, value = _a.value;
        var pos = typeToPos[type];
        if (pos >= 0) {
            filled[pos] = parseInt(value, 10);
        }
    }
    var hour = filled[3];
    // Workaround for the same behavior in different node version
    // https://github.com/nodejs/node/issues/33027
    /* istanbul ignore next */
    var fixedHour = hour === 24 ? 0 : hour;
    var utcTs = Date.UTC(filled[0], filled[1] - 1, filled[2], fixedHour, filled[4], filled[5], 0);
    var asTS = +timestamp;
    var over = asTS % 1000;
    asTS -= over;
    return (utcTs - asTS) / (60 * 1000);
};
// find the right offset a given local time. The o input is our guess, which determines which
// offset we'll pick in ambiguous cases (e.g. there are two 3 AMs b/c Fallback DST)
// https://github.com/moment/luxon/blob/master/src/datetime.js#L76
var fixOffset = function (localTS, o0, tz) {
    // Our UTC time is just a guess because our offset is just a guess
    var utcGuess = localTS - o0 * 60 * 1000;
    // Test whether the zone matches the offset for this ts
    var o2 = tzOffset(utcGuess, tz);
    // If so, offset didn't change and we're done
    if (o0 === o2) {
        return [utcGuess, o0];
    }
    // If not, change the ts by the difference in the offset
    utcGuess -= (o2 - o0) * 60 * 1000;
    // If that gives us the local time we want, we're done
    var o3 = tzOffset(utcGuess, tz);
    if (o2 === o3) {
        return [utcGuess, o2];
    }
    // If it's different, we're in a hole time.
    // The offset has changed, but the we don't adjust the time
    return [localTS - Math.min(o2, o3) * 60 * 1000, Math.max(o2, o3)];
};
export function timezoneToOffset(inputTs, timezone) {
    // 使用输入时间戳获取初始偏移量猜测
    var initialOffset = tzOffset(inputTs, timezone);
    return fixOffset(inputTs, initialOffset, timezone)[1];
}
// get local now time
export function getNow(utcOffset, timezone) {
    return isUndefined(utcOffset) && !timezone ? dayjs() : toTimezone(dayjs(), utcOffset, timezone);
}
// convert local date to specify timezone date
export function toTimezone(time, utcOffset, timezone, local) {
    if (!time || (isUndefined(utcOffset) && !timezone)) {
        return time;
    }
    var localOffset = -time.toDate().getTimezoneOffset();
    var uOffset = isUndefined(utcOffset)
        ? !timezone
            ? localOffset
            : timezoneToOffset(time.valueOf(), timezone)
        : utcOffset;
    var timezoneOffset = Math.abs(uOffset) <= 16 ? uOffset * 60 : uOffset;
    var diffOffset = local ? localOffset - timezoneOffset : timezoneOffset - localOffset;
    // 由于内部时区是手动计算，所以看转换后的时间是否经历冬令时和夏令时边界，做下微调，修正拨表的一个小时
    var fixOffset = timezone
        ? timezoneToOffset(dayjs(time).valueOf() + diffOffset * 60 * 1000, timezone)
        : uOffset;
    var realDiffOffset = diffOffset - (uOffset - fixOffset);
    var diff = local || !isUndefined(utcOffset) ? diffOffset : realDiffOffset;
    return dayjs(dayjs(time).valueOf() + diff * 60 * 1000);
}
// convert specify timezone date to local date
export function toLocal(time, utcOffset, timezone) {
    return toTimezone(time, utcOffset, timezone, true);
}
export function getTimeFormat(format) {
    var units = ['H', 'h', 'm', 's', 'A', 'a'];
    var timeFormat = '';
    units.some(function (unit) {
        if (format.indexOf(unit) !== -1) {
            timeFormat = "" + unit + format.split(" " + unit)[1];
            return true;
        }
        return false;
    });
    return timeFormat || 'HH:mm:ss';
}
export function getDayjsValue(time, format, utcOffset, timezone) {
    if (!time) {
        return undefined;
    }
    var formatValue = function (value, i) {
        if (isDayjs(value)) {
            return dayjs(value.valueOf());
        }
        if (typeof value === 'string') {
            var dv = dayjs(value, isArray(format) ? format[i] : format);
            return dv.isValid() ? dv : dayjs(value, 'YYYY-MM-DD');
        }
        return dayjs(value);
    };
    // if set a timezone, convert to timezone date
    var getRealTime = function (t, i) {
        return utcOffset !== undefined || timezone
            ? toTimezone(formatValue(t, i), utcOffset, timezone)
            : formatValue(t, i);
    };
    if (isArray(time)) {
        return time.map(function (t, i) { return (t ? getRealTime(t, i) : undefined); });
    }
    return getRealTime(time, 0);
}
export function getValueWithTime(date, time) {
    var y = date.year();
    var m = date.month();
    var d = date.date();
    if (time) {
        var returnTime = time;
        returnTime = methods.set(returnTime, 'year', y);
        returnTime = methods.set(returnTime, 'month', m);
        returnTime = methods.set(returnTime, 'date', d);
        return returnTime;
    }
    return date;
}
export function getSortedDayjsArray(values, fixedTime) {
    if (!values || !values[0] || !values[1]) {
        return values;
    }
    var newValues = __spreadArray([], __read(values), false);
    newValues.sort(function (a, b) { return a.valueOf() - b.valueOf(); });
    // 排序处理考虑时间
    if (fixedTime && values.length === 2) {
        newValues[0] = newValues[0]
            .set('hour', values[0].get('hour'))
            .set('minute', values[0].get('minute'))
            .set('second', values[0].get('second'));
        newValues[1] = newValues[1]
            .set('hour', values[1].get('hour'))
            .set('minute', values[1].get('minute'))
            .set('second', values[1].get('second'));
    }
    return newValues;
}
export function isDayjsChange(prevValue, currentValue) {
    if (currentValue === undefined && prevValue === undefined) {
        return false;
    }
    return ((currentValue && !prevValue) ||
        (!currentValue && prevValue) ||
        dayjs(currentValue).valueOf() !== dayjs(prevValue).valueOf());
}
export function isDayjsArrayChange(prevValue, currentValue) {
    if (currentValue === undefined && prevValue === undefined) {
        return false;
    }
    return ((currentValue && !prevValue) ||
        (!currentValue && prevValue) ||
        (isArray(currentValue) &&
            isArray(prevValue) &&
            dayjs(currentValue[0]).valueOf() !== dayjs(prevValue[0]).valueOf()) ||
        dayjs(currentValue[1]).valueOf() !== dayjs(prevValue[1]).valueOf());
}
export function isValidTimeString(str, format, index) {
    return (typeof str === 'string' &&
        dayjs(str, format).format(isArray(format) ? format[index] : format) === str);
}
