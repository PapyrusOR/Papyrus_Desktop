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
import React, { useContext, useState } from 'react';
import cs from '../../_util/classNames';
import IconRight from '../../../icon/react-icon/IconRight';
import IconLeft from '../../../icon/react-icon/IconLeft';
import IconDown from '../../../icon/react-icon/IconDown';
import { isChildrenSelected } from '../util';
import omit from '../../_util/omit';
import Dropdown from '../../Dropdown';
import Menu from '../index';
import MenuIndent from '../indent';
import MenuContext from '../context';
import { ConfigContext } from '../../ConfigProvider';
import { ArrowLeft, ArrowRight, Enter } from '../../_util/keycode';
import useId from '../../_util/hooks/useId';
var SubMenuPop = function (props) {
    var _a;
    var _key = props._key, children = props.children, style = props.style, className = props.className, title = props.title, level = props.level, selectable = props.selectable, forwardedRef = props.forwardedRef, propTriggerProps = props.triggerProps, rest = __rest(props, ["_key", "children", "style", "className", "title", "level", "selectable", "forwardedRef", "triggerProps"]);
    var _b = useContext(MenuContext), menuId = _b.id, prefixCls = _b.prefixCls, mode = _b.mode, inDropdown = _b.inDropdown, levelIndent = _b.levelIndent, _c = _b.selectedKeys, selectedKeys = _c === void 0 ? [] : _c, icons = _b.icons, contextTriggerProps = _b.triggerProps, onClickSubMenu = _b.onClickSubMenu, onClickMenuItem = _b.onClickMenuItem;
    var rtl = useContext(ConfigContext).rtl;
    var triggerProps = __assign(__assign({}, contextTriggerProps), propTriggerProps);
    var _d = __read(useState(false), 2), popupVisible = _d[0], setPopupVisible = _d[1];
    var baseClassName = prefixCls + "-pop";
    var isSelected = selectable && selectedKeys.indexOf(props._key) > -1;
    var needPopOnBottom = mode === 'horizontal' && !inDropdown;
    // Unique ID of this instance
    var instanceId = useId(menuId + "-submenu-pop-");
    var renderSuffix = function () {
        var MergedIconRight = icons && icons.popArrowRight ? icons.popArrowRight : rtl ? React.createElement(IconLeft, null) : React.createElement(IconRight, null);
        var MergedIconDown = icons && icons.horizontalArrowDown ? icons.horizontalArrowDown : React.createElement(IconDown, null);
        return (React.createElement("span", { className: prefixCls + "-icon-suffix" }, needPopOnBottom ? MergedIconDown : MergedIconRight));
    };
    var hasSelectedStatus = isChildrenSelected(children, selectedKeys) || isSelected;
    var popPosition = rtl ? ['br', 'lt'] : ['bl', 'rt'];
    var subMenuClickHandler = function (event) {
        onClickSubMenu(_key, level, 'pop');
        selectable && onClickMenuItem(_key, event);
    };
    return (React.createElement(Dropdown, { trigger: "hover", popupVisible: popupVisible, onVisibleChange: setPopupVisible, droplist: React.createElement(Menu, { id: instanceId, selectedKeys: selectedKeys, onClickMenuItem: function (key, event) {
                onClickMenuItem(key, event);
                setPopupVisible(false);
            } }, children), triggerProps: __assign({ position: needPopOnBottom ? popPosition[0] : popPosition[1], showArrow: true, autoAlignPopupMinWidth: true, classNames: 'fadeIn', duration: 100, mouseEnterDelay: 50, mouseLeaveDelay: 50, className: cs(baseClassName + "-trigger", triggerProps && triggerProps.className) }, omit(triggerProps, ['className'])) },
        React.createElement("div", __assign({ tabIndex: 0, "aria-haspopup": true, "aria-expanded": popupVisible, "aria-controls": instanceId, ref: forwardedRef, style: style, className: cs(baseClassName, baseClassName + "-header", (_a = {},
                _a[prefixCls + "-selected"] = hasSelectedStatus,
                _a), className), onClick: subMenuClickHandler, onKeyDown: function (event) {
                var keyCode = event.keyCode || event.which;
                if (keyCode === Enter.code) {
                    subMenuClickHandler(event);
                }
                else if (keyCode === ArrowLeft.code) {
                    setPopupVisible(false);
                }
                else if (keyCode === ArrowRight.code) {
                    setPopupVisible(true);
                }
            } }, omit(rest, ['key', 'popup'])),
            React.createElement(MenuIndent, { prefixCls: prefixCls, levelIndent: levelIndent, level: level }),
            title,
            renderSuffix(),
            hasSelectedStatus && mode === 'horizontal' ? (React.createElement("div", { className: prefixCls + "-selected-label" })) : null)));
};
export default SubMenuPop;
