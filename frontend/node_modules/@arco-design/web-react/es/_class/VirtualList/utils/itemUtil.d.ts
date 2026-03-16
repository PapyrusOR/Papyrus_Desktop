/**
 * 为了计算方便，定位元素的下标可能返回数组长度，代表最后一个元素
 */
export declare const GHOST_ITEM_KEY = "__rc_ghost_item__";
export declare type Key = string | number;
interface LocationItemResult {
    /** 用于定位的元素的下标 */
    index: number;
    /** 定位元素自身需要补充的偏移量 */
    offsetPtg: number;
}
/**
 * 根据滚动条当前的滚动百分比，计算出基准元素
 * 在基准元素的上方和下方渲染可见区域的其他元素
 */
export declare function getLocationItem(scrollPtg: number, total: number): LocationItemResult;
/**
 * 获取HTML元素高度
 */
export declare function getNodeHeight(node: HTMLElement, needMargin?: boolean): number;
/**
 * 获取有效的scrollTop值
 * Safari的缓动效果会获得负值的scrollTop
 */
export declare function getValidScrollTop(scrollTop: number, scrollRange: number): number;
/**
 * 视口已滚动距离 / 总可滚动距离
 */
export declare function getScrollPercentage({ scrollTop, scrollHeight, clientHeight, }: {
    scrollTop: number;
    scrollHeight: number;
    clientHeight: number;
}): number;
/**
 * 计算需要渲染的元素的开始下标、结束下标和用于定位的元素下标
 */
export declare function getRangeIndex(scrollPtg: number, itemCount: number, visibleCount: number): {
    itemIndex: number;
    itemOffsetPtg: number;
    startIndex: number;
    endIndex: number;
};
interface ItemTopConfig {
    itemHeight: number;
    itemOffsetPtg: number;
    scrollTop: number;
    scrollPtg: number;
    clientHeight: number;
}
/**
 * 计算元素相对于视口顶部的偏移量
 */
export declare function getItemRelativeTop({ itemHeight, itemOffsetPtg, scrollPtg, clientHeight, }: Omit<ItemTopConfig, 'scrollTop'>): number;
/**
 * 计算元素相对于整个滚动区域顶部的偏移量
 */
export declare function getItemAbsoluteTop({ scrollTop, ...rest }: ItemTopConfig): number;
interface CompareItemConfig {
    locatedItemRelativeTop: number;
    locatedItemIndex: number;
    compareItemIndex: number;
    getItemKey: (index: number) => Key;
    startIndex: number;
    endIndex: number;
    itemElementHeights: {
        [key: string]: number;
    };
    itemHeight: number;
}
/**
 * 计算某一指定下标的元素相对于视口顶部的偏移量
 */
export declare function getCompareItemRelativeTop({ locatedItemRelativeTop, locatedItemIndex, compareItemIndex, startIndex, endIndex, getItemKey, itemElementHeights, itemHeight, }: CompareItemConfig): number;
export declare function getLongestItemIndex(data: Array<any>): number;
export {};
