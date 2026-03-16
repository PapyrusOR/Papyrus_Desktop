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
import React, { forwardRef, useEffect, useState, useImperativeHandle, useRef, useContext, useCallback, } from 'react';
import { isArray, isFunction, isObject, isString } from '../_util/is';
import Trigger from '../Trigger';
import CascaderPanel from './panel/list';
import SearchPanel from './panel/search-panel';
import { ConfigContext } from '../ConfigProvider';
import SelectView from '../_class/select-view';
import cs from '../_util/classNames';
import useMergeValue from '../_util/hooks/useMergeValue';
import useUpdate from '../_util/hooks/useUpdate';
import { Enter, Tab } from '../_util/keycode';
import useCurrentRef from './hook/useRefCurrent';
import useMergeProps from '../_util/hooks/useMergeProps';
import { valueInSet, transformValuesToSet, isEmptyValue, getConfig, getStore, formatValue, removeValueFromSet, SHOW_CHILD, PANEL_MODE, } from './util';
import useForceUpdate from '../_util/hooks/useForceUpdate';
import useId from '../_util/hooks/useId';
import IconLeft from '../../icon/react-icon/IconLeft';
import IconRight from '../../icon/react-icon/IconRight';
import IconLoading from '../../icon/react-icon/IconLoading';
import IconCheck from '../../icon/react-icon/IconCheck';
export var DefaultFieldNames = {
    label: 'label',
    value: 'value',
    isLeaf: 'isLeaf',
    children: 'children',
    disabled: 'disabled',
};
var defaultProps = {
    options: [],
    bordered: true,
    fieldNames: DefaultFieldNames,
    trigger: 'click',
    expandTrigger: 'click',
    checkedStrategy: SHOW_CHILD,
    defaultActiveFirstOption: true,
};
var triggerPopupAlign = { bottom: 4 };
function Cascader(baseProps, ref) {
    var _a = useContext(ConfigContext), getPrefixCls = _a.getPrefixCls, renderEmpty = _a.renderEmpty, componentConfig = _a.componentConfig, rtl = _a.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Cascader);
    var disabled = props.disabled, renderFormat = props.renderFormat, getPopupContainer = props.getPopupContainer, children = props.children, triggerProps = props.triggerProps, expandTrigger = props.expandTrigger, icons = props.icons;
    var iconsMap = {
        loading: (icons === null || icons === void 0 ? void 0 : icons.loading) || React.createElement(IconLoading, null),
        checked: (icons === null || icons === void 0 ? void 0 : icons.checked) || React.createElement(IconCheck, null),
        next: (icons === null || icons === void 0 ? void 0 : icons.next) || (rtl ? React.createElement(IconLeft, null) : React.createElement(IconRight, null)),
    };
    var prefixCls = getPrefixCls('cascader');
    var isMultiple = props.mode === 'multiple';
    var timerRef = useRef(null);
    var forceUpdate = useForceUpdate();
    var store = useCurrentRef(function () {
        return getStore(props, formatValue('value' in props ? props.value : props.defaultValue, isMultiple));
    }, [JSON.stringify(getConfig(props)), props.options]);
    var _b = __read(useState(function () {
        return 'value' in props
            ? formatValue(props.value, isMultiple, store)
            : 'defaultValue' in props
                ? formatValue(props.defaultValue, isMultiple, store)
                : [];
    }), 2), stateValue = _b[0], setValue = _b[1];
    var mergeValue = 'value' in props ? formatValue(props.value, isMultiple, store) : stateValue;
    var _c = __read(useMergeValue(false, {
        value: props.popupVisible,
        defaultValue: props.defaultPopupVisible,
    }), 2), popupVisible = _c[0], setPopupVisible = _c[1];
    var _d = __read(useMergeValue('', {
        value: 'inputValue' in props ? props.inputValue || '' : undefined,
    }), 3), inputValue = _d[0], setInputValue = _d[1], stateInputValue = _d[2];
    // 触发 onInputValueChange 回调的值
    var refOnInputChangeCallbackValue = useRef(inputValue);
    // 触发 onInputValueChange 回调的原因
    var refOnInputChangeCallbackReason = useRef(null);
    var selectRef = useRef(null);
    // 暂存被选中的值对应的节点。仅在onSearch的时候用到
    // 避免出现下拉列表改变，之前选中的option找不到对应的节点，展示上会出问题。
    var stashNodes = useRef((store === null || store === void 0 ? void 0 : store.getCheckedNodes()) || []);
    // Unique ID of this instance
    var instancePopupID = useId(prefixCls + "-popup-");
    // 尝试更新 inputValue，触发 onInputValueChange
    var tryUpdateInputValue = function (value, reason) {
        if (value !== refOnInputChangeCallbackValue.current) {
            setInputValue(value);
            refOnInputChangeCallbackValue.current = value;
            refOnInputChangeCallbackReason.current = reason;
            props.onInputValueChange && props.onInputValueChange(value, reason);
        }
    };
    // 在 inputValue 变化时，适时触发 onSearch
    useEffect(function () {
        var reason = refOnInputChangeCallbackReason.current;
        if (stateInputValue === inputValue && (reason === 'manual' || reason === 'optionListHide')) {
            props.onSearch && props.onSearch(inputValue, reason);
        }
        if (inputValue !== refOnInputChangeCallbackValue.current) {
            refOnInputChangeCallbackValue.current = inputValue;
        }
    }, [inputValue]);
    useEffect(function () {
        var clearTimer = function () {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        };
        if (!popupVisible && inputValue) {
            if (timerRef.current) {
                clearTimer();
            }
            timerRef.current = setTimeout(function () {
                tryUpdateInputValue('', 'optionListHide');
                timerRef.current = null;
            }, 200);
        }
        return function () {
            clearTimer();
        };
    }, [popupVisible]);
    useUpdate(function () {
        if ('value' in props && props.value !== stateValue) {
            // don't to use formatValue(x, y, store)
            // we just need to get the value in a valid format, and update it to store nodes
            var newValue = formatValue(props.value, isMultiple);
            store.setNodeCheckedByValue(newValue);
            setValue(newValue);
        }
    }, [props.value, isMultiple]);
    useImperativeHandle(ref, function () { return selectRef.current; }, []);
    var updateStashNodes = function (nodes) {
        stashNodes.current = Array.from(new Set([].concat(nodes, stashNodes.current)));
    };
    var getSelectedOptionsByValue = function (values) {
        var result = [];
        var valuesSet = transformValuesToSet(values);
        var findValue = function (nodes) {
            nodes.some(function (node) {
                if (valueInSet(valuesSet, node.pathValue)) {
                    result.push(node.getPathNodes().map(function (x) { return x._data; }));
                    removeValueFromSet(valuesSet, node.pathValue);
                }
                if (!valuesSet.size) {
                    return true;
                }
            });
        };
        findValue(store.getCheckedNodes());
        if (valuesSet.size) {
            findValue(stashNodes.current);
        }
        return result;
    };
    var handleVisibleChange = useCallback(function (newVisible) {
        if (newVisible !== popupVisible) {
            props.onVisibleChange && props.onVisibleChange(newVisible);
            if (!('popupVisible' in props)) {
                setPopupVisible(newVisible);
            }
        }
    }, [props.onVisibleChange, popupVisible]);
    var renderText = useCallback(function (value) {
        var _a;
        // store 中不存在时，从stashNodes.current中找一下对应节点
        var options = getSelectedOptionsByValue([value])[0] || [];
        var text;
        var valueShow = isArray(value) ? value.map(function (x) { return String(x); }) : [];
        if (options.length) {
            valueShow = options.map(function (x) { return x.label; });
        }
        if (isFunction(renderFormat)) {
            text = renderFormat(valueShow, options);
        }
        else if (valueShow.every(function (v) { return isString(v); })) {
            text = valueShow.join(' / ');
        }
        else {
            text = valueShow.reduce(function (total, item, index) {
                return total.concat(index === 0 ? [item] : [' / ', item]);
            }, []);
        }
        return {
            text: text || '',
            disabled: (_a = options[options.length - 1]) === null || _a === void 0 ? void 0 : _a.disabled,
        };
    }, [store, stateValue, renderFormat]
    // 这里把 stateValue 放到依赖里面，是因为当受控时props.value改变或非受控时内部stateValue改变，都会需要出发节点选中状态的更新
    // 此时需要重新渲染已选中值的展示
    );
    var handleChange = function (newValue, trigger) {
        var _a;
        if (trigger === 'panel' &&
            isObject(props.showSearch) &&
            !props.showSearch.retainInputValueWhileSelect &&
            isMultiple) {
            tryUpdateInputValue('', 'optionChecked');
        }
        var onChange = props.onChange, changeOnSelect = props.changeOnSelect, expandTrigger = props.expandTrigger;
        var isSame = mergeValue === newValue;
        if (isSame) {
            return;
        }
        if (!isMultiple) {
            store.setNodeCheckedByValue(newValue);
        }
        updateStashNodes(store.getCheckedNodes());
        var selectedOptions = getSelectedOptionsByValue(newValue);
        var _value = isMultiple ? newValue : newValue[0];
        var _selectedOptions = isMultiple ? selectedOptions : selectedOptions[0];
        if (!isMultiple) {
            if (inputValue) {
                // 单选时选择搜索项，直接关闭面板
                handleVisibleChange(false);
            }
            else if ((selectedOptions[0] && ((_a = selectedOptions[0][selectedOptions[0].length - 1]) === null || _a === void 0 ? void 0 : _a.isLeaf)) ||
                (changeOnSelect && expandTrigger === 'hover')) {
                handleVisibleChange(false);
            }
        }
        if ('value' in props) {
            store.setNodeCheckedByValue(mergeValue);
            // 受控触发更新，回到选中前的状态。
            forceUpdate();
        }
        else {
            setValue(newValue);
        }
        onChange &&
            onChange(_value, _selectedOptions, {
                dropdownVisible: popupVisible,
            });
    };
    var onRemoveCheckedItem = function (item, index, e) {
        e.stopPropagation();
        if (item.disabled) {
            return;
        }
        var newValue = mergeValue.filter(function (_, i) { return i !== index; });
        store.setNodeCheckedByValue(newValue);
        handleChange(newValue);
    };
    var renderEmptyEle = function (width) {
        var wd = width || (selectRef.current && selectRef.current.getWidth());
        return (React.createElement("div", { className: prefixCls + "-list-empty", style: { width: wd } }, props.notFoundContent || renderEmpty('Cascader')));
    };
    var renderPopup = function () {
        var _a;
        // 远程搜索时是否以搜索面板展示搜索结果
        var panelMode = isObject(props.showSearch) ? props.showSearch.panelMode : undefined;
        var showSearchPanel = panelMode === PANEL_MODE.select
            ? true
            : panelMode === PANEL_MODE.cascader
                ? false
                : !isFunction(props.onSearch) && !!inputValue;
        var width = selectRef.current && selectRef.current.getWidth();
        var dropdownRender = isFunction(props.dropdownRender) ? props.dropdownRender : function (menu) { return menu; };
        return (React.createElement("div", { id: instancePopupID, className: cs(prefixCls + "-popup", props.dropdownMenuClassName, (_a = {},
                _a[prefixCls + "-popup-trigger-hover"] = props.expandTrigger === 'hover',
                _a)) }, dropdownRender(React.createElement("div", { className: prefixCls + "-popup-inner", onMouseDown: function (e) { return e.preventDefault(); } }, showSearchPanel ? (React.createElement(SearchPanel, { style: { minWidth: width }, store: store, inputValue: inputValue, renderEmpty: function () { return renderEmptyEle(width); }, multiple: isMultiple, onChange: function (value) {
                handleChange(value, 'panel');
            }, prefixCls: prefixCls, rtl: rtl, onEsc: function () {
                handleVisibleChange(false);
            }, renderOption: (isObject(props.showSearch) && props.showSearch.renderOption) || undefined, 
            // TODO 组件重构，解耦面板选择和输入框，面板可独立使用
            getTriggerElement: function () { var _a; return (_a = selectRef.current) === null || _a === void 0 ? void 0 : _a.dom; }, value: mergeValue, virtualListProps: props.virtualListProps, defaultActiveFirstOption: props.defaultActiveFirstOption, icons: iconsMap })) : (React.createElement(CascaderPanel, { dropdownMenuColumnStyle: props.dropdownMenuColumnStyle, virtualListProps: props.virtualListProps, expandTrigger: expandTrigger, store: store, dropdownColumnRender: props.dropdownColumnRender, renderOption: props.renderOption, changeOnSelect: props.changeOnSelect, showEmptyChildren: props.showEmptyChildren || !!props.loadMore, multiple: isMultiple, onChange: function (value) {
                handleChange(value, 'panel');
            }, loadMore: props.loadMore, prefixCls: prefixCls, rtl: rtl, getTriggerElement: function () { var _a; return (_a = selectRef.current) === null || _a === void 0 ? void 0 : _a.dom; }, renderEmpty: renderEmptyEle, popupVisible: popupVisible, value: mergeValue, renderFooter: props.renderFooter, icons: iconsMap, onEsc: function () {
                handleVisibleChange(false);
            }, onDoubleClickOption: function () {
                if (props.changeOnSelect && !isMultiple) {
                    handleVisibleChange(false);
                }
            } }))))));
    };
    var updateSelectedValues = function (value) {
        handleChange(value);
    };
    var renderView = function (eleView) {
        return (React.createElement(Trigger, __assign({ popup: renderPopup, trigger: props.trigger, disabled: disabled, getPopupContainer: getPopupContainer, position: rtl ? 'br' : 'bl', classNames: "slideDynamicOrigin", popupAlign: triggerPopupAlign, 
            // 动态加载时，unmountOnExit 默认为false。
            unmountOnExit: 'unmountOnExit' in props ? props.unmountOnExit : !isFunction(props.loadMore), popupVisible: popupVisible }, triggerProps, { onVisibleChange: handleVisibleChange }), eleView));
    };
    return children ? (renderView(children)) : (React.createElement(SelectView, __assign({}, props, { ref: selectRef, ariaControls: instancePopupID, popupVisible: popupVisible, value: isMultiple ? mergeValue : mergeValue && mergeValue[0], inputValue: inputValue, rtl: rtl, 
        // other
        isEmptyValue: isEmptyValue(mergeValue), prefixCls: prefixCls, isMultiple: isMultiple, renderText: renderText, onRemoveCheckedItem: onRemoveCheckedItem, onSort: updateSelectedValues, renderView: renderView, onClear: function (e) {
            var _a;
            e.stopPropagation();
            if (!isMultiple) {
                handleChange([]);
            }
            else {
                var nodes = store.getCheckedNodes();
                var newValue = nodes.filter(function (x) { return x.disabled; }).map(function (x) { return x.pathValue; });
                store.setNodeCheckedByValue(newValue);
                handleChange(newValue);
            }
            (_a = props.onClear) === null || _a === void 0 ? void 0 : _a.call(props, !!popupVisible);
        }, onKeyDown: function (e) {
            var _a;
            if (disabled) {
                return;
            }
            e.stopPropagation();
            var keyCode = e.keyCode || e.which;
            if (keyCode === Enter.code && !popupVisible) {
                handleVisibleChange(true);
                e.preventDefault();
            }
            if (keyCode === Tab.code && popupVisible) {
                handleVisibleChange(false);
            }
            (_a = props.onKeyDown) === null || _a === void 0 ? void 0 : _a.call(props, e);
        }, 
        // onFocus={this.onFocusInput}
        onChangeInputValue: function (v) {
            tryUpdateInputValue(v, 'manual');
            // tab键 focus 到输入框，此时下拉框未显示。如果输入值，展示下拉框
            if (!popupVisible) {
                handleVisibleChange(true);
            }
        } })));
}
var CascaderComponent = forwardRef(Cascader);
CascaderComponent.displayName = 'Cascader';
export default CascaderComponent;
