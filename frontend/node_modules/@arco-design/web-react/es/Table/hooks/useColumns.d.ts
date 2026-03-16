import { InternalColumnProps, TableProps } from '../interface';
declare function useColumns<T>(props: TableProps<T>): [InternalColumnProps[][], InternalColumnProps[]];
export default useColumns;
