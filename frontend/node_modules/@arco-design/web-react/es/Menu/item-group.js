import React, { forwardRef, useContext } from 'react';
import cs from '../_util/classNames';
import { processChildren } from './util';
import MenuContext from './context';
import MenuIndent from './indent';
function ItemGroup(props, ref) {
    var children = props.children, title = props.title, level = props.level, className = props.className, style = props.style;
    var _a = useContext(MenuContext), prefixCls = _a.prefixCls, levelIndent = _a.levelIndent;
    var childrenLevel = level === 1 ? level + 1 : level;
    var childrenList = processChildren(children, { level: childrenLevel });
    return (React.createElement("div", { ref: ref, className: cs(prefixCls + "-group", className), style: style },
        React.createElement("div", { className: prefixCls + "-group-title" },
            React.createElement(MenuIndent, { level: level, prefixCls: prefixCls, levelIndent: levelIndent }),
            React.createElement("span", null, title)),
        childrenList));
}
var ForwardRefItemGroup = forwardRef(ItemGroup);
var ItemGroupComponent = ForwardRefItemGroup;
ItemGroupComponent.displayName = 'MenuItemGroup';
ItemGroupComponent.menuType = 'MenuGroup';
export default ItemGroupComponent;
