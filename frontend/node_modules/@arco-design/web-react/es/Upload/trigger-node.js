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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState, useContext, forwardRef, useEffect } from 'react';
import cs from '../_util/classNames';
import Button from '../Button';
import IconUpload from '../../icon/react-icon/IconUpload';
import IconPlus from '../../icon/react-icon/IconPlus';
import { ConfigContext } from '../ConfigProvider';
import { getFiles, loopDirectory } from './util';
import useKeyboardEvent from '../_util/hooks/useKeyboardEvent';
var TriggerNode = function (props, ref) {
    var _a, _b;
    var getKeyboardEvents = useKeyboardEvent();
    var locale = useContext(ConfigContext).locale;
    var _c = __read(useState(false), 2), isDragging = _c[0], setIsDragging = _c[1];
    var _d = __read(useState(0), 2), dragEnterCount = _d[0], setDragEnterCount = _d[1]; // the number of times ondragenter was triggered
    var tip = props.tip, children = props.children, disabled = props.disabled, drag = props.drag, listType = props.listType, prefixCls = props.prefixCls, accept = props.accept, multiple = props.multiple;
    var nodeProps = {
        disabled: disabled,
    };
    useEffect(function () {
        setDragEnterCount(0);
    }, [isDragging]);
    return children === null ? null : (React.createElement("div", __assign({ className: prefixCls + "-trigger", onClick: disabled ? undefined : props.onClick }, getKeyboardEvents({
        onPressEnter: function () {
            var _a;
            !disabled && ((_a = props.onClick) === null || _a === void 0 ? void 0 : _a.call(props));
        },
    }), { ref: ref, onDragEnter: function () {
            setDragEnterCount(dragEnterCount + 1);
        }, onDragLeave: function (e) {
            var _a;
            e.preventDefault();
            /**  When dragging into a child element, it will trigger the dragleave and dragenter of the parent node.
             * Record the number of triggers of dragenter, and subtract 1 each time dragleave.
             * When dragEnterCount is equal to 0,  it means that the mouse has left the current node, then the drag state is cancelled.
             * https://github.com/arco-design/arco-design/issues/210
             */
            if (dragEnterCount === 0) {
                setIsDragging(false);
                !disabled && ((_a = props.onDragLeave) === null || _a === void 0 ? void 0 : _a.call(props, e));
            }
            else {
                setDragEnterCount(dragEnterCount - 1);
            }
        }, onDrop: function (e) {
            e.preventDefault();
            if (!disabled && props.drag !== false) {
                setIsDragging(false);
                if (props.directory) {
                    loopDirectory(e.dataTransfer.items, accept, function (files) {
                        props.onDragFiles && props.onDragFiles(files);
                    });
                }
                else {
                    var directoryIndices_1 = [].slice
                        .call(e.dataTransfer.items || [])
                        .reduce(function (result, item, index) {
                        if (item.webkitGetAsEntry) {
                            var entry = item.webkitGetAsEntry();
                            // https://github.com/arco-design/arco-design/issues/2643
                            if (entry === null || entry === void 0 ? void 0 : entry.isDirectory) {
                                return __spreadArray(__spreadArray([], __read(result), false), [index], false);
                            }
                            return result;
                        }
                    }, []);
                    // Filter out directories
                    var droppedFiles = [].slice.call(e.dataTransfer.files || []).filter(function (_, index) {
                        return !directoryIndices_1.includes(index);
                    });
                    var files = getFiles(droppedFiles, accept);
                    if (files.length > 0) {
                        props.onDragFiles && props.onDragFiles(multiple ? files : files.slice(0, 1));
                    }
                }
                props.onDrop && props.onDrop(e);
            }
        }, onDragOver: function (e) {
            var _a;
            e.preventDefault();
            if (!disabled && !isDragging) {
                setIsDragging(true);
                (_a = props.onDragOver) === null || _a === void 0 ? void 0 : _a.call(props, e);
            }
        } }), React.isValidElement(children) ? (React.createElement("div", { className: cs((_a = {}, _a[prefixCls + "-trigger-custom-active"] = isDragging, _a)) }, React.cloneElement(children, nodeProps))) : listType === 'picture-card' ? (React.createElement("div", { className: prefixCls + "-trigger-picture-wrapper" },
        React.createElement("div", { className: prefixCls + "-trigger-picture", tabIndex: 0, "aria-label": locale.Upload.upload },
            React.createElement("div", { className: prefixCls + "-trigger-picture-text" },
                React.createElement(IconPlus, null))))) : drag ? (React.createElement("div", { className: cs(prefixCls + "-trigger-drag", (_b = {},
            _b[prefixCls + "-trigger-drag-active"] = isDragging,
            _b)), tabIndex: 0, "aria-label": locale.Upload.drag },
        React.createElement(IconPlus, null),
        React.createElement("p", { className: prefixCls + "-trigger-drag-text" }, isDragging ? locale.Upload.dragHover : locale.Upload.drag),
        tip && React.createElement("div", { className: prefixCls + "-trigger-tip" }, tip))) : (React.createElement(Button, __assign({}, nodeProps, { "aria-label": locale.Upload.upload, type: "primary", className: prefixCls + "-trigger-with-icon" }),
        React.createElement(IconUpload, null),
        locale.Upload.upload))));
};
export default forwardRef(TriggerNode);
