import ResizeObserver from 'resize-observer-polyfill';
export default function useResizeObserver(onResize: (entry: ResizeObserverEntry[]) => void): {
    currentOr: ResizeObserver;
    cor: (elem: Element) => void;
    dor: () => void;
};
