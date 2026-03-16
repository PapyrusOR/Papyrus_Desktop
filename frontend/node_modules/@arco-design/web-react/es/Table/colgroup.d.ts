import React from 'react';
import { InternalColumnProps } from './interface';
declare type ColGroupType = {
    prefixCls?: string;
    columns?: InternalColumnProps[];
    columnWidths?: number[];
    producer?: boolean;
    onSetColumnWidths?: (widths: number[]) => void;
    expandedRowKeys?: React.Key[];
    data?: any[];
};
declare function ColGroup(props: ColGroupType): JSX.Element;
export default ColGroup;
