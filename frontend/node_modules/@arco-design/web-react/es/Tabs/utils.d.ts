export declare const getRectDiff: (node: HTMLElement, parentNode: HTMLElement) => {
    left: number;
    top: number;
    right: number;
    bottom: number;
};
export declare const updateScrollOffset: (parentNode: HTMLElement, direction: 'horizontal' | 'vertical') => void;
export declare const getKeyDownEvent: ({ onPressEnter }: {
    onPressEnter: any;
}) => {
    onKeyDown: (e: any) => void;
};
