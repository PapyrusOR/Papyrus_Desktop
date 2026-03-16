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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useRef, useCallback, useMemo, useImperativeHandle, forwardRef } from 'react';
import Tree from '../Tree';
import { isFunction, isString } from '../_util/is';
function TreeList(props, ref) {
    var value = props.value, multiple = props.multiple, loadMore = props.loadMore, treeCheckedStrategy = props.treeCheckedStrategy, treeCheckStrictly = props.treeCheckStrictly, treeData = props.treeData, treeProps = props.treeProps, prefixCls = props.prefixCls, treeCheckable = props.treeCheckable;
    var propsRenderTitle = treeProps && treeProps.renderTitle;
    var treeRef = useRef();
    var handleCheck = useCallback(function (keys, _a) {
        var checkedNodes = _a.checkedNodes, checked = _a.checked, node = _a.node;
        var newValue = keys.map(function (key) {
            var item = checkedNodes.find(function (x) { return x && x.props._key === key; });
            if (!item) {
                var tmp = value.find(function (x) { return x.value === key; });
                return (tmp || {
                    label: key,
                    value: key,
                });
            }
            return {
                label: item.props.title,
                value: item.props._key,
                disabled: item.props.disabled,
            };
        });
        props.onChange(newValue, {
            checked: checked,
            trigger: node === null || node === void 0 ? void 0 : node.props,
        });
    }, [props.onChange, value]);
    var handleChange = useCallback(function (_, _a) {
        var node = _a.node, selected = _a.selected;
        var newValue = [
            {
                value: node.props._key,
                label: node.props.title,
            },
        ];
        if (multiple) {
            newValue = __spreadArray([], __read(value), false);
            var index = newValue.findIndex(function (x) { return x.value === node.props._key; });
            if (index > -1) {
                newValue.splice(index, 1);
            }
            else {
                newValue.push({
                    value: node.props._key,
                    label: node.props.title,
                });
            }
        }
        props.onChange(newValue, { trigger: node === null || node === void 0 ? void 0 : node.props, selected: selected });
    }, [props.onChange, value, multiple]);
    var handleCheckableSelect = useCallback(function (_, _a) {
        var node = _a.node, e = _a.e;
        var _b = node.props, checked = _b.checked, checkable = _b.checkable, disabled = _b.disabled, disableCheckbox = _b.disableCheckbox;
        if (treeRef.current && !disableCheckbox && !disabled && checkable !== false) {
            treeRef.current.handleCheck && treeRef.current.handleCheck(!checked, node.props._key, e);
        }
    }, []);
    var handleLoadMore = useCallback(function (treeNode) {
        if (isFunction(loadMore)) {
            var dataRef = treeNode.props.dataRef;
            return loadMore(treeNode, dataRef);
        }
        return [];
    }, [loadMore]);
    var renderTitle = useCallback(function (nodeProps) {
        if (propsRenderTitle) {
            return propsRenderTitle(nodeProps);
        }
        var inputValue = props.inputValue;
        var title = nodeProps.title;
        if (inputValue && isString(title)) {
            var index = title.toLowerCase().indexOf(inputValue.toLowerCase());
            if (index === -1) {
                return title;
            }
            var prefix = title.substr(0, index);
            var suffix = title.substr(index + inputValue.length);
            return (React.createElement("span", null,
                prefix,
                React.createElement("span", { className: prefixCls + "-highlight" }, title.substr(index, inputValue.length)),
                suffix));
        }
        return title;
    }, [prefixCls, props.inputValue, propsRenderTitle]);
    var extraProps = useMemo(function () {
        return props.treeCheckable
            ? {
                onCheck: handleCheck,
                checkedKeys: value.map(function (x) { return x.value; }),
            }
            : {};
    }, [handleCheck, value, props.treeCheckable]);
    var selectedKeys = useMemo(function () {
        return props.treeCheckable ? [] : value.map(function (x) { return x.value; });
    }, [props.treeCheckable, value]);
    var onSelect = useCallback(function (_, extra) {
        props.treeCheckable ? handleCheckableSelect(_, extra) : handleChange(_, extra);
    }, [props.treeCheckable, handleCheckableSelect, handleChange]);
    useImperativeHandle(ref, function () {
        return treeRef.current;
    }, []);
    return (React.createElement(Tree, __assign({ ref: treeRef, size: props.size, blockNode: true, filterNode: props.filterNode }, treeProps, { checkable: treeCheckable, multiple: multiple, loadMore: props.loadMore ? handleLoadMore : undefined, checkedStrategy: treeCheckedStrategy, checkStrictly: treeCheckStrictly, onMouseDown: function (e) {
            e.preventDefault();
        } }, extraProps, { treeData: treeData, fieldNames: props.fieldNames, renderTitle: renderTitle, onSelect: onSelect, selectedKeys: selectedKeys })));
}
export default forwardRef(TreeList);
