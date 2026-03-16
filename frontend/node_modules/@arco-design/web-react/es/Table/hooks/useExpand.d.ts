import { Key } from 'react';
import { TableProps, GetRowKeyType } from '../interface';
export default function useExpand<T>(props: TableProps<T>, flattenData: any, getRowKey: GetRowKeyType<T>): [Key[], (key: Key) => void];
