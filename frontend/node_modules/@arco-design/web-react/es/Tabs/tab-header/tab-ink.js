import React, { useRef, useEffect } from 'react';
import isEqualWith from 'lodash/isEqualWith';
import cs from '../../_util/classNames';
import { getRectDiff } from '../utils';
import throttleByRaf from '../../_util/throttleByRaf';
var getInkStyle = function (direction, curTitle, headerRef) {
    var style = { left: '', width: '', top: '', height: '' };
    if (curTitle) {
        var diffStyle = getRectDiff(curTitle, headerRef);
        if (direction === 'vertical') {
            style = {
                top: diffStyle.top + "px",
                height: curTitle.offsetHeight + "px",
                left: '',
                width: '',
            };
        }
        else {
            style = {
                left: diffStyle.left + "px",
                width: curTitle.offsetWidth + "px",
                top: '',
                height: '',
            };
        }
    }
    return style;
};
var TabInk = function (_a) {
    var _b;
    var prefixCls = _a.prefixCls, animation = _a.animation, disabled = _a.disabled, direction = _a.direction, getTitleRef = _a.getTitleRef, activeTab = _a.activeTab, getHeaderRef = _a.getHeaderRef, inkBarSize = _a.inkBarSize;
    var inkRef = useRef();
    var inkStyleRef = useRef();
    useEffect(function () {
        var setInkStyle = throttleByRaf(function () {
            var _a;
            var curTitle = getTitleRef(activeTab);
            var newStyle = getInkStyle(direction, curTitle, getHeaderRef('headerRef').current);
            if (newStyle && !isEqualWith(inkStyleRef.current, newStyle)) {
                inkStyleRef.current = newStyle;
                if ((_a = inkRef.current) === null || _a === void 0 ? void 0 : _a.style) {
                    Object.keys(newStyle).forEach(function (key) {
                        inkRef.current.style[key] = newStyle[key];
                    });
                }
            }
        });
        setInkStyle();
        return function () {
            setInkStyle.cancel && setInkStyle.cancel();
        };
    });
    return (React.createElement("div", { className: cs(prefixCls + "-header-ink", (_b = {},
            _b[prefixCls + "-header-ink-no-animation"] = !animation,
            _b[prefixCls + "-header-ink-disabled"] = disabled,
            _b[prefixCls + "-header-ink-custom"] = inkBarSize,
            _b)), ref: inkRef }, inkBarSize && React.createElement("div", { style: inkBarSize, className: prefixCls + "-header-ink-inner" })));
};
export default TabInk;
