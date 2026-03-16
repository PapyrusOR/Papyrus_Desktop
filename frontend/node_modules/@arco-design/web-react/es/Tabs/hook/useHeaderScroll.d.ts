import { MutableRefObject } from 'react';
export default function useHeaderScroll<T extends HTMLElement>(props: {
    headerWrapperRef: MutableRefObject<T>;
    headerOffset: number;
    align: 'left' | 'right';
    direction: 'horizontal' | 'vertical';
    isScrollable: boolean;
    onScroll: (offset: number) => void | boolean;
    onScrollStart?: () => void;
    onScrollEnd?: () => void;
}): void;
