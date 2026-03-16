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
import React, { forwardRef, useContext, useEffect, useRef } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';
import cs from '../_util/classNames';
import Tooltip from '../Tooltip';
import useIsFirstRender from '../_util/hooks/useIsFirstRender';
import MenuContext from './context';
import MenuIndent from './indent';
import omit from '../_util/omit';
import { PROPS_NEED_TO_BE_PASSED_IN_SUBMENU } from './util';
import { Enter } from '../_util/keycode';
function Item(props, ref) {
    var _a;
    var _key = props._key, children = props.children, level = props.level, disabled = props.disabled, className = props.className, style = props.style, _b = props.wrapper, WrapperTagName = _b === void 0 ? 'div' : _b, onClick = props.onClick, renderItemInTooltip = props.renderItemInTooltip, rest = __rest(props, ["_key", "children", "level", "disabled", "className", "style", "wrapper", "onClick", "renderItemInTooltip"]);
    var _c = useContext(MenuContext), prefixCls = _c.prefixCls, mode = _c.mode, collapse = _c.collapse, inDropdown = _c.inDropdown, levelIndent = _c.levelIndent, selectedKeys = _c.selectedKeys, autoScrollIntoView = _c.autoScrollIntoView, scrollConfig = _c.scrollConfig, tooltipProps = _c.tooltipProps, onClickMenuItem = _c.onClickMenuItem;
    var refElement = useRef(null);
    var isFirstRender = useIsFirstRender();
    var needTextIndent = mode === 'vertical' && level > 1;
    var needTooltip = collapse && !inDropdown && level === 1;
    var isSelected = selectedKeys && ~selectedKeys.indexOf(_key);
    useEffect(function () {
        var shouldScroll = isSelected && autoScrollIntoView;
        if (refElement.current && shouldScroll) {
            // 首次渲染需要等待展开动画结束之后滚动
            setTimeout(function () {
                refElement.current &&
                    scrollIntoView(refElement.current, __assign({ behavior: 'smooth', block: 'start', scrollMode: 'if-needed', boundary: document.body }, scrollConfig));
            }, isFirstRender ? 500 : 0);
        }
    }, [isSelected, autoScrollIntoView]);
    var menuItemClickHandler = function (event) {
        if (!disabled) {
            onClickMenuItem(_key, event);
            onClick && onClick(event);
        }
    };
    var itemElement = (React.createElement(WrapperTagName, __assign({ tabIndex: disabled ? -1 : 0, role: "menuitem", ref: function (_ref) {
            ref = _ref;
            refElement.current = ref;
        }, style: style, className: cs(prefixCls + "-item", (_a = {},
            _a[prefixCls + "-disabled"] = disabled,
            _a[prefixCls + "-selected"] = isSelected,
            // 存在缩进dom
            _a[prefixCls + "-item-indented"] = needTextIndent && !collapse,
            _a), className), onClick: menuItemClickHandler, onKeyDown: function (event) {
            var keyCode = event.keyCode || event.which;
            if (keyCode === Enter.code) {
                menuItemClickHandler(event);
            }
        } }, omit(rest, ['key', '_key'].concat(PROPS_NEED_TO_BE_PASSED_IN_SUBMENU))),
        needTextIndent && !collapse ? (React.createElement(React.Fragment, null,
            React.createElement(MenuIndent, { prefixCls: prefixCls, levelIndent: levelIndent, level: level }),
            React.createElement("span", { className: prefixCls + "-item-inner", style: {
                    display: 'block',
                } }, children))) : (children),
        isSelected && mode === 'horizontal' ? (React.createElement("div", { className: prefixCls + "-selected-label" })) : null));
    return needTooltip ? (React.createElement(Tooltip, __assign({ trigger: "hover", position: "right", content: typeof renderItemInTooltip === 'function' ? renderItemInTooltip() : React.createElement("span", null, children), triggerProps: __assign({ className: prefixCls + "-item-tooltip" }, ((tooltipProps === null || tooltipProps === void 0 ? void 0 : tooltipProps.triggerProps) || {})) }, omit(tooltipProps, ['triggerProps'])), itemElement)) : (itemElement);
}
var ForwardRefItem = forwardRef(Item);
var ItemComponent = ForwardRefItem;
ItemComponent.displayName = 'MenuItem';
ItemComponent.menuType = 'MenuItem';
export default ItemComponent;
