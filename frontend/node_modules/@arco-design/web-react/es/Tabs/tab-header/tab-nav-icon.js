import React, { useMemo } from 'react';
import IconLeft from '../../../icon/react-icon/IconLeft';
import IconRight from '../../../icon/react-icon/IconRight';
import IconUp from '../../../icon/react-icon/IconUp';
import IconDown from '../../../icon/react-icon/IconDown';
import IconHover from '../../_class/icon-hover';
import cs from '../../_util/classNames';
import { isNull } from '../../_util/is';
var horizontalMap = {
    prev: 'left',
    next: 'right',
};
var vertialMap = { prev: 'up', next: 'down' };
var TabNavIcon = function (props) {
    var _a;
    var direction = props.direction, headerSize = props.headerSize, headerWrapperSize = props.headerWrapperSize, prefixCls = props.prefixCls, iconPos = props.iconPos, curOffset = props.currentOffset, align = props.align, rtl = props.rtl, icon = props.icon;
    var wrapHeight = headerWrapperSize.height, wrapWidth = headerWrapperSize.width;
    var headerHeight = headerSize.height, headerWidth = headerSize.width;
    var maxHeightOffset = headerHeight - wrapHeight;
    var maxWidthOffset = headerWidth - wrapWidth;
    var defaultIcon = {
        up: React.createElement(IconUp, null),
        down: React.createElement(IconDown, null),
        left: rtl ? React.createElement(IconRight, null) : React.createElement(IconLeft, null),
        right: rtl ? React.createElement(IconLeft, null) : React.createElement(IconRight, null),
    };
    var onChange = function (offset) {
        if (offset !== props.currentOffset) {
            props.onChange && props.onChange(offset);
        }
    };
    var handleHozClick = function (e, pos) {
        e.preventDefault();
        var nextOffset;
        if (align === 'left') {
            nextOffset = pos === 'left' ? curOffset - wrapWidth : curOffset + wrapWidth;
        }
        else {
            nextOffset = pos === 'left' ? curOffset + wrapWidth : curOffset - wrapWidth;
        }
        onChange(nextOffset);
    };
    var handleVerticalClick = function (e, pos) {
        e.preventDefault();
        var nextOffset;
        if (pos === 'up') {
            nextOffset = curOffset - wrapHeight;
        }
        else {
            nextOffset = curOffset + wrapHeight;
            if (nextOffset >= headerHeight)
                return;
        }
        onChange(nextOffset);
    };
    var disabledPrev = useMemo(function () {
        if (align === 'left') {
            return curOffset <= 0;
        }
        return direction === 'vertical' ? curOffset >= maxHeightOffset : curOffset >= maxWidthOffset;
    }, [align, direction, curOffset, maxWidthOffset, curOffset]);
    var disabledNext = useMemo(function () {
        if (align === 'left') {
            return direction === 'vertical' ? curOffset >= maxHeightOffset : curOffset >= maxWidthOffset;
        }
        return curOffset <= 0;
    }, [align, direction, maxHeightOffset, maxWidthOffset, curOffset]);
    if (isNull(icon)) {
        return null;
    }
    var iconDirection = direction === 'horizontal' ? horizontalMap[iconPos] : vertialMap[iconPos];
    var disabled = iconPos === 'prev' ? disabledPrev : disabledNext;
    var className = cs(prefixCls + "-" + iconDirection + "-icon", (_a = {},
        _a[prefixCls + "-nav-icon-disabled"] = disabled,
        _a));
    var handleClick = direction === 'vertical' ? handleVerticalClick : handleHozClick;
    return (React.createElement(IconHover, { disabled: disabled, className: className, prefix: prefixCls, onClick: function (e) { return handleClick(e, iconDirection); } }, icon || defaultIcon[iconDirection]));
};
export default TabNavIcon;
