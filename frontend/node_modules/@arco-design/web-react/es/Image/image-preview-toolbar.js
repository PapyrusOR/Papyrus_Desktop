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
import React, { forwardRef } from 'react';
import cs from '../_util/classNames';
import IconMore from '../../icon/react-icon/IconMore';
import Tooltip from '../Tooltip';
import { TriggerForToolbar } from './trigger-for-toolbar';
var ImagePreviewToolbar = function (props, ref) {
    var _a;
    var prefixCls = props.prefixCls, previewPrefixCls = props.previewPrefixCls, _b = props.simple, simple = _b === void 0 ? false : _b, _c = props.actions, actions = _c === void 0 ? [] : _c, _d = props.actionsLayout, actionsLayout = _d === void 0 ? [] : _d, _e = props.defaultActions, defaultActions = _e === void 0 ? [] : _e;
    // Filter based on layout
    var actionsLayoutSet = new Set(actionsLayout);
    var filterWithLayout = function (item) { return actionsLayoutSet.has(item.key); };
    var filteredActions = __spreadArray(__spreadArray([], __read(defaultActions.filter(filterWithLayout)), false), __read(actions.filter(filterWithLayout)), false);
    var extraActions = actions.filter(function (item) { return !actionsLayoutSet.has(item.key); });
    // Sort by layout
    var resultActions = filteredActions.sort(function (pre, cur) {
        var preIndex = actionsLayout.indexOf(pre.key);
        var curIndex = actionsLayout.indexOf(cur.key);
        return preIndex > curIndex ? 1 : -1;
    });
    if (actionsLayoutSet.has('extra')) {
        var extraIndex = actionsLayout.indexOf('extra');
        resultActions.splice.apply(resultActions, __spreadArray([extraIndex, 0], __read(extraActions), false));
    }
    var renderAction = function (itemData, renderName) {
        var _a;
        if (renderName === void 0) { renderName = false; }
        var content = itemData.content, disabled = itemData.disabled, key = itemData.key, name = itemData.name, getContainer = itemData.getContainer, onClick = itemData.onClick, rest = __rest(itemData, ["content", "disabled", "key", "name", "getContainer", "onClick"]);
        var action = (React.createElement("div", __assign({ className: cs(previewPrefixCls + "-toolbar-action", (_a = {},
                _a[previewPrefixCls + "-toolbar-action-disabled"] = disabled,
                _a)), key: key, onClick: function (e) {
                if (!disabled && onClick) {
                    onClick(e);
                }
            }, onMouseDown: function (e) {
                // To solve the problem that tooltip is selected when button is quickly clicked
                e.preventDefault();
            } }, rest),
            content && React.createElement("span", { className: previewPrefixCls + "-toolbar-action-content" }, content),
            renderName && name && (React.createElement("span", { className: previewPrefixCls + "-toolbar-action-name" }, name))));
        if (getContainer) {
            return getContainer(action);
        }
        return action;
    };
    if (!resultActions.length)
        return null;
    var actionList = resultActions.map(function (item) {
        var action = renderAction(item, simple);
        if (!simple && item.name && !item.getContainer) {
            return (React.createElement(Tooltip, { content: item.name, key: item.key }, action));
        }
        return action;
    });
    return (React.createElement("div", { ref: ref, className: cs(previewPrefixCls + "-toolbar", (_a = {},
            _a[previewPrefixCls + "-toolbar-simple"] = simple,
            _a), props.className), style: props.style },
        simple && (React.createElement(TriggerForToolbar, { prefixCls: prefixCls, className: previewPrefixCls + "-trigger", popup: function () { return React.createElement("div", null, actionList); } }, renderAction({
            key: 'trigger',
            content: (React.createElement("span", null,
                React.createElement(IconMore, null))),
        }))),
        !simple && actionList));
};
export default forwardRef(ImagePreviewToolbar);
