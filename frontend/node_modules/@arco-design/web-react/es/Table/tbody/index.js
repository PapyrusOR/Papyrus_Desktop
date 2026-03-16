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
import { isArray } from '../../_util/is';
import cs from '../../_util/classNames';
import useComponent from '../hooks/useComponent';
import VirtualList from '../../_class/VirtualList';
import Tr from './tr';
import { getOriginData } from '../utils';
var DataRecordRenderer = forwardRef(function (_a, ref) {
    var record = _a.record, index = _a.index, virtualized = _a.virtualized, tbodyProps = _a.tbodyProps;
    var prefixCls = tbodyProps.prefixCls, columns = tbodyProps.columns, _b = tbodyProps.indentSize, indentSize = _b === void 0 ? 16 : _b, _c = tbodyProps.childrenColumnName, childrenColumnName = _c === void 0 ? 'children' : _c, _d = tbodyProps.expandProps, expandProps = _d === void 0 ? {} : _d, rowSelection = tbodyProps.rowSelection, hasFixedColumn = tbodyProps.hasFixedColumn, tableViewWidth = tbodyProps.tableViewWidth, getRowKey = tbodyProps.getRowKey, expandedRowKeys = tbodyProps.expandedRowKeys, expandedRowRender = tbodyProps.expandedRowRender;
    var type;
    if (rowSelection && 'type' in rowSelection) {
        type = rowSelection.type;
    }
    else if (rowSelection && !('type' in rowSelection)) {
        type = 'checkbox';
    }
    var er = expandedRowRender
        ? function (r, i) { return expandedRowRender(getOriginData(r), i); }
        : expandedRowRender;
    var isChildrenNotEmpty = function (record) {
        return isArray(record[childrenColumnName]) && record[childrenColumnName].length;
    };
    var shouldRowExpand = function (record, index) {
        if ('rowExpandable' in expandProps && typeof expandProps.rowExpandable === 'function') {
            return expandProps.rowExpandable(record);
        }
        return er && er(record, index) !== null;
    };
    var renderTreeTrs = function (record, index) {
        var trList = [];
        var trProps = __assign(__assign({}, tbodyProps), { type: type, shouldRowExpand: shouldRowExpand });
        // 存在 record.children 时，仅使用第一个元素作为 ref 返回，此时虚拟列表获得元素高度可能不太准确，但大致可用
        trList.push(React.createElement(Tr, __assign({ ref: ref, key: getRowKey(record) }, trProps, { record: record, level: 0, index: index })));
        var travel = function (children, rowKey, level) {
            if (level === void 0) { level = 0; }
            if (isArray(children) && children.length) {
                children.forEach(function (child, i) {
                    if (expandedRowKeys.indexOf(rowKey) !== -1) {
                        trList.push(React.createElement(Tr, __assign({}, trProps, { key: getRowKey(child), record: child, level: level + 1, index: i })));
                        if (isChildrenNotEmpty(child)) {
                            travel(child[childrenColumnName], getRowKey(child), level + 1);
                        }
                    }
                });
            }
        };
        if (!er) {
            travel(record[childrenColumnName], getRowKey(record));
        }
        return trList;
    };
    var rowK = getRowKey(record);
    var shouldRenderExpandIcon = shouldRowExpand(record, index) && expandedRowKeys.indexOf(rowK) !== -1;
    var TRTagName = virtualized ? 'div' : 'tr';
    var TDTagName = virtualized ? 'div' : 'td';
    return (React.createElement(React.Fragment, { key: rowK },
        renderTreeTrs(record, index),
        shouldRenderExpandIcon && (React.createElement(TRTagName, { key: rowK + "-expanded", className: cs(prefixCls + "-tr", prefixCls + "-expand-content") },
            React.createElement(TDTagName, { className: cs(prefixCls + "-td", prefixCls + "-col-first"), style: { paddingLeft: indentSize }, colSpan: columns.length }, hasFixedColumn ? (React.createElement("div", { className: prefixCls + "-expand-fixed-row", style: { width: tableViewWidth } }, er === null || er === void 0 ? void 0 : er(record, index))) : (er === null || er === void 0 ? void 0 : er(record, index)))))));
});
function TBody(props) {
    var data = props.data, columns = props.columns, prefixCls = props.prefixCls, components = props.components, noDataElement = props.noDataElement, scroll = props.scroll, tableViewWidth = props.tableViewWidth, virtualized = props.virtualized, virtualListProps = props.virtualListProps, getRowKey = props.getRowKey, saveVirtualListRef = props.saveVirtualListRef;
    var saveRef = function (node) {
        var _a;
        (_a = props.saveRef) === null || _a === void 0 ? void 0 : _a.call(props, node);
    };
    var ComponentTbody = useComponent(components).ComponentTbody;
    var scrollStyleX = {};
    var scrollStyleY = {};
    if (scroll) {
        if (scroll.x && (typeof scroll.x === 'number' || typeof scroll.x === 'string')) {
            scrollStyleX = {
                width: scroll.x,
            };
        }
        if (scroll.y && (typeof scroll.y === 'number' || typeof scroll.y === 'string')) {
            scrollStyleY = {
                maxHeight: scroll.y,
            };
        }
    }
    var noElementProps = {
        className: prefixCls + "-no-data",
    };
    if (tableViewWidth) {
        noElementProps.className = prefixCls + "-no-data " + prefixCls + "-expand-fixed-row";
        noElementProps.style = { width: tableViewWidth };
    }
    var noDataTr = (React.createElement("tr", { className: cs(prefixCls + "-tr", prefixCls + "-empty-row") },
        React.createElement("td", { className: cs(prefixCls + "-td", prefixCls + "-col-first"), colSpan: columns.length },
            React.createElement("div", __assign({}, noElementProps), noDataElement))));
    var renderDataRecord = function (record, index) {
        var _a;
        return (React.createElement(DataRecordRenderer, { key: (_a = getRowKey(record)) !== null && _a !== void 0 ? _a : index, record: record, index: index, virtualized: virtualized, tbodyProps: props }));
    };
    // https://github.com/arco-design/arco-design/issues/644
    // except the real scroll container, all parent nodes should not have a overflow style.
    if (virtualized) {
        return data.length > 0 ? (React.createElement(VirtualList, __assign({ data: data, height: scrollStyleY.maxHeight, isStaticItemHeight: false, 
            // position sticky works
            outerStyle: __assign(__assign({}, scrollStyleX), { minWidth: '100%', overflow: 'visible' }), innerStyle: { right: 'auto', minWidth: '100%' }, className: prefixCls + "-body", ref: function (ref) {
                saveVirtualListRef(ref);
                saveRef(ref === null || ref === void 0 ? void 0 : ref.dom);
            }, itemKey: getRowKey }, virtualListProps), renderDataRecord)) : (React.createElement("div", { className: prefixCls + "-body", ref: saveRef },
            React.createElement("table", null,
                React.createElement("tbody", null, noDataTr))));
    }
    return (React.createElement(ComponentTbody, { ref: saveRef }, data.length > 0 ? data.map(renderDataRecord) : noDataTr));
}
export default TBody;
