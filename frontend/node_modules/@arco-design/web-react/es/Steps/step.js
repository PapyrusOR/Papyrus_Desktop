import React, { forwardRef } from 'react';
import cs from '../_util/classNames';
import IconCheck from '../../icon/react-icon/IconCheck';
import IconClose from '../../icon/react-icon/IconClose';
function Step(props, ref) {
    var _a;
    var style = props.style, className = props.className, prefixCls = props.prefixCls, _b = props.index, index = _b === void 0 ? 1 : _b, _c = props.current, current = _c === void 0 ? 1 : _c, status = props.status, title = props.title, description = props.description, icon = props.icon, nextStepError = props.nextStepError, type = props.type, customDot = props.customDot, labelPlacement = props.labelPlacement, disabled = props.disabled, onClick = props.onClick, onChange = props.onChange, direction = props.direction, id = props.id, lineless = props.lineless;
    function renderIconNode(currentStatus) {
        if (type === 'dot') {
            return null;
        }
        var content = index;
        if (icon) {
            content = icon;
        }
        else if (currentStatus === 'finish') {
            content = React.createElement(IconCheck, null);
        }
        else if (currentStatus === 'error') {
            content = React.createElement(IconClose, null);
        }
        return React.createElement("div", { className: prefixCls + "-icon" }, content);
    }
    function onClickStep(e) {
        if (!disabled) {
            // Step.onChange
            onChange && current !== index && onChange(index, id);
            // props.onClick
            onClick && onClick(index, id, e);
        }
    }
    var currentStatus;
    if (status) {
        currentStatus = status;
    }
    else {
        if (current < index) {
            currentStatus = 'wait';
        }
        if (current === index) {
            currentStatus = 'process';
        }
        if (current > index) {
            currentStatus = 'finish';
        }
    }
    var classNames = cs(prefixCls + "-item", prefixCls + "-item-" + currentStatus, (_a = {},
        _a[prefixCls + "-item-custom"] = !!icon,
        _a[prefixCls + "-item-next-error"] = nextStepError,
        _a[prefixCls + "-item-disabled"] = disabled,
        _a[prefixCls + "-item-active"] = index === current,
        _a), className);
    var iconNode = renderIconNode(currentStatus);
    var iconNodeWrapped = React.createElement("div", { className: prefixCls + "-item-icon" }, iconNode);
    var customDotElement = customDot
        ? customDot(iconNodeWrapped, {
            index: index,
            status: currentStatus,
            title: title,
            description: description,
        })
        : iconNodeWrapped;
    return (React.createElement("div", { ref: ref, className: classNames, style: style, onClick: onClickStep },
        !lineless && (labelPlacement === 'vertical' || direction === 'vertical') && (React.createElement("div", { className: prefixCls + "-item-tail" })),
        type !== 'arrow' && customDotElement,
        React.createElement("div", { className: prefixCls + "-item-content" },
            React.createElement("div", { className: prefixCls + "-item-title" }, title),
            description && React.createElement("div", { className: prefixCls + "-item-description" }, description))));
}
var StepComponent = forwardRef(Step);
StepComponent.displayName = 'Step';
export default StepComponent;
