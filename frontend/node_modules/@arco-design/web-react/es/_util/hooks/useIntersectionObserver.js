import { useRef } from 'react';
import { isServerRendering } from '../dom';
import { isUndefined } from '../is';
export var supportIntersectionObserver = !isServerRendering && !isUndefined(window === null || window === void 0 ? void 0 : window.IntersectionObserver);
function useIntersectionObserver(callback, options) {
    if (options === void 0) { options = {}; }
    var intersectionObserver = useRef();
    var destroyObserver = function () {
        if (intersectionObserver.current) {
            intersectionObserver.current.disconnect();
            intersectionObserver.current = null;
        }
    };
    var createObserver = function (elem) {
        if (elem) {
            destroyObserver();
            if (supportIntersectionObserver) {
                intersectionObserver.current = new IntersectionObserver(callback, options);
                intersectionObserver.current.observe(elem);
            }
        }
    };
    return {
        observer: intersectionObserver.current,
        cor: createObserver,
        dor: destroyObserver,
    };
}
export default useIntersectionObserver;
