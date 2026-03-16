import { useRef, useEffect } from 'react';
export default function useIsFirstRender() {
    var isFirst = useRef(true);
    useEffect(function () {
        isFirst.current = false;
    }, []);
    return isFirst.current;
}
