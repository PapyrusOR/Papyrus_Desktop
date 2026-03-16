import { useEffect } from 'react';
import usePrevious from './usePrevious';
export default function useWatch(value, callback) {
    var prevValue = usePrevious(value);
    useEffect(function () {
        if (value !== prevValue) {
            callback(value, prevValue);
        }
    }, [value]);
}
