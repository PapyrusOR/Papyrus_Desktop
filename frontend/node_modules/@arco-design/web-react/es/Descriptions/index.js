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
import React, { useState, useEffect, useContext, useRef, Fragment } from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import ResponsiveObserve, { responsiveArray } from '../_util/responsiveObserve';
import { isObject, isArray, isNumber } from '../_util/is';
import useMergeProps from '../_util/hooks/useMergeProps';
var getLength = function (arr) {
    return isArray(arr) ? arr.reduce(function (p, n) { return p + (n.span || 1); }, 0) : 0;
};
var defaultProps = {
    layout: 'horizontal',
    column: 3,
    tableLayout: 'auto',
};
function Descriptions(baseProps) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig, rtl = _b.rtl, ctxSize = _b.size;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Descriptions);
    var style = props.style, className = props.className, column = props.column, title = props.title, data = props.data, border = props.border, labelStyle = props.labelStyle, valueStyle = props.valueStyle, colon = props.colon, layout = props.layout, size = props.size, tableLayout = props.tableLayout;
    var prefixCls = getPrefixCls('descriptions');
    var _c = __read(useState(), 2), screen = _c[0], setScreen = _c[1];
    var responsiveToken = useRef(null);
    useEffect(function () {
        responsiveToken.current = ResponsiveObserve.subscribe(function (screens) {
            for (var i = 0; i < responsiveArray.length; i++) {
                var breakpoint = responsiveArray[i];
                if (screens[breakpoint]) {
                    setScreen(breakpoint);
                    break;
                }
            }
        });
        return function () {
            ResponsiveObserve.unsubscribe(responsiveToken.current);
        };
    }, []);
    // get current column number
    var currentColumn = 3;
    if (isObject(column)) {
        currentColumn = column[screen] || 3;
    }
    if (isNumber(column) && column > 0) {
        currentColumn = column;
    }
    var renderData = [];
    if (isArray(data) && data.length > 0 && currentColumn) {
        data.forEach(function (d) {
            var lastOne = renderData[renderData.length - 1];
            var length = getLength(lastOne);
            if (length === 0) {
                renderData.push([
                    __assign(__assign({}, d), { span: d.span ? (d.span > currentColumn ? currentColumn : d.span) : 1 }),
                ]);
            }
            else if (length === currentColumn) {
                renderData.push([
                    __assign(__assign({}, d), { span: d.span ? (d.span > currentColumn ? currentColumn : d.span) : 1 }),
                ]);
            }
            else {
                lastOne.push(__assign(__assign({}, d), { span: d.span ? (d.span + length > currentColumn ? currentColumn - length : d.span) : 1 }));
            }
        });
        var lastOne = renderData[renderData.length - 1];
        var lastLength = getLength(lastOne);
        if (lastLength < currentColumn) {
            lastOne[lastOne.length - 1].span =
                lastOne[lastOne.length - 1].span + currentColumn - lastLength;
        }
    }
    function renderVerticalItems(d, i) {
        return (React.createElement(Fragment, { key: i },
            React.createElement("tr", { className: prefixCls + "-row" }, d.map(function (_d, _i) {
                var colSpanProps = _d.span > 1 ? { colSpan: _d.span } : {};
                return (React.createElement("td", __assign({ key: (_d.key || _i) + "_label", className: prefixCls + "-item-label" }, colSpanProps, { style: labelStyle }),
                    _d.label,
                    colon));
            })),
            React.createElement("tr", { className: prefixCls + "-row" }, d.map(function (_d, _i) {
                var colSpanProps = _d.span > 1 ? { colSpan: _d.span } : {};
                return (React.createElement("td", __assign({ key: (_d.key || _i) + "_value", className: prefixCls + "-item-value" }, colSpanProps, { style: valueStyle }), _d.value));
            }))));
    }
    function renderHorizontalItems(d, i) {
        return (React.createElement("tr", { key: i, className: prefixCls + "-row" }, d.map(function (_d, _i) {
            var colSpanProps = _d.span > 1 ? { colSpan: _d.span * 2 - 1 } : {};
            return (React.createElement(Fragment, { key: _d.key || _i },
                React.createElement("td", { className: prefixCls + "-item-label", style: labelStyle },
                    _d.label,
                    colon),
                React.createElement("td", __assign({ className: prefixCls + "-item-value" }, colSpanProps, { style: valueStyle }), _d.value)));
        })));
    }
    function renderInlineItems(d, i) {
        return (React.createElement("tr", { key: i, className: prefixCls + "-row" }, d.map(function (_d, _i) {
            var colSpanProps = _d.span > 1 ? { colSpan: _d.span } : {};
            return (React.createElement("td", __assign({ key: _d.key || _i }, colSpanProps, { className: prefixCls + "-item" }),
                React.createElement("div", { className: prefixCls + "-item-label-inline", style: labelStyle },
                    _d.label,
                    colon),
                React.createElement("div", { className: prefixCls + "-item-value-inline", style: valueStyle }, _d.value)));
        })));
    }
    function renderItems(d, i) {
        if (layout === 'inline-vertical' || layout === 'inline-horizontal') {
            return renderInlineItems(d, i);
        }
        return layout === 'vertical' ? renderVerticalItems(d, i) : renderHorizontalItems(d, i);
    }
    var classNames = cs(prefixCls, (_a = {},
        _a[prefixCls + "-border"] = border,
        _a[prefixCls + "-layout-" + layout] = layout,
        _a[prefixCls + "-size-" + (size || ctxSize)] = size || ctxSize,
        _a[prefixCls + "-table-layout-fixed"] = tableLayout === 'fixed',
        _a[prefixCls + "-rtl"] = rtl,
        _a), className);
    return (React.createElement("div", { className: classNames, style: style },
        title && React.createElement("div", { className: prefixCls + "-title" }, title),
        React.createElement("div", { className: prefixCls + "-body" },
            React.createElement("table", { className: prefixCls + "-table", cellPadding: 0, cellSpacing: 0 },
                React.createElement("tbody", null, renderData.map(function (d, i) { return renderItems(d, i); }))))));
}
Descriptions.displayName = 'Descriptions';
export default Descriptions;
