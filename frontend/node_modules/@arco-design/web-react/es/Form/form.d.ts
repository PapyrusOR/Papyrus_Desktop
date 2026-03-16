import React, { PropsWithChildren } from 'react';
import { FormProps, FormInstance, KeyType } from './interface';
declare const _default: <FormData_1 = any, FieldValue = FormData_1[keyof FormData_1], FieldKey extends KeyType = keyof FormData_1>(props: FormProps<FormData_1, FieldValue, FieldKey> & {
    children?: React.ReactNode;
} & {
    ref?: React.Ref<FormInstance<FormData_1, FieldValue, FieldKey>>;
}) => React.ReactElement;
export default _default;
