import React, { useContext } from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
function Grid(props, ref) {
    var _a;
    var children = props.children, style = props.style, className = props.className, hoverable = props.hoverable;
    var getPrefixCls = useContext(ConfigContext).getPrefixCls;
    var prefixCls = getPrefixCls('card-grid');
    return (React.createElement("div", { ref: ref, style: style, className: cs(prefixCls, (_a = {}, _a[prefixCls + "-hoverable"] = hoverable, _a), className) }, children));
}
var CardComponent = React.forwardRef(Grid);
CardComponent.displayName = 'CardGrid';
export default CardComponent;
