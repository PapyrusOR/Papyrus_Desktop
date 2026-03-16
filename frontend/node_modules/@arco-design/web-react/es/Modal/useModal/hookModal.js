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
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import Modal from '../modal';
function HookModal(props, ref) {
    var _a = __read(useState(true), 2), visible = _a[0], setVisible = _a[1];
    var _b = __read(useState(props), 2), config = _b[0], setConfig = _b[1];
    useImperativeHandle(ref, function () { return ({
        update: function (config) {
            setConfig(config);
        },
        close: function () {
            setVisible(false);
        },
    }); });
    function onOk() {
        var ret = config.onOk && config.onOk();
        if (ret && ret.then) {
            setConfig(function (config) { return (__assign(__assign({}, config), { confirmLoading: true })); });
            ret.then(function () {
                setVisible(false);
            }, function (e) {
                console.error(e);
                setConfig(function (config) { return (__assign(__assign({}, config), { confirmLoading: false })); });
            });
        }
        if (!ret) {
            setVisible(false);
        }
    }
    function onCancel() {
        config.onCancel && config.onCancel();
        setVisible(false);
    }
    return (React.createElement(Modal, __assign({ unmountOnExit: true, simple: true }, config, { visible: visible, onOk: onOk, onCancel: onCancel }), config.content));
}
export default forwardRef(HookModal);
