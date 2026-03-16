import * as React from 'react';
export default function useCreate(fn) {
    var hasBeenCalled = React.useRef(false);
    if (hasBeenCalled.current === false) {
        fn();
        hasBeenCalled.current = true;
    }
}
