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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import React, { forwardRef, useContext, useRef, useState, useImperativeHandle, } from 'react';
import cs from '../_util/classNames';
import UploadList from './list/index';
import Uploader from './uploader';
import { isFunction, isNumber } from '../_util/is';
import { STATUS } from './interface';
import { ConfigContext } from '../ConfigProvider';
import omit from '../_util/omit';
import useMergeProps from '../_util/hooks/useMergeProps';
import warning from '../_util/warning';
var processFile = function (fileList) {
    var files = [].concat(fileList || []).filter(Boolean);
    return files.reduce(function (total, file, index) {
        if (file.uid) {
            var repeatUidIndex = files.findIndex(function (item) { return file.uid === item.uid && file !== item; });
            warning(repeatUidIndex !== -1, '[Upload]: duplicate uid');
            var item = __assign({ status: STATUS.success, percent: 100 }, file);
            if (repeatUidIndex === -1) {
                total.push(item);
            }
            else {
                // TODO: remove splice logic.
                // 这里是为了兼容以前 uid 出现重复时，会以最后传入的 file 为主的逻辑。p.s: Use bugs as feature
                total.splice(repeatUidIndex, 1, item);
            }
        }
        else {
            warning(true, '[Upload]: uid is required');
            var uid = "" + String(+new Date()) + index;
            total.push(__assign({ uid: uid, status: STATUS.success, percent: 100 }, file));
        }
        return total;
    }, []);
};
var defaultProps = {
    listType: 'text',
    autoUpload: true,
    showUploadList: true,
    beforeUpload: function () { return true; },
    method: 'post',
};
var Upload = function (baseProps, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Upload);
    var prefixCls = getPrefixCls('upload');
    var uploaderRef = useRef();
    var inputWrapperRef = useRef();
    var _c = __read(useState(function () {
        return 'fileList' in props
            ? processFile(props.fileList)
            : 'defaultFileList' in props
                ? processFile(props.defaultFileList)
                : [];
    }), 2), innerUploadState = _c[0], setInnerUploadState = _c[1];
    var mergeFileList = 'fileList' in props ? processFile(props.fileList) : innerUploadState;
    var tryUpdateUploadList = function (fileList, file) {
        var _a;
        if (!('fileList' in props)) {
            setInnerUploadState(fileList);
        }
        (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, fileList, file);
    };
    var uploadFile = function (file) {
        file &&
            setTimeout(function () {
                uploaderRef.current && uploaderRef.current.upload(file);
            }, 0);
    };
    // 重新上传
    var reuploadFile = function (file) {
        uploaderRef.current && uploaderRef.current.reupload(file);
        props.onReupload && props.onReupload(file);
    };
    // 移除文件，如果正在上传，终止上传
    var removeFile = function (file) {
        if (file) {
            var onRemove = props.onRemove;
            Promise.resolve(isFunction(onRemove) ? onRemove(file, mergeFileList) : onRemove)
                .then(function (val) {
                if (val !== false) {
                    uploaderRef.current && uploaderRef.current.abort(file);
                    tryUpdateUploadList(mergeFileList.filter(function (x) { return x.uid !== file.uid; }), file);
                }
            })
                .catch(function (e) {
                console.error(e);
            });
        }
    };
    // 中止文件上传
    var abortFile = function (file) {
        if (file) {
            uploaderRef.current && uploaderRef.current.abort(file);
        }
    };
    useImperativeHandle(ref, function () {
        return {
            submit: function (file) {
                var list = [];
                if (file) {
                    list = [file];
                }
                else {
                    list = mergeFileList.filter(function (x) { return x.status === STATUS.init; });
                }
                list.forEach(function (x) {
                    uploadFile(x);
                });
            },
            // file: fileList中的file对象
            abort: function (file) {
                abortFile(file);
            },
            // file: fileList中的file对象
            reupload: function (file) {
                reuploadFile(file);
            },
            getRootDOMNode: function () {
                return inputWrapperRef.current;
            },
        };
    });
    var listType = props.listType, className = props.className, style = props.style, renderUploadItem = props.renderUploadItem, showUploadList = props.showUploadList, renderUploadList = props.renderUploadList, progressProps = props.progressProps, imagePreview = props.imagePreview, rest = __rest(props, ["listType", "className", "style", "renderUploadItem", "showUploadList", "renderUploadList", "progressProps", "imagePreview"]);
    // const fileList = getFileList(uploadState.current);
    var limit = isNumber(props.limit)
        ? { hideOnExceedLimit: true, maxCount: props.limit }
        : __assign({ hideOnExceedLimit: true }, props.limit);
    var exceedLimit = limit.maxCount && limit.maxCount <= mergeFileList.length;
    var disabledUploadDom = 'disabled' in props ? props.disabled : !limit.hideOnExceedLimit && exceedLimit;
    var uploadDom = (React.createElement("div", __assign({}, omit(rest, [
        'disabled',
        'directory',
        'onReupload',
        'defaultFileList',
        'fileList',
        'autoUpload',
        'error',
        'action',
        'method',
        'multiple',
        'name',
        'accept',
        'customRequest',
        'children',
        'autoUpload',
        'limit',
        'drag',
        'tip',
        'headers',
        'data',
        'withCredentials',
        'onChange',
        'onPreview',
        'onRemove',
        'onProgress',
        'onExceedLimit',
        'beforeUpload',
        'onDrop',
        'onDragOver',
        'onDragLeave',
    ]), { className: cs(prefixCls, (_a = {},
            _a[prefixCls + "-type-" + listType] = listType,
            _a[prefixCls + "-drag"] = props.drag,
            _a[prefixCls + "-disabled"] = disabledUploadDom,
            _a[prefixCls + "-hide"] = limit.hideOnExceedLimit && exceedLimit,
            _a[prefixCls + "-rtl"] = rtl,
            _a), className), style: style, ref: inputWrapperRef }),
        React.createElement(Uploader, __assign({ ref: uploaderRef }, props, { limit: limit.maxCount, hide: limit.hideOnExceedLimit && exceedLimit, disabled: disabledUploadDom, prefixCls: prefixCls, fileList: mergeFileList, onProgress: function (file, e) {
                if (file) {
                    if (!('fileList' in props)) {
                        setInnerUploadState(mergeFileList.map(function (item) {
                            return item.uid === file.uid ? file : item;
                        }));
                    }
                    props.onProgress && props.onProgress(file, e);
                }
            }, onFileStatusChange: tryUpdateUploadList }))));
    return (React.createElement(React.Fragment, null,
        listType !== 'picture-card' && uploadDom,
        showUploadList && (React.createElement(UploadList, { imagePreview: imagePreview, progressProps: progressProps, showUploadList: showUploadList, disabled: props.disabled, listType: listType, fileList: mergeFileList, renderUploadItem: renderUploadItem, renderUploadList: renderUploadList, onUpload: uploadFile, onAbort: abortFile, onRemove: removeFile, onReupload: reuploadFile, onPreview: props.onPreview, prefixCls: prefixCls })),
        listType === 'picture-card' && uploadDom,
        props.tip && listType === 'picture-card' && (React.createElement("div", { className: prefixCls + "-trigger-tip" }, props.tip))));
};
var UploadRef = forwardRef(Upload);
UploadRef.displayName = 'Upload';
export default UploadRef;
