import React, { useEffect, useRef } from 'react';
import { INTERNAL_EXPAND_KEY, INTERNAL_SELECTION_KEY } from './constant';
function fixedWidth(width) {
    return typeof width === 'number' || typeof width === 'string'
        ? {
            width: width,
        }
        : {};
}
function ColGroup(props) {
    var colgroupRef = useRef();
    var prefixCls = props.prefixCls, columns = props.columns, columnWidths = props.columnWidths, producer = props.producer, expandedRowKeys = props.expandedRowKeys, data = props.data, onSetColumnWidths = props.onSetColumnWidths;
    useEffect(function () {
        if (producer && colgroupRef.current) {
            var cols = Array.from(colgroupRef.current.querySelectorAll('col') || []).filter(function (col) {
                return !col.classList.contains(prefixCls + "-expand-icon-col") &&
                    !col.classList.contains(prefixCls + "-selection-col");
            });
            var widths = cols.map(function (col) {
                var width = col.getBoundingClientRect().width;
                return width;
            });
            onSetColumnWidths(widths);
        }
    }, [producer, onSetColumnWidths, prefixCls, expandedRowKeys, data, columns]);
    var mainColIndex = 0;
    return (React.createElement("colgroup", { ref: colgroupRef }, columns.map(function (col, index) {
        var _a;
        if (col.title === INTERNAL_EXPAND_KEY) {
            return (React.createElement("col", { key: INTERNAL_EXPAND_KEY, className: prefixCls + "-expand-icon-col", style: fixedWidth(col.width) }));
        }
        if (col.title === INTERNAL_SELECTION_KEY) {
            return (React.createElement("col", { key: INTERNAL_SELECTION_KEY, className: prefixCls + "-selection-col", style: fixedWidth(col.width) }));
        }
        var width;
        if (col.width) {
            width = col.width;
        }
        else if (!producer && columnWidths) {
            width = columnWidths[mainColIndex];
        }
        mainColIndex++;
        return React.createElement("col", { key: (_a = col.key) !== null && _a !== void 0 ? _a : index, style: fixedWidth(width) });
    })));
}
export default ColGroup;
