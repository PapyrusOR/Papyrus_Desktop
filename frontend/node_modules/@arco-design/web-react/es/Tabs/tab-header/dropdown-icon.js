import React, { useMemo } from 'react';
import IconDown from '../../../icon/react-icon/IconDown';
import Dropdown from '../../Dropdown';
import Menu from '../../Menu';
import IconHover from '../../_class/icon-hover';
import { isNull } from '../../_util/is';
export default function DropdownIcon(props) {
    var prefixCls = props.prefixCls, currentOffset = props.currentOffset, headerSize = props.headerSize, headerWrapperSize = props.headerWrapperSize, getTitleRef = props.getTitleRef, paneChildren = props.paneChildren, direction = props.direction, icon = props.icon;
    var paneKeys = paneChildren.map(function (child) { return child.key; });
    var size = direction === 'vertical' ? headerSize.height : headerSize.width;
    var wrapperSize = direction === 'vertical' ? headerWrapperSize.height : headerWrapperSize.width;
    var tabSizes = useMemo(function () {
        var map = {};
        var wrapperRect = headerWrapperSize.domRect;
        paneKeys.map(function (key) {
            var titleDom = getTitleRef(key);
            if (!titleDom)
                return;
            var rect = titleDom.getBoundingClientRect();
            map[key] = {
                left: rect.left - wrapperRect.left,
                right: rect.left - wrapperRect.left + rect.width,
                top: rect.top - wrapperRect.top,
                bottom: rect.top - wrapperRect.top + rect.height,
            };
        });
        return map;
    }, [paneKeys.join(','), size, wrapperSize]);
    var rangeIndex = useMemo(function () {
        var start = -1;
        var end = -1;
        for (var key in tabSizes) {
            var _a = tabSizes[key], left = _a.left, right = _a.right;
            if (left >= currentOffset && right - currentOffset <= wrapperSize && start === -1) {
                start = paneKeys.indexOf(key);
                end = start;
            }
            if (left >= currentOffset && right - currentOffset > wrapperSize) {
                end = paneKeys.indexOf(key);
                break;
            }
        }
        return [start, end];
    }, [tabSizes, paneKeys.join(','), currentOffset]);
    if (isNull(icon)) {
        return null;
    }
    return (React.createElement(Dropdown, { trigger: "click", droplist: React.createElement(Menu, { onClickMenuItem: props.onClickTab }, paneChildren.map(function (child, index) {
            if (index < rangeIndex[0] || index >= rangeIndex[1]) {
                return (React.createElement(Menu.Item, { key: child.key, disabled: child.disabled }, child.props.title));
            }
        })) },
        React.createElement(IconHover, { role: "button", "aria-label": "expand tabs", prefix: prefixCls + "-dropdown", className: prefixCls + "-dropdown-icon" }, icon || React.createElement(IconDown, null))));
}
