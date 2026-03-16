import { useRef, useEffect } from 'react';
export default function useUpdate(fn, deps) {
    if (deps === void 0) { deps = []; }
    var isDidMount = useRef(false);
    useEffect(function () {
        if (isDidMount.current) {
            fn();
        }
        else {
            isDidMount.current = true;
        }
    }, deps);
}
