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
import React from 'react';
import IconClose from '../../../icon/react-icon/IconClose';
import cs from '../../_util/classNames';
import IconHover from '../../_class/icon-hover';
import { isFunction } from '../../_util/is';
import { getKeyDownEvent } from '../utils';
import { Enter } from '../../_util/keycode';
var TabHeaderTitle = function (_a, ref) {
    var _b;
    var prefixCls = _a.prefixCls, onDeleteTab = _a.onDeleteTab, tabKey = _a.tabKey, isActive = _a.isActive, onClickTab = _a.onClickTab, _c = _a.disabled, disabled = _c === void 0 ? false : _c, title = _a.title, editable = _a.editable, renderTitle = _a.renderTitle, deleteIcon = _a.deleteIcon, deleteButton = _a.deleteButton, getIdPrefix = _a.getIdPrefix, index = _a.index;
    var render = isFunction(renderTitle)
        ? renderTitle
        : function (node) {
            return node;
        };
    var handleDeleteTab = function (e) {
        e.stopPropagation();
        if (disabled)
            return;
        onDeleteTab();
    };
    var handleTabClick = function (e) {
        if (disabled)
            return;
        onClickTab(e);
    };
    return render(React.createElement("div", { ref: ref, key: tabKey, className: cs(prefixCls + "-header-title", (_b = {},
            _b[prefixCls + "-header-title-active"] = isActive,
            _b[prefixCls + "-header-title-editable"] = editable,
            _b[prefixCls + "-header-title-disabled"] = disabled,
            _b)), role: "tab", "aria-selected": isActive, tabIndex: disabled ? -1 : 0, "aria-disabled": disabled || undefined, id: getIdPrefix(index).tab, "aria-controls": getIdPrefix(index).tabpane, onClick: handleTabClick, onKeyDown: function (event) {
            var keyCode = event.keyCode || event.which;
            if (keyCode === Enter.code) {
                handleTabClick(event);
            }
        } },
        React.createElement("span", { className: prefixCls + "-header-title-text" }, title),
        editable && (React.createElement("span", __assign({ role: "button", "aria-label": "remove tab", "aria-disabled": disabled || undefined, tabIndex: disabled ? -1 : 0, className: prefixCls + "-close-icon" }, getKeyDownEvent({ onPressEnter: handleDeleteTab }), { onClick: handleDeleteTab }), deleteButton || React.createElement(IconHover, { prefix: prefixCls }, deleteIcon || React.createElement(IconClose, null))))), {
        key: tabKey,
        isActive: isActive,
        disabled: disabled,
        editable: editable,
    });
};
export default React.forwardRef(TabHeaderTitle);
