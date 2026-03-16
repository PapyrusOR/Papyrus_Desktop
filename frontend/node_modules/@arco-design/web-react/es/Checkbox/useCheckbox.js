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
import { useState, useMemo } from 'react';
import { isArray } from '../_util/is';
var useCheckbox = function (values, defaultSelected) {
    var _a = __read(useState(__spreadArray([], __read((defaultSelected || [])), false)), 2), selected = _a[0], setSelected = _a[1];
    var _b = useMemo(function () {
        // 判断是否选中
        var isSelected = function (value) {
            return selected.indexOf(value) > -1;
        };
        // 设置选中
        var setValueSelected = function (value, selectStatus) {
            var list = isArray(value) ? value : [value];
            var newSelected;
            if (selectStatus) {
                newSelected = __spreadArray(__spreadArray([], __read(selected), false), __read(list), false);
            }
            else {
                newSelected = selected.filter(function (x) { return list.indexOf(x) === -1; });
            }
            setSelected(Array.from(new Set(newSelected)));
        };
        return {
            isSelected: isSelected,
            setValueSelected: setValueSelected,
        };
    }, [selected]), isSelected = _b.isSelected, setValueSelected = _b.setValueSelected;
    var _c = useMemo(function () {
        var selectAll = function () {
            setSelected(values);
        };
        var unSelectAll = function () {
            setSelected([]);
        };
        var toggle = function (value) {
            if (value === void 0) { value = values; }
            var list = isArray(value) ? value : [value];
            var newSelected = __spreadArray([], __read(selected), false);
            list.forEach(function (x) {
                var index = newSelected.indexOf(x);
                if (index > -1) {
                    newSelected.splice(index, 1);
                }
                else {
                    newSelected.push(x);
                }
            });
            setSelected(newSelected);
        };
        var isAllSelected = function () {
            return values.every(function (x) { return isSelected(x); });
        };
        /**
         * 是否部分选中
         */
        var isPartialSelected = function () {
            return values.some(function (x) { return isSelected(x); }) && !isAllSelected();
        };
        return {
            selectAll: selectAll,
            unSelectAll: unSelectAll,
            toggle: toggle,
            isAllSelected: isAllSelected,
            isPartialSelected: isPartialSelected,
        };
    }, [selected, values, isSelected]), selectAll = _c.selectAll, unSelectAll = _c.unSelectAll, toggle = _c.toggle, isAllSelected = _c.isAllSelected, isPartialSelected = _c.isPartialSelected;
    return {
        selected: selected,
        setSelected: setSelected,
        setValueSelected: setValueSelected,
        selectAll: selectAll,
        unSelectAll: unSelectAll,
        toggle: toggle,
        isSelected: isSelected,
        isAllSelected: isAllSelected,
        isPartialSelected: isPartialSelected,
    };
};
export default useCheckbox;
