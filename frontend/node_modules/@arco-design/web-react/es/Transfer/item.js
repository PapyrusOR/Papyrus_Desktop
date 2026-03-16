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
import React, { useEffect, useRef, useState } from 'react';
import cs from '../_util/classNames';
import IconHover from '../_class/icon-hover';
import Checkbox from '../Checkbox';
import IconClose from '../../icon/react-icon/IconClose';
import IconDragDotVertical from '../../icon/react-icon/IconDragDotVertical';
import useKeyboardEvent from '../_util/hooks/useKeyboardEvent';
function TransferItem(props) {
    var _a;
    var className = props.className, prefixCls = props.prefixCls, render = props.render, item = props.item, selectedKeys = props.selectedKeys, disabled = props.disabled, draggable = props.draggable, droppable = props.droppable, allowClear = props.allowClear, onItemSelect = props.onItemSelect, onItemRemove = props.onItemRemove, onDragStart = props.onDragStart, onDragEnd = props.onDragEnd, onDragLeave = props.onDragLeave, onDragOver = props.onDragOver, onDrop = props.onDrop;
    var getKeyboardEvents = useKeyboardEvent();
    var baseClassName = prefixCls + "-view-item";
    var refItem = useRef(null);
    var refDraggedTimer = useRef(null);
    var _b = __read(useState('none'), 2), dragStatus = _b[0], setDragStatus = _b[1];
    var _c = __read(useState(false), 2), dragOver = _c[0], setDragOver = _c[1];
    var _d = __read(useState(0), 2), dragPosition = _d[0], setDragPosition = _d[1];
    var _disabled = disabled || item.disabled;
    var _draggable = draggable && !_disabled;
    var checked = selectedKeys.indexOf(item.key) > -1;
    var itemContent = render ? render(item) : item.value;
    useEffect(function () {
        return function () {
            refDraggedTimer.current && clearTimeout(refDraggedTimer.current);
        };
    }, []);
    useEffect(function () {
        if (dragStatus === 'dragged') {
            refDraggedTimer.current = setTimeout(function () { return setDragStatus('none'); }, 1000);
        }
    }, [dragStatus]);
    return (React.createElement("li", { key: item.key, ref: refItem, className: cs(baseClassName, (_a = {},
            _a[baseClassName + "-disabled"] = _disabled,
            _a[baseClassName + "-draggable"] = _draggable,
            _a[baseClassName + "-gap-top"] = dragOver && dragPosition < 0,
            _a[baseClassName + "-gap-bottom"] = dragOver && dragPosition > 0,
            _a[baseClassName + "-" + dragStatus] = dragStatus !== 'none',
            _a), className), draggable: _draggable, onDragStart: function (e) {
            e.stopPropagation();
            setDragStatus('dragging');
            onDragStart && onDragStart(e, item);
            try {
                // ie throw error
                // firefox-need-it
                e.dataTransfer.setData('text/plain', '');
            }
            catch (error) {
                // empty
            }
        }, onDragEnd: function (e) {
            e.stopPropagation();
            setDragOver(false);
            setDragStatus('dragged');
            onDragEnd && onDragEnd(e, item);
        }, onDragOver: function (e) {
            if (droppable) {
                e.stopPropagation();
                e.preventDefault();
                var rect = refItem.current.getBoundingClientRect();
                var threshold = window.pageYOffset + rect.top + rect.height / 2;
                var position = e.pageY > threshold ? 1 : -1;
                setDragOver(true);
                setDragPosition(position);
                onDragOver && onDragOver(e, item);
            }
        }, onDragLeave: function (e) {
            if (droppable) {
                e.stopPropagation();
                setDragOver(false);
                onDragLeave && onDragLeave(e, item);
            }
        }, onDrop: function (e) {
            if (droppable) {
                e.stopPropagation();
                e.preventDefault();
                setDragOver(false);
                setDragPosition(0);
                setDragStatus('none');
                onDrop && onDrop(e, item, dragPosition);
            }
        } },
        draggable ? React.createElement(IconDragDotVertical, { className: baseClassName + "-icon-drag" }) : null,
        allowClear ? (React.createElement(React.Fragment, null,
            React.createElement("span", { className: baseClassName + "-content" }, itemContent),
            !_disabled && (React.createElement(IconHover, __assign({ className: baseClassName + "-icon-remove", onClick: function () { return onItemRemove(item.key); }, tabIndex: 0, role: "button" }, getKeyboardEvents({
                onPressEnter: function () { return onItemRemove(item.key); },
            })),
                React.createElement(IconClose, null))))) : (React.createElement(Checkbox, { className: baseClassName + "-content", checked: checked, disabled: _disabled, onChange: function (checked) { return onItemSelect(item.key, checked); } }, itemContent))));
}
export default TransferItem;
