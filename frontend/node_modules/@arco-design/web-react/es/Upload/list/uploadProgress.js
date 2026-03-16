var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useContext } from 'react';
import { STATUS } from '../interface';
import Progress from '../../Progress';
import { ConfigContext } from '../../ConfigProvider';
import IconCheck from '../../../icon/react-icon/IconCheck';
import IconUpload from '../../../icon/react-icon/IconUpload';
import IconPlayArrowFill from '../../../icon/react-icon/IconPlayArrowFill';
import IconPause from '../../../icon/react-icon/IconPause';
import Tooltip from '../../Tooltip';
import { isFunction } from '../../_util/is';
import useKeyboardEvent from '../../_util/hooks/useKeyboardEvent';
var UploadProgress = function (props) {
    var keyboardEvents = useKeyboardEvent();
    var file = props.file, prefixCls = props.prefixCls, progressProps = props.progressProps, progressRender = props.progressRender;
    var locale = useContext(ConfigContext).locale;
    var status = file.status, _a = file.percent, percent = _a === void 0 ? 0 : _a;
    var cls = prefixCls + "-list";
    var widthStyle = progressProps && progressProps.width ? { width: progressProps.width } : {};
    var dom = (React.createElement(React.Fragment, null,
        status === STATUS.fail && props.reuploadIcon !== null && (React.createElement("span", __assign({ className: prefixCls + "-list-reupload-icon", onClick: function () {
                props.onReupload && props.onReupload(file);
            }, tabIndex: 0, role: "button", "aria-label": locale.Upload.reupload }, keyboardEvents({
            onPressEnter: function () {
                props.onReupload && props.onReupload(file);
            },
        })), props.reuploadIcon ||
            (props.listType === 'picture-card' ? React.createElement(IconUpload, null) : locale.Upload.reupload))),
        status === STATUS.success && props.successIcon !== null && (React.createElement("span", { className: prefixCls + "-list-success-icon" }, props.successIcon || React.createElement(IconCheck, null))),
        status !== STATUS.success && (React.createElement("div", { className: cls + "-status", style: widthStyle },
            React.createElement(Progress, __assign({ showText: false, className: cls + "-progress", type: "circle", status: status === STATUS.fail ? 'error' : status === STATUS.success ? 'success' : 'normal', percent: percent, size: "mini" }, progressProps)),
            status === STATUS.init && props.startIcon !== null && (React.createElement("span", __assign({ tabIndex: 0, role: "button", "aria-label": locale.Upload.start, className: prefixCls + "-list-start-icon", onClick: function () {
                    props.onUpload && props.onUpload(file);
                } }, keyboardEvents({
                onPressEnter: function () {
                    props.onUpload && props.onUpload(file);
                },
            })), props.startIcon || (React.createElement(Tooltip, { content: locale.Upload.start },
                React.createElement(IconPlayArrowFill, null))))),
            status === STATUS.uploading && props.cancelIcon !== null && (React.createElement("span", __assign({ className: props.prefixCls + "-list-cancel-icon", onClick: function () {
                    props.onAbort && props.onAbort(file);
                }, tabIndex: 0, "aria-label": locale.Upload.cancel }, keyboardEvents({
                onPressEnter: function () {
                    props.onAbort && props.onAbort(file);
                },
            })), props.cancelIcon || (React.createElement(Tooltip, { content: locale.Upload.cancel },
                React.createElement(IconPause, null)))))))));
    return isFunction(progressRender) ? progressRender(file, dom) : dom;
};
export default UploadProgress;
