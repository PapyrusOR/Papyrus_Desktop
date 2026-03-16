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
import cs from '../../_util/classNames';
function Item(props) {
    var _a;
    var prefixCls = props.prefixCls, style = props.style, children = props.children, direction = props.direction, disabled = props.disabled, _b = props.droppable, droppable = _b === void 0 ? true : _b, onDrop = props.onDrop, onDragStart = props.onDragStart, onDragEnd = props.onDragEnd, onDragOver = props.onDragOver, onDragLeave = props.onDragLeave;
    var refItem = useRef(null);
    var refDraggedTimer = useRef(null);
    var _c = __read(useState('none'), 2), dragStatus = _c[0], setDragStatus = _c[1];
    var _d = __read(useState(false), 2), dragOver = _d[0], setDragOver = _d[1];
    var _e = __read(useState(null), 2), dragPosition = _e[0], setDragPosition = _e[1];
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
    return (React.createElement("li", { draggable: true, ref: refItem, style: style, className: cs(prefixCls + "-item", (_a = {},
            _a[prefixCls + "-item-" + dragStatus] = dragStatus !== 'none',
            _a[prefixCls + "-item-gap-" + dragPosition] = dragPosition,
            _a[prefixCls + "-item-disabled"] = disabled,
            _a[prefixCls + "-item-dragover"] = dragOver,
            _a)), onDragStart: function (event) {
            event.stopPropagation();
            setDragStatus('dragging');
            try {
                // ie throw error
                // firefox-need-it
                event.dataTransfer.setData('text/plain', '');
            }
            catch (error) { }
            onDragStart && onDragStart(event);
        }, onDragEnd: function (event) {
            event.stopPropagation();
            setDragOver(false);
            setDragStatus('dragged');
            onDragEnd && onDragEnd(event);
        }, onDragOver: function (event) {
            if (droppable) {
                event.stopPropagation();
                event.preventDefault();
                var rect = refItem.current.getBoundingClientRect();
                if (direction === 'vertical') {
                    setDragPosition(event.pageY > window.pageYOffset + rect.top + rect.height / 2 ? 'bottom' : 'top');
                }
                else {
                    setDragPosition(event.pageX > window.pageXOffset + rect.left + rect.width / 2 ? 'right' : 'left');
                }
                setDragOver(true);
                onDragOver && onDragOver(event);
            }
        }, onDragLeave: function (event) {
            if (droppable) {
                event.stopPropagation();
                setDragOver(false);
                onDragLeave && onDragLeave(event);
            }
        }, onDrop: function (event) {
            if (droppable) {
                event.stopPropagation();
                event.preventDefault();
                setDragOver(false);
                setDragPosition(null);
                setDragStatus('none');
                onDrop && onDrop(event, dragPosition);
            }
        } }, children));
}
export default Item;
