import { useRef } from 'react';
import { isNumber } from '../_util/is';
import useIsomorphicLayoutEffect from '../_util/hooks/useIsomorphicLayoutEffect';
export default function useSelectionRange(_a) {
    var inputElement = _a.inputElement, inputValue = _a.inputValue;
    // Selection position from the tail (e.g. 1234|56, this value will be 2)
    var refSelectionPosition = useRef(null);
    useIsomorphicLayoutEffect(function () {
        try {
            var position = refSelectionPosition.current;
            if (inputElement && inputValue && isNumber(position)) {
                var start = Math.max(0, inputValue.length - position);
                inputElement.setSelectionRange(start, start);
            }
        }
        catch (err) {
            console.warn('Failed to reset input selection range position', err);
        }
    }, [inputValue]);
    return function (event) {
        var _a = event.target, end = _a.selectionEnd, value = _a.value;
        if (isNumber(end)) {
            refSelectionPosition.current = value.length - end;
        }
    };
}
