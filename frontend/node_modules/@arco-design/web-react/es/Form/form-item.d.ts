import React, { ReactElement } from 'react';
import { FormItemProps, KeyType } from './interface';
declare const Row: React.ForwardRefExoticComponent<import("../Grid").RowProps & React.RefAttributes<unknown>>;
declare const _default: <FormData_1 = any, FieldValue = FormData_1[keyof FormData_1], FieldKey extends KeyType = keyof FormData_1>(props: FormItemProps<FormData_1, FieldValue, FieldKey> & {
    ref?: React.Ref<typeof Row['prototype']>;
}) => React.ReactElement;
export default _default;
