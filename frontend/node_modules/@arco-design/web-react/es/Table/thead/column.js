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
import React, { useState, useEffect, useContext } from 'react';
import cs from '../../_util/classNames';
import { isArray, isObject, isString } from '../../_util/is';
import Trigger from '../../Trigger';
import Radio from '../../Radio/radio';
import Button from '../../Button';
import Tooltip from '../../Tooltip';
import IconCaretDown from '../../../icon/react-icon/IconCaretDown';
import IconCaretUp from '../../../icon/react-icon/IconCaretUp';
import IconFilter from '../../../icon/react-icon/IconFilter';
import Checkbox from '../../Checkbox';
import Space from '../../Space';
import { ConfigContext } from '../../ConfigProvider';
import useComponent from '../hooks/useComponent';
import useMergeValue from '../../_util/hooks/useMergeValue';
function getTooltipContent(nextSorterDirection, locale) {
    if (nextSorterDirection === 'ascend') {
        return locale.Table.sortAscend;
    }
    if (nextSorterDirection === 'descend') {
        return locale.Table.sortDescend;
    }
    return locale.Table.cancelSort;
}
var triggerPopupAlign = { bottom: 0 };
function Column(_a) {
    var _b, _c, _d, _e;
    var onSort = _a.onSort, onFilter = _a.onFilter, onHandleFilter = _a.onHandleFilter, onHandleFilterReset = _a.onHandleFilterReset, _f = _a.currentFilters, currentFilters = _f === void 0 ? {} : _f, currentSorter = _a.currentSorter, _key = _a._key, dataIndex = _a.dataIndex, title = _a.title, sorter = _a.sorter, _g = _a.sortDirections, sortDirections = _g === void 0 ? ['ascend', 'descend'] : _g, _h = _a.filters, filters = _h === void 0 ? [] : _h, columnFixedStyle = _a.columnFixedStyle, className = _a.className, cellStyle = _a.cellStyle, headerCellStyle = _a.headerCellStyle, rowSpan = _a.rowSpan, colSpan = _a.colSpan, headerCellProps = _a.headerCellProps, prefixCls = _a.prefixCls, _j = _a.align, align = _j === void 0 ? 'left' : _j, components = _a.components, filterIcon = _a.filterIcon, filterDropdown = _a.filterDropdown, _k = _a.filterMultiple, filterMultiple = _k === void 0 ? true : _k, ellipsis = _a.ellipsis, filterDropdownProps = _a.filterDropdownProps, onFilterDropdownVisibleChange = _a.onFilterDropdownVisibleChange, column = _a.column, showSorterTooltip = _a.showSorterTooltip, index = _a.index;
    var _l = useContext(ConfigContext), locale = _l.locale, rtl = _l.rtl;
    // const innerDataIndex = dataIndex === undefined ? index : dataIndex;
    var innerDataIndex = _key || dataIndex || index;
    // stateCurrentFilter 标记了下拉框中选中的 filter 项目，在受控模式下它与 currentFilter 可以不同
    var _m = __read(useMergeValue([], {
        value: currentFilters[innerDataIndex] || [],
    }), 3), currentFilter = _m[0], setCurrentFilter = _m[1], stateCurrentFilter = _m[2];
    var _o = __read(useState(false), 2), filterVisible = _o[0], setFilterVisible = _o[1];
    var _p = __read(useState(false), 2), isEnter = _p[0], setEnter = _p[1];
    var enableSort = sorter && isArray(sortDirections) && sortDirections.length;
    var nextSortDirection = enableSort ? getNextSortDirection() : undefined;
    useEffect(function () {
        setCurrentFilter(currentFilters[innerDataIndex] || []);
    }, [currentFilters, innerDataIndex]);
    useEffect(function () {
        if (currentFilter && currentFilter !== stateCurrentFilter) {
            setCurrentFilter(currentFilter);
        }
    }, [filterVisible]);
    function getNextSortDirection() {
        var currentSortDirection = currentSorter && currentSorter.direction;
        if (!currentSortDirection || (currentSorter && currentSorter.field !== innerDataIndex)) {
            return sortDirections[0];
        }
        var sorterIndex = sortDirections.indexOf(currentSortDirection);
        if (sorterIndex < sortDirections.length) {
            return sortDirections[sorterIndex + 1];
        }
    }
    function handleFilter() {
        if (!currentFilter)
            return;
        onHandleFilter &&
            onHandleFilter({ onFilter: onFilter, filters: filters, dataIndex: innerDataIndex }, stateCurrentFilter);
        onVisibleChange(false);
    }
    function handleFilterReset() {
        onHandleFilterReset({ dataIndex: innerDataIndex });
        onVisibleChange(false);
    }
    function onVisibleChange(filterVisible) {
        setFilterVisible(filterVisible);
        onFilterDropdownVisibleChange && onFilterDropdownVisibleChange(filterVisible);
    }
    function onChangeFilterItem(filterValue, checked) {
        var filter = __spreadArray([], __read(stateCurrentFilter), false);
        if (filterMultiple) {
            if (checked) {
                filter = filter.concat(filterValue);
            }
            else {
                filter.splice(filter.findIndex(function (value) { return value === filterValue; }), 1);
            }
        }
        else if (filter.length > 0) {
            if (filter[0] !== filterValue) {
                filter = [filterValue];
            }
            else {
                return;
            }
        }
        else {
            filter = [filterValue];
        }
        setCurrentFilter(filter);
    }
    // filterDropdown confirm
    function confirm(_filterKeys) {
        setCurrentFilter(_filterKeys || stateCurrentFilter);
        setFilterVisible(false);
        onHandleFilter &&
            onHandleFilter({ filters: filters, onFilter: onFilter, dataIndex: innerDataIndex }, _filterKeys || stateCurrentFilter);
    }
    function renderFilters() {
        return typeof filterDropdown === 'function' ? (filterDropdown({
            filterKeys: stateCurrentFilter,
            setFilterKeys: function (filterKeys, callback) {
                setCurrentFilter(filterKeys);
                callback === null || callback === void 0 ? void 0 : callback();
            },
            confirm: confirm,
        })) : (React.createElement("div", { className: prefixCls + "-filters-popup" },
            React.createElement("div", { className: prefixCls + "-filters-list" }, filters.map(function (col) {
                var checked = stateCurrentFilter.findIndex(function (value) { return value === col.value; }) !== -1;
                return (React.createElement("div", { className: prefixCls + "-filters-item", key: col.value }, filterMultiple ? (React.createElement(Checkbox, { checked: checked, onChange: function (checked) { return onChangeFilterItem(col.value, checked); } }, col.text)) : (React.createElement(Radio, { checked: checked, onChange: function (checked) { return onChangeFilterItem(col.value, checked); } }, col.text))));
            })),
            React.createElement(Space, { className: prefixCls + "-filters-btn" },
                React.createElement(Button, { onClick: handleFilterReset, size: "mini" }, locale.Table.resetText),
                React.createElement(Button, { onClick: handleFilter, type: "primary", size: "mini" }, locale.Table.okText))));
    }
    var classNameSorter = function (direction) {
        var _a;
        return cs(prefixCls + "-sorter-icon", (_a = {},
            _a[prefixCls + "-sorter-icon-active"] = currentSorter &&
                currentSorter.direction === direction &&
                currentSorter.field === innerDataIndex,
            _a));
    };
    var classNameFilter = cs(prefixCls + "-filters", (_b = {},
        _b[prefixCls + "-filters-open"] = filterVisible,
        _b[prefixCls + "-filters-active"] = currentFilter && currentFilter.length,
        _b));
    var styleTh = __assign({}, columnFixedStyle);
    if (isObject(cellStyle)) {
        styleTh = __assign(__assign({}, styleTh), cellStyle);
    }
    if (isObject(headerCellStyle)) {
        styleTh = __assign(__assign({}, styleTh), headerCellStyle);
    }
    if (align && align !== 'left') {
        styleTh.textAlign = align;
    }
    var thProps = {
        style: styleTh,
        key: _key || innerDataIndex,
    };
    if (colSpan && colSpan > 1) {
        thProps.colSpan = colSpan;
    }
    if (rowSpan && rowSpan > 1) {
        thProps.rowSpan = rowSpan;
    }
    var _q = useComponent(components), ComponentTh = _q.ComponentTh, ComponentHeaderCell = _q.ComponentHeaderCell;
    var shouldRenderFilters = (isArray(filters) && filters.length > 0) || typeof filterDropdown === 'function';
    var titleProps = ellipsis && typeof title === 'string' ? { title: title } : {};
    var filterDropdownTriggerProps = filterDropdownProps && filterDropdownProps.triggerProps;
    var cellChildren = (React.createElement(React.Fragment, null,
        enableSort ? (React.createElement(Tooltip, __assign({ content: getTooltipContent(nextSortDirection, locale), disabled: !showSorterTooltip }, (isObject(showSorterTooltip) ? showSorterTooltip : {})),
            React.createElement("div", { className: prefixCls + "-cell-with-sorter", onMouseEnter: function () {
                    setEnter(true);
                }, onMouseLeave: function () {
                    setEnter(false);
                }, onClick: function () { return onSort(nextSortDirection, innerDataIndex); } },
                React.createElement("span", __assign({ className: prefixCls + "-th-item-title" }, titleProps), title),
                enableSort && (React.createElement("div", { className: cs(prefixCls + "-sorter", (_c = {},
                        _c[prefixCls + "-sorter-direction-one"] = sortDirections.length === 1,
                        _c)) },
                    sortDirections.indexOf('ascend') !== -1 && (React.createElement("div", { className: classNameSorter('ascend') },
                        React.createElement(IconCaretUp, null))),
                    sortDirections.indexOf('descend') !== -1 && (React.createElement("div", { className: classNameSorter('descend') },
                        React.createElement(IconCaretDown, null)))))))) : (React.createElement("span", __assign({ className: prefixCls + "-th-item-title" }, titleProps), title)),
        shouldRenderFilters && (React.createElement(Trigger, __assign({ popup: renderFilters, trigger: "click", classNames: "slideDynamicOrigin", position: rtl ? 'bl' : 'br', popupAlign: triggerPopupAlign, popupVisible: filterVisible, onVisibleChange: onVisibleChange }, filterDropdownTriggerProps),
            React.createElement("div", { className: classNameFilter }, filterIcon || React.createElement(IconFilter, null))))));
    var cellChildrenClassName = cs(prefixCls + "-th-item", (_d = {},
        _d[prefixCls + "-cell-text-ellipsis"] = ellipsis,
        _d[prefixCls + "-cell-mouseenter"] = isEnter,
        _d[prefixCls + "-cell-next-" + nextSortDirection] = isEnter && nextSortDirection,
        _d[prefixCls + "-col-has-sorter"] = enableSort,
        _d[prefixCls + "-col-has-filter"] = shouldRenderFilters,
        _d));
    return (colSpan !== 0 && (React.createElement(ComponentTh, __assign({ className: cs(prefixCls + "-th", (_e = {},
            _e[prefixCls + "-col-sorted"] = currentSorter && currentSorter.direction && currentSorter.field === innerDataIndex,
            _e[prefixCls + "-col-first"] = index === 0,
            _e), className) }, thProps, headerCellProps), isString(ComponentHeaderCell) ? (React.createElement(ComponentHeaderCell, { className: cellChildrenClassName }, cellChildren)) : (React.createElement(ComponentHeaderCell, { className: cellChildrenClassName, column: column }, cellChildren)))));
}
export default Column;
