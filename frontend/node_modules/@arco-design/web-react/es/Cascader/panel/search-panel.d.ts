import { CSSProperties, ReactNode } from 'react';
import { OptionProps, CascaderProps, extraOptions } from '../interface';
import { NodeProps } from '../base/node';
import Store from '../base/store';
export declare const getLegalIndex: (currentIndex: any, maxIndex: any) => any;
export declare type SearchPanelProps<T> = {
    store?: Store<T>;
    style?: CSSProperties;
    prefixCls?: string;
    rtl?: boolean;
    multiple?: boolean;
    value: string[][];
    inputValue?: string;
    onEsc?: () => void;
    onChange?: (value: string[][]) => void;
    renderEmpty?: () => ReactNode;
    virtualListProps?: CascaderProps<T>['virtualListProps'];
    defaultActiveFirstOption: boolean;
    renderOption?: (inputValue: string, node: NodeProps<T>, options: extraOptions) => ReactNode;
    getTriggerElement: () => HTMLElement;
    icons?: {
        loading?: ReactNode;
        checked?: ReactNode;
        next?: ReactNode;
    };
};
declare const SearchPanel: <T extends OptionProps>(props: SearchPanelProps<T>) => JSX.Element;
export default SearchPanel;
