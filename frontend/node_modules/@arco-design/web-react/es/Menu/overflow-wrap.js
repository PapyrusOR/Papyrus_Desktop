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
import React, { useState, useRef, useContext } from 'react';
import SubMenu from './sub-menu';
import { getStyle } from '../_util/style';
import MenuContext from './context';
import ResizeObserver from '../_util/resizeObserver';
import cs from '../_util/classNames';
var OVERFLOW_THRESHOLD = 5;
function getNodeWidth(node) {
    // getBoundingClientRect will get a result like 20.45
    // Use Math.ceil to avoid menu item wrap in specific menu-width
    return node && Math.ceil(+node.getBoundingClientRect().width);
}
function translatePxToNumber(str) {
    var result = Number(str.replace('px', ''));
    return isNaN(result) ? 0 : result;
}
var OverflowWrap = function (props) {
    var children = props.children, _a = props.ellipsisText, ellipsisText = _a === void 0 ? '···' : _a, onEllipsisChange = props.onEllipsisChange;
    var prefixCls = useContext(MenuContext).prefixCls;
    var refUl = useRef(null);
    var _b = __read(useState(null), 2), lastVisibleIndex = _b[0], setLastVisibleIndex = _b[1];
    var overflowSubMenuClass = prefixCls + "-overflow-sub-menu";
    var overflowMenuItemClass = prefixCls + "-overflow-hidden-menu-item";
    var overflowSubMenuMirrorClass = prefixCls + "-overflow-sub-menu-mirror";
    var tryUpdateEllipsisStatus = function (_lastVisibleIndex) {
        if (_lastVisibleIndex !== lastVisibleIndex) {
            var childNodes = React.Children.toArray(children);
            var noOverflow = _lastVisibleIndex === null;
            onEllipsisChange === null || onEllipsisChange === void 0 ? void 0 : onEllipsisChange({
                lastVisibleIndex: noOverflow ? childNodes.length - 1 : _lastVisibleIndex,
                overflowNodes: noOverflow ? [] : childNodes.slice(_lastVisibleIndex + 1),
            });
            setLastVisibleIndex(_lastVisibleIndex);
        }
    };
    function computeLastVisibleIndex() {
        if (!refUl.current) {
            return;
        }
        var ulElement = refUl.current;
        var maxWidth = getNodeWidth(ulElement) - OVERFLOW_THRESHOLD;
        var childNodeList = [].slice.call(ulElement.children);
        var menuItemIndex = 0;
        var currentItemRight = 0;
        var overflowSubMenuWidth = 0;
        // 注意 childrenNodeList.length !== React.Children.count(children) 所以需要用 menuItemIndex 来标记真实的 MenuItem 下标
        for (var i = 0; i < childNodeList.length; i++) {
            var node = childNodeList[i];
            var classNames = node.className.split(' ');
            var isOverflowSubMenu = classNames.indexOf(overflowSubMenuClass) > -1;
            var isOverflowSubMenuMirror = classNames.indexOf(overflowSubMenuMirrorClass) > -1;
            // 忽略 overflowSubMenu 的宽度，其宽度测量交由 overflowSubMenuMirror
            if (isOverflowSubMenu) {
                continue;
            }
            var nodeWidth = getNodeWidth(node) +
                translatePxToNumber(getStyle(node, 'marginLeft')) +
                translatePxToNumber(getStyle(node, 'marginRight'));
            if (isOverflowSubMenuMirror) {
                overflowSubMenuWidth = nodeWidth;
                continue;
            }
            currentItemRight += nodeWidth;
            // 将要溢出的菜单项
            if (currentItemRight > maxWidth) {
                tryUpdateEllipsisStatus(
                // 判断如果将最后一个菜单项换为 ... 是否会超出宽度
                menuItemIndex - (currentItemRight - nodeWidth + overflowSubMenuWidth <= maxWidth ? 1 : 2));
                return;
            }
            menuItemIndex++;
        }
        // 全部可见
        tryUpdateEllipsisStatus(null);
    }
    var renderOverflowSubMenu = function (children, isMirror) {
        if (isMirror === void 0) { isMirror = false; }
        return (React.createElement(SubMenu, { title: React.createElement("span", null, ellipsisText), key: "arco-menu-overflow-sub-menu" + (isMirror ? '-mirror' : ''), className: isMirror ? overflowSubMenuMirrorClass : overflowSubMenuClass, children: children }));
    };
    var renderChildren = function () {
        var overflowSubMenu = null;
        var overflowSubMenuMirror = renderOverflowSubMenu(null, true);
        var originMenuItems = React.Children.map(children, function (child, index) {
            var _a, _b;
            var item = child;
            if (lastVisibleIndex !== null) {
                if (index > lastVisibleIndex) {
                    item = React.cloneElement(child, {
                        className: cs(overflowMenuItemClass, (_b = (_a = child) === null || _a === void 0 ? void 0 : _a.props) === null || _b === void 0 ? void 0 : _b.className),
                    });
                }
                if (index === lastVisibleIndex + 1) {
                    var overflowedItems = React.Children.toArray(children)
                        .slice(lastVisibleIndex + 1)
                        .map(function (child) {
                        return React.cloneElement(child, { key: child.props._key });
                    });
                    overflowSubMenu = renderOverflowSubMenu(overflowedItems);
                }
            }
            return item;
        });
        return __spreadArray(__spreadArray([overflowSubMenuMirror], __read(originMenuItems), false), [overflowSubMenu], false);
    };
    return (React.createElement(ResizeObserver, { onResize: computeLastVisibleIndex, getTargetDOMNode: function () { return refUl.current; } },
        React.createElement("div", { className: prefixCls + "-overflow-wrap", ref: refUl }, renderChildren())));
};
export default OverflowWrap;
