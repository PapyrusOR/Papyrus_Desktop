import { useRef } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
export default function useResizeObserver(onResize) {
    var resizeObserver = useRef();
    var destroyObserver = function () {
        if (resizeObserver.current) {
            resizeObserver.current.disconnect();
            resizeObserver.current = null;
        }
    };
    var createObserver = function (elem) {
        if (elem) {
            if (resizeObserver.current) {
                destroyObserver();
            }
            resizeObserver.current = new ResizeObserver(onResize);
            resizeObserver.current.observe(elem);
        }
    };
    return {
        currentOr: resizeObserver.current,
        cor: createObserver,
        dor: destroyObserver,
    };
}
