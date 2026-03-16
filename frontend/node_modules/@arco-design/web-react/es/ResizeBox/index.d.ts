import React from 'react';
import Split from './split';
import { ResizeBoxProps } from './interface';
import SplitGroup from './split-group';
export declare type DirectionType = 'left' | 'right' | 'top' | 'bottom';
declare const ResizeBoxComponent: React.ForwardRefExoticComponent<ResizeBoxProps & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>> & {
    Split: typeof Split;
    SplitGroup: typeof SplitGroup;
};
export default ResizeBoxComponent;
export { ResizeBoxProps };
