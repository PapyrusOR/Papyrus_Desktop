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
import { useCallback, useEffect, useRef, useState } from 'react';
function useStateCallback(initialState) {
    var _a = __read(useState(initialState), 2), state = _a[0], _setState = _a[1];
    var callbackRef = useRef();
    var setState = useCallback(function (setStateAction, callback) {
        callbackRef.current = callback;
        _setState(setStateAction);
    }, []);
    useEffect(function () {
        callbackRef.current && callbackRef.current(state);
    }, [state]);
    return [state, setState];
}
export default useStateCallback;
