import React, { useCallback, forwardRef, useRef, } from 'react';
import { FormProviderContext } from './context';
var FormProviderComponent = function (props, _) {
    var formsRef = useRef({});
    var register = useCallback(function (name, form) {
        if (name) {
            formsRef.current[name] = form;
        }
        return function () {
            delete formsRef.current[name];
        };
    }, []);
    var onFormSubmit = useCallback(function (name, changedValues) {
        props.onFormSubmit &&
            props.onFormSubmit(name, changedValues, {
                forms: formsRef.current,
            });
    }, [props.onFormSubmit]);
    var onFormValuesChange = useCallback(function (name, values) {
        props.onFormValuesChange &&
            props.onFormValuesChange(name, values, {
                forms: formsRef.current,
            });
    }, [props.onFormValuesChange]);
    return (React.createElement(FormProviderContext.Provider, { value: {
            onFormValuesChange: onFormValuesChange,
            onFormSubmit: onFormSubmit,
            register: register,
        } }, props.children));
};
var FormProvider = forwardRef(FormProviderComponent);
FormProvider.displayName = 'FormProvider';
export default FormProvider;
