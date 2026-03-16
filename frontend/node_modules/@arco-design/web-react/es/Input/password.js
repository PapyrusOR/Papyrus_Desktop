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
import React, { useContext } from 'react';
import cs from '../_util/classNames';
import Input from './input';
import IconEye from '../../icon/react-icon/IconEye';
import IconEyeInvisible from '../../icon/react-icon/IconEyeInvisible';
import { ConfigContext } from '../ConfigProvider';
import useMergeValue from '../_util/hooks/useMergeValue';
import omit from '../_util/omit';
import useKeyboardEvent from '../_util/hooks/useKeyboardEvent';
var Password = React.forwardRef(function (props, ref) {
    var _a;
    var _b = __read(useMergeValue(false, {
        defaultValue: props.defaultVisibility,
        value: props.visibility,
    }), 2), visibility = _b[0], setVisibility = _b[1];
    var getPrefixCls = useContext(ConfigContext).getPrefixCls;
    var getKeyboardEvents = useKeyboardEvent();
    var className = props.className, _c = props.visibilityToggle, visibilityToggle = _c === void 0 ? true : _c, onVisibilityChange = props.onVisibilityChange, rest = __rest(props, ["className", "visibilityToggle", "onVisibilityChange"]);
    var prefixCls = getPrefixCls('input-password');
    var classNames = cs(prefixCls, (_a = {},
        _a[prefixCls + "-visibility"] = visibilityToggle,
        _a), className);
    var onClickVisibility = function (v) {
        if (!('visibility' in props)) {
            setVisibility(v);
        }
        onVisibilityChange && onVisibilityChange(v);
    };
    var icon = props.suffix;
    var handleClickVisibility = function () {
        onClickVisibility(!visibility);
    };
    if (visibilityToggle) {
        var IconProps = __assign({ onClick: handleClickVisibility, 
            // 预防focus丢失
            onMouseDown: function (e) { return e.preventDefault(); }, onMouseUp: function (e) { return e.preventDefault(); } }, getKeyboardEvents({
            onPressEnter: handleClickVisibility,
        }));
        if (props.suffix) {
            icon = React.createElement("span", __assign({}, IconProps), props.suffix);
        }
        else {
            var IconComponent = visibility ? IconEye : IconEyeInvisible;
            icon = (React.createElement(IconComponent, __assign({}, IconProps, {
                focusable: undefined,
                'aria-hidden': undefined,
                tabIndex: 0,
                className: prefixCls + "-visibility-icon",
            })));
        }
    }
    return (React.createElement(Input, __assign({}, omit(rest, ['visibility', 'defaultVisibility']), { type: visibility ? 'text' : 'password', className: classNames, ref: ref, suffix: icon })));
});
Password.displayName = 'Password';
export default Password;
