/**
 * 该组件用来切换tree 展开收起时的动画
 */
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
import React, { useMemo, useContext, useEffect, useRef } from 'react';
import { TreeContext } from './context';
import VirtualList from '../_class/VirtualList';
import { ConfigContext } from '../ConfigProvider';
import Node from './node';
import { isNumber } from '../_util/is';
import ArcoCSSTransition from '../_util/CSSTransition';
function getKey(option) {
    return option.key || option._key;
}
var TreeAnimation = function (props) {
    var _a;
    var treeContext = useContext(TreeContext);
    var getPrefixCls = useContext(ConfigContext).getPrefixCls;
    var prefixCls = getPrefixCls('tree-node');
    var _b = treeContext.getTreeState(), expandedKeys = _b.expandedKeys, currentExpandKeys = _b.currentExpandKeys;
    var expanded = props.expanded;
    var propsChildrenDataRef = useRef(props.childrenData);
    propsChildrenDataRef.current = props.childrenData;
    useEffect(function () {
        return function () {
            treeContext.onExpandEnd && treeContext.onExpandEnd(props._key);
        };
    }, []);
    var childrenPropsList = useMemo(function () {
        var result = [];
        var loop = function (list) {
            list.forEach(function (item) {
                var data = treeContext.getFieldInfo(item);
                result.push(data);
                if (data.children && data.children.length) {
                    loop(data.children);
                }
            });
        };
        loop(propsChildrenDataRef.current || []);
        return result;
    }, [expanded]);
    var filtedData = useMemo(function () {
        var result = [];
        if (childrenPropsList.length) {
            var expandedKeysSet_1 = new Set(expandedKeys || []);
            childrenPropsList.forEach(function (data) {
                var _a;
                var isShow;
                var itemProps = __assign({}, treeContext.key2nodeProps[data.key]);
                if (expanded) {
                    // 只有在每一个父节点都是展开状态时，自己才会展示出来
                    isShow =
                        itemProps.parentKey === props._key ||
                            ((_a = itemProps.pathParentKeys) === null || _a === void 0 ? void 0 : _a.every(function (key) {
                                return expandedKeysSet_1.has(key);
                            }));
                }
                else if (itemProps.pathParentKeys) {
                    // 收起时，只有在props._key 对应的位置之后的所有的自己的父节点都是展开状态，才会展示自己
                    var index = itemProps.pathParentKeys.indexOf(props._key);
                    isShow = itemProps.pathParentKeys.slice(index + 1).every(function (key) {
                        return expandedKeysSet_1.has(key);
                    });
                }
                if (isShow) {
                    result.push(__assign(__assign({}, itemProps), { key: data.key }));
                }
            });
        }
        return treeContext.getNodeProps(result);
    }, [childrenPropsList, props._key, expanded, expandedKeys]);
    var realHeight = (_a = treeContext.virtualListProps) === null || _a === void 0 ? void 0 : _a.height;
    realHeight = isNumber(realHeight) ? realHeight : 0;
    useEffect(function () {
        // node set loadingMore but has no child nodes.
        // Animation will not be triggered and needs to be removed manually
        if (currentExpandKeys.indexOf(props._key) > -1 && filtedData.length === 0) {
            treeContext.onExpandEnd(props._key);
        }
    }, [filtedData, currentExpandKeys]);
    return (React.createElement(ArcoCSSTransition, { in: currentExpandKeys.indexOf(props._key) > -1 && filtedData.length > 0, unmountOnExit: true, classNames: "tree-slide-expand", timeout: {
            enter: 200,
            exit: 0,
        }, onEnter: function (e) {
            if (!e)
                return;
            var scrollHeight = e.scrollHeight;
            e.style.height = expanded ? 0 : Math.min(realHeight || scrollHeight, e.scrollHeight) + "px";
        }, onEntering: function (e) {
            if (!e)
                return;
            var scrollHeight = e.scrollHeight;
            e.style.height = expanded ? Math.min(realHeight || scrollHeight, scrollHeight) + "px" : 0;
        }, onEntered: function (e) {
            if (!e)
                return;
            e.style.height = props.expanded ? '' : 0;
            treeContext.onExpandEnd(props._key);
        }, onExit: function (e) {
            if (!e)
                return;
            e.style.display = 'none';
        } },
        React.createElement(VirtualList, __assign({ itemKey: getKey, className: prefixCls + "-list", isStaticItemHeight: false }, treeContext.virtualListProps, { data: filtedData, "aria-hidden": true, style: { overflow: 'hidden' } }), function (child) {
            return React.createElement(Node, __assign({}, child));
        })));
};
export default TreeAnimation;
