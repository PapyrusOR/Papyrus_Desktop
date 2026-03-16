import { useCallback, useContext, useEffect, useRef } from 'react';
import { SubmitStatus } from '../interface';
import { FormContext } from '../context';
import warn from '../../_util/warning';
import useForceUpdate from '../../_util/hooks/useForceUpdate';
/**
 * useFormContext 只会返回一些 Form 全局的状态，避免返回某个表单项的状态
 */
var useFormContext = function () {
    var formCtx = useContext(FormContext);
    var formInstance = formCtx.store;
    var isSubmittingRef = useRef(false);
    var forceUpdate = useForceUpdate();
    var setSubmitting = useCallback(function () {
        var _a, _b;
        var submitStatus = (((_b = (_a = formInstance === null || formInstance === void 0 ? void 0 : formInstance.getInnerMethods(true)) === null || _a === void 0 ? void 0 : _a.innerGetStoreStatus) === null || _b === void 0 ? void 0 : _b.call(_a)) || {}).submitStatus;
        var newIsSubmitting = submitStatus === SubmitStatus.submitting;
        if (newIsSubmitting !== isSubmittingRef.current) {
            isSubmittingRef.current = newIsSubmitting;
            forceUpdate();
        }
    }, []);
    useEffect(function () {
        if (!formInstance) {
            warn(true, 'formInstance is not available');
            return;
        }
        var registerFormWatcher = (formInstance === null || formInstance === void 0 ? void 0 : formInstance.getInnerMethods(true)).registerFormWatcher;
        var update = function () { return setSubmitting(); };
        update();
        var cancelWatch = registerFormWatcher && registerFormWatcher(update);
        return function () {
            cancelWatch === null || cancelWatch === void 0 ? void 0 : cancelWatch();
        };
    }, []);
    return {
        form: formInstance,
        disabled: formCtx.disabled,
        isSubmitting: isSubmittingRef.current,
    };
};
export default useFormContext;
