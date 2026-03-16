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
import React, { forwardRef, useContext, useEffect } from 'react';
import SubMenuInline from './inline';
import SubMenuPop from './pop';
import MenuContext from '../context';
function SubMenu(props, ref) {
    var children = props.children, popup = props.popup, level = props.level;
    var _a = useContext(MenuContext), mode = _a.mode, collapse = _a.collapse, inDropdown = _a.inDropdown, collectInlineMenuKeys = _a.collectInlineMenuKeys;
    var forcePopup = !!(typeof popup === 'function' ? popup(level) : popup);
    var mergedPopup = forcePopup || collapse || inDropdown || mode !== 'vertical';
    var MergedMenu = mergedPopup ? SubMenuPop : SubMenuInline;
    useEffect(function () {
        collectInlineMenuKeys(props._key);
        return function () {
            collectInlineMenuKeys(props._key, true);
        };
    }, []);
    return (React.createElement(MergedMenu, __assign({ forwardedRef: ref }, props), children));
}
var ForwardRefSubMenu = forwardRef(SubMenu);
var SubMenuComponent = ForwardRefSubMenu;
SubMenuComponent.displayName = 'SubMenu';
SubMenuComponent.menuType = 'SubMenu';
export default SubMenuComponent;
