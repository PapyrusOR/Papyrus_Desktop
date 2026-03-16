import React, { CSSProperties, ReactNode } from 'react';
import { Dayjs } from 'dayjs';
export interface DateInputProps {
    style?: CSSProperties;
    className?: string | string[];
    error?: boolean;
    status?: 'warning' | 'error';
    disabled?: boolean;
    placeholder?: string;
    value?: Dayjs;
    inputValue?: string;
    popupVisible?: boolean;
    format?: string | ((value: Dayjs) => string);
    prefixCls?: string;
    size?: 'mini' | 'small' | 'default' | 'large';
    allowClear?: boolean;
    onClear?: (e: any) => void;
    editable?: boolean;
    onPressEnter?: () => void;
    onChange?: (e: any) => void;
    suffixIcon?: ReactNode;
    isPlaceholder?: boolean;
    prefix?: ReactNode;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}
declare type DateInputHandle = {
    focus: () => void;
    blur: () => void;
};
declare const _default: React.ForwardRefExoticComponent<DateInputProps & React.RefAttributes<DateInputHandle>>;
export default _default;
