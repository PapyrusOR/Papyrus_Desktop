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
import React, { useRef, useImperativeHandle, useContext, } from 'react';
import cs from '../_util/classNames';
import TabPane from './tab-pane';
import TabHeader from './tab-header/index';
import TabContent from './tab-content';
import omit from '../_util/omit';
import { ConfigContext } from '../ConfigProvider';
import { isFunction, isObject } from '../_util/is';
import useMergeValue from '../_util/hooks/useMergeValue';
import useMergeProps from '../_util/hooks/useMergeProps';
import useId from '../_util/hooks/useId';
var sizeList = ['mini', 'small', 'default', 'large'];
var getPaneChildren = function (props) {
    var children = props.children;
    var paneChildren = [];
    React.Children.forEach(children, function (child) {
        if (child && child.type && child.type.isTabPane) {
            paneChildren.push(child);
        }
    });
    return paneChildren;
};
var getTabPaneAnimation = function (props) {
    var direction = props.direction, tabPosition = props.tabPosition, animation = props.animation;
    if (direction === 'vertical' || tabPosition === 'left' || tabPosition === 'right') {
        return false;
    }
    if (isObject(animation)) {
        return 'tabPane' in animation ? animation.tabPane : false;
    }
    return animation;
};
var defaultProps = {
    tabPosition: 'top',
    type: 'line',
    overflow: 'scroll',
    showAddButton: true,
    lazyload: true,
    headerPadding: true,
    scrollPosition: 'auto',
};
export var TabsContext = React.createContext({});
function Tabs(baseProps, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, ctxSize = _b.size, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Tabs);
    var paneChildren = getPaneChildren(props);
    var tabsRef = useRef();
    var _c = __read(useMergeValue((paneChildren[0] && paneChildren[0].key), {
        defaultValue: 'defaultActiveTab' in props ? props.defaultActiveTab : undefined,
        value: 'activeTab' in props ? props.activeTab : undefined,
    }), 2), activeTab = _c[0], setActiveTab = _c[1];
    var prefixCls = getPrefixCls('tabs');
    var size = props.size || (sizeList.indexOf(ctxSize) > -1 ? ctxSize : 'default');
    var animation = props.animation, className = props.className, direction = props.direction, style = props.style, type = props.type, justify = props.justify, destroyOnHide = props.destroyOnHide, lazyload = props.lazyload, onChange = props.onChange, onClickTab = props.onClickTab, onDeleteTab = props.onDeleteTab, renderTabHeader = props.renderTabHeader, rest = __rest(props, ["animation", "className", "direction", "style", "type", "justify", "destroyOnHide", "lazyload", "onChange", "onClickTab", "onDeleteTab", "renderTabHeader"]);
    var idPrefix = useId(prefixCls + "-");
    var tabPosition = direction === 'vertical' ? 'left' : props.tabPosition;
    var tabHeaderProps = {
        animation: isObject(animation) && 'inkBar' in animation ? animation.inkBar : true,
        activeTab: activeTab,
        tabPosition: tabPosition,
        direction: ['left', 'right'].indexOf(tabPosition) > -1 ? 'vertical' : 'horizontal',
        paneChildren: paneChildren,
        onClickTab: function (key) {
            isFunction(onClickTab) && onClickTab(key);
            if (key !== activeTab) {
                if (!('activeTab' in props)) {
                    setActiveTab(key);
                }
                isFunction(onChange) && onChange(key);
            }
        },
        onDeleteTab: onDeleteTab,
        prefixCls: prefixCls,
    };
    useImperativeHandle(ref, function () { return tabsRef; }, []);
    var TabContentDom = (React.createElement(TabContent, { direction: ['left', 'right'].indexOf(tabPosition) > -1 ? 'vertical' : 'horizontal', animation: getTabPaneAnimation(props), activeTab: activeTab, paneChildren: paneChildren, prefixCls: prefixCls, destroyOnHide: destroyOnHide, lazyload: lazyload }));
    return (React.createElement("div", __assign({}, omit(rest, [
        'headerPadding',
        'tabPosition',
        'defaultActiveTab',
        'showAddButton',
        'extra',
        'onAddTab',
        'activeTab',
        'overflow',
        'editable',
        'renderTabTitle',
        'addButton',
        'deleteButton',
        'icons',
        'children',
        'size',
        'type',
        'scrollPosition',
        'offsetAlign',
    ]), { style: style, className: cs(prefixCls, prefixCls + "-" + (['left', 'right'].indexOf(tabPosition) > -1 ? 'vertical' : 'horizontal'), prefixCls + "-" + type, prefixCls + "-" + tabPosition, prefixCls + "-size-" + size, (_a = {},
            _a[prefixCls + "-justify"] = justify,
            _a[prefixCls + "-rtl"] = rtl,
            _a), className), ref: tabsRef }),
        React.createElement(TabsContext.Provider, { value: __assign(__assign({}, tabHeaderProps), { getIdPrefix: function (suffix) {
                    return {
                        tab: idPrefix && idPrefix + "-tab-" + suffix,
                        tabpane: idPrefix && idPrefix + "-panel-" + suffix,
                    };
                } }) },
            tabPosition === 'bottom' && TabContentDom,
            isFunction(renderTabHeader) ? (renderTabHeader(__assign(__assign(__assign({}, omit(props, ['children', 'style', 'className'])), { size: size }), tabHeaderProps), TabHeader)) : (React.createElement(TabHeader, __assign({}, omit(props, ['children', 'style', 'className']), { size: size }))),
            tabPosition !== 'bottom' && TabContentDom)));
}
var ForwardRefTabs = React.forwardRef(Tabs);
var TabsComponent = ForwardRefTabs;
TabsComponent.displayName = 'Tabs';
TabsComponent.TabPane = TabPane;
export default TabsComponent;
