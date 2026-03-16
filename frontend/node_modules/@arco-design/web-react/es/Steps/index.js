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
import React, { useContext, forwardRef } from 'react';
import cs from '../_util/classNames';
import Step from './step';
import { ConfigContext } from '../ConfigProvider';
import useMergeProps from '../_util/hooks/useMergeProps';
import { pickDataAttributes } from '../_util/pick';
var defaultProps = {
    current: 1,
    type: 'default',
    size: 'default',
    direction: 'horizontal',
    labelPlacement: 'horizontal',
};
function Steps(baseProps, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Steps);
    var className = props.className, style = props.style, children = props.children, _c = props.current, current = _c === void 0 ? 1 : _c, status = props.status, onChange = props.onChange, type = props.type, size = props.size, direction = props.direction, labelPlacement = props.labelPlacement, customDot = props.customDot, lineless = props.lineless;
    var prefixCls = getPrefixCls('steps');
    var innerLabelPlacement = labelPlacement;
    if (type === 'dot') {
        innerLabelPlacement = direction === 'vertical' ? 'horizontal' : 'vertical';
    }
    if (type === 'navigation') {
        innerLabelPlacement = 'horizontal';
    }
    var innerDirection = direction;
    if (type === 'navigation' || type === 'arrow') {
        innerDirection = 'horizontal';
    }
    var classNames = cs(prefixCls, prefixCls + "-" + innerDirection, prefixCls + "-label-" + innerLabelPlacement, prefixCls + "-size-" + size, (_a = {},
        _a[prefixCls + "-change-onclick"] = typeof onChange === 'function',
        _a[prefixCls + "-mode-" + type] = type !== 'default',
        _a[prefixCls + "-lineless"] = lineless,
        _a[prefixCls + "-rtl"] = rtl,
        _a), className);
    return (React.createElement("div", __assign({ ref: ref, style: style, className: classNames }, pickDataAttributes(props)), React.Children.toArray(children)
        .filter(function (child) {
        return child && child.type && child.type.displayName === 'Step';
    })
        .map(function (child, index) {
        // step 的 index 从 1 开始
        index += 1;
        if (child) {
            var childProps = __assign({ prefixCls: prefixCls, type: type, index: index, current: current, status: current === index ? status : undefined, customDot: customDot, labelPlacement: innerLabelPlacement, direction: innerDirection, onChange: onChange, lineless: lineless }, child.props);
            if (status === 'error' && current === index + 1) {
                childProps.nextStepError = true;
            }
            return React.cloneElement(child, childProps);
        }
        return null;
    })));
}
var ForwardRefSteps = forwardRef(Steps);
var StepsComponent = ForwardRefSteps;
StepsComponent.displayName = 'Steps';
StepsComponent.Step = Step;
export default StepsComponent;
