// only used by trigger. Plan to replace ../Portal
import { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { isServerRendering } from '../_util/dom';
import useIsFirstRender from '../_util/hooks/useIsFirstRender';
var Portal = function (props) {
    var getContainer = props.getContainer, children = props.children;
    var containerRef = useRef();
    var isFirstRender = useIsFirstRender();
    if ((isFirstRender || containerRef.current === null) && !isServerRendering) {
        containerRef.current = getContainer();
    }
    useEffect(function () {
        return function () {
            var container = containerRef.current;
            if (container && container.parentNode) {
                container.parentNode.removeChild(container);
                containerRef.current = null;
            }
        };
    }, []);
    return containerRef.current ? ReactDOM.createPortal(children, containerRef.current) : null;
};
export default Portal;
