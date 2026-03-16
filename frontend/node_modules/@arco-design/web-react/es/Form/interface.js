/* eslint-disable @typescript-eslint/no-explicit-any */
// TS泛型默认值需要，忽略显式`any`定义
export var VALIDATE_STATUS = {
    error: 'error',
    success: 'success',
    warning: 'warning',
    validating: 'validating',
};
export var SubmitStatus;
(function (SubmitStatus) {
    SubmitStatus["init"] = "init";
    SubmitStatus["error"] = "error";
    SubmitStatus["success"] = "success";
    SubmitStatus["submitting"] = "submitting";
})(SubmitStatus || (SubmitStatus = {}));
