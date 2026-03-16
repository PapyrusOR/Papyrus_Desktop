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
import React from 'react';
import cs from '../_util/classNames';
import useShowFooter from './utils/hooks/useShowFooter';
import IconMore from '../../icon/react-icon/IconMore';
import { TriggerForToolbar } from './trigger-for-toolbar';
export var ImageFooter = function (props) {
    var _a;
    var style = props.style, className = props.className, title = props.title, description = props.description, actions = props.actions, prefixCls = props.prefixCls, simple = props.simple;
    var _b = __read(useShowFooter({ title: title, description: description, actions: actions }), 3), showFooter = _b[0], showCaption = _b[1], showActions = _b[2];
    if (!showFooter)
        return null;
    var footerPrefixCls = prefixCls + "-footer";
    var classNames = cs(footerPrefixCls, className, (_a = {},
        _a[footerPrefixCls + "-with-actions"] = showActions,
        _a));
    var renderActionList = function () {
        var actionsList = (React.createElement("div", { className: prefixCls + "-actions-list" }, actions.map(function (item, index) {
            return (React.createElement("div", { className: prefixCls + "-actions-item", key: "" + index }, item));
        })));
        if (simple) {
            return (React.createElement("div", { className: prefixCls + "-actions-list" },
                React.createElement(TriggerForToolbar, { prefixCls: prefixCls, popup: function () { return actionsList; } },
                    React.createElement("div", { className: cs(prefixCls + "-actions-item", prefixCls + "-actions-item-trigger") },
                        React.createElement("span", null,
                            React.createElement(IconMore, null))))));
        }
        return actionsList;
    };
    return (React.createElement("div", { className: classNames, style: style },
        showCaption && (React.createElement("div", { className: cs(footerPrefixCls + "-block", prefixCls + "-caption") },
            title && (React.createElement("div", { className: prefixCls + "-caption-title", title: title }, title)),
            description && !simple && (React.createElement("div", { className: prefixCls + "-caption-description", title: description }, description)))),
        showActions && (React.createElement("div", { className: cs(footerPrefixCls + "-block", prefixCls + "-actions") }, renderActionList()))));
};
