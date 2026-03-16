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
import React, { forwardRef, useCallback, useContext, useEffect, useMemo, useRef, useState, } from 'react';
import { ConfigContext } from '../ConfigProvider';
import cs from '../_util/classNames';
import { Tooltip } from '../index';
import ResizeObserver from '../_util/resizeObserver';
import throttleByRaf from '../_util/throttleByRaf';
import useMergeProps from '../_util/hooks/useMergeProps';
import { isObject } from '../_util/is';
import useMergeValue from '../_util/hooks/useMergeValue';
import { isServerRendering } from '../_util/dom';
var defaultProps = {
    rows: 1,
    expandable: true,
    defaultExpanded: false,
};
var EllipsisComponent = function (baseProps, _) {
    var _a, _b;
    var ctx = useContext(ConfigContext);
    var props = useMergeProps(baseProps, defaultProps, (_a = ctx.componentConfig) === null || _a === void 0 ? void 0 : _a['Typography.Ellipsis']);
    var className = props.className, style = props.style, rows = props.rows, disabled = props.disabled, showTooltip = props.showTooltip, children = props.children, expandable = props.expandable, expandRender = props.expandRender, onExpand = props.onExpand, onEllipsis = props.onEllipsis;
    var locale = ctx.locale;
    var isSafari = isServerRendering
        ? false
        : /^((?!chrome|android).)*safari/i.test((_b = navigator === null || navigator === void 0 ? void 0 : navigator.userAgent) !== null && _b !== void 0 ? _b : '');
    var wrapperRef = useRef(null);
    var textRef = useRef(null);
    var _c = __read(useState(''), 2), text = _c[0], setText = _c[1];
    var _d = __read(useState(false), 2), visible = _d[0], setVisible = _d[1];
    var mirrorContentRef = useRef(null);
    var mirrorTextRef = useRef(null);
    var _e = __read(useMergeValue(false, {
        defaultValue: props.defaultExpanded,
        value: props.expanded,
    }), 2), expanded = _e[0], setExpanded = _e[1];
    var _f = __read(useState(false), 2), overflow = _f[0], setOverflow = _f[1];
    var single = useMemo(function () {
        if (isObject(expandable)) {
            return !expandable.single && rows === 1;
        }
        return rows === 1;
    }, [rows, expandable]);
    var tooltipData = useMemo(function () {
        if (isObject(showTooltip)) {
            return {
                tooltip: true,
                tooltipProps: showTooltip,
            };
        }
        return {
            tooltip: Boolean(showTooltip),
            tooltipProps: showTooltip,
        };
    }, [showTooltip]);
    useEffect(function () {
        if (textRef.current) {
            var content = textRef.current.textContent;
            if (content) {
                setText(content);
            }
        }
    }, [children, textRef]);
    var prefix = ctx.getPrefixCls('ellipsis');
    var renderActionContent = function () {
        if (expandRender) {
            return expandRender(expanded);
        }
        return (React.createElement("span", { className: prefix + "-action-text" }, expanded ? locale.Typography.fold : locale.Typography.unfold));
    };
    var renderAction = function () {
        var _a;
        if (expandable && overflow) {
            return (React.createElement("div", { className: cs(prefix + "-action", (_a = {},
                    _a[prefix + "-action-collapsed"] = !expanded,
                    _a)), onClick: function (ev) {
                    if (expanded) {
                        setExpanded(false);
                        // @ts-ignore
                        onExpand === null || onExpand === void 0 ? void 0 : onExpand(false, ev);
                    }
                    else {
                        setExpanded(true);
                        setVisible(false);
                        // @ts-ignore
                        onExpand === null || onExpand === void 0 ? void 0 : onExpand(true, ev);
                    }
                } }, renderActionContent()));
        }
        return null;
    };
    var onResize = useCallback(throttleByRaf(function () {
        if (mirrorTextRef.current && mirrorContentRef.current) {
            var isOverflow = single
                ? mirrorTextRef.current.offsetWidth > mirrorContentRef.current.offsetWidth
                : mirrorTextRef.current.offsetHeight > mirrorContentRef.current.offsetHeight;
            if (isOverflow) {
                if (overflow === false) {
                    setOverflow(true);
                    onEllipsis === null || onEllipsis === void 0 ? void 0 : onEllipsis(true);
                }
            }
            else if (overflow === true) {
                setOverflow(false);
                onEllipsis === null || onEllipsis === void 0 ? void 0 : onEllipsis(false);
            }
        }
    }), [overflow, single]);
    var renderMirror = function () {
        if (disabled) {
            return null;
        }
        return (React.createElement(ResizeObserver, { onResize: onResize },
            React.createElement("div", { className: single
                    ? cs(prefix + "-content-mirror", prefix + "-single")
                    : cs(prefix + "-content-mirror", prefix + "-multiple", prefix + "-collapsed"), style: {
                    WebkitBoxOrient: 'vertical',
                    MozBoxOrient: 'vertical',
                    WebkitLineClamp: rows,
                }, ref: mirrorContentRef },
                React.createElement(ResizeObserver, { onResize: onResize },
                    React.createElement("span", { ref: mirrorTextRef, className: prefix + "-text" }, children)))));
    };
    var renderContent = function () {
        var _a, _b;
        if (single) {
            return (React.createElement("div", { className: cs(prefix + "-content", prefix + "-single") },
                React.createElement("span", { ref: textRef, className: prefix + "-text" }, children)));
        }
        if (isSafari) {
            return (React.createElement("div", { className: cs(prefix + "-content", prefix + "-multiple"), title: !tooltipData.tooltip && overflow && !expanded ? text : undefined },
                !expanded && renderAction(),
                React.createElement("span", { ref: textRef, className: cs(prefix + "-text", (_a = {},
                        _a[prefix + "-collapsed"] = !expanded,
                        _a)), style: {
                        WebkitBoxOrient: 'vertical',
                        MozBoxOrient: 'vertical',
                        WebkitLineClamp: rows,
                    } }, children),
                expanded && renderAction()));
        }
        return (React.createElement("div", { className: cs(prefix + "-content", prefix + "-multiple", (_b = {},
                _b[prefix + "-collapsed"] = !expanded,
                _b)), style: {
                WebkitBoxOrient: 'vertical',
                MozBoxOrient: 'vertical',
                WebkitLineClamp: rows,
            }, title: !tooltipData.tooltip && overflow && !expanded ? text : undefined },
            !expanded && renderAction(),
            React.createElement("span", { ref: textRef, className: prefix + "-text" }, children),
            expanded && renderAction()));
    };
    var renderWrapper = function () {
        if (disabled) {
            return (React.createElement("div", { className: prefix + "-content" },
                React.createElement("span", { ref: textRef, className: prefix + "-text" }, children)));
        }
        if (tooltipData.tooltip) {
            return (React.createElement(Tooltip, __assign({ content: text, popupVisible: visible, disabled: !overflow || expanded, triggerProps: {
                    mouseEnterDelay: 100,
                }, onVisibleChange: function (visible) {
                    if (visible) {
                        if (overflow && !expanded) {
                            setVisible(true);
                        }
                    }
                    else {
                        setVisible(false);
                    }
                } }, tooltipData.tooltipProps), renderContent()));
        }
        return renderContent();
    };
    return (React.createElement("div", { ref: wrapperRef, className: cs(prefix, className), style: style },
        renderMirror(),
        renderWrapper()));
};
var Ellipsis = forwardRef(EllipsisComponent);
export default Ellipsis;
