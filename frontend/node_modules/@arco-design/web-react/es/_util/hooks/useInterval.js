import { useRef, useEffect } from 'react';
export function useInterval(callback, delay) {
    var refIntervalId = useRef(null);
    var refSavedCallback = useRef();
    var setUpInterval = function () {
        if (delay !== null) {
            refIntervalId.current = setInterval(function () {
                refSavedCallback.current();
            }, delay);
        }
    };
    var cleanUpInterval = function () {
        refIntervalId.current && clearInterval(refIntervalId.current);
    };
    var resetInterval = function () {
        cleanUpInterval();
        setUpInterval();
    };
    // Remember the latest function.
    useEffect(function () {
        refSavedCallback.current = callback;
    }, [callback]);
    // Set up the interval.
    useEffect(function () {
        setUpInterval();
        return cleanUpInterval;
    }, [delay]);
    return resetInterval;
}
