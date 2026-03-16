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
import React, { forwardRef, useContext, useEffect, useMemo } from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import useMergeProps from '../_util/hooks/useMergeProps';
import { useResponsiveState } from './hooks/useResponsiveState';
import { GridContext, GridDataCollectorContext } from './context';
import { resolveItemData } from './utils';
import { isFunction, isString } from '../_util/is';
var defaultProps = {
    suffix: false,
    offset: 0,
    span: 1,
};
function GridItem(baseProps, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig['Grid.GridItem']);
    var children = props.children, className = props.className, style = props.style, propOffset = props.offset, propSpan = props.span, computedIndex = props.__index__;
    var gridContext = useContext(GridContext);
    var _c = useContext(GridDataCollectorContext), collectItemData = _c.collectItemData, removeItemData = _c.removeItemData;
    var colGap = gridContext.colGap, cols = gridContext.cols, displayIndexList = gridContext.displayIndexList, overflow = gridContext.overflow;
    var offset = useResponsiveState(propOffset, 0);
    var span = useResponsiveState(propSpan, 1);
    var prefixCls = getPrefixCls('grid-item');
    var visible = displayIndexList === null || displayIndexList === void 0 ? void 0 : displayIndexList.includes(computedIndex);
    var mergeClassName = (_a = {},
        _a["" + prefixCls] = true,
        _a[prefixCls + "-rtl"] = rtl,
        _a);
    var classNames = cs(mergeClassName, className);
    var itemData = useMemo(function () {
        return resolveItemData(gridContext.cols, {
            suffix: !!props.suffix,
            span: span,
            offset: offset,
        });
    }, [gridContext.cols, props.suffix, span, offset]);
    useEffect(function () {
        collectItemData(computedIndex, itemData);
        return function () {
            removeItemData(computedIndex);
        };
    }, [computedIndex, itemData]);
    var offsetStyle = useMemo(function () {
        var offset = itemData.offset, span = itemData.span;
        if (offset > 0) {
            var oneSpan = "(100% - " + colGap * (span - 1) + "px) / " + span;
            return {
                marginLeft: "calc((" + oneSpan + " * " + offset + ") + " + colGap * offset + "px)",
            };
        }
        return {};
    }, [itemData, colGap]);
    var columnStart = useMemo(function () {
        var suffix = itemData.suffix, span = itemData.span;
        if (suffix) {
            return "" + (cols - span + 1);
        }
        return "span " + span;
    }, [itemData, cols]);
    var visibleStyle = !visible || span === 0 ? { display: 'none' } : {};
    var gridItemStyle = __assign(__assign({ gridColumn: columnStart + " / span " + span }, offsetStyle), visibleStyle);
    return (React.createElement("div", { ref: ref, className: classNames, style: __assign(__assign({}, gridItemStyle), style) }, isFunction(children)
        ? children({ overflow: overflow })
        : React.Children.map(children, function (child) {
            if (child &&
                gridContext.collapsed &&
                React.isValidElement(child) &&
                !isString(child.type)) {
                // 排除原生 dom 标签，避免 overflow 属性透传到 dom 标签上
                return React.cloneElement(child, __assign({ overflow: overflow }, child.props));
            }
            return child;
        })));
}
var ForwardRefGridItem = forwardRef(GridItem);
var GridItemComponent = ForwardRefGridItem;
GridItemComponent.displayName = 'GridItem';
GridItemComponent.__ARCO_GRID_ITEM__ = true;
export default GridItemComponent;
