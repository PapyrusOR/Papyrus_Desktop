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
import { padStart } from '../_util/pad';
// https://github.com/ant-design/ant-design/blob/master/components/statistic/utils.tsx
var units = [
    ['Y', 1000 * 60 * 60 * 24 * 365],
    ['M', 1000 * 60 * 60 * 24 * 30],
    ['D', 1000 * 60 * 60 * 24],
    ['H', 1000 * 60 * 60],
    ['m', 1000 * 60],
    ['s', 1000],
    ['S', 1], // million seconds
];
export function getDateString(millisecond, format) {
    var leftMillisecond = millisecond;
    return units.reduce(function (current, _a) {
        var _b = __read(_a, 2), name = _b[0], unit = _b[1];
        if (current.indexOf(name) !== -1) {
            var value_1 = Math.floor(leftMillisecond / unit);
            leftMillisecond -= value_1 * unit;
            return current.replace(new RegExp(name + "+", 'g'), function (match) {
                var len = match.length;
                return padStart(value_1.toString(), len, '0');
            });
        }
        return current;
    }, format);
}
