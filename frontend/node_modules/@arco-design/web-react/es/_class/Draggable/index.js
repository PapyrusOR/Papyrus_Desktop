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
import React, { useContext, useState } from 'react';
import { ConfigContext } from '../../ConfigProvider';
import cs from '../../_util/classNames';
import Item from './item';
export default function Draggable(props) {
    var getPrefixCls = useContext(ConfigContext).getPrefixCls;
    var prefixCls = getPrefixCls('draggable');
    var className = props.className, children = props.children, _a = props.direction, direction = _a === void 0 ? 'vertical' : _a, onIndexChange = props.onIndexChange, itemWrapperStyle = props.itemWrapperStyle;
    var _b = __read(useState(null), 2), dragItemIndex = _b[0], setDragItemIndex = _b[1];
    return (React.createElement("div", { className: cs(prefixCls, className) }, React.Children.map(children, function (child, index) {
        return (React.createElement(Item, { style: itemWrapperStyle, prefixCls: prefixCls, direction: direction, onDragStart: function () { return setDragItemIndex(index); }, onDragEnd: function () { return setDragItemIndex(null); }, onDrop: function (_, dropPosition) {
                var prevIndex = dragItemIndex;
                var nextIndex = dropPosition === 'left' || dropPosition === 'top' ? index : index + 1;
                if (onIndexChange && prevIndex !== nextIndex) {
                    onIndexChange(nextIndex, prevIndex);
                }
            } }, child));
    })));
}
