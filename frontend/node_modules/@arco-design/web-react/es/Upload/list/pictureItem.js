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
import React, { forwardRef } from 'react';
import { STATUS } from '../interface';
import { isFunction, isObject } from '../../_util/is';
import UploadProgress from './uploadProgress';
import IconImageClose from '../../../icon/react-icon/IconImageClose';
import IconEye from '../../../icon/react-icon/IconEye';
import IconDelete from '../../../icon/react-icon/IconDelete';
import IconUpload from '../../../icon/react-icon/IconUpload';
import useKeyboardEvent from '../../_util/hooks/useKeyboardEvent';
var PictureItem = function (props, ref) {
    var disabled = props.disabled, prefixCls = props.prefixCls, file = props.file, showUploadList = props.showUploadList, locale = props.locale;
    var keyboardEvents = useKeyboardEvent();
    var cls = prefixCls + "-list-item-picture";
    var status = file.status, originFile = file.originFile;
    var url = file.url !== undefined
        ? file.url
        : originFile && isFunction(URL.createObjectURL) && URL.createObjectURL(originFile);
    var actionIcons = isObject(showUploadList) ? showUploadList : {};
    return (React.createElement("div", { className: cls, ref: ref }, status === STATUS.uploading ? (React.createElement(UploadProgress, __assign({ onReupload: props.onReupload, onUpload: props.onUpload, onAbort: props.onAbort, listType: "picture-card", file: file, prefixCls: prefixCls, progressProps: props.progressProps }, actionIcons))) : (React.createElement(React.Fragment, null,
        isFunction(actionIcons.imageRender) ? (actionIcons.imageRender(file)) : (React.createElement("img", { src: url, alt: file.name })),
        React.createElement("div", { className: cls + "-mask", role: "radiogroup" },
            file.status === STATUS.fail && (React.createElement("div", { className: cls + "-error-tip" }, actionIcons.errorIcon !== null && (React.createElement("span", { className: prefixCls + "-list-error-icon" }, actionIcons.errorIcon || React.createElement(IconImageClose, null))))),
            React.createElement("div", { className: cls + "-operation" },
                file.status !== STATUS.fail && actionIcons.previewIcon !== null && (React.createElement("span", __assign({ className: prefixCls + "-list-preview-icon", tabIndex: 0, role: "button", "aria-label": locale.Upload.preview }, keyboardEvents({
                    onPressEnter: function () {
                        props.onPreview && props.onPreview(file);
                    },
                }), { onClick: function () {
                        props.onPreview && props.onPreview(file);
                    } }), actionIcons.previewIcon || React.createElement(IconEye, null))),
                file.status === STATUS.fail && actionIcons.reuploadIcon !== null && (React.createElement("span", __assign({ className: props.prefixCls + "-list-reupload-icon", onClick: function () {
                        props.onReupload && props.onReupload(file);
                    }, tabIndex: 0, role: "button", "aria-label": locale.Upload.reupload }, keyboardEvents({
                    onPressEnter: function () {
                        props.onReupload && props.onReupload(file);
                    },
                })), actionIcons.reuploadIcon || React.createElement(IconUpload, null))),
                !disabled && actionIcons.removeIcon !== null && (React.createElement("span", __assign({ className: prefixCls + "-list-remove-icon", onClick: function () {
                        props.onRemove && props.onRemove(file);
                    }, role: "button", "aria-label": locale.Upload.delete, tabIndex: 0 }, keyboardEvents({
                    onPressEnter: function () {
                        props.onRemove && props.onRemove(file);
                    },
                })), actionIcons.removeIcon || React.createElement(IconDelete, null)))))))));
};
export default forwardRef(PictureItem);
