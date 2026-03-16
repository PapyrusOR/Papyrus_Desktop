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
import React, { useContext, useEffect, useState } from 'react';
import cs from '../_util/classNames';
import Checkbox from '../Checkbox';
import Button from '../Button';
import Input from '../Input';
import List from '../List';
import Item from './item';
import IconSearch from '../../icon/react-icon/IconSearch';
import IconDelete from '../../icon/react-icon/IconDelete';
import IconHover from '../_class/icon-hover';
import { ConfigContext } from '../ConfigProvider';
import { isObject } from '../_util/is';
import useKeyboardEvent from '../_util/hooks/useKeyboardEvent';
export var TransferList = function (props, ref) {
    var getKeyboardEvents = useKeyboardEvent();
    var style = props.style, prefixCls = props.prefixCls, className = props.className, listType = props.listType, dataSource = props.dataSource, _a = props.selectedKeys, selectedKeys = _a === void 0 ? [] : _a, validKeys = props.validKeys, selectedDisabledKeys = props.selectedDisabledKeys, _b = props.title, title = _b === void 0 ? '' : _b, disabled = props.disabled, draggable = props.draggable, allowClear = props.allowClear, showSearch = props.showSearch, showFooter = props.showFooter, searchPlaceholder = props.searchPlaceholder, render = props.render, renderList = props.renderList, pagination = props.pagination, handleSelect = props.handleSelect, handleRemove = props.handleRemove, filterOption = props.filterOption, renderHeaderUnit = props.renderHeaderUnit, virtualListProps = props.virtualListProps, onSearch = props.onSearch, onResetData = props.onResetData, onDragStart = props.onDragStart, onDragEnd = props.onDragEnd, onDragLeave = props.onDragLeave, onDragOver = props.onDragOver, onDrop = props.onDrop;
    var baseClassName = prefixCls + "-view";
    var locale = useContext(ConfigContext).locale;
    var _c = __read(useState(null), 2), dragItem = _c[0], setDragItem = _c[1];
    var _d = __read(useState(''), 2), filterText = _d[0], setFilterText = _d[1];
    var _e = __read(useState(dataSource), 2), itemsToRender = _e[0], setItemsToRender = _e[1];
    useEffect(function () {
        setItemsToRender(filterText ? dataSource.filter(function (item) { return filterOption(filterText, item); }) : dataSource);
    }, [dataSource, filterText, filterOption]);
    // 处理单个条目复选框改变
    var handleItemChecked = function (key, checked) {
        return handleSelect(checked ? selectedKeys.concat(key) : selectedKeys.filter(function (_key) { return _key !== key; }));
    };
    // 处理全选复选框改变，始终避免操作已禁用的选项
    var handleItemAllChecked = function (keys, checked) {
        return handleSelect(checked
            ? __spreadArray([], __read(new Set(selectedKeys.concat(keys))), false) : selectedKeys.filter(function (selectedKey) { return keys.indexOf(selectedKey) === -1; }));
    };
    var clearItems = function (keys) { return function () { return handleRemove(keys); }; };
    var searchInput = (React.createElement(Input, __assign({ size: "small", disabled: disabled, placeholder: searchPlaceholder, suffix: React.createElement(IconSearch, null) }, (isObject(showSearch) ? showSearch : {}), { onChange: function (value, event) {
            setFilterText(value);
            onSearch && onSearch(value);
            isObject(showSearch) && showSearch.onChange && showSearch.onChange(value, event);
        } })));
    var renderHeader = function () {
        var countSelected = selectedKeys.length;
        var countRendered = itemsToRender.length;
        var keysCanBeChecked = filterText
            ? validKeys.filter(function (validKey) { return itemsToRender.find(function (_a) {
                var key = _a.key;
                return key === validKey;
            }); })
            : validKeys;
        var countCheckedOfRenderedItems = keysCanBeChecked.filter(function (key) { return selectedKeys.indexOf(key) > -1; }).length;
        var checkboxProps = {
            disabled: disabled,
            checked: countCheckedOfRenderedItems > 0 && countCheckedOfRenderedItems === keysCanBeChecked.length,
            indeterminate: countCheckedOfRenderedItems > 0 && countCheckedOfRenderedItems < keysCanBeChecked.length,
            onChange: function (checked) { return handleItemAllChecked(keysCanBeChecked, checked); },
        };
        if (typeof title === 'function') {
            return title({
                countTotal: countRendered,
                countSelected: countSelected,
                clear: clearItems(keysCanBeChecked),
                checkbox: React.createElement(Checkbox, __assign({}, checkboxProps)),
                searchInput: searchInput,
            });
        }
        var eleHeaderUnit = (React.createElement("span", { className: baseClassName + "-header-unit" }, renderHeaderUnit(countSelected, countRendered)));
        return allowClear ? (React.createElement(React.Fragment, null,
            React.createElement("span", { className: baseClassName + "-header-title" }, title),
            eleHeaderUnit,
            !disabled && validKeys.length ? (React.createElement(IconHover, __assign({ className: baseClassName + "-icon-clear", onClick: clearItems(keysCanBeChecked), tabIndex: 0, role: "button" }, getKeyboardEvents({
                onPressEnter: clearItems(keysCanBeChecked),
            })),
                React.createElement(IconDelete, null))) : null)) : (React.createElement(React.Fragment, null,
            React.createElement("span", { className: baseClassName + "-header-title" },
                React.createElement(Checkbox, __assign({}, checkboxProps), title)),
            eleHeaderUnit));
    };
    var renderListBody = function () {
        var customList = renderList &&
            renderList({
                listType: listType,
                disabled: disabled,
                selectedKeys: selectedKeys,
                validKeys: validKeys,
                selectedDisabledKeys: selectedDisabledKeys,
                filteredItems: itemsToRender,
                onItemRemove: function (key) { return handleRemove([key]); },
                onItemSelect: handleItemChecked,
                onItemSelectAll: function (keys, checked) {
                    handleSelect(checked ? keys.concat(selectedDisabledKeys) : __spreadArray([], __read(selectedDisabledKeys), false));
                },
            });
        return customList ? (React.createElement("div", { className: baseClassName + "-custom-list" }, customList)) : (React.createElement(List, { bordered: false, paginationInFooter: true, virtualListProps: virtualListProps, wrapperClassName: baseClassName + "-list", dataSource: itemsToRender, pagination: pagination
                ? __assign({ simple: true, size: 'mini' }, (typeof pagination === 'object' ? pagination : {})) : undefined, footer: showFooter === true ? (React.createElement(Button, { size: "mini", disabled: disabled, onClick: onResetData }, locale.Transfer.resetText)) : (showFooter || null), render: function (item) { return (React.createElement(Item, { key: item.key, prefixCls: prefixCls, item: item, disabled: disabled, draggable: draggable, droppable: !!dragItem, allowClear: allowClear, render: render, selectedKeys: selectedKeys, onItemSelect: function (key, selected) { return handleItemChecked(key, selected); }, onItemRemove: function (key) { return handleRemove([key]); }, onDragStart: function (e, item) {
                    setDragItem(item);
                    onDragStart && onDragStart(e, item);
                }, onDragEnd: function (e, item) {
                    setDragItem(null);
                    onDragEnd && onDragEnd(e, item);
                }, onDragLeave: function (e, item) { return onDragLeave && onDragLeave(e, item); }, onDragOver: function (e, item) { return onDragOver && onDragOver(e, item); }, onDrop: function (e, dropItem, dropPosition) {
                    if (onDrop && dragItem && dragItem.key !== dropItem.key) {
                        onDrop({
                            e: e,
                            dropItem: dropItem,
                            dropPosition: dropPosition,
                            dragItem: dragItem,
                        });
                    }
                } })); } }));
    };
    return (React.createElement("div", { ref: ref, className: cs(baseClassName, className), style: style },
        React.createElement("div", { className: baseClassName + "-header" }, renderHeader()),
        showSearch && React.createElement("div", { className: baseClassName + "-search" }, searchInput),
        renderListBody()));
};
var TransferListComponent = React.forwardRef(TransferList);
export default TransferListComponent;
