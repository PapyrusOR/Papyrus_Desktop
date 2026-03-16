var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React from 'react';
import uploadRequest from './request';
import { STATUS } from './interface';
import { isNumber, isFunction, isFile, isObject } from '../_util/is';
import TriggerNode from './trigger-node';
import { isAcceptFile } from './util';
import ArcoCSSTransition from '../_util/CSSTransition';
var Uploader = /** @class */ (function (_super) {
    __extends(Uploader, _super);
    function Uploader(props) {
        var _this = _super.call(this, props) || this;
        // 提供 ref 调用
        _this.upload = function (file) {
            _this.doUpload(file);
        };
        // 提供 ref 调用。终止
        _this.abort = function (file) {
            var req = _this.state.uploadRequests[file.uid];
            if (req) {
                req.abort && req.abort();
                _this.updateFileStatus(__assign(__assign({}, file), { status: STATUS.fail }));
                _this.deleteReq(file.uid);
            }
        };
        // 重新上传 。提供 ref 调用
        _this.reupload = function (file) {
            _this.doUpload(__assign(__assign({}, file), { percent: 0, status: STATUS.uploading }));
        };
        _this.deleteReq = function (uid) {
            var newValue = __assign({}, _this.state.uploadRequests);
            delete newValue[uid];
            _this.setState({
                uploadRequests: newValue,
            });
        };
        // 提供 ref 调用
        // 删除上传（手动上传时，文件会出现在上传列表，但属于init状态）
        _this.delete = _this.deleteReq;
        _this.updateFileStatus = function (file, fileList) {
            if (fileList === void 0) { fileList = _this.props.fileList; }
            var onFileStatusChange = _this.props.onFileStatusChange;
            var key = 'uid' in file ? 'uid' : 'name';
            onFileStatusChange &&
                onFileStatusChange(fileList.map(function (item) {
                    return item[key] === file[key] ? file : item;
                }), file);
        };
        _this.getTargetFile = function (file) {
            var key = 'uid' in file ? 'uid' : 'name';
            var targetFile = _this.props.fileList.find(function (item) { return item[key] === file[key]; });
            return targetFile;
        };
        // 执行上传
        _this.doUpload = function (file) { return __awaiter(_this, void 0, void 0, function () {
            var _a, action, headers, name, data, withCredentials, customRequest, method, onProgress, onSuccess, onError, options, request;
            var _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, action = _a.action, headers = _a.headers, name = _a.name, data = _a.data, withCredentials = _a.withCredentials, customRequest = _a.customRequest, method = _a.method;
                        onProgress = function (percent, event) {
                            var targetFile = _this.getTargetFile(file);
                            if (targetFile) {
                                targetFile.status = STATUS.uploading;
                                targetFile.percent = percent;
                                _this.props.onProgress && _this.props.onProgress(targetFile, event);
                            }
                        };
                        onSuccess = function (response) {
                            var targetFile = _this.getTargetFile(file);
                            if (targetFile) {
                                targetFile.status = STATUS.success;
                                // 传入的响应将会作为 response 字段被附加到上传列表中对应的文件
                                targetFile.response = response;
                                _this.updateFileStatus(targetFile);
                            }
                            _this.deleteReq(file.uid);
                        };
                        onError = function (response) {
                            var targetFile = _this.getTargetFile(file);
                            if (targetFile) {
                                targetFile.status = STATUS.fail;
                                // 传入的响应将会作为 response 字段被附加到上传列表中对应的文件
                                targetFile.response = response;
                                _this.updateFileStatus(targetFile);
                            }
                            _this.deleteReq(file.uid);
                        };
                        options = {
                            onProgress: onProgress,
                            onSuccess: onSuccess,
                            onError: onError,
                            headers: headers,
                            name: name,
                            file: file.originFile,
                            data: data,
                            withCredentials: withCredentials,
                        };
                        // 更新上传状态
                        this.updateFileStatus(file);
                        if (!action) return [3 /*break*/, 1];
                        request = uploadRequest(__assign(__assign({}, options), { action: action, method: method }));
                        return [3 /*break*/, 3];
                    case 1:
                        if (!customRequest) return [3 /*break*/, 3];
                        return [4 /*yield*/, customRequest(options)];
                    case 2:
                        request = _c.sent();
                        _c.label = 3;
                    case 3:
                        this.setState({
                            uploadRequests: __assign(__assign({}, this.state.uploadRequests), (_b = {}, _b[file.uid] = request, _b)),
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.handleFiles = function (files) {
            var _a = _this.props, limit = _a.limit, fileList = _a.fileList, onExceedLimit = _a.onExceedLimit, autoUpload = _a.autoUpload;
            if (isNumber(limit) && limit < fileList.length + files.length) {
                return onExceedLimit && onExceedLimit(files, fileList);
            }
            var asyncUpload = function (file, index) {
                var list = _this.props.fileList || [];
                var upload = {
                    uid: "" + String(+new Date()) + index,
                    originFile: file,
                    percent: 0,
                    status: STATUS.init,
                    name: file.name,
                };
                list.push(upload);
                // 更新上传状态为 init
                _this.updateFileStatus(upload, list);
                if (autoUpload) {
                    /**
                     * 需要setTimeout，否则一次上传较多文件时，可能出现第i个文件和第i+1个文件同时更新上传列表中的状态，
                     * 状态被相互覆盖的情况。
                     */
                    setTimeout(function () {
                        _this.doUpload(__assign(__assign({}, upload), { status: STATUS.uploading }));
                    }, 0);
                }
            };
            files.forEach(function (file, index) {
                if (isAcceptFile(file, _this.props.accept)) {
                    // windows can upload file type not in accept bug
                    if (isFunction(_this.props.beforeUpload)) {
                        // 只有在beforeUpload返回值 === false 时，取消上传操作
                        Promise.resolve(_this.props.beforeUpload(file, files))
                            .then(function (val) {
                            if (val !== false) {
                                var newFile = isFile(val) ? val : file;
                                asyncUpload(newFile, index);
                            }
                        })
                            .catch(function (e) {
                            console.error(e);
                        });
                    }
                    else {
                        asyncUpload(file, index);
                    }
                }
            });
        };
        _this.state = {
            uploadRequests: {},
        };
        return _this;
    }
    Uploader.prototype.render = function () {
        var _this = this;
        var _a = this.props, accept = _a.accept, multiple = _a.multiple, children = _a.children, prefixCls = _a.prefixCls, tip = _a.tip, disabled = _a.disabled, drag = _a.drag, listType = _a.listType, hide = _a.hide, directory = _a.directory, onDrop = _a.onDrop, onDragOver = _a.onDragOver, onDragLeave = _a.onDragLeave;
        return (React.createElement(React.Fragment, null,
            React.createElement("input", __assign({ key: "trigger-input", ref: function (node) { return (_this.inputRef = node); }, style: { display: 'none' }, type: "file", accept: isObject(accept) ? accept === null || accept === void 0 ? void 0 : accept.type : accept, multiple: multiple }, (directory ? { webkitdirectory: 'true' } : {}), { onChange: function (e) {
                    var files = e.target.files;
                    if (files) {
                        _this.handleFiles([].slice.call(files));
                        _this.inputRef.value = '';
                    }
                }, onClick: function (e) {
                    e.stopPropagation();
                } })),
            React.createElement(ArcoCSSTransition, { key: "trigger-node", in: !hide, timeout: 100, unmountOnExit: true, classNames: "fadeIn" },
                React.createElement(TriggerNode, { directory: directory, tip: tip, multiple: multiple, accept: accept, disabled: disabled, drag: drag, listType: listType, onDrop: onDrop, onDragOver: onDragOver, onDragLeave: onDragLeave, onDragFiles: this.handleFiles, onClick: function () {
                        !disabled && _this.inputRef && _this.inputRef.click();
                    }, prefixCls: prefixCls }, isFunction(children) ? children({ fileList: this.props.fileList }) : children)),
            tip && listType !== 'picture-card' && !drag ? (React.createElement("div", { key: "trigger-tip", className: prefixCls + "-trigger-tip" }, tip)) : null));
    };
    return Uploader;
}(React.Component));
export default Uploader;
