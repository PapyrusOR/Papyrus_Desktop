import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
export interface ResizeProps {
    throttle?: boolean;
    onResize?: (entry: ResizeObserverEntry[]) => void;
    children?: React.ReactNode;
    getTargetDOMNode?: () => any;
}
declare class ResizeObserverComponent extends React.Component<ResizeProps> {
    resizeObserver: ResizeObserver;
    rootDOMRef: any;
    getRootElement: () => any;
    getRootDOMNode: () => any;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount: () => void;
    createResizeObserver: () => void;
    destroyResizeObserver: () => void;
    render(): React.ReactNode;
}
export default ResizeObserverComponent;
