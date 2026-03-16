import { useRef } from 'react';
import Store from './store';
export function getFormInstance() {
    var store = new Store();
    return {
        getFieldsValue: store.getFieldsValue,
        getFieldValue: store.getFieldValue,
        getFieldError: store.getFieldError,
        getFieldsError: store.getFieldsError,
        getTouchedFields: store.getTouchedFields,
        getFields: store.getFields,
        setFieldValue: store.setFieldValue,
        setFieldsValue: store.setFieldsValue,
        setFields: store.setFields,
        resetFields: store.resetFields,
        clearFields: store.clearFields,
        submit: store.submit,
        validate: store.validate,
        scrollToField: function () { },
        getFieldsState: store.getFieldsState,
        // arco 内部使用，业务万不可调用
        getInnerMethods: function (inner) {
            var methods = {};
            if (inner) {
                [
                    'registerField',
                    'registerWatcher',
                    'registerStateWatcher',
                    'registerFormWatcher',
                    'innerSetInitialValues',
                    'innerSetInitialValue',
                    'innerSetCallbacks',
                    'innerSetFieldValue',
                    'innerGetStore',
                    'innerGetStoreStatus',
                    'innerGetFieldValue',
                    'innerCollectFormState',
                ].map(function (key) {
                    methods[key] = store[key];
                });
            }
            return methods;
        },
    };
}
export default function useForm(form) {
    var formRef = useRef(form);
    if (!formRef.current) {
        if (form) {
            formRef.current = form;
        }
        else {
            formRef.current = getFormInstance();
        }
    }
    return [formRef.current];
}
