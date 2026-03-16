import { FormInstance, KeyType } from '../interface';
declare const useWatch: <FormData_1 = any, FieldValue = FormData_1[keyof FormData_1], FieldKey extends KeyType = keyof FormData_1, Field extends FieldKey | FieldKey[] = FieldKey | FieldKey[]>(field: Field, form?: FormInstance<FormData_1, FieldValue, FieldKey>) => Field extends any[] ? Partial<FormData_1> : FormData_1[Extract<Field, keyof FormData_1>];
export default useWatch;
