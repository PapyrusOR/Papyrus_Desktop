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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React from 'react';
export var PROPS_NEED_TO_BE_PASSED_IN_SUBMENU = ['popup', 'triggerProps', 'selectable'];
// Expand MenuGroup to get an array only contains MenuItem and SubMenu
var flatMenuGroup = function (children) {
    var validMenuItems = [];
    React.Children.forEach(children, function (item) {
        var _a;
        var menuType = (_a = item === null || item === void 0 ? void 0 : item.type) === null || _a === void 0 ? void 0 : _a.menuType;
        if (menuType === 'MenuItem' || menuType === 'SubMenu') {
            validMenuItems.push(item);
        }
        else if (menuType === 'MenuGroup') {
            validMenuItems = validMenuItems.concat(flatMenuGroup(item.props.children));
        }
    });
    return validMenuItems;
};
export var generateInfoMap = function (children, keyPath, result) {
    if (keyPath === void 0) { keyPath = []; }
    if (result === void 0) { result = {}; }
    var validChildrenList = flatMenuGroup(children);
    validChildrenList.forEach(function (item, index) {
        var _a;
        var _b, _c;
        var key = item.key;
        var menuType = item.type.menuType;
        var _keyPath = __spreadArray([key], __read(keyPath), false);
        var info = {
            keyPath: [],
            prev: ((_b = validChildrenList[index - 1]) === null || _b === void 0 ? void 0 : _b.key) || null,
            next: ((_c = validChildrenList[index + 1]) === null || _c === void 0 ? void 0 : _c.key) || null,
        };
        if (index === 0 || index === validChildrenList.length - 1) {
            var parentKey = _keyPath[1];
            var propertyName = index === 0 ? 'firstChild' : 'lastChild';
            if (parentKey) {
                result[parentKey] = __assign(__assign({}, result[parentKey]), (_a = {}, _a[propertyName] = key, _a));
            }
        }
        switch (menuType) {
            case 'SubMenu':
                info.keyPath = _keyPath;
                generateInfoMap(item.props.children, _keyPath, result);
                break;
            case 'MenuItem':
                info.keyPath = _keyPath;
                info.disabled = item.props.disabled;
                break;
            default:
                break;
        }
        result[key] = __assign(__assign({}, result[key]), info);
    });
    return result;
};
export var processChildren = function (children, props) {
    return React.Children.map(children, function (item, index) {
        if (!item || !item.props) {
            return item;
        }
        var isHTMLElement = typeof item.type === 'string';
        var isMenuSubComponent = item.type && item.type.menuType;
        // 处理 <div> 包裹 MenuItem 之类的情况
        if (!isMenuSubComponent && item.props.children) {
            var _props = isHTMLElement ? {} : props;
            var itemChildrenList = processChildren(item.props.children, props);
            return React.cloneElement(item, __assign(__assign({}, _props), { _key: item.key, children: itemChildrenList.length === 1 ? itemChildrenList[0] : itemChildrenList }));
        }
        return isHTMLElement
            ? item
            : React.cloneElement(item, __assign(__assign(__assign({}, props), item.props), { _key: item.key || "$menu-" + index }));
    });
};
export function isChildrenSelected(children, keys) {
    var find = false;
    function loop(_children) {
        if (!_children || find) {
            return;
        }
        React.Children.forEach(_children, function (c) {
            if (c && c.props && c.type && !find) {
                var menuType = c.type.menuType;
                var selectable = c.props.selectable;
                if (menuType === 'MenuItem') {
                    find = keys.indexOf(c.key) !== -1;
                }
                else if (menuType === 'SubMenu' && selectable) {
                    find = keys.indexOf(c.key) !== -1;
                }
                if (!find && c.props.children) {
                    loop(c.props.children);
                }
            }
        });
    }
    loop(children);
    return find;
}
