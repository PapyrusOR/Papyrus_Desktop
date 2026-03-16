import React from 'react';
import { TableProps } from './interface';
export interface TableInstance {
    getRootDomElement: () => HTMLDivElement;
    scrollIntoView: (dataIndex: React.Key) => void;
}
declare const _default: <T>(props: TableProps<T> & {
    ref?: React.Ref<TableInstance>;
}) => React.ReactElement;
export default _default;
