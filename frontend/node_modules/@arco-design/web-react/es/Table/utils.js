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
import { isArray, isObject, isUndefined, isNull, isNumber, isString } from '../_util/is';
export function px2Number(width) {
    if (isNumber(width)) {
        return width;
    }
    if (isString(width) && width.includes('px')) {
        return +width.replace('px', '');
    }
    return width;
}
export function getScrollBarHeight(ele) {
    return ele ? ele.offsetHeight - ele.clientHeight : 0;
}
export function getScrollBarWidth(ele) {
    return ele ? ele.offsetWidth - ele.clientWidth : 0;
}
export function isChildrenNotEmpty(record, field) {
    return isArray(record[field]) && record[field].length;
}
export function deepCloneData(data, childrenColumnName) {
    function travel(data) {
        if (!data) {
            return [];
        }
        var newData = [];
        data.forEach(function (d) {
            // case: [[], []]
            // case: ['', '']
            // case: [1, 2]
            if (!isObject(d)) {
                newData.push(d);
            }
            else {
                var _d = __assign({}, d);
                _d.__ORIGIN_DATA = d;
                var children = _d[childrenColumnName];
                if (isObject(_d) && children && isArray(children)) {
                    _d[childrenColumnName] = travel(children);
                }
                newData.push(_d);
            }
        });
        return newData;
    }
    return travel(data);
}
export function getOriginData(data) {
    if (isObject(data)) {
        return data.__ORIGIN_DATA;
    }
    if (!data || !isArray(data)) {
        return data;
    }
    return data.map(function (d) {
        if (!isObject(d) || !('__ORIGIN_DATA' in d)) {
            return d;
        }
        return d.__ORIGIN_DATA;
    });
}
export function getSelectedKeys(record, checked, checkedRowKeys, _indeterminateKeys, getRowKey, childrenColumnName, checkConnected) {
    if (checkedRowKeys === void 0) { checkedRowKeys = []; }
    if (_indeterminateKeys === void 0) { _indeterminateKeys = []; }
    var selectedRowKeys = new Set(checkedRowKeys);
    var indeterminateKeys = new Set(_indeterminateKeys);
    function loop(record) {
        if (checked) {
            selectedRowKeys.add(getRowKey(record));
            indeterminateKeys.delete(getRowKey(record));
        }
        else {
            selectedRowKeys.delete(getRowKey(record));
        }
        if (isArray(record[childrenColumnName])) {
            record[childrenColumnName].forEach(function (child) {
                loop(child);
            });
        }
    }
    if (!checkConnected) {
        if (checked) {
            selectedRowKeys.add(getRowKey(record));
        }
        else {
            selectedRowKeys.delete(getRowKey(record));
        }
    }
    else {
        loop(record);
        updateParent(record, selectedRowKeys, indeterminateKeys, getRowKey, childrenColumnName);
    }
    return {
        selectedRowKeys: __spreadArray([], __read(selectedRowKeys), false),
        indeterminateKeys: __spreadArray([], __read(indeterminateKeys), false),
    };
}
export function getSelectedKeysByData(flattenData, checkedKeys, getRowKey, childrenColumnName, checkConnected) {
    if (checkedKeys === void 0) { checkedKeys = []; }
    if (!checkConnected) {
        return {
            selectedRowKeys: checkedKeys,
            indeterminateKeys: [],
        };
    }
    var selectedRowKeys = new Set(checkedKeys);
    var indeterminateKeys = new Set([]);
    function loop(record) {
        selectedRowKeys.add(getRowKey(record));
        indeterminateKeys.delete(getRowKey(record));
        if (isArray(record[childrenColumnName])) {
            record[childrenColumnName].forEach(function (child) {
                loop(child);
            });
        }
    }
    checkedKeys.forEach(function (key) {
        var record = flattenData.find(function (d) { return getRowKey(d) === key; });
        if (!isUndefined(record) && !isNull(record)) {
            loop(record);
            updateParent(record, selectedRowKeys, indeterminateKeys, getRowKey, childrenColumnName);
        }
    });
    return {
        selectedRowKeys: __spreadArray([], __read(selectedRowKeys), false),
        indeterminateKeys: __spreadArray([], __read(indeterminateKeys), false),
    };
}
function updateParent(record, selectedKeys, indeterminateKeys, getRowKey, childrenColumnName) {
    if (record.__INTERNAL_PARENT) {
        var parentKey_1 = getRowKey(record.__INTERNAL_PARENT);
        if (isArray(record.__INTERNAL_PARENT[childrenColumnName])) {
            var total = record.__INTERNAL_PARENT[childrenColumnName].length;
            var len_1 = 0;
            var flag_1 = false;
            record.__INTERNAL_PARENT[childrenColumnName].forEach(function (c) {
                if (selectedKeys.has(getRowKey(c))) {
                    len_1 += 1;
                }
                if (indeterminateKeys.has(getRowKey(c))) {
                    indeterminateKeys.add(parentKey_1);
                    flag_1 = true;
                }
            });
            if (total === len_1) {
                selectedKeys.add(parentKey_1);
                indeterminateKeys.delete(parentKey_1);
            }
            else if (len_1 > 0 && total > len_1) {
                selectedKeys.delete(parentKey_1);
                indeterminateKeys.add(parentKey_1);
            }
            else if (len_1 === 0) {
                selectedKeys.delete(parentKey_1);
                if (!flag_1) {
                    indeterminateKeys.delete(parentKey_1);
                }
            }
        }
        updateParent(record.__INTERNAL_PARENT, selectedKeys, indeterminateKeys, getRowKey, childrenColumnName);
    }
}
export function getSorterFn(sorter) {
    if (typeof sorter === 'function') {
        return sorter;
    }
    if (typeof sorter === 'object' && typeof sorter.compare === 'function') {
        return sorter.compare;
    }
    return null;
}
export function getSorterPriority(sorter) {
    if (typeof sorter === 'object' && typeof sorter.multiple === 'number') {
        return sorter.multiple;
    }
}
