import React from 'react';
import { SelectViewHandle } from '../_class/select-view';
import { CascaderProps } from './interface';
export declare const DefaultFieldNames: {
    label: string;
    value: string;
    isLeaf: string;
    children: string;
    disabled: string;
};
interface ForwardRefCascaderType extends React.ForwardRefExoticComponent<React.PropsWithoutRef<CascaderProps> & React.RefAttributes<SelectViewHandle>> {
    <T = any>(props: React.PropsWithChildren<CascaderProps<T>> & {
        ref?: React.Ref<SelectViewHandle>;
    }): React.ReactElement;
}
declare const CascaderComponent: ForwardRefCascaderType;
export default CascaderComponent;
