import { useCallback } from 'react';
import { Enter, ArrowDown, ArrowUp, ArrowLeft, ArrowRight } from '../keycode';
export default function useKeyboardEvent(props) {
    var getEventListeners = useCallback(function (callbacks) {
        return {
            onKeyDown: function (e) {
                var _a, _b, _c, _d, _e, _f;
                var keyCode = e.keyCode || e.which;
                if (keyCode === Enter.code) {
                    (_a = callbacks.onPressEnter) === null || _a === void 0 ? void 0 : _a.call(callbacks, e);
                }
                if (keyCode === ArrowDown.code) {
                    (_b = callbacks.onArrowDown) === null || _b === void 0 ? void 0 : _b.call(callbacks, e);
                }
                if (keyCode === ArrowLeft.code) {
                    (_c = callbacks.onArrowLeft) === null || _c === void 0 ? void 0 : _c.call(callbacks, e);
                }
                if (keyCode === ArrowRight.code) {
                    (_d = callbacks.onArrowRight) === null || _d === void 0 ? void 0 : _d.call(callbacks, e);
                }
                if (keyCode === ArrowUp.code) {
                    (_e = callbacks.onArrowUp) === null || _e === void 0 ? void 0 : _e.call(callbacks, e);
                }
                (_f = props === null || props === void 0 ? void 0 : props.onKeyDown) === null || _f === void 0 ? void 0 : _f.call(props, e);
            },
        };
    }, []);
    return getEventListeners;
}
