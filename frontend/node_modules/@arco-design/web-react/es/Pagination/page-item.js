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
import React, { useContext } from 'react';
import cs from '../_util/classNames';
import IconLeft from '../../icon/react-icon/IconLeft';
import IconRight from '../../icon/react-icon/IconRight';
import IconMore from '../../icon/react-icon/IconMore';
import { ConfigContext } from '../ConfigProvider';
import useKeyboardEvent from '../_util/hooks/useKeyboardEvent';
export var StepType;
(function (StepType) {
    StepType[StepType["previous"] = 0] = "previous";
    StepType[StepType["next"] = 1] = "next";
})(StepType || (StepType = {}));
/**
 * default pager item
 */
function Pager(props) {
    var _a;
    var locale = useContext(ConfigContext).locale;
    var getKeyboardEvents = useKeyboardEvent();
    var pageNum = props.pageNum, current = props.current, rootPrefixCls = props.rootPrefixCls, pageItemStyle = props.pageItemStyle, activePageItemStyle = props.activePageItemStyle, itemRender = props.itemRender;
    var prefixCls = rootPrefixCls + "-item";
    var isActive = current === pageNum;
    var classnames = cs(prefixCls, isActive ? prefixCls + "-active" : '');
    var style = pageItemStyle;
    if (isActive) {
        style = __assign(__assign({}, style), activePageItemStyle);
    }
    var ariaCurrentProps = isActive ? { 'aria-current': true } : {};
    var onClick = function (e) {
        var pageNum = props.pageNum, onClick = props.onClick, disabled = props.disabled;
        if (e.currentTarget.dataset.active === 'true') {
            return;
        }
        e.stopPropagation();
        if (!disabled) {
            onClick && onClick(pageNum);
        }
    };
    return (React.createElement("li", __assign({ style: style, className: classnames, onClick: onClick, tabIndex: props.disabled ? -1 : 0, "aria-label": (_a = locale.Pagination.currentPage) === null || _a === void 0 ? void 0 : _a.replace('{0}', pageNum) }, getKeyboardEvents({ onPressEnter: onClick }), ariaCurrentProps), itemRender ? itemRender(pageNum, 'page', pageNum) : pageNum));
}
function getIcon(name, icons) {
    switch (name) {
        case 'prev':
            return icons && icons.prev ? icons.prev : React.createElement(IconLeft, null);
        case 'next':
            return icons && icons.next ? icons.next : React.createElement(IconRight, null);
        case 'more':
            return icons && icons.more ? icons.more : React.createElement(IconMore, null);
        default:
            return null;
    }
}
/**
 * preJump or nextJump button
 * @param props
 */
export var JumpPager = function (props) {
    var _a, _b;
    var locale = useContext(ConfigContext).locale;
    var rootPrefixCls = props.rootPrefixCls, current = props.current, allPages = props.allPages, jumpPage = props.jumpPage, icons = props.icons, disabled = props.disabled, pageItemStyle = props.pageItemStyle, itemRender = props.itemRender;
    var minCurrent = allPages > 0 ? 1 : 0;
    var nextPage = Math.min(allPages, Math.max(minCurrent, current + jumpPage));
    var prefix = rootPrefixCls + "-item " + rootPrefixCls + "-item-jumper";
    var cls = cs(prefix);
    var onClick = function () {
        !disabled && props.onClick && props.onClick(nextPage);
    };
    var originElement = getIcon('more', icons);
    var ariaLabel = jumpPage > 0
        ? (_a = locale.Pagination.nextSomePages) === null || _a === void 0 ? void 0 : _a.replace('{0}', jumpPage)
        : (_b = locale.Pagination.prevSomePages) === null || _b === void 0 ? void 0 : _b.replace('{0}', -jumpPage);
    return (React.createElement("li", { style: pageItemStyle, className: cls, onClick: onClick, "aria-label": ariaLabel }, itemRender ? itemRender(undefined, 'more', originElement) : originElement));
};
/**
 * previous or next button
 * @param props
 */
export var StepPager = function (props) {
    var _a;
    var _b = useContext(ConfigContext), locale = _b.locale, rtl = _b.rtl;
    var getKeyboardEvents = useKeyboardEvent();
    var rootPrefixCls = props.rootPrefixCls, current = props.current, allPages = props.allPages, type = props.type, icons = props.icons, disabled = props.disabled, pageItemStyle = props.pageItemStyle, itemRender = props.itemRender;
    var prefixCls = rootPrefixCls + "-item";
    var _c = __read(rtl ? ['next', 'prev'] : ['prev', 'next'], 2), prev = _c[0], next = _c[1];
    var StepIcon = type === StepType.previous ? getIcon(prev, icons) : getIcon(next, icons);
    var _disabled = false;
    if (allPages === 0) {
        // total为0
        _disabled = true;
    }
    else if (type === StepType.previous) {
        // 向前翻页
        _disabled = current <= 1; // current ===0 || current===1
    }
    else {
        // 向后翻页
        _disabled = current === allPages;
    }
    var innerDisabled = disabled || _disabled;
    var nextPage = current + (type === StepType.previous ? -1 : 1);
    nextPage = Math.max(0, Math.min(allPages, nextPage));
    var pageType = StepType.previous === type ? 'prev' : 'next';
    var cls = cs(prefixCls, prefixCls + "-" + pageType, (_a = {},
        _a[prefixCls + "-disabled"] = innerDisabled,
        _a));
    var onClick = function () {
        if (innerDisabled) {
            return;
        }
        props.onClick && props.onClick(nextPage);
    };
    return (React.createElement("li", __assign({ style: pageItemStyle, className: cls, onClick: onClick, tabIndex: innerDisabled ? -1 : 0, "aria-label": locale.Pagination[pageType] }, getKeyboardEvents({
        onPressEnter: onClick,
    })), itemRender ? itemRender(undefined, pageType, StepIcon) : StepIcon));
};
export default Pager;
