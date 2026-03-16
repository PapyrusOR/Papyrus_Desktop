import { Key } from 'react';
import { TableProps, GetRowKeyType } from '../interface';
export default function useRowSelection<T>(props: TableProps<T>, pageData: any, data: any, getRowKey: GetRowKeyType<T>): {
    selectedRowKeys: Key[];
    indeterminateKeys: Key[];
    onCheckAll: (checked: any) => void;
    onCheck: (checked: any, record: any) => void;
    onCheckRadio: (key: any, record: any) => void;
    setSelectedRowKeys: React.Dispatch<React.SetStateAction<Key[]>>;
    allSelectedRowKeys: Key[];
    flattenData: T[];
};
