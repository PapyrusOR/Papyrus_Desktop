import Form from './form';
import { FormInstance, FormProps, FormItemProps, FormProviderProps } from './interface';
import FormItem from './form-item';
import FormControl from './control';
import FormList from './form-list';
import FormProvider from './form-provider';
import useForm from './useForm';
import useWatch from './hooks/useWatch';
import useFormContext from './hooks/useContext';
import useFormState from './hooks/useState';
import { FormContext } from './context';
export { FormInstance, FormProps, FormItemProps, FormProviderProps };
declare type RefForm = typeof Form;
export interface FormComponent extends RefForm {
    Item: typeof FormItem;
    List: typeof FormList;
    Control: typeof FormControl;
    Provider: typeof FormProvider;
    useForm: typeof useForm;
    useFormContext: typeof useFormContext;
    useWatch: typeof useWatch;
    useFormState: typeof useFormState;
    FormContext: typeof FormContext;
}
declare const FormComp: FormComponent;
export default FormComp;
