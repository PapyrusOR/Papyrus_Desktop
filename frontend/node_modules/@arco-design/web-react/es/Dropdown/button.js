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
import React, { forwardRef, useContext } from 'react';
import ArcoButton from '../Button';
import Dropdown from './index';
import IconMore from '../../icon/react-icon/IconMore';
import { ConfigContext } from '../ConfigProvider';
import useMergeProps from '../_util/hooks/useMergeProps';
import { pickDataAttributes } from '../_util/pick';
var defaultProps = {
    position: 'br',
    trigger: 'hover',
    type: 'default',
    icon: React.createElement(IconMore, null),
    unmountOnExit: true,
};
function Button(baseProps, ref) {
    var _a;
    var componentConfig = useContext(ConfigContext).componentConfig;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig['Dropdown.Button']);
    var className = props.className, style = props.style, children = props.children, disabled = props.disabled, _b = props.position, position = _b === void 0 ? 'br' : _b, _c = props.type, type = _c === void 0 ? 'default' : _c, size = props.size, _d = props.icon, icon = _d === void 0 ? React.createElement(IconMore, null) : _d, onClick = props.onClick, buttonProps = props.buttonProps, buttonsRender = props.buttonsRender, dropdownRestProps = __rest(props, ["className", "style", "children", "disabled", "position", "type", "size", "icon", "onClick", "buttonProps", "buttonsRender"]);
    var leftButton = (React.createElement(ArcoButton, __assign({ disabled: disabled, type: type, size: size, onClick: onClick }, buttonProps), children));
    var rightButton = (React.createElement(ArcoButton, { disabled: disabled, type: type, size: size, icon: icon }));
    if (buttonsRender) {
        _a = __read(buttonsRender([leftButton, rightButton]), 2), leftButton = _a[0], rightButton = _a[1];
    }
    var disableTrigger = disabled ||
        !rightButton ||
        (rightButton.props && rightButton.props.loading);
    return (React.createElement(ArcoButton.Group, __assign({ className: className, style: style, ref: ref }, pickDataAttributes(props)),
        leftButton,
        React.createElement(Dropdown, __assign({ disabled: disabled, position: position }, dropdownRestProps, { triggerProps: __assign({ disabled: disableTrigger }, dropdownRestProps === null || dropdownRestProps === void 0 ? void 0 : dropdownRestProps.triggerProps) }), rightButton)));
}
var ButtonComponent = forwardRef(Button);
ButtonComponent.displayName = 'DropdownButton';
export default ButtonComponent;
