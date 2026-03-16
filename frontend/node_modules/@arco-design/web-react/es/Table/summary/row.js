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
import React, { useContext } from 'react';
import get from 'lodash/get';
import { SummaryContext } from './context';
import cs from '../../_util/classNames';
import { ConfigContext } from '../../ConfigProvider';
function Row(props) {
    var rtl = useContext(ConfigContext).rtl;
    var _a = useContext(SummaryContext), columns = _a.columns, stickyOffsets = _a.stickyOffsets, stickyClassNames = _a.stickyClassNames, prefixCls = _a.prefixCls;
    var children = props.children, rest = __rest(props, ["children"]);
    var colSpans = React.Children.map(children, function (child) { return child.props.colSpan || 1; });
    var element = React.Children.map(children, function (child, index) {
        var _a, _b;
        var _c, _d;
        var childElement = child;
        // childElement?.props?.$$ArcoTableSummaryCell: Compatible Cell.defaultProps.$$ArcoTableSummaryCell
        var isSummaryCell = get(childElement, 'type.__ARCO_TABLE_SUMMARY_CELL__') ||
            get(childElement, 'props.$$ArcoTableSummaryCell');
        var childStyle = (_c = childElement === null || childElement === void 0 ? void 0 : childElement.props) === null || _c === void 0 ? void 0 : _c.style;
        var childClassName = (_d = childElement === null || childElement === void 0 ? void 0 : childElement.props) === null || _d === void 0 ? void 0 : _d.className;
        var prevAllColSpan = colSpans.slice(0, index).reduce(function (p, n) { return p + n; }, 0);
        var stickyIndex = prevAllColSpan;
        var stickyStyle = columns[stickyIndex].fixed === 'left'
            ? (_a = {}, _a[rtl ? 'right' : 'left'] = stickyOffsets[stickyIndex], _a) : columns[stickyIndex].fixed === 'right'
            ? (_b = {}, _b[rtl ? 'left' : 'right'] = stickyOffsets[stickyIndex], _b) : {};
        var stickyClassName = columns[stickyIndex].fixed === 'left' || columns[stickyIndex].fixed === 'right'
            ? stickyClassNames[stickyIndex]
            : '';
        return isSummaryCell
            ? React.cloneElement(childElement, __assign(__assign({}, childElement.props), { className: cs(prefixCls + "-td", stickyClassName, childClassName), style: __assign(__assign({}, childStyle), stickyStyle) }))
            : child;
    });
    return React.createElement("tr", __assign({}, rest), element);
}
export default Row;
