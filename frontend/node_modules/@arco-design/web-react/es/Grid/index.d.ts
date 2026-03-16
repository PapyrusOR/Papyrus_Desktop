/// <reference types="react" />
import Col from './col';
import Row from './row';
import GridItem from './grid-item';
declare const Grid: import("react").ForwardRefExoticComponent<import("./interface").GridProps & import("react").RefAttributes<unknown>> & {
    Col: typeof Col;
    Row: typeof Row;
    GridItem: typeof GridItem;
};
export default Grid;
export { RowProps, ColProps, GridProps, ResponsiveValue } from './interface';
