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
import React, { useState, useContext } from 'react';
import NP from 'number-precision';
import cs from '../_util/classNames';
import IconStarFill from '../../icon/react-icon/IconStarFill';
import IconFaceMehFill from '../../icon/react-icon/IconFaceMehFill';
import IconFaceSmileFill from '../../icon/react-icon/IconFaceSmileFill';
import IconFaceFrownFill from '../../icon/react-icon/IconFaceFrownFill';
import { ConfigContext } from '../ConfigProvider';
import Tooltip from '../Tooltip';
import omit from '../_util/omit';
import useMergeProps from '../_util/hooks/useMergeProps';
NP.enableBoundaryChecking(false);
var defaultProps = {
    character: React.createElement(IconStarFill, null),
    count: 5,
};
function Rate(baseProps, ref) {
    var _a;
    var _this = this;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Rate);
    var _c = props.style, style = _c === void 0 ? {} : _c, className = props.className, defaultValue = props.defaultValue, character = props.character, count = props.count, propValue = props.value, tooltips = props.tooltips, allowHalf = props.allowHalf, allowClear = props.allowClear, readonly = props.readonly, disabled = props.disabled, grading = props.grading, onChange = props.onChange, onHoverChange = props.onHoverChange, restProps = __rest(props, ["style", "className", "defaultValue", "character", "count", "value", "tooltips", "allowHalf", "allowClear", "readonly", "disabled", "grading", "onChange", "onHoverChange"]);
    var _d = __read(useState(defaultValue || propValue || 0), 2), value = _d[0], setValue = _d[1];
    var _e = __read(useState(0), 2), hoverIndex = _e[0], setHoverIndex = _e[1];
    var _f = __read(useState(), 2), animation = _f[0], setAnimation = _f[1];
    var prefixCls = getPrefixCls('rate');
    var classNames = cs(prefixCls, (_a = {},
        _a[prefixCls + "-readonly"] = readonly,
        _a[prefixCls + "-disabled"] = disabled,
        _a[prefixCls + "-rtl"] = rtl,
        _a), className);
    var mergedValue = 'value' in props ? propValue : value;
    var resetHoverIndex = function () {
        if (hoverIndex) {
            setHoverIndex(0);
            onHoverChange && onHoverChange(0);
        }
    };
    var onMouseEnter = function (index, isHalf) {
        var newHoverIndex = isHalf && allowHalf ? index + 0.5 : index + 1;
        if (newHoverIndex !== hoverIndex) {
            setHoverIndex(newHoverIndex);
            onHoverChange && onHoverChange(newHoverIndex);
        }
    };
    var onClick = function (index, isHalf) {
        var newValue = isHalf && allowHalf ? index + 0.5 : index + 1;
        setAnimation(true);
        if (newValue !== mergedValue) {
            setValue(newValue);
            onChange && onChange(newValue);
        }
        else if (allowClear) {
            setValue(0);
            onChange && onChange(0);
            resetHoverIndex();
        }
    };
    var renderCharacter = function (index) {
        var _a;
        // fix number like 3.7
        var fixedValue = allowHalf
            ? NP.times(+NP.divide(mergedValue || 0, 0.5).toFixed(0), 0.5)
            : Math.round(mergedValue);
        var _usedIndex = hoverIndex || fixedValue;
        var _usedCharacter = typeof character === 'function' ? character(index) : character;
        if (grading) {
            if (_usedIndex <= 2) {
                _usedCharacter = React.createElement(IconFaceFrownFill, null);
            }
            else if (_usedIndex <= 3) {
                _usedCharacter = React.createElement(IconFaceMehFill, null);
            }
            else {
                _usedCharacter = React.createElement(IconFaceSmileFill, null);
            }
            if (_usedIndex <= index) {
                _usedCharacter = React.createElement(IconFaceMehFill, null);
            }
        }
        var classNames = cs(prefixCls + "-character", (_a = {},
            _a[prefixCls + "-character-half"] = allowHalf && index + 0.5 === _usedIndex,
            _a[prefixCls + "-character-full"] = index + 1 <= _usedIndex,
            _a[prefixCls + "-character-scale"] = animation && index + 1 < mergedValue,
            _a));
        var leftProps = readonly || disabled
            ? {}
            : {
                onMouseEnter: onMouseEnter.bind(_this, index, true),
                onClick: onClick.bind(_this, index, true),
            };
        var rightProps = readonly || disabled
            ? {}
            : {
                onMouseEnter: onMouseEnter.bind(_this, index, false),
                onClick: onClick.bind(_this, index, false),
            };
        var tooltip = tooltips && tooltips[index];
        var CharacterWrapper = tooltip ? Tooltip : React.Fragment;
        var tooltipProps = tooltip ? { content: tooltip } : {};
        function getAriaProps(isHalf) {
            return {
                role: 'radio',
                'aria-checked': index + (isHalf ? 0.5 : 1) <= _usedIndex,
                'aria-setsize': count,
                'aria-posinset': index + (isHalf ? 0.5 : 1),
            };
        }
        return (React.createElement(CharacterWrapper, __assign({ key: index }, tooltipProps),
            React.createElement("div", __assign({ className: classNames, style: animation ? { animationDelay: 50 * index + "ms" } : {}, onAnimationEnd: function () {
                    if (animation && index + 1 >= mergedValue - 1) {
                        setAnimation(false);
                    }
                } }, (!allowHalf ? getAriaProps() : {})),
                React.createElement("div", __assign({ className: prefixCls + "-character-left" }, leftProps, (allowHalf ? getAriaProps(true) : {})), _usedCharacter),
                React.createElement("div", __assign({ className: prefixCls + "-character-right" }, rightProps, (allowHalf ? getAriaProps() : {})), _usedCharacter))));
    };
    return (React.createElement("div", __assign({ ref: ref }, omit(restProps, ['error']), { style: style, className: classNames, onMouseLeave: resetHoverIndex }),
        React.createElement("div", { className: prefixCls + "-inner" }, Array.apply(null, Array(grading ? 5 : count)).map(function (_, index) { return renderCharacter(index); }))));
}
var RateComponent = React.forwardRef(Rate);
RateComponent.displayName = 'Rate';
export default RateComponent;
