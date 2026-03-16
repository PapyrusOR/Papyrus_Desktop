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
import { useMemo, useCallback } from 'react';
import useComponent from './useComponent';
import { INTERNAL_EXPAND_KEY, INTERNAL_SELECTION_KEY } from '../constant';
function getFlattenColumns(columns, childrenColumnName) {
    var rows = [];
    function travel(columns) {
        if (columns && columns.length > 0) {
            columns.forEach(function (column) {
                if (!column[childrenColumnName]) {
                    rows.push(__assign(__assign({}, column), { key: column.key || column.dataIndex }));
                }
                else {
                    travel(column[childrenColumnName]);
                }
            });
        }
    }
    travel(columns);
    return rows;
}
// 获取 columns 需要分成几行，只有表头分组时可能 > 1。
function getAllHeaderRowsCount(columns, childrenColumnName) {
    var length = 0;
    if (columns && columns.length > 0) {
        columns.forEach(function (column) {
            var depth = getAllHeaderRowsCount(column[childrenColumnName], childrenColumnName) + 1;
            length = Math.max(depth, length);
        });
    }
    return length;
}
function useColumns(props) {
    var components = props.components, rowSelection = props.rowSelection, expandedRowRender = props.expandedRowRender, _a = props.expandProps, expandProps = _a === void 0 ? {} : _a, columns = props.columns, childrenColumnName = props.childrenColumnName;
    var baseColumns = useMemo(function () { return columns || []; }, [columns]);
    var rows = useMemo(function () { return getFlattenColumns(baseColumns, childrenColumnName); }, [baseColumns, childrenColumnName]);
    var isCheckbox = (rowSelection && rowSelection.type === 'checkbox') ||
        (rowSelection && !('type' in rowSelection));
    var isRadio = rowSelection && rowSelection.type === 'radio';
    var expandColWidth = expandProps.width;
    var shouldRenderExpandCol = !!expandedRowRender;
    var shouldRenderSelectionCol = isCheckbox || isRadio;
    var _b = useComponent(components), getHeaderComponentOperations = _b.getHeaderComponentOperations, getBodyComponentOperations = _b.getBodyComponentOperations;
    var headerOperations = useMemo(function () {
        return getHeaderComponentOperations({
            selectionNode: shouldRenderSelectionCol ? 'holder_node' : '',
            expandNode: shouldRenderExpandCol ? 'holder_node' : '',
        });
    }, [shouldRenderSelectionCol, shouldRenderExpandCol, getHeaderComponentOperations]);
    var bodyOperations = useMemo(function () {
        return getBodyComponentOperations({
            selectionNode: shouldRenderSelectionCol ? 'holder_node' : '',
            expandNode: shouldRenderExpandCol ? 'holder_node' : '',
        });
    }, [shouldRenderSelectionCol, shouldRenderExpandCol, getBodyComponentOperations]);
    var selectionFixedLeft = rowSelection && rowSelection.fixed;
    var selectionColumnWidth = rowSelection && rowSelection.columnWidth;
    var getInternalColumns = useCallback(function (rows, operations, index) {
        var operationFixedProps = {};
        var _rows = [];
        rows.forEach(function (r, i) {
            var _r = __assign({}, r);
            if (!('key' in r) || typeof r.key === 'undefined') {
                _r.key = _r.dataIndex || i;
            }
            if (i === 0) {
                _r.$$isFirstColumn = true;
                if (_r.fixed === 'left') {
                    operationFixedProps.fixed = _r.fixed;
                }
            }
            else {
                _r.$$isFirstColumn = false;
            }
            _rows.push(_r);
        });
        var expandColumn = shouldRenderExpandCol && {
            key: INTERNAL_EXPAND_KEY,
            title: INTERNAL_EXPAND_KEY,
            width: expandColWidth,
            $$isOperation: true,
        };
        var selectionColumn = shouldRenderSelectionCol && {
            key: INTERNAL_SELECTION_KEY,
            title: INTERNAL_SELECTION_KEY,
            width: selectionColumnWidth,
            $$isOperation: true,
        };
        if (selectionFixedLeft) {
            operationFixedProps.fixed = 'left';
        }
        if (typeof index !== 'number' || index === 0) {
            __spreadArray([], __read(operations), false).reverse().forEach(function (operation, i) {
                if (operation.node) {
                    var columnIndex = headerOperations.filter(function (opt) { return opt.node; }).length - i - 1;
                    if (operation.name === 'expandNode') {
                        _rows.unshift(__assign(__assign(__assign({}, expandColumn), operationFixedProps), { $$columnIndex: columnIndex }));
                    }
                    else if (operation.name === 'selectionNode') {
                        _rows.unshift(__assign(__assign(__assign({}, selectionColumn), operationFixedProps), { $$columnIndex: columnIndex }));
                    }
                    else {
                        _rows.unshift(__assign(__assign(__assign({}, operation), operationFixedProps), { title: operation.name, key: operation.name, $$isOperation: true, width: operation.width || 40, $$columnIndex: columnIndex }));
                    }
                }
            });
        }
        return _rows;
    }, [
        expandColWidth,
        shouldRenderExpandCol,
        shouldRenderSelectionCol,
        selectionColumnWidth,
        selectionFixedLeft,
        headerOperations,
    ]);
    var flattenColumns = useMemo(function () { return getInternalColumns(rows, bodyOperations); }, [rows, getInternalColumns, bodyOperations]);
    // 把表头分组的 columns 分成 n 行，并且加上 colSpan 和 rowSpan，没有表头分组的话是 1 行。
    var rowCount = useMemo(function () { return getAllHeaderRowsCount(baseColumns, childrenColumnName); }, [baseColumns, childrenColumnName]);
    // 分行之后的rows
    var groupColumns = useMemo(function () {
        var prefixIndex = Array.isArray(headerOperations)
            ? headerOperations.filter(function (opt) { return opt.node; }).length
            : 0;
        if (rowCount === 1) {
            var rows_1 = baseColumns.map(function (col, index) { return (__assign(__assign({}, col), { $$columnIndex: index + prefixIndex })); });
            return [getInternalColumns(rows_1, headerOperations, 0)];
        }
        var columnIndex = prefixIndex;
        var rows = [];
        var travel = function (baseColumns, current) {
            if (current === void 0) { current = 0; }
            rows[current] = rows[current] || [];
            baseColumns.forEach(function (col) {
                var column = __assign({}, col);
                if (column[childrenColumnName]) {
                    column.colSpan = getFlattenColumns(col[childrenColumnName], childrenColumnName).length;
                    column.$$columnIndex = [columnIndex];
                    rows[current].push(column);
                    travel(column[childrenColumnName], current + 1);
                    column.$$columnIndex.push(columnIndex - 1);
                }
                else {
                    column.rowSpan = rowCount - current;
                    column.$$columnIndex = columnIndex++;
                    rows[current].push(column);
                }
            });
            rows[current] = getInternalColumns(rows[current], headerOperations, current);
        };
        travel(baseColumns);
        return rows;
    }, [baseColumns, childrenColumnName, rowCount, getInternalColumns, headerOperations]);
    return [groupColumns, flattenColumns];
}
export default useColumns;
