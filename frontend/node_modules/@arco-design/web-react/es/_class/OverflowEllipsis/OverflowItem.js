import React, { useContext, useEffect, useRef } from 'react';
import ResizeObserver from '../../_util/resizeObserver';
import { ConfigContext } from '../../ConfigProvider';
import classNames from '../../_util/classNames';
export default function OverflowItem(props) {
    var _a;
    var getPrefixCls = useContext(ConfigContext).getPrefixCls;
    var prefixCls = getPrefixCls('overflow-item');
    var itemRef = useRef();
    useEffect(function () {
        props.onResize(itemRef.current);
        return function () {
            props.unregister(itemRef.current);
        };
    }, []);
    var hidden = props.hidden;
    return (React.createElement(ResizeObserver, { onResize: function (entry) {
            props.onResize(entry === null || entry === void 0 ? void 0 : entry[0].target);
        } },
        React.createElement("div", { ref: itemRef, className: classNames(prefixCls, props.className, (_a = {},
                _a[prefixCls + "-hidden"] = hidden,
                _a)) }, props.children)));
}
