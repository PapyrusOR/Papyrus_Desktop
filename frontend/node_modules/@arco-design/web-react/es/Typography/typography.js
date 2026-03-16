import React, { useContext, forwardRef } from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
function Typography(props, ref) {
    var getPrefixCls = useContext(ConfigContext).getPrefixCls;
    var prefixCls = getPrefixCls('typography');
    var className = props.className, style = props.style, children = props.children;
    var classNames = cs(prefixCls, className);
    return (React.createElement("article", { ref: ref, style: style, className: classNames }, children));
}
var TypographyComponent = forwardRef(Typography);
TypographyComponent.displayName = 'Typography';
export default TypographyComponent;
