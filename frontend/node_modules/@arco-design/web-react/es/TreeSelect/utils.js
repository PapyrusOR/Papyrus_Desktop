import { isArray, isObject } from '../_util/is';
export var normalizeValueToArray = function (val) {
    var value = val;
    if (!isArray(val)) {
        value = val === null || val === undefined ? [] : [val];
    }
    return value.map(function (x) {
        if (isObject(x)) {
            return x.value;
        }
        return x;
    });
};
