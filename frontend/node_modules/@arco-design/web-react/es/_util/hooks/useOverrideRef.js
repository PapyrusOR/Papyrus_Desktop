import React, { cloneElement, isValidElement, useCallback } from 'react';
import { callbackOriginRef } from '../react-dom';
import { supportRef } from '../is';
export default function useOverrideRef() {
    var ref = React.useRef(null);
    var overrideNode = useCallback(function (originNode) {
        if (isValidElement(originNode) && supportRef(originNode)) {
            return cloneElement(originNode, {
                ref: function (node) {
                    ref.current = node;
                    callbackOriginRef(originNode, node);
                },
            });
        }
        return originNode;
    }, []);
    return [overrideNode, ref];
}
