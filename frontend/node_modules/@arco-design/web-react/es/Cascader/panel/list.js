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
import React, { useState, useEffect, useCallback } from 'react';
import isEqualWith from 'lodash/isEqualWith';
import { TransitionGroup } from 'react-transition-group';
import cs from '../../_util/classNames';
import Option from './option';
import { isFunction, isObject, isString } from '../../_util/is';
import useRefs from '../../_util/hooks/useRefs';
import useForceUpdate from '../../_util/hooks/useForceUpdate';
import { ArrowDown, Esc, Enter, ArrowUp, ArrowRight, ArrowLeft } from '../../_util/keycode';
import useUpdate from '../../_util/hooks/useUpdate';
import { getMultipleCheckValue } from '../util';
import VirtualList from '../../_class/VirtualList';
import { on, off } from '../../_util/dom';
import ArcoCSSTransition from '../../_util/CSSTransition';
var getLegalActiveNode = function (options) {
    for (var index = 0; index < options.length; index++) {
        if (!options[index].disabled) {
            return options[index];
        }
    }
};
var getBaseActiveNode = function (currentNode) {
    if (currentNode && currentNode.disabled) {
        var node = currentNode;
        while (node.parent) {
            if (node.parent.disabled) {
                node = node.parent;
            }
            else {
                break;
            }
        }
        return node;
    }
    return currentNode;
};
export var getLegalIndex = function (currentIndex, maxIndex) {
    if (currentIndex < 0) {
        return maxIndex;
    }
    if (currentIndex > maxIndex) {
        return 0;
    }
    return currentIndex;
};
var ListPanel = function (props) {
    var _a;
    var _b = __read(useRefs(), 2), refWrapper = _b[0], setRefWrapper = _b[1];
    var forceUpdate = useForceUpdate();
    var store = props.store, prefixCls = props.prefixCls, value = props.value, multiple = props.multiple, renderFooter = props.renderFooter, renderOption = props.renderOption, showEmptyChildren = props.showEmptyChildren, loadMore = props.loadMore, renderEmpty = props.renderEmpty, rtl = props.rtl, icons = props.icons;
    var _c = __read(useState(store.findNodeByValue(value && value[value.length - 1]) || null), 2), activeNode = _c[0], setActiveNode = _c[1];
    var options = store.getOptions();
    var triggerChange = function (newValue) {
        props.onChange && props.onChange(newValue);
    };
    var loadData = function (option) { return __awaiter(void 0, void 0, void 0, function () {
        var options_1, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(!option.isLeaf && isFunction(loadMore) && !option.children)) return [3 /*break*/, 5];
                    option.setLoading(true);
                    forceUpdate();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, loadMore(option.pathValue, option.pathValue.length)];
                case 2:
                    options_1 = _a.sent();
                    store.appendOptionChildren(option, options_1);
                    store.setNodeCheckedByValue(props.value);
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [3 /*break*/, 4];
                case 4:
                    option.setLoading(false);
                    forceUpdate();
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var onClickOption = function (option, isEnterClick) {
        if (isEnterClick === void 0) { isEnterClick = true; }
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!option || option.disabled) {
                    return [2 /*return*/];
                }
                setActiveNode(option);
                loadData(option);
                // 在键盘上下左右键操作时,isEnterClick 是false，不触发triggerChange
                if (!multiple && isEnterClick) {
                    if (props.changeOnSelect || option.isLeaf) {
                        triggerChange([option.pathValue]);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    var onMultipleChecked = function (option, checked) {
        var newValue = getMultipleCheckValue(props.value, store, option, checked);
        if (option === activeNode) {
            // setActiveNode 不会执行rerender，需要forceupdate
            forceUpdate();
        }
        setActiveNode(option);
        if (!props.changeOnSelect) {
            // 父子节点关联，选中复选框时执行loadMore，否则直接选中父节点
            loadData(option);
        }
        triggerChange(newValue);
    };
    var scrollToActiveNode = useCallback(function (targetNode) {
        var _a;
        if (targetNode === void 0) { targetNode = activeNode; }
        var current = targetNode;
        while (current) {
            (_a = refWrapper[current._level]) === null || _a === void 0 ? void 0 : _a.scrollTo({
                index: current._index,
                options: { block: 'nearest' },
            });
            current = current._level < 1 ? null : current.parent;
        }
    }, [activeNode]);
    var handleKeyDown = useCallback(function (e) {
        // e.stopPropagation();
        // 使用keycode，避免中文输入法输入时，触发enter,space等事件。
        // p.s 中文输入时，keycode 都是229
        var keyCode = e.keyCode || e.which;
        var nextActiveNode;
        switch (keyCode) {
            case Esc.code: {
                e.preventDefault();
                props.onEsc();
                break;
            }
            case ArrowDown.code:
            case ArrowUp.code: {
                if (!activeNode) {
                    nextActiveNode = getLegalActiveNode(options);
                }
                else {
                    var baseActiveNode = getBaseActiveNode(activeNode);
                    var list = (baseActiveNode.parent && baseActiveNode.parent.children) || options;
                    var diff = keyCode === ArrowDown.code ? 1 : -1;
                    var nextIndex = getLegalIndex(baseActiveNode._index + diff, list.length - 1);
                    while (nextIndex !== baseActiveNode._index) {
                        nextActiveNode = list[nextIndex];
                        if (nextActiveNode.disabled) {
                            nextIndex = getLegalIndex(nextIndex + diff, list.length - 1);
                        }
                        else {
                            break;
                        }
                    }
                }
                scrollToActiveNode(nextActiveNode);
                onClickOption(nextActiveNode, false);
                e.preventDefault();
                return false;
            }
            case ArrowRight.code: {
                if (activeNode && !activeNode.disabled) {
                    var list = activeNode.children || [];
                    nextActiveNode = list[0] || activeNode;
                    onClickOption(nextActiveNode, false);
                }
                e.preventDefault();
                return false;
            }
            case ArrowLeft.code: {
                if (activeNode) {
                    var baseActiveNode = getBaseActiveNode(activeNode);
                    nextActiveNode = baseActiveNode.parent || baseActiveNode;
                }
                onClickOption(nextActiveNode, false);
                e.preventDefault();
                return false;
            }
            case Enter.code:
                if (activeNode) {
                    if (multiple) {
                        onMultipleChecked(activeNode, !activeNode._checked);
                    }
                    else {
                        onClickOption(activeNode);
                    }
                }
                e.preventDefault();
                return false;
            default:
                break;
        }
    }, [activeNode]);
    useUpdate(function () {
        setActiveNode(function (activeNode) {
            // store 改变时候，更新下activeNode.如果当前activeNode不存在于store里了，就设置为null
            var newActiveNode;
            if (activeNode && activeNode.pathValue && activeNode.pathValue.length) {
                var values = activeNode.pathValue;
                var parent_1 = { children: options };
                values.map(function (value) {
                    var list = parent_1.children || [];
                    var item = list.find(function (x) { return x.value === value; });
                    if (item) {
                        parent_1 = item;
                        newActiveNode = item;
                    }
                });
            }
            return newActiveNode;
        });
    }, [store]);
    useEffect(function () {
        if (props.popupVisible && options.length) {
            setTimeout(scrollToActiveNode);
        }
    }, [props.popupVisible]);
    useEffect(function () {
        var target = props.getTriggerElement();
        if (!target) {
            return;
        }
        if (props.popupVisible) {
            on(target, 'keydown', handleKeyDown);
        }
        else {
            off(target, 'keydown', handleKeyDown);
        }
        return function () {
            off(target, 'keydown', handleKeyDown);
        };
    }, [props.popupVisible, handleKeyDown]);
    var menus = (function () {
        var list = [options];
        var pathNodes = activeNode ? activeNode.getPathNodes() : [];
        pathNodes.forEach(function (option) {
            option && option.children && list.push(option.children);
        });
        return list;
    })();
    var dropdownColumnRender = isFunction(props.dropdownColumnRender)
        ? props.dropdownColumnRender
        : function (menu) { return menu; };
    return !menus.length || !((_a = menus[0]) === null || _a === void 0 ? void 0 : _a.length) ? (React.createElement(React.Fragment, null, renderEmpty())) : (React.createElement(TransitionGroup, { component: React.Fragment }, menus.map(function (list, level) {
        var _a, _b, _c;
        var footer = renderFooter ? renderFooter(level, activeNode || null) : null;
        return list.length === 0 && !showEmptyChildren ? null : (React.createElement(ArcoCSSTransition, { key: level, timeout: {
                enter: 300,
                exit: 0,
            }, classNames: "cascaderSlide", onEnter: function (e) {
                if (!e)
                    return;
                e.style.marginLeft = "-" + e.scrollWidth + "px";
            }, onEntering: function (e) {
                if (!e)
                    return;
                e.style.marginLeft = "0px";
            }, onEntered: function (e) {
                if (!e)
                    return;
                e.style.marginLeft = '';
            } },
            React.createElement("div", { className: cs(prefixCls + "-list-column", (_a = {},
                    _a[prefixCls + "-list-column-virtual"] = props.virtualListProps && props.virtualListProps.threshold !== null,
                    _a[prefixCls + "-list-column-rtl"] = rtl,
                    _a)), style: __assign({ zIndex: menus.length - level }, props.dropdownMenuColumnStyle) }, dropdownColumnRender(React.createElement("div", { className: cs(prefixCls + "-list-wrapper", (_b = {},
                    _b[prefixCls + "-list-wrapper-with-footer"] = footer !== null,
                    _b)) },
                list.length === 0 ? (renderEmpty && renderEmpty(props.virtualListProps ? '100%' : 120)) : (React.createElement(VirtualList, __assign({ needFiller: false, threshold: props.virtualListProps ? 100 : null, data: list, isStaticItemHeight: true, itemKey: "value" }, (isObject(props.virtualListProps) ? props.virtualListProps : {}), { wrapper: "ul", role: "menu", ref: function (node) { return setRefWrapper(node, level); }, className: cs(prefixCls + "-list", prefixCls + "-list-select", (_c = {},
                        _c[prefixCls + "-list-multiple"] = multiple,
                        _c[prefixCls + "-list-rtl"] = rtl,
                        _c)) }), function (option) {
                    var _a;
                    var isActive = false;
                    if (activeNode) {
                        isActive = activeNode.pathValue[level] === option.value;
                    }
                    return (React.createElement("li", { tabIndex: 0, role: "menuitem", "aria-haspopup": !option.isLeaf, "aria-expanded": isActive && !option.isLeaf, "aria-disabled": option.disabled, key: option.value, title: isString(option.label) ? option.label : undefined, className: cs(prefixCls + "-list-item", (_a = {},
                            _a[prefixCls + "-list-item-active"] = isActive,
                            _a[prefixCls + "-list-item-disabled"] = option.disabled,
                            _a)) },
                        React.createElement(Option, { prefixCls: prefixCls, rtl: rtl, multiple: multiple, option: option, 
                            // 叶子节点被选中
                            selected: !multiple &&
                                option.isLeaf &&
                                isEqualWith(props.value, option.pathValue), icons: icons, onMouseEnter: function () {
                                if (option.disabled) {
                                    return;
                                }
                                if (props.expandTrigger === 'hover') {
                                    setActiveNode(option);
                                    !option.isLeaf && loadData(option);
                                }
                            }, renderOption: renderOption &&
                                (function () {
                                    return renderOption(option._data, level);
                                }), onClickOption: function () {
                                if (option.isLeaf && multiple && !option.disableCheckbox) {
                                    onMultipleChecked(option, !option._checked);
                                }
                                else {
                                    onClickOption(option);
                                }
                            }, onMultipleChecked: function (checked) {
                                onMultipleChecked(option, checked);
                            }, onDoubleClickOption: props.onDoubleClickOption })));
                })),
                footer && (React.createElement("div", { className: prefixCls + "-list-footer", onMouseDown: function (e) {
                        // 这里是为了阻止冒泡到面板节点的onMousedown事件。因为弹出层会阻止默认行为，避免选择框失去焦点
                        // 如果这里不阻止冒泡，footer里如果渲染了input标签，将无法被focus
                        e.stopPropagation();
                    } }, footer))), level))));
    })));
};
export default ListPanel;
