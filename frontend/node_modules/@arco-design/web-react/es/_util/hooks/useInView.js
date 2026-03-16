var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
import { useCallback, useEffect, useState } from 'react';
import useIntersectionObserver, { supportIntersectionObserver } from './useIntersectionObserver';
function useInView(props) {
    var defaultInView = props.defaultInView, _a = props.unobserverOnEnter, unobserverOnEnter = _a === void 0 ? true : _a, onChange = props.onChange, target = props.target, rest = __rest(props, ["defaultInView", "unobserverOnEnter", "onChange", "target"]);
    // if intersect observer is not supported
    var _b = __read(useState(supportIntersectionObserver ? defaultInView : true), 2), inView = _b[0], setInView = _b[1];
    var observerCallback = useCallback(function (_a, observer) {
        var _b = __read(_a, 1), entry = _b[0];
        var inThreshold = observer.thresholds.some(function (t) { return entry.intersectionRatio >= t; });
        var newInView = inThreshold && entry.isIntersecting;
        setInView(newInView);
        onChange === null || onChange === void 0 ? void 0 : onChange(newInView, entry);
        if (newInView && unobserverOnEnter) {
            observer.unobserve(entry.target);
        }
    }, [onChange, unobserverOnEnter]);
    var _c = useIntersectionObserver(observerCallback, rest), cor = _c.cor, dor = _c.dor, observer = _c.observer;
    useEffect(function () {
        var noNeedObserver = defaultInView && unobserverOnEnter;
        if (noNeedObserver) {
            dor();
        }
        else if (target) {
            cor(target);
        }
        return dor;
    }, [target, defaultInView, unobserverOnEnter]);
    return {
        inView: inView,
        observer: observer,
    };
}
export default useInView;
