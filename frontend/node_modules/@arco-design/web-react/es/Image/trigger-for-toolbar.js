import React from 'react';
import Trigger from '../Trigger';
import cs from '../_util/classNames';
export var TriggerForToolbar = function (props) {
    var style = props.style, className = props.className, prefixCls = props.prefixCls, popup = props.popup, children = props.children;
    var classNames = cs(prefixCls + "-trigger", className);
    return (React.createElement(Trigger, { style: style, className: classNames, popup: popup, showArrow: true }, children));
};
