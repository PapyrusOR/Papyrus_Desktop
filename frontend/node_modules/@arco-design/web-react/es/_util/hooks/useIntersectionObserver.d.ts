export declare const supportIntersectionObserver: boolean;
declare function useIntersectionObserver(callback: IntersectionObserverCallback, options?: IntersectionObserverInit): {
    observer: IntersectionObserver;
    cor: (elem: Element) => void;
    dor: () => void;
};
export default useIntersectionObserver;
