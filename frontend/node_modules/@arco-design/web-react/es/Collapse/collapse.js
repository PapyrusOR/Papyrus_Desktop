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
import React, { createContext, useContext } from 'react';
import { isFunction } from '../_util/is';
import cs from '../_util/classNames';
import CollapseItem from './item';
import omit from '../_util/omit';
import { ConfigContext } from '../ConfigProvider';
import IconCaretRight from '../../icon/react-icon/IconCaretRight';
import useMergeValue from '../_util/hooks/useMergeValue';
import IconCaretLeft from '../../icon/react-icon/IconCaretLeft';
import useMergeProps from '../_util/hooks/useMergeProps';
var getActiveKeys = function (keys, accordion) {
    var res = [].concat(keys);
    if (accordion) {
        return res.slice(0, 1);
    }
    return res;
};
var defaultProps = {
    bordered: true,
    lazyload: true,
    expandIconPosition: 'left',
};
export var CollapseContext = createContext({
    expandIconPosition: 'left',
    expandIcon: React.createElement(IconCaretRight, null),
    activeKeys: [],
    onToggle: function () { },
});
function Collapse(baseProps, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Collapse);
    var _c = __read(useMergeValue([], {
        defaultValue: 'defaultActiveKey' in props
            ? getActiveKeys(props.defaultActiveKey, props.accordion)
            : undefined,
        value: 'activeKey' in props ? getActiveKeys(props.activeKey, props.accordion) : undefined,
    }), 2), activeKeys = _c[0], setActiveKeys = _c[1];
    var children = props.children, className = props.className, style = props.style, bordered = props.bordered, lazyload = props.lazyload, expandIcon = props.expandIcon, expandIconPosition = props.expandIconPosition, destroyOnHide = props.destroyOnHide, accordion = props.accordion, triggerRegion = props.triggerRegion, onChange = props.onChange, rest = __rest(props, ["children", "className", "style", "bordered", "lazyload", "expandIcon", "expandIconPosition", "destroyOnHide", "accordion", "triggerRegion", "onChange"]);
    var prefixCls = getPrefixCls('collapse');
    var onItemClick = function (key, e) {
        var newActiveKeys = __spreadArray([], __read((activeKeys || [])), false);
        var index = activeKeys === null || activeKeys === void 0 ? void 0 : activeKeys.indexOf(key);
        if (index > -1) {
            newActiveKeys.splice(index, 1);
        }
        else if (accordion) {
            newActiveKeys = [key];
        }
        else {
            newActiveKeys.push(key);
        }
        if (!('activeKey' in props)) {
            setActiveKeys(newActiveKeys);
        }
        isFunction(onChange) && onChange(key, newActiveKeys, e);
    };
    return (React.createElement(CollapseContext.Provider, { value: {
            activeKeys: activeKeys,
            triggerRegion: triggerRegion,
            lazyload: lazyload,
            destroyOnHide: destroyOnHide,
            expandIconPosition: expandIconPosition,
            onToggle: onItemClick,
            expandIcon: 'expandIcon' in props ? (expandIcon) : expandIconPosition === 'right' ? (React.createElement(IconCaretLeft, null)) : (React.createElement(IconCaretRight, null)),
        } },
        React.createElement("div", __assign({ ref: ref }, omit(rest, ['activeKey', 'defaultActiveKey']), { className: cs(prefixCls, prefixCls + "-" + (bordered ? 'border' : 'borderless'), (_a = {}, _a[prefixCls + "-rtl"] = rtl, _a), className), style: style }), children)));
}
var ForwardRefCollapse = React.forwardRef(Collapse);
var CollapseComponent = ForwardRefCollapse;
CollapseComponent.displayName = 'Collapse';
CollapseComponent.Item = CollapseItem;
export default CollapseComponent;
