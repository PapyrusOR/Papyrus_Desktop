import Summary from './summary/index';
declare const TableComponent: (<T>(props: import("./interface").TableProps<T> & {
    ref?: import("react").Ref<import("./table").TableInstance>;
}) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>) & {
    Summary: typeof Summary;
};
export default TableComponent;
export { TableProps, ColumnProps, RowSelectionProps, ExpandProps } from './interface';
