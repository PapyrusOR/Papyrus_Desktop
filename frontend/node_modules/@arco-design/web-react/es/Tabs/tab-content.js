import React, { useContext } from 'react';
import cs from '../_util/classNames';
import { TabsContext } from './tabs';
import { ConfigContext } from '../ConfigProvider';
export default function TabContent(props) {
    var _a;
    var animation = props.animation, activeTab = props.activeTab, prefixCls = props.prefixCls, paneChildren = props.paneChildren, direction = props.direction, lazyload = props.lazyload, destroyOnHide = props.destroyOnHide;
    var activeIndex = paneChildren.findIndex(function (p) { return p.key === activeTab; });
    var ctxProps = useContext(TabsContext);
    var rtl = useContext(ConfigContext).rtl;
    if (paneChildren.every(function (x) {
        return (x === null || x === void 0 ? void 0 : x.props) && (!('children' in x.props) || x.props.children === null);
    })) {
        return null;
    }
    var classNamesContentInner = cs(prefixCls + "-content-inner", (_a = {},
        _a[prefixCls + "-animation"] = animation,
        _a));
    return (React.createElement("div", { className: prefixCls + "-content " + prefixCls + "-content-" + direction },
        React.createElement("div", { className: classNamesContentInner, style: rtl ? { marginRight: "-" + activeIndex * 100 + "%" } : { marginLeft: "-" + activeIndex * 100 + "%" } }, paneChildren.map(function (child, index) {
            var _a;
            var _b = ctxProps.getIdPrefix(index), tabpane = _b.tabpane, tab = _b.tab;
            var mergedDestroyOnHide = 'destroyOnHide' in child.props ? child.props.destroyOnHide : destroyOnHide;
            var isActive = child.key === activeTab;
            return (React.createElement("div", { key: child.key, className: cs(prefixCls + "-content-item", (_a = {},
                    _a[prefixCls + "-content-item-active"] = isActive,
                    _a)), role: "tabpanel", id: tabpane, "aria-hidden": isActive ? undefined : true, tabIndex: isActive ? 0 : -1, "aria-labelledby": tab }, activeIndex !== index && mergedDestroyOnHide
                ? null
                : React.cloneElement(child, {
                    lazyload: lazyload,
                    isActive: isActive,
                })));
        }))));
}
