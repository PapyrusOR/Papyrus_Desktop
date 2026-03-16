import { Context } from 'react';
import { FormItemContextProps, FormContextProps, KeyType, FormInstance } from './interface';
export declare type FormContextType<FormData = any, FieldValue = FormData[keyof FormData], FieldKey extends KeyType = keyof FormData> = Context<FormContextProps<FormData, FieldValue, FieldKey>>;
export declare const FormContext: Context<FormContextProps<any, any, string | number | symbol>>;
export declare type FormItemContextType<FormData = any, FieldValue = FormData[keyof FormData], FieldKey extends KeyType = keyof FormData> = Context<FormItemContextProps<FormData, FieldValue, FieldKey>>;
export declare const FormItemContext: Context<FormItemContextProps<any, any, string | number | symbol>>;
export declare const FormProviderContext: Context<{
    register?: (name: string, form: FormInstance) => void;
    onFormValuesChange?: (id: string | undefined, changedValues: any) => void;
    onFormSubmit?: (id: string | undefined, values: any) => void;
}>;
export declare const FormListContext: Context<{
    getItemKey?: (key: any) => string;
}>;
