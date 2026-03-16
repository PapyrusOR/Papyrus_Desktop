import React from 'react';
import { NodeProps } from './interface';
export interface NodeState {
    isDragOver?: boolean;
    dragPosition: 0 | -1 | 1;
    isDragging?: boolean;
    isAllowDrop?: boolean;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<NodeProps & {
    children?: React.ReactNode;
} & React.RefAttributes<HTMLDivElement>>>;
export default _default;
