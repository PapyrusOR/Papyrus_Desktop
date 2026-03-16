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
import { isArray, isObject, isString } from './is';
import warning from './warning';
export default function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var length = args.length;
    var classNames = [];
    var _loop_1 = function (i) {
        var v = args[i];
        if (!v) {
            return "continue";
        }
        if (isString(v)) {
            classNames.push(v);
        }
        else if (isArray(v)) {
            classNames = classNames.concat(v);
        }
        else if (isObject(v)) {
            Object.keys(v).forEach(function (k) {
                if (v[k]) {
                    classNames.push(k);
                }
            });
        }
        else {
            warning(true, 'arguments must be one of string/array/object.');
        }
    };
    for (var i = 0; i < length; i++) {
        _loop_1(i);
    }
    return __spreadArray([], __read(new Set(classNames)), false).join(' ');
}
