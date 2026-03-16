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
import React, { memo, useContext, useMemo } from 'react';
import get from 'lodash/get';
import pick from '../../_util/pick';
import { isObject, isString } from '../../_util/is';
import cs from '../../_util/classNames';
import useComponent from '../hooks/useComponent';
import { getOriginData } from '../utils';
import { ConfigContext } from '../../ConfigProvider';
function isInvalidRenderElement(element) {
    return element && !React.isValidElement(element) && isObject(element);
}
function Td(props) {
    var _a, _b;
    var components = props.components, InnerComponentTd = props.InnerComponentTd, column = props.column, columnIndex = props.columnIndex, prefixCls = props.prefixCls, stickyClassName = props.stickyClassName, stickyOffset = props.stickyOffset, currentSorter = props.currentSorter, virtualized = props.virtualized, record = props.record, trIndex = props.trIndex, level = props.level, placeholder = props.placeholder, indentSize = props.indentSize, renderExpandIcon = props.renderExpandIcon, rowKey = props.rowKey, recordHaveChildren = props.recordHaveChildren, haveTreeData = props.haveTreeData;
    var rtl = useContext(ConfigContext).rtl;
    var ComponentBodyCell = useComponent(components).ComponentBodyCell;
    var classNameTd = cs(prefixCls + "-td", stickyClassName, (_a = {},
        _a[prefixCls + "-col-sorted"] = currentSorter && currentSorter.direction && currentSorter.field === column.dataIndex,
        _a[prefixCls + "-col-first"] = columnIndex === 0,
        _a), column.className);
    var tdProps = {};
    var rowSpan;
    var colSpan;
    var styleTd = {};
    if (column.fixed === 'left') {
        styleTd[rtl ? 'right' : 'left'] = stickyOffset;
    }
    if (column.fixed === 'right') {
        styleTd[rtl ? 'left' : 'right'] = stickyOffset;
    }
    if (isObject(column.cellStyle)) {
        styleTd = __assign(__assign({}, styleTd), column.cellStyle);
    }
    if (isObject(column.bodyCellStyle)) {
        styleTd = __assign(__assign({}, styleTd), column.bodyCellStyle);
    }
    if (column.align) {
        styleTd.textAlign = column.align;
    }
    if (virtualized && column.width) {
        styleTd.width = column.width;
        styleTd.minWidth = column.width;
        styleTd.maxWidth = column.width;
    }
    var _c = column.onCell
        ? column.onCell(record, trIndex)
        : { onHandleSave: function () { } }, onHandleSave = _c.onHandleSave, cellProps = __rest(_c, ["onHandleSave"]);
    var renderElement = useMemo(function () {
        return column.render && column.render(get(record, column.dataIndex), getOriginData(record), trIndex);
    }, [record, column, trIndex]);
    if (isInvalidRenderElement(renderElement)) {
        tdProps = renderElement.props;
        rowSpan = tdProps.rowSpan;
        colSpan = tdProps.colSpan;
        renderElement = renderElement.children;
    }
    if (rowSpan === 0 || colSpan === 0) {
        return null;
    }
    var v = get(record, column.dataIndex);
    var cellChildren = column.render
        ? renderElement
        : v === undefined || (typeof v === 'string' && v.trim() === '') || v === null
            ? column.placeholder === undefined
                ? placeholder
                : column.placeholder
            : v;
    var titleProps = column.ellipsis && typeof cellChildren === 'string' ? { title: cellChildren } : {};
    var hasInlineExpandIcon = haveTreeData && column.$$isFirstColumn;
    var needRenderExpandIcon = hasInlineExpandIcon && recordHaveChildren;
    var paddingLeft = hasInlineExpandIcon && level > 0 ? indentSize * level : 0;
    if (hasInlineExpandIcon && !recordHaveChildren) {
        // expand icon width and margin-right
        paddingLeft += 16 + 4;
    }
    var content = (React.createElement(React.Fragment, null,
        needRenderExpandIcon ? (React.createElement("span", { className: prefixCls + "-cell-expand-icon" }, renderExpandIcon(record, rowKey))) : null,
        isString(ComponentBodyCell) ? (React.createElement(ComponentBodyCell, __assign({}, { className: prefixCls + "-cell-wrap-value" }), cellChildren)) : (React.createElement(ComponentBodyCell, __assign({ rowData: getOriginData(record), className: prefixCls + "-cell-wrap-value", column: column, onHandleSave: onHandleSave }, cellProps), cellChildren))));
    return (React.createElement(InnerComponentTd, __assign({ key: column.key || column.dataIndex || columnIndex, onMouseEnter: function (e) {
            var _a;
            if (rowSpan > 1) {
                var table = e.currentTarget.closest("." + prefixCls);
                var tbody = e.currentTarget.closest('tbody');
                if (table && tbody) {
                    var trs = tbody.querySelectorAll("." + prefixCls + "-tr");
                    for (var i = trIndex; i < trIndex + rowSpan; i++) {
                        var tr = trs[i];
                        if (tr) {
                            tr.classList.add(prefixCls + "-tr-hover");
                        }
                    }
                }
            }
            (_a = cellProps === null || cellProps === void 0 ? void 0 : cellProps.onMouseEnter) === null || _a === void 0 ? void 0 : _a.call(cellProps, e);
        }, onMouseLeave: function (e) {
            var _a;
            if (rowSpan > 1) {
                var table = e.currentTarget.closest("." + prefixCls);
                var tbody = e.currentTarget.closest('tbody');
                if (table && tbody) {
                    var trs = tbody.querySelectorAll("." + prefixCls + "-tr");
                    for (var i = trIndex; i < trIndex + rowSpan; i++) {
                        var tr = trs[i];
                        if (tr) {
                            tr.classList.remove(prefixCls + "-tr-hover");
                        }
                    }
                }
            }
            (_a = cellProps === null || cellProps === void 0 ? void 0 : cellProps.onMouseLeave) === null || _a === void 0 ? void 0 : _a.call(cellProps, e);
        } }, pick(cellProps, [
        'onClick',
        'onDoubleClick',
        'onContextMenu',
        'onMouseOver',
        'onMouseEnter',
        'onMouseLeave',
        'onMouseMove',
        'onMouseDown',
        'onMouseUp',
    ]), tdProps, { className: cs(classNameTd, tdProps.className), style: __assign(__assign({}, styleTd), tdProps.style) }),
        React.createElement("div", __assign({ className: cs(prefixCls + "-cell", (_b = {},
                _b[prefixCls + "-cell-text-ellipsis"] = column.ellipsis,
                _b)) }, titleProps),
            paddingLeft ? (React.createElement("span", { className: prefixCls + "-cell-indent", style: { paddingLeft: paddingLeft } })) : null,
            content)));
}
export default memo(Td);
