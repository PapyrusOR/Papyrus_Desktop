/// <reference types="react" />
import { ColumnProps } from '../interface';
interface SummaryContextProps {
    columns?: ColumnProps[];
    stickyOffsets?: number[];
    stickyClassNames?: string[];
    prefixCls?: string;
}
export declare const SummaryContext: import("react").Context<SummaryContextProps>;
export {};
