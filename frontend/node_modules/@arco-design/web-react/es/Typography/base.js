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
import React, { useState, useContext, forwardRef, useRef, useImperativeHandle, } from 'react';
import { ConfigContext } from '../ConfigProvider';
import ResizeObserverComponent from '../_util/resizeObserver';
import Operations from './operations';
import cs from '../_util/classNames';
import EditContent from './edit-content';
import { isObject, isUndefined } from '../_util/is';
import Tooltip from '../Tooltip';
import Popover from '../Popover';
import omit from '../_util/omit';
import useUpdateEffect from '../_util/hooks/useUpdate';
import mergedToString from '../_util/mergedToString';
import useMergeValue from '../_util/hooks/useMergeValue';
import useEllipsis, { MEASURE_STATUS } from './useEllipsis';
import useCssEllipsis from './useCssEllipsis';
import throttleByRaf from '../_util/throttleByRafV2';
function getClassNameAndComponentName(props, prefixCls) {
    var type = props.type, bold = props.bold, disabled = props.disabled, mark = props.mark, underline = props.underline, propDelete = props.delete, code = props.code;
    var component = [];
    var className = [];
    if (type) {
        className.push(prefixCls + "-" + type);
    }
    if (disabled) {
        className.push(prefixCls + "-disabled");
    }
    if (bold) {
        component.push('b');
    }
    if (underline) {
        component.push('u');
    }
    if (propDelete) {
        component.push('del');
    }
    if (code) {
        component.push('code');
    }
    if (mark) {
        component.push('mark');
    }
    return {
        component: component,
        className: className,
    };
}
function Base(props, ref) {
    var _a;
    var componentType = props.componentType, style = props.style, className = props.className, children = props.children, editable = props.editable, ellipsis = props.ellipsis, heading = props.heading, blockquote = props.blockquote, rest = __rest(props, ["componentType", "style", "className", "children", "editable", "ellipsis", "heading", "blockquote"]);
    var configContext = useContext(ConfigContext);
    var getPrefixCls = configContext.getPrefixCls, rtl = configContext.rtl;
    var prefixCls = getPrefixCls('typography');
    var rootDOMRef = useRef();
    var _b = getClassNameAndComponentName(props, prefixCls), component = _b.component, componentClassName = _b.className;
    var _c = __read(useState(false), 2), editing = _c[0], setEditing = _c[1];
    var _d = __read(useState(0), 2), width = _d[0], setWidth = _d[1];
    var editableConfig = isObject(editable) ? editable : {};
    var mergedEditing = 'editing' in editableConfig ? editableConfig.editing : editing;
    var ellipsisConfig = ellipsis
        ? __assign({ rows: 1, ellipsisStr: '...', cssEllipsis: false }, (isObject(ellipsis) ? ellipsis : {})) : {};
    var EllipsisWrapperTag = ellipsisConfig.wrapper || React.Fragment;
    var _e = __read(useMergeValue(false, {
        defaultValue: ellipsisConfig.defaultExpanded,
        value: ellipsisConfig.expanded,
    }), 2), expanding = _e[0], setExpanding = _e[1];
    var _f = useCssEllipsis(ellipsisConfig), simpleEllipsis = _f.simpleEllipsis, ellipsisStyle = _f.ellipsisStyle;
    var renderMeasureContent = function (node, isEllipsis) {
        var ellipsisStr = !isUndefined(ellipsisConfig.ellipsisStr)
            ? ellipsisConfig.ellipsisStr
            : '...';
        var suffix = !isUndefined(ellipsisConfig.suffix) && ellipsisConfig.suffix;
        return (React.createElement(EllipsisWrapperTag, null,
            node,
            isEllipsis && !expanding && !simpleEllipsis ? ellipsisStr : '',
            suffix,
            renderOperations(isEllipsis)));
    };
    var _g = useEllipsis(__assign(__assign({}, ellipsisConfig), { children: children, expanding: expanding, width: width, renderMeasureContent: renderMeasureContent, simpleEllipsis: simpleEllipsis || expanding })), ellipsisNode = _g.ellipsisNode, isEllipsis = _g.isEllipsis, measureStatus = _g.measureStatus;
    var handleResize = throttleByRaf(function (entry) {
        var contentRect = (entry === null || entry === void 0 ? void 0 : entry[0]).contentRect;
        if (contentRect) {
            var currentWidth = component.includes('code') ? contentRect.width - 18 : contentRect.width;
            var resizeStatus = [MEASURE_STATUS.NO_NEED_ELLIPSIS, MEASURE_STATUS.MEASURE_END];
            // 在 table 中，使用了 cssEllipsis 因为 white-space: "nowrap"，宽度会突然变很大
            // 导致再次触发 resize 计算，进入循环。
            // diffTime 应对短时间内多次触发
            if (resizeStatus.includes(measureStatus)) {
                setWidth(currentWidth);
            }
        }
    });
    function renderOperations(isEllipsis) {
        return (React.createElement(React.Fragment, null,
            React.createElement(Operations, __assign({}, props, { setEditing: setEditing, onClickExpand: onClickExpand, expanding: expanding, isEllipsis: isEllipsis, 
                // 如果是镜像dom的话，渲染在最外层，无法从context中拿到最新config
                currentContext: configContext }))));
    }
    function onClickExpand(e) {
        setExpanding(!expanding);
        props.onClickExpand && props.onClickExpand(e);
        ellipsisConfig.onExpand && ellipsisConfig.onExpand(!expanding, e);
    }
    useUpdateEffect(function () {
        ellipsisConfig.onEllipsis && ellipsisConfig.onEllipsis(isEllipsis);
    }, [isEllipsis]);
    useImperativeHandle(ref, function () { return rootDOMRef.current; });
    function wrap(content, component, props, innerProps) {
        if (innerProps === void 0) { innerProps = {}; }
        var currentContent = content;
        component.forEach(function (c, _index) {
            var _innerProps = _index === 0 ? innerProps : {};
            var _props = isObject(props.mark) && props.mark.color
                ? __assign({ style: { backgroundColor: props.mark.color } }, _innerProps) : __assign({}, _innerProps);
            currentContent = React.createElement(c, __assign({}, _props), currentContent);
        });
        return currentContent;
    }
    var TextComponent;
    if (componentType === 'Paragraph') {
        TextComponent = blockquote ? 'blockquote' : 'div';
    }
    else if (componentType === 'Title') {
        TextComponent = "h" + heading;
    }
    else if (componentType === 'Text') {
        TextComponent = ellipsis ? 'div' : 'span';
    }
    function renderContent() {
        var _a;
        var fullText = mergedToString(React.Children.toArray(children));
        var showTooltip = ellipsisConfig.showTooltip;
        var tooltipType = isObject(ellipsisConfig.showTooltip)
            ? ellipsisConfig.showTooltip.type === 'popover'
                ? 'popover'
                : 'tooltip'
            : 'tooltip';
        var tooltipProps = isObject(ellipsisConfig.showTooltip)
            ? ellipsisConfig.showTooltip.props || {}
            : {};
        var TooltipComponent = (tooltipType === 'popover' ? Popover : Tooltip);
        var titleProps = isEllipsis && !showTooltip && !expanding ? { title: fullText } : {};
        var baseProps = __assign({ style: style }, titleProps);
        var addTooltip = isEllipsis && showTooltip && !expanding;
        var node = (React.createElement(ResizeObserverComponent, { onResize: handleResize, getTargetDOMNode: function () {
                return rootDOMRef.current;
            } },
            React.createElement(TextComponent, __assign({ ref: rootDOMRef, className: cs(prefixCls, componentClassName, (_a = {}, _a[prefixCls + "-rtl"] = rtl, _a), className) }, baseProps, omit(rest, [
                'spacing',
                'type',
                'close',
                'bold',
                'disabled',
                'mark',
                'underline',
                'delete',
                'code',
                'copyable',
                'isEllipsis',
                'expanding',
                'onClickExpand',
                'setEditing',
                'forceShowExpand',
            ])), simpleEllipsis && measureStatus !== MEASURE_STATUS.INIT && !expanding && isEllipsis
                ? wrap(
                // CSS folding style, need to wrap the text separately.
                renderMeasureContent(React.createElement("span", { style: ellipsisStyle }, children), isEllipsis), component.length ? component : ['span'], props, 
                // The simple-ellipsis class ensures that the ReactNode after the text is displayed correctly (no line breaks)
                // Need to act on the immediate parent node of the text
                { className: prefixCls + "-simple-ellipsis" })
                : wrap(ellipsisNode, component, props))));
        if (addTooltip) {
            return (React.createElement(TooltipComponent, __assign({ content: fullText }, tooltipProps),
                React.createElement("span", null, node)));
        }
        return node;
    }
    return mergedEditing ? (React.createElement(EditContent, __assign({ ref: ref }, props, { className: cs(prefixCls, componentClassName, (_a = {}, _a[prefixCls + "-rtl"] = rtl, _a), prefixCls + "-" + TextComponent, className), prefixCls: prefixCls, setEditing: setEditing, editableConfig: editableConfig }))) : (renderContent());
}
export default forwardRef(Base);
