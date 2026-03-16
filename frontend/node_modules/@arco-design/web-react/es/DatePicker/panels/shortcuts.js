import React, { forwardRef } from 'react';
import Button from '../../Button';
import { isArray } from '../../_util/is';
function Shortcuts(props, ref) {
    var prefixCls = props.prefixCls, _a = props.shortcuts, shortcuts = _a === void 0 ? [] : _a, onSelectNow = props.onSelectNow, nowText = props.nowText, showNowBtn = props.showNowBtn, showTime = props.showTime, onMouseEnterShortcut = props.onMouseEnterShortcut, onMouseLeaveShortcut = props.onMouseLeaveShortcut;
    function onMouseEnter(shortcut) {
        onMouseEnterShortcut && onMouseEnterShortcut(shortcut);
    }
    function onMouseLeave(shortcut) {
        onMouseLeaveShortcut && onMouseLeaveShortcut(shortcut);
    }
    function onClick(shortcut, e) {
        var onSelectShortcut = props.onSelectShortcut;
        onSelectShortcut && onSelectShortcut(shortcut, e);
    }
    var hasShortcuts = isArray(shortcuts) && shortcuts.length > 0;
    var shouldShowNowBtn = showNowBtn && showTime && !hasShortcuts;
    return (React.createElement("div", { ref: ref, className: prefixCls + "-shortcuts" },
        shouldShowNowBtn && (React.createElement(Button, { size: "mini", onClick: onSelectNow }, nowText)),
        hasShortcuts &&
            shortcuts.map(function (shortcut, index) {
                return (React.createElement(Button, { key: index, size: "mini", onMouseEnter: function () { return onMouseEnter(shortcut); }, onMouseLeave: function () { return onMouseLeave(shortcut); }, onClick: function (e) { return onClick(shortcut, e); } }, shortcut.text));
            })));
}
export default forwardRef(Shortcuts);
