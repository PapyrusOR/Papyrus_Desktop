import React, { ReactNode } from 'react';
import { FormItemProps } from './interface';
interface FormItemLabelProps extends Pick<FormItemProps, 'tooltip' | 'label' | 'requiredSymbol' | 'required' | 'rules'> {
    showColon: boolean | ReactNode;
    prefix: string;
    htmlFor?: string;
}
declare const FormItemLabel: React.FC<FormItemLabelProps>;
export default FormItemLabel;
