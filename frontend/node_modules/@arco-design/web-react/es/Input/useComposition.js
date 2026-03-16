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
import { useRef, useState, } from 'react';
import { Enter } from '../_util/keycode';
// Handle input text like Chinese
export default function useComposition(_a) {
    var value = _a.value, maxLength = _a.maxLength, onChange = _a.onChange, onKeyDown = _a.onKeyDown, onPressEnter = _a.onPressEnter, beforeTriggerValueChangeCallback = _a.beforeTriggerValueChangeCallback, normalizeHandler = _a.normalizeHandler;
    var refIsComposition = useRef(false);
    var _b = __read(useState(''), 2), compositionValue = _b[0], setCompositionValue = _b[1];
    var triggerValueChangeCallback = function (newValue, e) {
        if (beforeTriggerValueChangeCallback) {
            beforeTriggerValueChangeCallback(newValue);
        }
        if (onChange &&
            // https://github.com/arco-design/arco-design/issues/520
            // Avoid triggering onChange repeatedly for the same value
            // Compositionend is earlier than onchange in Firefox, different with chrome
            newValue !== value &&
            (maxLength === undefined || newValue.length <= maxLength)) {
            onChange(newValue, e);
        }
    };
    return {
        compositionValue: compositionValue,
        triggerValueChangeCallback: triggerValueChangeCallback,
        compositionHandler: function (e) {
            refIsComposition.current = e.type !== 'compositionend';
            if (!refIsComposition.current) {
                setCompositionValue(undefined);
                triggerValueChangeCallback(e.target.value, e);
            }
        },
        valueChangeHandler: function (e) {
            var newValue = e.target.value;
            if (!refIsComposition.current) {
                compositionValue && setCompositionValue(undefined);
                triggerValueChangeCallback(newValue, e);
            }
            else {
                // https://github.com/arco-design/arco-design/issues/397
                // compositionupdate => onchange
                refIsComposition.current = false;
                setCompositionValue(newValue);
            }
        },
        keyDownHandler: function (e) {
            var keyCode = e.keyCode || e.which;
            if (!refIsComposition.current) {
                onKeyDown && onKeyDown(e);
                if (keyCode === Enter.code) {
                    onPressEnter && onPressEnter(e);
                    var normalize = normalizeHandler === null || normalizeHandler === void 0 ? void 0 : normalizeHandler('onPressEnter');
                    normalize && triggerValueChangeCallback(normalize(e.target.value), e);
                }
            }
        },
    };
}
