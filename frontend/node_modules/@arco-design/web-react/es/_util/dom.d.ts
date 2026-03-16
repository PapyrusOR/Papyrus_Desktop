export declare const isServerRendering: boolean;
export declare const on: (element: EventTarget | null, event: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void;
export declare const off: (element: EventTarget | null, event: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void;
export declare const contains: (root: HTMLElement, ele: any) => boolean;
export declare const isScrollElement: (element: HTMLElement) => boolean;
/**
 * 从当前节点向上查找所有的滚动元素
 * @param container 当前节点
 * @param top 查找到 top 节点就终止，不再继续查找
 * @returns
 */
export declare const getScrollElements: (container: HTMLElement, top?: HTMLElement) => HTMLElement[];
