import { FormInstance, KeyType } from './interface';
export declare function getFormInstance<FormData = any, FieldValue = FormData[keyof FormData], FieldKey extends KeyType = keyof FormData>(): FormInstance<FormData, FieldValue, FieldKey>;
export default function useForm<FormData = any, FieldValue = FormData[keyof FormData], FieldKey extends KeyType = keyof FormData>(form?: FormInstance<FormData, FieldValue, FieldKey>): [FormInstance<FormData, FieldValue, FieldKey>];
