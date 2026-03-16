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
import React, { forwardRef, useContext, useRef, useImperativeHandle, } from 'react';
import cs from '../_util/classNames';
import Trigger, { EventsByTriggerNeed } from '../Trigger';
import { ConfigContext } from '../ConfigProvider';
import pick, { pickDataAttributes } from '../_util/pick';
import useMergeProps from '../_util/hooks/useMergeProps';
import { isFunction, isEmptyReactNode } from '../_util/is';
var defaultProps = {
    position: 'top',
    trigger: 'hover',
    escToClose: false,
    unmountOnExit: true,
    blurToHide: true,
    popupHoverStay: true,
};
var triggerDuration = {
    enter: 300,
    exit: 100,
};
var triggerPopupAlign = {
    left: 12,
    right: 12,
    top: 12,
    bottom: 12,
};
function Tooltip(baseProps, ref) {
    var _a = useContext(ConfigContext), getPrefixCls = _a.getPrefixCls, componentConfig = _a.componentConfig;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Tooltip);
    var style = props.style, className = props.className, children = props.children, trigger = props.trigger, escToClose = props.escToClose, defaultPopupVisible = props.defaultPopupVisible, position = props.position, unmountOnExit = props.unmountOnExit, popupVisible = props.popupVisible, tooltipPrefixCls = props.prefixCls, blurToHide = props.blurToHide, popupHoverStay = props.popupHoverStay, disabled = props.disabled, onVisibleChange = props.onVisibleChange, triggerProps = props.triggerProps, childrenPrefix = props.childrenPrefix, getPopupContainer = props.getPopupContainer, content = props.content, mini = props.mini, color = props.color, rest = __rest(props, ["style", "className", "children", "trigger", "escToClose", "defaultPopupVisible", "position", "unmountOnExit", "popupVisible", "prefixCls", "blurToHide", "popupHoverStay", "disabled", "onVisibleChange", "triggerProps", "childrenPrefix", "getPopupContainer", "content", "mini", "color"]);
    var refTrigger = useRef();
    var updatePopupPosition = function (delay, callback) {
        if (delay === void 0) { delay = 0; }
        refTrigger.current && refTrigger.current.updatePopupPosition(delay, callback);
    };
    useImperativeHandle(ref, function () { return ({
        updatePopupPosition: updatePopupPosition,
        getRootDOMNode: function () {
            var _a, _b;
            return (_b = (_a = refTrigger.current) === null || _a === void 0 ? void 0 : _a.getRootDOMNode) === null || _b === void 0 ? void 0 : _b.call(_a);
        },
    }); }, []);
    var prefixCls = tooltipPrefixCls || getPrefixCls('tooltip');
    var otherProps = __assign(__assign(__assign(__assign({}, pick(rest, EventsByTriggerNeed)), pickDataAttributes(rest)), triggerProps), { className: cs(className, triggerProps === null || triggerProps === void 0 ? void 0 : triggerProps.className) });
    var renderedContent = isFunction(content) ? content() : content;
    if ('popupVisible' in props) {
        otherProps.popupVisible = popupVisible;
    }
    else if (isEmptyReactNode(renderedContent, true)) {
        // hide if empty content
        otherProps.popupVisible = false;
    }
    if (otherProps.showArrow !== false || otherProps.arrowProps) {
        otherProps.arrowProps = otherProps.arrowProps || {};
        if (color) {
            otherProps.arrowProps.style = __assign({ backgroundColor: color }, otherProps.arrowProps.style);
        }
    }
    return (React.createElement(Trigger, __assign({ style: __assign({ maxWidth: 350 }, style), ref: refTrigger, classNames: "zoomInFadeOut", duration: triggerDuration, popup: function () {
            var _a;
            return (React.createElement("div", { style: { backgroundColor: color }, className: cs(prefixCls + "-content", prefixCls + "-content-" + position, (_a = {},
                    _a[prefixCls + "-mini"] = mini,
                    _a)), role: "tooltip" },
                React.createElement("div", { className: prefixCls + "-content-inner" }, renderedContent)));
        }, position: position, disabled: disabled, trigger: trigger, escToClose: escToClose, showArrow: true, popupAlign: triggerPopupAlign, mouseEnterDelay: 200, mouseLeaveDelay: 200, unmountOnExit: unmountOnExit, popupHoverStay: popupHoverStay, blurToHide: blurToHide, childrenPrefix: childrenPrefix || prefixCls, getPopupContainer: getPopupContainer, onVisibleChange: onVisibleChange, defaultPopupVisible: defaultPopupVisible }, otherProps), children));
}
var TooltipComponent = forwardRef(Tooltip);
TooltipComponent.displayName = 'Tooltip';
export default TooltipComponent;
