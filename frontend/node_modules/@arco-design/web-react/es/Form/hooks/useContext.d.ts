import { FormInstance } from '../interface';
/**
 * useFormContext 只会返回一些 Form 全局的状态，避免返回某个表单项的状态
 */
declare const useFormContext: () => {
    form: FormInstance;
    disabled: boolean;
    isSubmitting: boolean;
};
export default useFormContext;
