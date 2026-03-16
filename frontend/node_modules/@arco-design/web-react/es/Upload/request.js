import { NOOP } from '../_util/constant';
function getBody(xhr) {
    var text = xhr.responseText || xhr.response;
    if (!text) {
        return text;
    }
    try {
        return JSON.parse(text);
    }
    catch (e) {
        return text;
    }
}
var uploadRequest = function (options) {
    var _a = options.onProgress, onProgress = _a === void 0 ? NOOP : _a, _b = options.onError, onError = _b === void 0 ? NOOP : _b, _c = options.onSuccess, onSuccess = _c === void 0 ? NOOP : _c, action = options.action, method = options.method, _d = options.headers, headers = _d === void 0 ? {} : _d, originName = options.name, file = options.file, _e = options.data, originData = _e === void 0 ? {} : _e, _f = options.withCredentials, withCredentials = _f === void 0 ? false : _f;
    function getValue(value) {
        if (typeof value === 'function') {
            return value(file);
        }
        return value;
    }
    var name = getValue(originName);
    var data = getValue(originData);
    var xhr = new XMLHttpRequest();
    if (onProgress && xhr.upload) {
        xhr.upload.onprogress = function (event) {
            var percent;
            if (event.total > 0) {
                percent = (event.loaded / event.total) * 100;
            }
            onProgress(parseInt(percent, 10), event);
        };
    }
    xhr.onerror = function error(e) {
        onError(e);
    };
    xhr.onload = function onload() {
        if (xhr.status < 200 || xhr.status >= 300) {
            return onError(getBody(xhr));
        }
        onSuccess(getBody(xhr));
    };
    var formData = new FormData();
    if (data) {
        Object.keys(data).map(function (key) { return formData.append(key, data[key]); });
    }
    formData.append(name || 'file', file);
    xhr.open(method, action, true);
    if (withCredentials && 'withCredentials' in xhr) {
        xhr.withCredentials = true;
    }
    for (var h in headers) {
        if (headers.hasOwnProperty(h) && headers[h] !== null) {
            xhr.setRequestHeader(h, headers[h]);
        }
    }
    xhr.send(formData);
    return {
        abort: function () {
            xhr.abort();
        },
    };
};
export default uploadRequest;
