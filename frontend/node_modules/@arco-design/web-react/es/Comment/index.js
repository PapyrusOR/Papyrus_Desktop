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
import React, { forwardRef, useContext } from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import { isString, isObject } from '../_util/is';
import useMergeProps from '../_util/hooks/useMergeProps';
import { pickDataAttributes } from '../_util/pick';
var defaultAlign = {
    datetime: 'left',
    actions: 'left',
};
var defaultProps = {
    align: 'left',
};
function Comment(baseProps, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Comment);
    var prefixCls = getPrefixCls('comment');
    var actions = props.actions, author = props.author, avatar = props.avatar, content = props.content, datetime = props.datetime;
    var align = __assign(__assign({}, defaultAlign), (isObject(props.align)
        ? props.align
        : {
            datetime: props.align,
            actions: props.align,
        }));
    return (React.createElement("div", __assign({ ref: ref, className: cs("" + prefixCls, (_a = {}, _a[prefixCls + "-rtl"] = rtl, _a), props.className), style: props.style }, pickDataAttributes(props)),
        avatar && (React.createElement("div", { className: cs(prefixCls + "-avatar") }, isString(avatar) ? React.createElement("img", { src: avatar, alt: "comment-avatar" }) : avatar)),
        React.createElement("div", { className: prefixCls + "-inner" },
            React.createElement("div", { className: prefixCls + "-inner-content" },
                (author || datetime) && (React.createElement("div", { className: prefixCls + "-title " + prefixCls + "-title-align-" + align.datetime },
                    author && React.createElement("span", { className: prefixCls + "-author" }, author),
                    datetime && React.createElement("span", { className: prefixCls + "-datetime" }, datetime))),
                content && React.createElement("div", { className: prefixCls + "-content" }, content),
                actions && (React.createElement("div", { className: prefixCls + "-actions " + prefixCls + "-actions-align-" + align.actions }, actions))),
            props.children && React.createElement("div", { className: prefixCls + "-inner-comment" }, props.children))));
}
var CommentRef = forwardRef(Comment);
CommentRef.displayName = 'Comment';
export default CommentRef;
