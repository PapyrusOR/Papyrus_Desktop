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
import React, { useContext, useState, useMemo } from 'react';
import { TransitionGroup } from 'react-transition-group';
import cs from '../../_util/classNames';
import PictureItem from './pictureItem';
import TextItem from './textItem';
import { ConfigContext } from '../../ConfigProvider';
import { STATUS } from '../interface';
import { isFunction } from '../../_util/is';
import ImagePreviewGroup from '../../Image/image-preview-group';
import ArcoCSSTransition from '../../_util/CSSTransition';
export var FileList = function (props) {
    var _a;
    var _b = useContext(ConfigContext), locale = _b.locale, rtl = _b.rtl;
    var listType = props.listType, fileList = props.fileList, renderUploadList = props.renderUploadList, renderUploadItem = props.renderUploadItem, prefixCls = props.prefixCls, rest = __rest(props, ["listType", "fileList", "renderUploadList", "renderUploadItem", "prefixCls"]);
    // hide image preview when previewCurrent = -1
    var _c = __read(useState(-1), 2), previewCurrent = _c[0], setPreviewCurrent = _c[1];
    var srcList = useMemo(function () {
        return fileList
            .map(function (file) {
            var url = file.url;
            if (file.url === undefined && [STATUS.init, STATUS.success].indexOf(file.status) > -1) {
                url =
                    file.originFile &&
                        isFunction(URL.createObjectURL) &&
                        URL.createObjectURL(file.originFile);
            }
            return url;
        })
            .filter(Boolean);
    }, [fileList]);
    if (isFunction(renderUploadList)) {
        return React.createElement("div", { className: prefixCls + "-list" }, renderUploadList(fileList, rest));
    }
    var updatePreviewCurrent = function (current) {
        if (props.imagePreview) {
            setPreviewCurrent(current);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(TransitionGroup, { className: cs(prefixCls + "-list", prefixCls + "-list-type-" + listType, (_a = {},
                _a[prefixCls + "-list-rtl"] = rtl,
                _a)) }, fileList.map(function (file, index) {
            var originNode = listType === 'picture-card' ? (React.createElement("div", { className: prefixCls + "-list-item " + prefixCls + "-list-item-" + file.status },
                React.createElement(PictureItem, __assign({}, props, { onPreview: function (file) {
                        var _a;
                        updatePreviewCurrent(index);
                        (_a = props.onPreview) === null || _a === void 0 ? void 0 : _a.call(props, file);
                    }, file: file, locale: locale })))) : (React.createElement(TextItem, __assign({}, props, { file: file, locale: locale })));
            if (isFunction(renderUploadItem)) {
                originNode = renderUploadItem(originNode, file, fileList);
            }
            return listType === 'picture-card' ? (React.createElement(ArcoCSSTransition, { key: file.uid, timeout: { enter: 200, exit: 400 }, classNames: prefixCls + "-slide-inline", onEntered: function (e) {
                    if (!e)
                        return;
                    e.style.width = '';
                }, onExit: function (e) {
                    if (!e)
                        return;
                    e.style.width = e.scrollWidth + "px";
                }, onExiting: function (e) {
                    if (!e)
                        return;
                    e.style.width = 0;
                }, onExited: function (e) {
                    if (!e)
                        return;
                    e.style.width = 0;
                } }, originNode)) : (React.createElement(ArcoCSSTransition, { key: file.uid, timeout: { enter: 200, exit: 400 }, classNames: prefixCls + "-slide-up", onExit: function (e) {
                    if (!e)
                        return;
                    e.style.height = e.scrollHeight + "px";
                }, onExiting: function (e) {
                    if (!e)
                        return;
                    e.style.height = 0;
                }, onExited: function (e) {
                    if (!e)
                        return;
                    e.style.height = 0;
                } }, originNode));
        })),
        listType === 'picture-card' && props.imagePreview && (React.createElement(ImagePreviewGroup, { srcList: srcList, visible: previewCurrent !== -1, current: previewCurrent, onChange: updatePreviewCurrent, onVisibleChange: function (visible) {
                updatePreviewCurrent(visible ? previewCurrent : -1);
            } }))));
};
FileList.displayName = 'FileList';
export default FileList;
