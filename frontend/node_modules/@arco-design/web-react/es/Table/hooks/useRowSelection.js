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
import { useState } from 'react';
import { isChildrenNotEmpty, getSelectedKeys, getSelectedKeysByData, getOriginData, } from '../utils';
import { isArray } from '../../_util/is';
function getSet(arr) {
    return __spreadArray([], __read(new Set(arr)), false);
}
export default function useRowSelection(props, pageData, data, getRowKey) {
    var rowSelection = props.rowSelection, childrenColumnName = props.childrenColumnName;
    var controlledSelectedRowKeys = rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.selectedRowKeys;
    var onSelectAll = rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.onSelectAll;
    var onSelect = rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.onSelect;
    var onChange = rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.onChange;
    var pureKeys = rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.pureKeys; // TODO: remove
    var checkConnected = typeof (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.checkStrictly) === 'boolean' ? !rowSelection.checkStrictly : false;
    var preserveSelectedRowKeys = rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.preserveSelectedRowKeys;
    // 获取扁平化之后的 data
    function getMetaFromData() {
        var allSelectedRowKeys = [];
        var flattenData = [];
        var travel = function (children) {
            if (isArray(children) && children.length) {
                children.forEach(function (record) {
                    var rowKey = getRowKey(record);
                    var checkboxProps = rowSelection && typeof rowSelection.checkboxProps === 'function'
                        ? rowSelection.checkboxProps(getOriginData(record))
                        : {};
                    if (!checkboxProps.disabled) {
                        allSelectedRowKeys.push(rowKey);
                    }
                    if (isChildrenNotEmpty(record, props.childrenColumnName)) {
                        travel(record[props.childrenColumnName]);
                    }
                });
            }
        };
        travel(pageData);
        var travelOrigin = function (children, parent) {
            if (isArray(children) && children.length) {
                children.forEach(function (record) {
                    if (parent && checkConnected) {
                        record.__INTERNAL_PARENT = parent;
                    }
                    flattenData.push(record);
                    if (isChildrenNotEmpty(record, props.childrenColumnName)) {
                        var _parent = __assign({}, record);
                        travelOrigin(record[props.childrenColumnName], _parent);
                    }
                });
            }
        };
        travelOrigin(data, undefined);
        return {
            allSelectedRowKeys: allSelectedRowKeys,
            flattenData: flattenData,
        };
    }
    var _a = getMetaFromData(), allSelectedRowKeys = _a.allSelectedRowKeys, flattenData = _a.flattenData;
    var _b = __read(useState([]), 2), selectedRowKeys = _b[0], setSelectedRowKeys = _b[1];
    var _c = __read(useState([]), 2), indeterminateKeys = _c[0], setIndeterminateKeys = _c[1];
    var keys = getSelectedKeysByData(flattenData, getSet(controlledSelectedRowKeys || selectedRowKeys), getRowKey, childrenColumnName, checkConnected);
    var mergedSelectedRowKeys = checkConnected && !controlledSelectedRowKeys ? selectedRowKeys : keys.selectedRowKeys;
    var mergedIndeterminateKeys = checkConnected && !controlledSelectedRowKeys ? indeterminateKeys : keys.indeterminateKeys;
    var _d = __read(useState(pureKeys ? [] : getRowsFromKeys(mergedSelectedRowKeys)), 2), selectedRows = _d[0], setSelectedRows = _d[1];
    function getRowsFromKeys(keys, plus) {
        // selectedRows is placed before flattenData: https://github.com/arco-design/arco-design/issues/1294
        var all = plus ? selectedRows.concat(flattenData) : flattenData;
        var keyMap = new Map(all.map(function (v) { return [getRowKey(v), v]; }));
        return keys.map(function (r) { return keyMap.get(r); }).filter(function (a) { return a; });
    }
    var flattenKeys = new Set(flattenData.map(function (d) { return getRowKey(d); }));
    function deleteUnExistKeys(keys) {
        return preserveSelectedRowKeys ? keys : keys.filter(function (k) { return flattenKeys.has(k); });
    }
    function onCheckAll(checked) {
        var newSelectedRowKeys = [];
        var newSelectedRows = [];
        if (checked) {
            newSelectedRowKeys = deleteUnExistKeys(getSet(mergedSelectedRowKeys.concat(allSelectedRowKeys)));
        }
        else {
            var tempSet_1 = new Set(allSelectedRowKeys);
            newSelectedRowKeys = deleteUnExistKeys(mergedSelectedRowKeys.filter(function (key) { return !tempSet_1.has(key); }));
        }
        if (!pureKeys) {
            newSelectedRows = getRowsFromKeys(newSelectedRowKeys, true);
        }
        var originSelectedRows = getOriginData(newSelectedRows);
        setSelectedRowKeys(newSelectedRowKeys);
        setSelectedRows(newSelectedRows);
        setIndeterminateKeys([]);
        onChange && onChange(newSelectedRowKeys, originSelectedRows);
        onSelectAll && onSelectAll(checked, originSelectedRows);
    }
    function onCheck(checked, record) {
        var _a = getSelectedKeys(record, checked, mergedSelectedRowKeys, indeterminateKeys, getRowKey, childrenColumnName, checkConnected), selectedRowKeys = _a.selectedRowKeys, _indeterminateKeys = _a.indeterminateKeys;
        var newSelectedRowKeys = deleteUnExistKeys(selectedRowKeys);
        var newSelectedRows = getRowsFromKeys(newSelectedRowKeys, true);
        var originSelectedRows = getOriginData(newSelectedRows);
        setSelectedRowKeys(newSelectedRowKeys);
        setSelectedRows(newSelectedRows);
        setIndeterminateKeys(_indeterminateKeys);
        onSelect && onSelect(checked, getOriginData(record), originSelectedRows);
        onChange && onChange(newSelectedRowKeys, originSelectedRows);
    }
    function onCheckRadio(key, record) {
        var newSelectedRows = [flattenData.find(function (d) { return getRowKey(d) === key; })];
        var originSelectedRows = getOriginData(newSelectedRows);
        setSelectedRowKeys([key]);
        onSelect && onSelect(true, getOriginData(record), originSelectedRows);
        onChange && onChange([key], originSelectedRows);
    }
    return {
        selectedRowKeys: mergedSelectedRowKeys,
        indeterminateKeys: mergedIndeterminateKeys,
        onCheckAll: onCheckAll,
        onCheck: onCheck,
        onCheckRadio: onCheckRadio,
        setSelectedRowKeys: setSelectedRowKeys,
        allSelectedRowKeys: allSelectedRowKeys,
        flattenData: flattenData,
    };
}
