/// <reference types="react" />
import { GridItemData } from './interface';
declare type RowContextType = {
    gutter?: [number, number];
    div?: boolean;
};
export declare const RowContext: import("react").Context<RowContextType>;
declare type GridContextType = {
    overflow?: boolean;
    collapsed?: boolean;
    displayIndexList?: number[];
    cols?: number;
    colGap?: number;
};
export declare const GridContext: import("react").Context<GridContextType>;
export declare const GridDataCollectorContext: import("react").Context<Readonly<{
    collectItemData?: (index: number, itemData: GridItemData) => void;
    removeItemData?: (index: number) => void;
}>>;
export {};
