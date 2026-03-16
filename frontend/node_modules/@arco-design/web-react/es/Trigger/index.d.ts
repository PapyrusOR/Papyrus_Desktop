import React, { PureComponent, PropsWithChildren, CSSProperties, RefObject } from 'react';
import ResizeObserverPolyfill from 'resize-observer-polyfill';
import { ConfigContext } from '../ConfigProvider';
import { TriggerProps, MouseLocationType } from './interface';
export { TriggerProps };
declare function getDOMPos(dom: HTMLElement, options: {
    boundaryDistance: TriggerProps['boundaryDistance'];
    position: TriggerProps['position'];
}): {
    width?: undefined;
    height?: undefined;
    left?: undefined;
    right?: undefined;
} | {
    width: any;
    height: any;
    left: any;
    right: any;
};
export interface TriggerState {
    popupVisible: boolean;
    popupStyle: object;
}
export declare const EventsByTriggerNeed: string[];
export declare type EventsByTriggerNeedType = 'onClick' | 'onMouseEnter' | 'onMouseLeave' | 'onMouseMove' | 'onFocus' | 'onBlur' | 'onContextMenu' | 'onKeyDown';
declare class Trigger extends PureComponent<TriggerProps, TriggerState> {
    static displayName: string;
    static contextType: React.Context<import("../ConfigProvider").ConfigProviderProps>;
    context: React.ContextType<typeof ConfigContext>;
    static getDerivedStateFromProps(nextProps: any, state: any): {
        popupVisible: any;
    };
    popupContainer: any;
    rootElementRef: any;
    triggerRef: RefObject<HTMLSpanElement | null>;
    triggerRefDestoried: boolean;
    delayTimer: any;
    updatePositionTimer: any;
    realPosition: string;
    arrowStyle: CSSProperties;
    popupOpen: boolean;
    mousedownToHide: boolean;
    mouseDownTimeout: any;
    hasPopupMouseDown: boolean;
    handleClickOutside: boolean;
    handleWindowResize: boolean;
    unmount: boolean;
    isDidMount: boolean;
    mouseLocation: MouseLocationType;
    observerContainer: any;
    scrollElements: (HTMLElement | Window)[];
    resizeObserver: ResizeObserverPolyfill;
    childrenDom: any;
    childrenDomSize: ReturnType<typeof getDOMPos>;
    getMergedProps: (basePropsOrKeys?: any) => PropsWithChildren<TriggerProps>;
    constructor(props: any, context: any);
    getRootElement: () => HTMLElement;
    getPopupElement: () => HTMLSpanElement | null;
    componentDidMount(): void;
    componentDidUpdate(_prevProps: any): void;
    componentWillUnmount(): void;
    offScrollListeners: () => void;
    offWindowResize: () => void;
    offContainerResize: () => void;
    handleScroll: () => void;
    onContainersScroll: (props: TriggerProps) => void;
    onContainerResize: () => void;
    handleUpdatePosition: {
        (...args: any[]): void;
        cancel(): void;
    };
    isClickTrigger: () => boolean;
    isFocusTrigger: () => boolean;
    isHoverTrigger: () => boolean;
    isContextMenuTrigger: () => boolean;
    isMouseLeaveToClose: () => boolean;
    isPopupHoverHide: () => boolean;
    isClickToHide: () => boolean;
    isBlurToHide: () => boolean;
    clearTimer: () => void;
    offClickOutside: () => void;
    getTransformOrigin: (position: any) => {
        transformOrigin?: undefined;
    } | {
        transformOrigin: any;
    };
    getTransformTranslate: () => "" | "scaleY(0.9) translateY(-4px)" | "scaleY(0.9) translateY(4px)";
    getPopupStyle: () => any;
    showPopup: (callback?: () => void) => void;
    update: {
        (...args: any[]): void;
        cancel(): void;
    };
    getRootDOMNode: () => HTMLElement;
    updatePopupPosition: (delay?: number, callback?: () => void) => void;
    setPopupVisible: (visible: boolean, delay?: number, callback?: () => void) => void;
    delayToDo: (delay: number, callback: () => void) => void;
    clearDelayTimer(): void;
    onClickOutside: (e: any) => void;
    onKeyDown: (e: any) => void;
    onPressEsc: (e: any) => void;
    onMouseEnter: (e: any) => void;
    onMouseMove: (e: any) => void;
    onMouseLeave: (e: any) => void;
    onPopupMouseEnter: () => void;
    onPopupMouseLeave: (e: any) => void;
    setMouseLocation: (e: any) => void;
    onContextMenu: (e: any) => void;
    clickToHidePopup: (e: any) => void;
    onClick: (e: any) => void;
    onFocus: (e: any) => void;
    onBlur: (e: any) => void;
    onResize: () => void;
    onPopupMouseDown: () => void;
    getChild: () => {};
    rafId: number;
    appendToContainer: (node: HTMLDivElement) => void;
    getContainer: () => HTMLDivElement;
    triggerPropsEvent: (eventName: EventsByTriggerNeedType, e: any) => void;
    triggerOriginEvent: (eventName: EventsByTriggerNeedType) => any;
    render(): JSX.Element;
}
export default Trigger;
