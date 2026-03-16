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
import { useState, useEffect, useRef } from 'react';
import { isChildrenNotEmpty, getOriginData } from '../utils';
export default function useExpand(props, flattenData, getRowKey) {
    var defaultExpandedRowKeys = props.defaultExpandedRowKeys, defaultExpandAllRows = props.defaultExpandAllRows, expandedRowRender = props.expandedRowRender, onExpand = props.onExpand, onExpandedRowsChange = props.onExpandedRowsChange, _a = props.childrenColumnName, childrenColumnName = _a === void 0 ? 'children' : _a, expandProps = props.expandProps;
    var _b = __read(useState(getDefaultExpandedRowKeys()), 2), expandedRowKeys = _b[0], setExpandedRowKeys = _b[1];
    var mergedExpandedRowKeys = props.expandedRowKeys || expandedRowKeys;
    var isFirstRender = useRef(true);
    useEffect(function () {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (defaultExpandAllRows && flattenData && flattenData.length > 0) {
            setExpandedRowKeys(getDefaultExpandedRowKeys());
        }
    }, [flattenData === null || flattenData === void 0 ? void 0 : flattenData.length, defaultExpandAllRows]);
    function getDefaultExpandedRowKeys() {
        var rows = [];
        if (props.expandedRowKeys) {
            rows = props.expandedRowKeys;
        }
        else if (defaultExpandedRowKeys) {
            rows = defaultExpandedRowKeys;
        }
        else if (defaultExpandAllRows) {
            rows = flattenData
                .map(function (item, index) {
                var originItem = getOriginData(item);
                if (expandProps &&
                    'rowExpandable' in expandProps &&
                    typeof expandProps.rowExpandable === 'function') {
                    return expandProps.rowExpandable(originItem) && getRowKey(item);
                }
                if (typeof expandedRowRender === 'function') {
                    return expandedRowRender(originItem, index) && getRowKey(item);
                }
                return isChildrenNotEmpty(item, childrenColumnName) && getRowKey(item);
            })
                .filter(function (x) { return x; });
        }
        return rows;
    }
    function onClickExpandBtn(key) {
        var isExpanded = mergedExpandedRowKeys.indexOf(key) === -1;
        var newExpandedRowKeys = isExpanded
            ? mergedExpandedRowKeys.concat(key)
            : mergedExpandedRowKeys.filter(function (_k) { return key !== _k; });
        var sortedExpandedRowKeys = flattenData
            .filter(function (record) { return newExpandedRowKeys.indexOf(getRowKey(record)) !== -1; })
            .map(function (record) { return getRowKey(record); });
        setExpandedRowKeys(sortedExpandedRowKeys);
        handleExpandChange(key, isExpanded);
        onExpandedRowsChange && onExpandedRowsChange(sortedExpandedRowKeys);
    }
    function handleExpandChange(key, expanded) {
        onExpand &&
            onExpand(getOriginData(flattenData.find(function (item) { return getRowKey(item) === key; })), expanded);
    }
    return [mergedExpandedRowKeys, onClickExpandBtn];
}
