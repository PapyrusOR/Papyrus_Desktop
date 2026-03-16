import React from 'react';
import { TbodyProps } from '../interface';
declare type TrType<T = any> = TbodyProps<T> & {
    record?: T;
    shouldRowExpand?: (record: any, index: any) => boolean;
    index?: number;
    type?: string;
    level?: number;
};
interface ForwardRefTrType extends React.ForwardRefExoticComponent<React.PropsWithoutRef<TrType> & React.RefAttributes<unknown>> {
    <T = any>(props: React.PropsWithChildren<TrType<T>> & {
        ref?: React.Ref<unknown>;
    }): React.ReactElement;
}
declare const _default: ForwardRefTrType;
export default _default;
