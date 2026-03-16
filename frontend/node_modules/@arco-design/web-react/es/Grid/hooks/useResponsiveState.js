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
import { useEffect, useRef, useState, useMemo } from 'react';
import ResponsiveObserve, { responsiveArray } from '../../_util/responsiveObserve';
import { isObject } from '../../_util/is';
function isResponsiveValue(val) {
    return isObject(val);
}
export var useResponsiveState = function (val, defaultValue, fallbackToXs) {
    if (fallbackToXs === void 0) { fallbackToXs = false; }
    var token = useRef();
    var _a = __read(useState({
        xs: true,
        sm: true,
        md: true,
        lg: true,
        xl: true,
        xxl: true,
        xxxl: true,
    }), 2), screens = _a[0], setScreens = _a[1];
    useEffect(function () {
        token.current = ResponsiveObserve.subscribe(function (screens) {
            if (isResponsiveValue(val)) {
                setScreens(screens);
            }
        });
        return function () {
            ResponsiveObserve.unsubscribe(token.current);
        };
    }, []);
    var result = useMemo(function () {
        var res = defaultValue;
        if (isResponsiveValue(val)) {
            for (var i = 0; i < responsiveArray.length; i++) {
                var breakpoint = responsiveArray[i];
                if ((screens[breakpoint] || (breakpoint === 'xs' && fallbackToXs)) &&
                    val[breakpoint] !== undefined) {
                    res = val[breakpoint];
                    break;
                }
            }
        }
        else {
            res = val;
        }
        return res;
    }, [screens, val, defaultValue, fallbackToXs]);
    return result;
};
