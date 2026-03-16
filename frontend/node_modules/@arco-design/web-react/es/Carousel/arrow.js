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
import React, { useContext } from 'react';
import IconLeft from '../../icon/react-icon/IconLeft';
import IconRight from '../../icon/react-icon/IconRight';
import IconUp from '../../icon/react-icon/IconUp';
import IconDown from '../../icon/react-icon/IconDown';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import useKeyboardEvent from '../_util/hooks/useKeyboardEvent';
function CarouselArrow(props, ref) {
    var _a;
    var className = props.className, _b = props.direction, direction = _b === void 0 ? 'horizontal' : _b, _c = props.showArrow, showArrow = _c === void 0 ? 'always' : _c, prev = props.prev, next = props.next, icons = props.icons;
    var getKeyboardEvents = useKeyboardEvent();
    var getPrefixCls = useContext(ConfigContext).getPrefixCls;
    var prefixCls = getPrefixCls('carousel');
    var arrowClass = cs(prefixCls + "-arrow", (_a = {},
        _a[prefixCls + "-arrow-hover"] = showArrow === 'hover',
        _a), className);
    var iconPrev = icons && icons.hasOwnProperty('prev') ? (icons.prev) : direction === 'horizontal' ? (React.createElement(IconLeft, null)) : (React.createElement(IconUp, null));
    var iconNext = icons && icons.hasOwnProperty('next') ? (icons.next) : direction === 'horizontal' ? (React.createElement(IconRight, null)) : (React.createElement(IconDown, null));
    return (React.createElement("div", { ref: ref, className: arrowClass },
        React.createElement("div", __assign({ className: prefixCls + "-arrow-" + (direction === 'vertical' ? 'top' : 'left'), onClick: prev, role: "button", tabIndex: 0 }, getKeyboardEvents({ onPressEnter: prev })), iconPrev),
        React.createElement("div", __assign({ className: prefixCls + "-arrow-" + (direction === 'vertical' ? 'bottom' : 'right'), onClick: next, role: "button", tabIndex: 0 }, getKeyboardEvents({ onPressEnter: next })), iconNext)));
}
var CarouselArrowComponent = React.forwardRef(CarouselArrow);
export default CarouselArrowComponent;
