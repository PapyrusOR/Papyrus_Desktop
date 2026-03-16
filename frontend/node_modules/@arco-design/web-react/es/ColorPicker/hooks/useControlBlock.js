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
import { useRef, useState } from 'react';
export var useControlBlock = function (_a) {
    var value = _a.value, _b = _a.multiple, multiple = _b === void 0 ? false : _b, onActive = _a.onActive, onAdd = _a.onAdd, onChange = _a.onChange;
    var _c = __read(useState(false), 2), active = _c[0], setActive = _c[1];
    var blockRef = useRef();
    var handlerRef = useRef();
    var getPercentNumber = function (value, max) {
        if (value < 0) {
            return 0;
        }
        if (value > max) {
            return 1;
        }
        return value / max;
    };
    var getNewPosition = function (ev) {
        var clientX = ev.clientX, clientY = ev.clientY;
        var rect = blockRef.current.getBoundingClientRect();
        return [
            getPercentNumber(clientX - rect.x, rect.width),
            getPercentNumber(clientY - rect.y, rect.height),
        ];
    };
    var setCurrentPosition = function (ev) {
        var newValue = getNewPosition(ev);
        if (multiple || (!multiple && (newValue[0] !== value[0] || newValue[1] !== value[1]))) {
            onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
        }
    };
    var removeListener = function () {
        setActive(false);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', removeListener);
        window.removeEventListener('contextmenu', removeListener);
    };
    var onMouseDown = function (ev) {
        var _a, _b;
        ev.preventDefault();
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', removeListener);
        window.addEventListener('contextmenu', removeListener);
        setActive(true);
        if (multiple) {
            if (ev.target === blockRef.current) {
                onAdd(getNewPosition(ev));
            }
            else if (typeof ((_b = (_a = ev.target) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.key) !== 'undefined') {
                var key = ev.target.dataset.key;
                onActive(key);
            }
            return;
        }
        setCurrentPosition(ev);
    };
    function onMouseMove(ev) {
        ev.preventDefault();
        if (ev.buttons > 0) {
            setCurrentPosition(ev);
        }
        else {
            removeListener();
        }
    }
    return {
        active: active,
        blockRef: blockRef,
        handlerRef: handlerRef,
        onMouseDown: onMouseDown,
    };
};
