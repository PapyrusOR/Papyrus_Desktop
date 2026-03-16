import React from 'react';
import { InputNumberProps } from '../InputNumber';
interface InputProps {
    min?: number;
    max?: number;
    step?: number;
    value: number[];
    range?: boolean;
    disabled?: boolean;
    prefixCls?: string;
    onChange?: (val: number[]) => void;
    extra?: InputNumberProps[];
}
declare const _default: React.MemoExoticComponent<(props: InputProps) => JSX.Element>;
export default _default;
