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
import { useState, useContext, useEffect, useRef } from 'react';
import get from 'lodash/get';
import { isString } from '../../_util/is';
import { FormContext } from '../context';
import warn from '../../_util/warning';
var useWatch = function (field, form) {
    var formCtx = useContext(FormContext);
    var formInstance = form || formCtx.store;
    var _a = __read(useState(function () {
        var fieldValues = formInstance === null || formInstance === void 0 ? void 0 : formInstance.getFieldsValue([].concat(field));
        if (isString(field)) {
            return get(fieldValues, field);
        }
        return fieldValues;
    }), 2), value = _a[0], setValue = _a[1];
    //  if field change, get the real value from fieldRef.current
    var fieldRef = useRef(field);
    fieldRef.current = field;
    var valueRef = useRef(JSON.stringify(value));
    useEffect(function () {
        if (!formInstance) {
            warn(true, 'formInstance is not available');
            return;
        }
        var registerWatcher = (formInstance === null || formInstance === void 0 ? void 0 : formInstance.getInnerMethods(true)).registerWatcher;
        var updateValue = function () {
            var field = fieldRef.current;
            var formValues = formInstance.getFieldsValue([].concat(field));
            var newValue = formValues;
            if (isString(field)) {
                newValue = get(formValues, field);
            }
            var newValueString = JSON.stringify(newValue);
            if (valueRef.current !== newValueString) {
                setValue(newValue);
                valueRef.current = newValueString;
            }
        };
        updateValue();
        var cancelWatch = registerWatcher && registerWatcher(updateValue);
        return function () {
            cancelWatch === null || cancelWatch === void 0 ? void 0 : cancelWatch();
        };
    }, []);
    return value;
};
export default useWatch;
