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
import isEqualWith from 'lodash/isEqualWith';
import { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { FormContext } from '../context';
import warn from '../../_util/warning';
// 获取指定 field 的内部状态，参数必填！！
var useFormState = function (field, form) {
    var formCtx = useContext(FormContext);
    var formInstance = form || formCtx.store;
    //  if field change, get the real value from fieldRef.current
    var fieldRef = useRef(field);
    fieldRef.current = field;
    var getFieldStateFromStore = useCallback(function () {
        var field = fieldRef.current;
        var formState = formInstance.getFieldsState([field]);
        return formState === null || formState === void 0 ? void 0 : formState[field];
    }, []);
    var _a = __read(useState(getFieldStateFromStore), 2), formState = _a[0], setFormState = _a[1];
    var formStateRef = useRef(formState);
    useEffect(function () {
        if (!formInstance) {
            warn(true, 'formInstance is not available');
            return;
        }
        var registerStateWatcher = (formInstance === null || formInstance === void 0 ? void 0 : formInstance.getInnerMethods(true)).registerStateWatcher;
        var updateState = function () {
            var newValue = getFieldStateFromStore();
            if (!isEqualWith(formStateRef.current, newValue)) {
                setFormState(newValue);
                formStateRef.current = newValue;
            }
        };
        updateState();
        var cancelWatch = registerStateWatcher && registerStateWatcher(updateState);
        return function () {
            cancelWatch === null || cancelWatch === void 0 ? void 0 : cancelWatch();
        };
    }, []);
    return formState;
};
export default useFormState;
