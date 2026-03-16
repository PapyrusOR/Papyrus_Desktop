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
import React, { useState, useImperativeHandle, forwardRef, useContext } from 'react';
import { ConfigContext } from '../ConfigProvider';
var ContextHolderElement = forwardRef(function (_props, ref) {
    var configContext = useContext(ConfigContext);
    var _a = __read(useState([]), 2), instances = _a[0], setInstances = _a[1];
    function addInstance(ins) {
        setInstances(function (originInstances) { return __spreadArray(__spreadArray([], __read(originInstances), false), [ins], false); });
    }
    function removeInstance(ins) {
        setInstances(function (originInstances) { return originInstances.filter(function (originIns) { return ins !== originIns; }); });
    }
    function getContextConfig() {
        return configContext;
    }
    useImperativeHandle(ref, function () { return ({
        addInstance: addInstance,
        removeInstance: removeInstance,
        getContextConfig: getContextConfig,
    }); });
    return (React.createElement(React.Fragment, null, React.Children.map(instances, function (child, index) { return React.cloneElement(child, { key: index }); })));
});
export default ContextHolderElement;
