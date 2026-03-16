import { KeyboardEventHandler } from 'react';
declare type CallBackEventType = 'onPressEnter' | 'onArrowUp' | 'onArrowLeft' | 'onArrowRight' | 'onArrowDown';
export default function useKeyboardEvent(props?: {
    onKeyDown?: KeyboardEventHandler;
}): (callbacks: {
    onPressEnter?: (e: any) => void;
    onArrowUp?: (e: any) => void;
    onArrowLeft?: (e: any) => void;
    onArrowRight?: (e: any) => void;
    onArrowDown?: (e: any) => void;
}) => {
    onKeyDown: (e: any) => void;
};
export {};
