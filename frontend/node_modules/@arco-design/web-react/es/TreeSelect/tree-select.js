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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
import React, { forwardRef, useContext, useEffect, useRef, useState, useImperativeHandle, useMemo, useCallback, } from 'react';
import debounce from 'lodash/debounce';
import useStateValue, { parseValue } from './hook/useStateValue';
import { normalizeValueToArray } from './utils';
import { isArray, isFunction, isNullOrUndefined, isObject } from '../_util/is';
import Trigger from '../Trigger';
import Tree from '../Tree';
import { ConfigContext } from '../ConfigProvider';
import { getAllCheckedKeysByCheck } from '../Tree/util';
import SelectView from '../_class/select-view';
import { DefaultFieldNames, } from './interface';
import useTreeData from './hook/useTreeData';
import useKeyCache from './hook/useKeyCache';
import TreeList from './tree-list';
import useMergeValue from '../_util/hooks/useMergeValue';
import cs from '../_util/classNames';
import useMergeProps from '../_util/hooks/useMergeProps';
import useIsFirstRender from '../_util/hooks/useIsFirstRender';
import useId from '../_util/hooks/useId';
function isEmptyValue(value) {
    return (!value ||
        (isArray(value) && value.length === 0) ||
        (isObject(value) && Object.keys(value).length === 0));
}
var defaultProps = {
    bordered: true,
    treeCheckedStrategy: Tree.SHOW_CHILD,
    fieldNames: DefaultFieldNames,
};
var triggerPopupAlign = { bottom: 4 };
var TreeSelect = function (baseProps, ref) {
    var _a = useContext(ConfigContext), getPrefixCls = _a.getPrefixCls, renderEmpty = _a.renderEmpty, componentConfig = _a.componentConfig, rtl = _a.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.TreeSelect);
    var refIsFirstRender = useIsFirstRender();
    var triggerRef = useRef();
    var treeRef = useRef(null);
    var refSelectView = useRef(null);
    var indeterminateKeys = useRef([]);
    var _b = __read(useTreeData(props), 1), treeData = _b[0];
    var key2nodeProps = useKeyCache(treeData, props.fieldNames);
    var _c = __read(useState(), 2), hitKeys = _c[0], setHitKeys = _c[1];
    var _d = __read(useMergeValue(false, {
        value: props.popupVisible,
    }), 2), popupVisible = _d[0], setPopupVisible = _d[1];
    var _e = __read(useMergeValue(undefined, // Compatible with previous behavior 'undefined as default'
    {
        value: 'inputValue' in props ? props.inputValue || '' : undefined,
    }), 2), inputValue = _e[0], setInputValue = _e[1];
    // 触发 onInputValueChange 回调的值
    var refOnInputChangeCallbackValue = useRef(inputValue);
    // 触发 onInputValueChange 回调的原因
    var refOnInputChangeCallbackReason = useRef(null);
    var onInputValueChange = props.onInputValueChange;
    var _f = __read(useStateValue(props, key2nodeProps, indeterminateKeys), 2), value = _f[0], setValue = _f[1];
    var multiple = props.multiple || props.treeCheckable;
    var prefixCls = getPrefixCls('tree-select');
    var isFilterNode = inputValue && !isFunction(props.onSearch);
    // Unique ID of this select instance
    var instancePopupID = useId(prefixCls + "-popup-");
    var tryUpdatePopupVisible = function (visible) {
        var _a;
        if (visible !== popupVisible) {
            setPopupVisible(visible);
            (_a = props.onVisibleChange) === null || _a === void 0 ? void 0 : _a.call(props, visible);
        }
    };
    // 尝试更新 inputValue，并触发 onInputValueChange
    var tryUpdateInputValue = function (value, reason) {
        if (value !== refOnInputChangeCallbackValue.current ||
            reason !== refOnInputChangeCallbackReason.current) {
            setInputValue(value);
            refOnInputChangeCallbackValue.current = value;
            refOnInputChangeCallbackReason.current = reason;
            onInputValueChange && onInputValueChange(value, reason);
        }
    };
    var handleSearch = useCallback(function (inputText) {
        var search = debounce(function (inputText) { return __awaiter(void 0, void 0, void 0, function () {
            var hitKeys;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isFunction(props.onSearch)) return [3 /*break*/, 2];
                        return [4 /*yield*/, props.onSearch(inputText)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        if (!inputText)
                            return [2 /*return*/, treeData];
                        hitKeys = new Set();
                        Object.keys(key2nodeProps).forEach(function (key) {
                            var nodeProps = key2nodeProps[key];
                            var isHit = false;
                            if (isFunction(props.filterTreeNode)) {
                                // @ts-ignore
                                if (props.filterTreeNode(inputText, React.createElement(Tree.Node, __assign({}, nodeProps)))) {
                                    isHit = true;
                                }
                            }
                            else {
                                var text = nodeProps.value || nodeProps._key;
                                if (text && text.indexOf(inputText) > -1) {
                                    isHit = true;
                                }
                            }
                            if (isHit) {
                                hitKeys.add(nodeProps.key);
                            }
                        });
                        setHitKeys(hitKeys);
                        return [2 /*return*/];
                }
            });
        }); }, 100);
        return search(inputText);
    }, [props.onSearch, treeData, key2nodeProps, props.filterTreeNode]);
    var resetInputValue = useCallback(function () {
        // 多选选中值时候不清除搜索文本
        var retainInputValueWhileSelect = true;
        if (isObject(props.showSearch)) {
            retainInputValueWhileSelect = props.showSearch.retainInputValueWhileSelect !== false;
        }
        // default scene: inputValue = refOnInputChangeCallbackValue =  undefined
        // if updateTo ''，will trigger an unnecessary onsearch
        if (props.multiple && !retainInputValueWhileSelect && inputValue !== undefined) {
            tryUpdateInputValue('', 'optionChecked');
        }
    }, [inputValue, props.multiple, JSON.stringify(props.showSearch)]);
    var triggerChange = useCallback(function (newValue, extra) {
        setValue(newValue, extra);
        resetInputValue();
        if (!multiple) {
            tryUpdatePopupVisible(false);
        }
    }, [setValue, resetInputValue, popupVisible]);
    var handleRemoveCheckedItem = function (item, index, e) {
        e.stopPropagation();
        if (item.disabled) {
            return;
        }
        var itemValue = isObject(item.value) ? item.value.value : item.value;
        if (!props.treeCheckable || props.treeCheckStrictly || !key2nodeProps[itemValue]) {
            var newValue = value.filter(function (_, i) { return i !== index; });
            triggerChange(newValue, {
                trigger: key2nodeProps[itemValue] || item,
                checked: false,
                selected: false,
            });
            return;
        }
        var result = getAllCheckedKeysByCheck(itemValue, false, normalizeValueToArray(value), key2nodeProps, indeterminateKeys.current);
        indeterminateKeys.current = result.indeterminateKeys;
        triggerChange(parseValue(result.checkedKeys, key2nodeProps, value), {
            trigger: key2nodeProps[itemValue],
            checked: false,
            selected: false,
        });
    };
    useEffect(function () {
        inputValue !== undefined && handleSearch(inputValue);
        if (inputValue !== refOnInputChangeCallbackValue.current) {
            refOnInputChangeCallbackValue.current = inputValue;
        }
    }, [inputValue]);
    var searchKeys = useMemo(function () {
        var newKeys = [];
        if (inputValue) {
            for (var key in key2nodeProps) {
                var item = key2nodeProps[key];
                var pathKeys = __spreadArray(__spreadArray([], __read(item.pathParentKeys), false), [key], false);
                if (pathKeys.some(function (_key) { return hitKeys && hitKeys.has(_key); })) {
                    newKeys = newKeys.concat(pathKeys);
                }
            }
        }
        return Array.from(new Set(newKeys));
    }, [inputValue, key2nodeProps, hitKeys]);
    useEffect(function () {
        if (popupVisible) {
            setTimeout(function () {
                var target = value[0];
                if (treeRef.current && target) {
                    treeRef.current.scrollIntoView(target.value);
                }
            });
        }
        else if (!refIsFirstRender) {
            inputValue && tryUpdateInputValue('', 'optionListHide');
        }
    }, [popupVisible]);
    useImperativeHandle(ref, function () { return ({
        focus: function () {
            refSelectView.current && refSelectView.current.focus();
        },
        blur: function () {
            refSelectView.current && refSelectView.current.blur();
        },
        getRootDOMNode: function () {
            var _a, _b;
            return (_b = (_a = refSelectView.current) === null || _a === void 0 ? void 0 : _a.getRootDOMNode) === null || _b === void 0 ? void 0 : _b.call(_a);
        },
    }); });
    var filterNode = useCallback(function (node) {
        return isFilterNode ? searchKeys.indexOf(node._key) > -1 : true;
    }, [isFilterNode, searchKeys]);
    var renderText = useCallback(function (val) {
        var _a = val || {}, disabled = _a.disabled, value = _a.value;
        var label = val === null || val === void 0 ? void 0 : val.label;
        if (isFunction(props.renderFormat)) {
            label = props.renderFormat(key2nodeProps[value] || null, props.labelInValue ? val : value);
        }
        return { text: label || value || '', disabled: disabled };
    }, [props.renderFormat, props.labelInValue, key2nodeProps]);
    var tryUpdateSelectValue = function (value) {
        setValue(value, {});
    };
    var renderView = function (eleView) {
        return (React.createElement(Trigger, __assign({ autoAlignPopupWidth: false, autoAlignPopupMinWidth: true, ref: triggerRef, classNames: "slideDynamicOrigin", trigger: "click", position: "bl", getPopupContainer: props.getPopupContainer, popupAlign: triggerPopupAlign, unmountOnExit: props.unmountOnExit }, props.triggerProps, { className: cs(prefixCls + "-trigger", props.triggerProps && props.triggerProps.className), popup: function () {
                var _a;
                var _b, _c, _d;
                var dropdownRender = props.dropdownRender;
                var dom = (isFilterNode && isEmptyValue(searchKeys)) || isEmptyValue(treeData) ? (props.notFoundContent || renderEmpty('TreeSelect')) : (React.createElement(TreeList, __assign({ prefixCls: prefixCls, ref: treeRef }, props, { inputValue: inputValue, filterNode: filterNode, value: value, onChange: triggerChange, multiple: multiple, treeData: treeData })));
                return (React.createElement("div", { id: instancePopupID, className: cs(prefixCls + "-popup", (_a = {}, _a[prefixCls + "-rtl-popup"] = rtl, _a)), style: __assign({ maxHeight: ((_b = props.treeProps) === null || _b === void 0 ? void 0 : _b.height) || ((_d = (_c = props.treeProps) === null || _c === void 0 ? void 0 : _c.virtualListProps) === null || _d === void 0 ? void 0 : _d.height)
                            ? 'unset'
                            : '' }, props.dropdownMenuStyle) }, isFunction(dropdownRender) ? dropdownRender(dom) : dom));
            }, disabled: props.disabled, onVisibleChange: function (visible) {
                tryUpdatePopupVisible(visible);
                // props.onVisibleChange && props.onVisibleChange(visible);
            }, popupVisible: popupVisible }), eleView));
    };
    var customTriggerElement = typeof props.triggerElement === 'function'
        ? (function () {
            var _a;
            var valueForCallback;
            if (multiple) {
                valueForCallback = value.map(function (x) {
                    return props.labelInValue ? { label: x.label, value: x.value } : x.value;
                });
            }
            else {
                valueForCallback = props.labelInValue ? value[0] : (_a = value[0]) === null || _a === void 0 ? void 0 : _a.value;
            }
            return props.triggerElement({ value: valueForCallback });
        })()
        : props.triggerElement;
    return !isNullOrUndefined(customTriggerElement) ? (renderView(customTriggerElement)) : (React.createElement(SelectView, __assign({ ref: refSelectView, rtl: rtl, ariaControls: instancePopupID }, props, { popupVisible: popupVisible, value: !multiple && isArray(value) ? value[0] : value, inputValue: inputValue, 
        // other
        isEmptyValue: isEmptyValue(value), prefixCls: prefixCls, isMultiple: multiple, renderText: renderText, onSort: tryUpdateSelectValue, onRemoveCheckedItem: handleRemoveCheckedItem, onClear: function (e) {
            var _a;
            e.stopPropagation();
            triggerChange([], {});
            (_a = props.onClear) === null || _a === void 0 ? void 0 : _a.call(props, !!popupVisible);
        }, onKeyDown: function (e) {
            var _a;
            e.stopPropagation();
            (_a = props.onKeyDown) === null || _a === void 0 ? void 0 : _a.call(props, e);
        }, onFocus: function (e) {
            e && e.stopPropagation();
        }, onChangeInputValue: function (value) {
            tryUpdateInputValue(value, 'manual');
        }, renderView: renderView })));
};
var ForwardRefTreeSelect = forwardRef(TreeSelect);
var TreeSelectComponent = ForwardRefTreeSelect;
TreeSelectComponent.displayName = 'TreeSelect';
TreeSelectComponent.Node = Tree.Node;
TreeSelectComponent.SHOW_ALL = Tree.SHOW_ALL;
TreeSelectComponent.SHOW_PARENT = Tree.SHOW_PARENT;
TreeSelectComponent.SHOW_CHILD = Tree.SHOW_CHILD;
export default TreeSelectComponent;
