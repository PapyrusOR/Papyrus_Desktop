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
import React, { useContext, useMemo } from 'react';
import { ConfigContext } from '../ConfigProvider';
import cs from '../_util/classNames';
import Button from '../Button';
import TransferList from './list';
import IconLeft from '../../icon/react-icon/IconLeft';
import IconRight from '../../icon/react-icon/IconRight';
import useMergeValue from '../_util/hooks/useMergeValue';
import { isObject } from '../_util/is';
import useMergeProps from '../_util/hooks/useMergeProps';
import { pickDataAttributes } from '../_util/pick';
var defaultProps = {
    titleTexts: ['Source', 'Target'],
    defaultSelectedKeys: [],
    defaultTargetKeys: [],
    dataSource: [],
    filterOption: function (inputValue, item) {
        return typeof (item === null || item === void 0 ? void 0 : item.value) === 'string' && item.value.indexOf(inputValue) !== -1;
    },
};
function Transfer(baseProps, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Transfer);
    var transferPrefixCls = props.prefixCls, style = props.style, className = props.className, children = props.children, dataSource = props.dataSource, defaultTargetKeys = props.defaultTargetKeys, defaultSelectedKeys = props.defaultSelectedKeys, propTargetKeys = props.targetKeys, propSelectedKeys = props.selectedKeys, oneWay = props.oneWay, simple = props.simple, disabled = props.disabled, titleTexts = props.titleTexts, operationTexts = props.operationTexts, operationStyle = props.operationStyle, onSearch = props.onSearch, onChange = props.onChange, onSelectChange = props.onSelectChange, restProps = __rest(props, ["prefixCls", "style", "className", "children", "dataSource", "defaultTargetKeys", "defaultSelectedKeys", "targetKeys", "selectedKeys", "oneWay", "simple", "disabled", "titleTexts", "operationTexts", "operationStyle", "onSearch", "onChange", "onSelectChange"]);
    var prefixCls = transferPrefixCls || getPrefixCls('transfer');
    var mergedOneWay = !!(simple || oneWay);
    var _c = __read(useMergeValue([], {
        value: propTargetKeys,
        defaultValue: simple ? defaultTargetKeys.concat(defaultSelectedKeys) : defaultTargetKeys,
    }), 2), targetKeys = _c[0], setTargetKeys = _c[1];
    var _d = __read(useMergeValue([], {
        value: propSelectedKeys,
        defaultValue: simple ? [] : defaultSelectedKeys,
    }), 2), selectedKeys = _d[0], setSelectedKeys = _d[1];
    // 严格控制 TransferList 的 dataSource 的引用地址改变
    var _e = __read(useMemo(function () { return [[], []]; }, [dataSource, targetKeys]), 2), sourceListDataSource = _e[0], targetListDataSource = _e[1];
    var _f = __read(useMemo(function () {
        // 每次重新计算时，清空数组
        sourceListDataSource.length = 0;
        targetListDataSource.length = 0;
        // 空间换取时间，尽量减少数组遍历的次数
        var sourceInfo = {
            dataSource: sourceListDataSource,
            selectedKeys: [],
            validKeys: [],
            selectedValidKeys: [],
            selectedDisabledKeys: [],
        };
        var targetInfo = {
            dataSource: targetListDataSource,
            selectedKeys: [],
            validKeys: [],
            selectedValidKeys: [],
            selectedDisabledKeys: [],
        };
        dataSource.forEach(function (item) {
            var info = targetKeys.indexOf(item.key) > -1 ? targetInfo : sourceInfo;
            if (!item.disabled) {
                info.validKeys.push(item.key);
            }
            if (selectedKeys.indexOf(item.key) > -1) {
                info.selectedKeys.push(item.key);
                if (item.disabled) {
                    info.selectedDisabledKeys.push(item.key);
                }
                else {
                    info.selectedValidKeys.push(item.key);
                }
            }
            info.dataSource.push(item);
        });
        // 简单模式下，在左侧列表保留被选中的项目
        if (isObject(simple) && simple.retainSelectedItems) {
            Object.entries(sourceInfo).forEach(function (_a) {
                var _b = __read(_a, 2), key = _b[0], value = _b[1];
                if (Array.isArray(value)) {
                    sourceInfo[key] = value.concat(targetInfo[key]);
                }
            });
            sourceInfo.dataSource = dataSource.slice();
            sourceInfo.selectedKeys = targetKeys.slice();
        }
        return [sourceInfo, targetInfo];
    }, [dataSource, targetKeys, selectedKeys, simple]), 2), sourceInfo = _f[0], targetInfo = _f[1];
    // 移动选项
    var moveTo = function (to, moveKeys) {
        if (moveKeys === void 0) { moveKeys = null; }
        if (Array.isArray(moveKeys) && moveKeys.length === 0) {
            return;
        }
        // 只移动未被禁用的选中项目
        moveKeys =
            moveKeys || (to === 'target' ? sourceInfo.selectedValidKeys : targetInfo.selectedValidKeys);
        var newTargetKeys = to === 'target'
            ? targetKeys.concat(moveKeys).sort(function (keyA, keyB) {
                return (dataSource.findIndex(function (_a) {
                    var key = _a.key;
                    return key === keyA;
                }) -
                    dataSource.findIndex(function (_a) {
                        var key = _a.key;
                        return key === keyB;
                    }));
            })
            : targetKeys.filter(function (key) { return moveKeys.indexOf(key) === -1; });
        // 移动之后取消所有非禁用选项的选中状态
        setSelectedKeys(sourceInfo.selectedDisabledKeys.concat(targetInfo.selectedDisabledKeys));
        setTargetKeys(newTargetKeys);
        onChange === null || onChange === void 0 ? void 0 : onChange(newTargetKeys, to, moveKeys);
    };
    // 单选 或者 全选
    var handleSelect = function (keys, listType) {
        if (listType === 'source') {
            // 简单模式在选中之后直接移动
            if (simple) {
                var keysAdded = keys.filter(function (k) { return sourceInfo.selectedKeys.indexOf(k) === -1; });
                var keysRemoved = sourceInfo.selectedKeys.filter(function (k) { return keys.indexOf(k) === -1; });
                moveTo('target', keysAdded);
                moveTo('source', keysRemoved);
            }
            else {
                setSelectedKeys(keys.concat(targetInfo.selectedKeys));
                onSelectChange && onSelectChange(keys, targetInfo.selectedKeys);
            }
        }
        else {
            setSelectedKeys(sourceInfo.selectedKeys.concat(keys));
            onSelectChange && onSelectChange(sourceInfo.selectedKeys, keys);
        }
    };
    var renderOperations = function () {
        var _a;
        var leftActive = targetInfo.selectedKeys.length > 0;
        var rightActive = sourceInfo.selectedKeys.length > 0;
        var buttons = mergedOneWay ? ['target'] : ['target', 'source'];
        return simple ? null : (React.createElement("div", { style: operationStyle, className: cs(prefixCls + "-operations", (_a = {},
                _a[prefixCls + "-operations-words"] = operationTexts,
                _a)) }, buttons.map(function (to, index) {
            var Icon;
            var _disabled;
            if (to === 'source') {
                Icon = IconLeft;
                _disabled = disabled || !leftActive;
            }
            else {
                Icon = IconRight;
                _disabled = disabled || !rightActive;
            }
            return (React.createElement(Button, { key: index, tabIndex: _disabled ? -1 : undefined, "aria-label": "move selected " + (to === 'target' ? 'right' : 'left'), type: "secondary", size: "small", shape: "round", disabled: _disabled, onClick: function () { return moveTo(to); }, icon: React.createElement(Icon, null) }, operationTexts && operationTexts[index]));
        })));
    };
    var renderList = function (listType) {
        var info = listType === 'source' ? sourceInfo : targetInfo;
        var isTarget = listType === 'target';
        var usedRestProps = __assign({}, restProps);
        Object.entries(usedRestProps).forEach(function (_a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            var propertiesCanBeArray = [
                'searchPlaceholder',
                'showSearch',
                'showFooter',
                'pagination',
                'listStyle',
            ];
            if (propertiesCanBeArray.indexOf(key) > -1) {
                usedRestProps[key] = Array.isArray(value) ? value[listType === 'source' ? 0 : 1] : value;
            }
        });
        return (React.createElement(TransferList, __assign({}, info, usedRestProps, { style: usedRestProps.listStyle, prefixCls: prefixCls, className: prefixCls + "-view-" + listType, listType: listType, title: titleTexts[isTarget ? 1 : 0], disabled: disabled, allowClear: isTarget && mergedOneWay, renderList: children, handleSelect: function (newSelectKeys) { return handleSelect(newSelectKeys, listType); }, handleRemove: function (removeKeys) { return moveTo(isTarget ? 'source' : 'target', removeKeys); }, onSearch: function (value) { return onSearch && onSearch(value, listType); }, renderHeaderUnit: function (countSelected, countAll) {
                return "" + (mergedOneWay ? '' : countSelected + " / ") + countAll;
            } })));
    };
    return (React.createElement("div", __assign({}, pickDataAttributes(props), { ref: ref, className: cs(prefixCls, (_a = {},
            _a[prefixCls + "-simple"] = simple,
            _a[prefixCls + "-disabled"] = disabled,
            _a[prefixCls + "-rtl"] = rtl,
            _a), className), style: style }),
        renderList('source'),
        renderOperations(),
        renderList('target')));
}
var TransferComponent = React.forwardRef(Transfer);
TransferComponent.displayName = 'Transfer';
export default TransferComponent;
