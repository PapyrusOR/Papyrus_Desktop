import { CSSProperties, ReactNode } from 'react';
export declare type DragStatus = 'none' | 'dragged' | 'dragging';
export declare type DragPosition = 'left' | 'right' | 'top' | 'bottom';
export interface DraggableItemProps extends Pick<DraggableProps, 'direction'> {
    style?: CSSProperties;
    prefixCls: string;
    children?: ReactNode;
    /** Weather allow to drag  */
    disabled?: boolean;
    /** Weather allow to drop on it */
    droppable?: boolean;
    onDragStart?: (event: any) => void;
    onDragEnd?: (event: any) => void;
    onDragLeave?: (event: any) => void;
    onDragOver?: (event: any) => void;
    onDrop?: (event: any, dropPosition: DragPosition) => void;
}
export interface DraggableProps {
    children?: ReactNode;
    direction?: 'horizontal' | 'vertical';
    className?: string | string[];
    itemWrapperStyle?: CSSProperties;
    onIndexChange?: (index: number, prevIndex: number) => void;
}
