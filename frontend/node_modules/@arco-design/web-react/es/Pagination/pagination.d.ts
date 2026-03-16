import React from 'react';
import { PaginationProps } from './interface';
export interface PaginationState {
    current: number;
    pageSize: number;
    total?: number;
    showMore?: boolean;
}
declare const PaginationComponent: React.ForwardRefExoticComponent<PaginationProps & React.RefAttributes<unknown>>;
export default PaginationComponent;
export { PaginationProps };
