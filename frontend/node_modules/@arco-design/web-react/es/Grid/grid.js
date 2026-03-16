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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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
import React, { forwardRef, useContext, useState } from 'react';
import get from 'lodash/get';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import useMergeProps from '../_util/hooks/useMergeProps';
import { useResponsiveState } from './hooks/useResponsiveState';
import { GridContext, GridDataCollectorContext } from './context';
import { setItemVisible } from './utils';
var defaultProps = {
    collapsed: false,
    collapsedRows: 1,
    cols: 24,
    colGap: 0,
    rowGap: 0,
};
function Grid(baseProps, ref) {
    var _a;
    var _b = __read(useState(new Map()), 2), itemDataMap = _b[0], setItemDataMap = _b[1];
    var _c = useContext(ConfigContext), getPrefixCls = _c.getPrefixCls, componentConfig = _c.componentConfig, rtl = _c.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Grid);
    var children = props.children, className = props.className, style = props.style, propCols = props.cols, propColGap = props.colGap, propRowGap = props.rowGap, collapsed = props.collapsed, collapsedRows = props.collapsedRows;
    var cols = useResponsiveState(propCols, 24);
    var colGap = useResponsiveState(propColGap, 0);
    var rowGap = useResponsiveState(propRowGap, 0);
    var gridStyle = {
        gap: rowGap + "px " + colGap + "px",
        gridTemplateColumns: "repeat(" + cols + ", minmax(0px, 1fr))",
    };
    var prefixCls = getPrefixCls('grid');
    var mergeClassName = (_a = {},
        _a["" + prefixCls] = true,
        _a[prefixCls + "-rtl"] = rtl,
        _a);
    var classNames = cs(mergeClassName, className);
    var getItemDataList = function () {
        var e_1, _a;
        var list = [];
        try {
            for (var _b = __values(itemDataMap.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), index = _d[0], itemData = _d[1];
                list[index] = itemData;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return list;
    };
    var itemDataList = getItemDataList();
    var displayInfo = setItemVisible({
        cols: cols,
        collapsed: collapsed,
        collapsedRows: collapsedRows,
        itemDataList: itemDataList,
    });
    return (React.createElement("div", { ref: ref, className: classNames, style: __assign(__assign({}, gridStyle), style) },
        React.createElement(GridDataCollectorContext.Provider, { value: {
                collectItemData: function (index, itemData) {
                    itemDataMap.set(index, itemData);
                    setItemDataMap(new Map(__spreadArray([], __read(itemDataMap), false)));
                },
                removeItemData: function (index) {
                    itemDataMap.delete(index);
                    setItemDataMap(new Map(__spreadArray([], __read(itemDataMap), false)));
                },
            } },
            React.createElement(GridContext.Provider, { value: {
                    cols: cols,
                    colGap: colGap,
                    collapsed: collapsed,
                    overflow: displayInfo.overflow,
                    displayIndexList: displayInfo.displayIndexList,
                } }, React.Children.map(children, function (child, index) {
                if (child) {
                    var childProps = __assign({ __index__: index }, child.props);
                    return React.cloneElement(child, childProps);
                }
                return null;
            }).filter(function (child) { return get(child, 'type.__ARCO_GRID_ITEM__'); })))));
}
var GridComponent = forwardRef(Grid);
GridComponent.displayName = 'Grid';
export default GridComponent;
