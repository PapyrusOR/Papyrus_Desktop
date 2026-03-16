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
import React, { forwardRef, isValidElement } from 'react';
import IconFile from '../../../icon/react-icon/IconFile';
import IconFilePdf from '../../../icon/react-icon/IconFilePdf';
import IconFileImage from '../../../icon/react-icon/IconFileImage';
import IconFileVideo from '../../../icon/react-icon/IconFileVideo';
import IconFileAudio from '../../../icon/react-icon/IconFileAudio';
import Tooltip from '../../Tooltip';
import { STATUS } from '../interface';
import { isObject, isFunction } from '../../_util/is';
import UploadProgress from './uploadProgress';
import IconExclamationCircleFill from '../../../icon/react-icon/IconExclamationCircleFill';
import IconDelete from '../../../icon/react-icon/IconDelete';
import IconHover from '../../_class/icon-hover';
import useKeyboardEvent from '../../_util/hooks/useKeyboardEvent';
var getIconType = function (file) {
    var type = '';
    if (file.originFile && file.originFile.type) {
        // 上传文件
        type = file.originFile.type;
    }
    else {
        var name_1 = file.name || '';
        var fileExtension = name_1.split('.').pop() || '';
        type = fileExtension;
        if (['png', 'jpg', 'jpeg', 'bmp', 'gif'].indexOf(fileExtension) > -1) {
            type = 'image';
        }
        else if (['mp4', 'm2v', 'mkv'].indexOf(fileExtension) > -1) {
            type = 'video';
        }
        else if (['mp3', 'wav', 'wmv'].indexOf(fileExtension) > -1) {
            type = 'audio';
        }
    }
    if (type.indexOf('image') > -1) {
        return IconFileImage;
    }
    if (type.indexOf('pdf') > -1) {
        return IconFilePdf;
    }
    if (type.indexOf('audio') > -1) {
        return IconFileAudio;
    }
    if (type.indexOf('video') > -1) {
        return IconFileVideo;
    }
    return IconFile;
};
var TextItem = function (props, ref) {
    var prefixCls = props.prefixCls, disabled = props.disabled, file = props.file, locale = props.locale;
    var cls = prefixCls + "-list-item-text";
    var getKeyboardEvents = useKeyboardEvent();
    var Icon = getIconType(file);
    var showUploadList = isObject(props.showUploadList)
        ? props.showUploadList
        : {};
    // custom icons
    var actionIcons = isObject(showUploadList) ? showUploadList : {};
    var fileName = file.name || (file.originFile && file.originFile.name);
    var url = file.url !== undefined
        ? file.url
        : file.originFile && isFunction(URL.createObjectURL) && URL.createObjectURL(file.originFile);
    var triggerProps = {};
    // 重新上传后，如果成功，但是鼠标仍然hover在内容区，错误提示不会消失。所以需要设置 popupVisible 为false，来隐藏tooltip
    if (file.status !== STATUS.fail) {
        triggerProps = {
            popupVisible: false,
        };
    }
    return (React.createElement("div", { className: prefixCls + "-list-item " + prefixCls + "-list-item-" + file.status, ref: ref },
        React.createElement("div", { className: cls },
            props.listType === 'picture-list' && (React.createElement("div", { className: cls + "-thumbnail" }, isFunction(showUploadList.imageRender) ? (showUploadList.imageRender(file)) : (React.createElement("img", { src: url })))),
            React.createElement("div", { className: cls + "-content" },
                React.createElement("div", { className: cls + "-name" },
                    props.listType === 'text' && actionIcons.fileIcon !== null && (React.createElement("span", { className: prefixCls + "-list-file-icon" }, actionIcons.fileIcon || React.createElement(Icon, null))),
                    isFunction(showUploadList.fileName) ? (React.createElement("span", { className: cls + "-name-text" }, showUploadList.fileName(file))) : file.url ? (React.createElement("a", { href: file.url, target: "_blank", rel: "noreferrer", className: cls + "-name-link" }, fileName)) : (React.createElement("span", { className: cls + "-name-text" }, fileName)),
                    file.status === STATUS.fail && actionIcons.errorIcon !== null && (React.createElement(Tooltip, __assign({ content: (typeof file.response === 'object'
                            ? isValidElement(file.response) && file.response
                            : file.response) || locale.Upload.error }, triggerProps, { disabled: file.status !== STATUS.fail }),
                        React.createElement("span", { className: props.prefixCls + "-list-error-icon" }, actionIcons.errorIcon ||
                            (props.listType === 'picture-card' ? (React.createElement(IconFileImage, null)) : (React.createElement(IconExclamationCircleFill, null))))))),
                React.createElement(UploadProgress, __assign({ file: file, prefixCls: prefixCls, progressProps: props.progressProps, onReupload: props.onReupload, onUpload: props.onUpload, onAbort: props.onAbort }, actionIcons)))),
        React.createElement("div", { className: prefixCls + "-list-item-operation" }, !disabled && actionIcons.removeIcon !== null && (React.createElement(IconHover, __assign({ className: prefixCls + "-list-remove-icon-hover", onClick: function () {
                props.onRemove && props.onRemove(file);
            }, tabIndex: 0, "aria-label": locale.Upload.delete }, getKeyboardEvents({
            onPressEnter: function () {
                props.onRemove && props.onRemove(file);
            },
        })),
            React.createElement("span", { className: prefixCls + "-list-remove-icon" }, actionIcons.removeIcon || React.createElement(IconDelete, null)))))));
};
export default forwardRef(TextItem);
