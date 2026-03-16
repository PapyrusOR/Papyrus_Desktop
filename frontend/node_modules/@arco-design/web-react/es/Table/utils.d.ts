import type { ColumnProps, SorterFn } from './interface';
export declare function px2Number(width: number | string): number | string;
export declare function getScrollBarHeight(ele: HTMLElement | null): number;
export declare function getScrollBarWidth(ele: HTMLElement | null): number;
export declare function isChildrenNotEmpty(record: any, field: string): any;
export declare function deepCloneData(data: any, childrenColumnName: any): any[];
export declare function getOriginData(data: any): any;
export declare function getSelectedKeys(record: any, checked: any, checkedRowKeys: any[], _indeterminateKeys: any[], getRowKey: any, childrenColumnName: any, checkConnected: any): {
    selectedRowKeys: any[];
    indeterminateKeys: any[];
};
export declare function getSelectedKeysByData(flattenData: any, checkedKeys: any[], getRowKey: any, childrenColumnName: string, checkConnected: boolean): {
    selectedRowKeys: any[];
    indeterminateKeys: any[];
};
export declare function getSorterFn(sorter: ColumnProps['sorter']): SorterFn | null;
export declare function getSorterPriority(sorter: ColumnProps['sorter']): number | undefined;
