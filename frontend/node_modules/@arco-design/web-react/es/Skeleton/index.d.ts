import React from 'react';
import { SkeletonProps } from './interface';
declare const SkeletonComponent: React.ForwardRefExoticComponent<SkeletonProps & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
export default SkeletonComponent;
export { SkeletonProps };
