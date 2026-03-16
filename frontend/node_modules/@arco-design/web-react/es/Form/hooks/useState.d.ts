import { FormInstance, FieldState, KeyType } from '../interface';
declare const useFormState: <FormData_1 = any, FieldValue = FormData_1[keyof FormData_1], FieldKey extends KeyType = keyof FormData_1>(field: FieldKey, form?: FormInstance) => FieldState<FieldValue>;
export default useFormState;
