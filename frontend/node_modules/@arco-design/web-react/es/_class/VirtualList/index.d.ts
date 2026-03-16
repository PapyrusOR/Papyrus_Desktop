import React, { ReactNode, CSSProperties, UIEvent } from 'react';
import { Key } from './utils/itemUtil';
export declare type RenderFunc<T> = (item: T, index: number, props: {
    style: React.CSSProperties;
    itemIndex: number;
}) => ReactNode;
export interface VirtualListProps<T> extends Omit<React.HTMLAttributes<any>, 'children' | 'onScroll'> {
    children: RenderFunc<T>;
    data: T[];
    height?: number | string;
    itemHeight?: number;
    wrapper?: string | React.FC<any> | React.ComponentClass<any>;
    threshold?: number | null;
    isStaticItemHeight?: boolean;
    itemKey?: Key | ((item: T, index: number) => Key);
    measureLongestItem?: boolean;
    scrollOptions?: ScrollIntoViewOptions;
    needFiller?: boolean;
    /** Custom filler outer style */
    outerStyle?: CSSProperties;
    innerStyle?: CSSProperties;
    onScroll?: (event: UIEvent<HTMLElement>, info: {
        index: number;
    }) => void;
    wrapperChild?: string | React.FC<any> | React.ComponentClass<any>;
}
export declare type AvailableVirtualListProps = Pick<VirtualListProps<any>, 'height' | 'itemHeight' | 'threshold' | 'isStaticItemHeight' | 'scrollOptions' | 'onScroll' | 'wrapperChild'>;
export declare type VirtualListHandle = {
    dom: HTMLElement;
    scrollTo: (arg: number | {
        index: number;
        options?: ScrollIntoViewOptions;
    } | {
        key: Key;
        options?: ScrollIntoViewOptions;
    }) => void;
};
declare const VirtualList: React.ForwardRefExoticComponent<VirtualListProps<any> & React.RefAttributes<VirtualListHandle>>;
export default VirtualList;
