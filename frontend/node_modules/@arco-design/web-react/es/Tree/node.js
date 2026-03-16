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
import React, { forwardRef, useContext, useRef, useState, useCallback, } from 'react';
import Checkbox from '../Checkbox';
import cs from '../_util/classNames';
import { isFunction } from '../_util/is';
import IconCaretDown from '../../icon/react-icon/IconCaretDown';
import IconDragDotVertical from '../../icon/react-icon/IconDragDotVertical';
import IconLoading from '../../icon/react-icon/IconLoading';
import IconFile from '../../icon/react-icon/IconFile';
import { ConfigContext } from '../ConfigProvider';
import IconHover from '../_class/icon-hover';
import { TreeContext } from './context';
import AnimationNode from './animation';
import throttleByRaf from '../_util/throttleByRaf';
function TreeNode(props, ref) {
    var _a, _b, _c;
    var _this = this;
    var treeContext = useContext(TreeContext);
    var getPrefixCls = useContext(ConfigContext).getPrefixCls;
    // const prevProps: NodeProps = usePrevious(props) || {};
    var nodeTitleRef = useRef();
    var _d = __read(useState({
        isAllowDrop: true,
        isDragOver: false,
        dragPosition: 0,
        isDragging: false,
    }), 2), state = _d[0], setState = _d[1];
    var _e = props._key, _key = _e === void 0 ? '' : _e, title = props.title, icon = props.icon, checkable = props.checkable, selected = props.selected, disabled = props.disabled, disableCheckbox = props.disableCheckbox, isLeaf = props.isLeaf, draggable = props.draggable, expanded = props.expanded, showLine = props.showLine, loading = props.loading, _f = props.selectable, selectable = _f === void 0 ? true : _f;
    var prefixCls = getPrefixCls('tree-node');
    var classNames = cs(prefixCls, (_a = {},
        _a[prefixCls + "-selected"] = selected,
        _a[prefixCls + "-is-leaf"] = isLeaf,
        _a[prefixCls + "-expanded"] = expanded,
        _a[prefixCls + "-disabled-selectable"] = !selectable,
        _a[prefixCls + "-disabled"] = disabled,
        _a[prefixCls + "-draggable"] = draggable,
        _a), props.className);
    var icons = (function () {
        var treeIcons = isFunction(treeContext.icons) ? treeContext.icons(props) : treeContext.icons;
        var propsIcons = isFunction(props.icons) ? props.icons(props) : props.icons;
        return __assign(__assign({}, treeIcons), propsIcons);
    })();
    var setExpand = useCallback(function (newExpand) {
        if (newExpand === expanded) {
            return;
        }
        treeContext.onExpand && treeContext.onExpand(newExpand, _key);
    }, [expanded, treeContext.onExpand]);
    var switchExpandStatus = useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var isLeaf, expanded;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    isLeaf = props.isLeaf, expanded = props.expanded;
                    if (isLeaf) {
                        return [2 /*return*/];
                    }
                    if (!(!((_a = props.childrenData) === null || _a === void 0 ? void 0 : _a.length) && isFunction(treeContext.loadMore) && !expanded)) return [3 /*break*/, 2];
                    return [4 /*yield*/, treeContext.loadMore(props)];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    setExpand(!expanded);
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); }, [props, setExpand, treeContext.loadMore]);
    var getPrefixIcon = function () {
        if (loading) {
            return 'loadingIcon' in icons ? icons.loadingIcon : React.createElement(IconLoading, null);
        }
        var icon = null;
        var needIconHover = false;
        if (!isLeaf) {
            var defaultIcon = showLine ? (React.createElement("span", { className: prefixCls + "-" + (expanded ? 'minus' : 'plus') + "-icon" })) : (React.createElement(IconCaretDown, null));
            icon = 'switcherIcon' in icons ? icons.switcherIcon : defaultIcon;
            needIconHover = !showLine;
        }
        else if (showLine) {
            icon = 'switcherIcon' in icons ? icons.switcherIcon : React.createElement(IconFile, null);
            needIconHover = true;
        }
        if (icon) {
            icon = (React.createElement("span", { className: prefixCls + "-switcher-icon", "aria-label": expanded ? 'fold button' : 'expand button', role: "button", tabIndex: 0, onClick: switchExpandStatus }, icon));
            return needIconHover ? React.createElement(IconHover, { prefix: prefixCls }, icon) : icon;
        }
    };
    var updateDragOverState = useCallback(throttleByRaf(function (e) {
        var dom = nodeTitleRef.current;
        if (!dom)
            return;
        var rect = dom.getBoundingClientRect();
        var offsetY = window.pageYOffset + rect.top;
        var pageY = e.pageY;
        var gapHeight = rect.height / 4;
        var diff = pageY - offsetY;
        var position = diff < gapHeight ? -1 : diff < rect.height - gapHeight ? 0 : 1;
        var isAllowDrop = treeContext.allowDrop(props, position);
        setState(__assign(__assign({}, state), { isAllowDrop: isAllowDrop, isDragOver: true, dragPosition: position }));
        treeContext.onNodeDragOver && treeContext.onNodeDragOver(e, props, position);
    }), [treeContext.onNodeDragOver]);
    var handleCheck = useCallback(function (checked, e) {
        var disableCheckbox = props.disableCheckbox, disabled = props.disabled;
        if (disableCheckbox || disabled) {
            return;
        }
        treeContext.onCheck && treeContext.onCheck(checked, _key, e);
    }, [props.disabled, props.disableCheckbox]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { style: props.style, className: classNames, ref: ref, role: "treeitem", "aria-disabled": disabled, "aria-expanded": expanded, "aria-level": props._level },
            React.createElement("span", { className: prefixCls + "-indent", "aria-hidden": true }, __spreadArray([], __read(Array(props._level)), false).map(function (_, i) {
                var _a;
                return (React.createElement("span", { className: cs(prefixCls + "-indent-block", (_a = {},
                        _a[prefixCls + "-indent-block-lineless"] = props._lineless && props._lineless[i],
                        _a)), key: i }));
            })),
            React.createElement("span", { className: cs(prefixCls + "-switcher", (_b = {},
                    _b[prefixCls + "-switcher-expanded"] = expanded,
                    _b)) }, getPrefixIcon()),
            checkable ? (React.createElement(Checkbox, { disabled: disableCheckbox || disabled, value: _key, indeterminate: props.indeterminated, checked: props.checked, onChange: handleCheck })) : null,
            React.createElement("span", { "aria-grabbed": state.isDragging, ref: nodeTitleRef, className: cs(prefixCls + "-title", (_c = {},
                    _c[prefixCls + "-title-draggable"] = draggable,
                    _c[prefixCls + "-title-gap-top"] = state.isDragOver && state.isAllowDrop && state.dragPosition < 0,
                    _c[prefixCls + "-title-gap-bottom"] = state.isDragOver && state.isAllowDrop && state.dragPosition > 0,
                    _c[prefixCls + "-title-highlight"] = !state.isDragging &&
                        state.isDragOver &&
                        state.isAllowDrop &&
                        state.dragPosition === 0,
                    _c[prefixCls + "-title-dragging"] = state.isDragging,
                    _c[prefixCls + "-title-block"] = props.blockNode,
                    _c)), onClick: function (e) {
                    var onSelect = treeContext.onSelect, actionOnClick = treeContext.actionOnClick;
                    if (!props.disabled) {
                        var actions = [].concat(actionOnClick);
                        if (selectable && actions.indexOf('select') > -1) {
                            onSelect && onSelect(_key, e);
                        }
                        if (actions.indexOf('expand') > -1) {
                            switchExpandStatus();
                        }
                        if (checkable && actions.indexOf('check') > -1) {
                            handleCheck(!props.checked, e);
                        }
                    }
                }, draggable: draggable, onDrop: function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    treeContext.onNodeDrop && treeContext.onNodeDrop(e, props, state.dragPosition);
                    updateDragOverState.cancel();
                    setState(__assign(__assign({}, state), { isDragOver: false, dragPosition: 0 }));
                }, onDragStart: function (e) {
                    if (!draggable)
                        return;
                    e.stopPropagation();
                    // 当前节点正在被拖拽
                    setState(__assign(__assign({}, state), { isDragging: true }));
                    try {
                        // ie throw error
                        // firefox-need-it
                        e.dataTransfer.setData('text/plain', '');
                    }
                    catch (error) {
                        // empty
                    }
                    treeContext.onNodeDragStart && treeContext.onNodeDragStart(e, props);
                }, onDragEnd: function (e) {
                    if (!draggable)
                        return;
                    e.stopPropagation();
                    updateDragOverState.cancel();
                    setState(__assign(__assign({}, state), { isDragOver: false, isDragging: false }));
                    treeContext.onNodeDragEnd && treeContext.onNodeDragEnd(e, props);
                }, onDragOver: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.persist();
                    updateDragOverState(e);
                }, onDragLeave: function (e) {
                    if (!draggable)
                        return;
                    e.stopPropagation();
                    updateDragOverState.cancel();
                    setState(__assign(__assign({}, state), { isDragOver: false }));
                    treeContext.onNodeDragLeave && treeContext.onNodeDragLeave(e, props);
                } },
                icon && React.createElement("span", { className: prefixCls + "-icon " + prefixCls + "-custom-icon" }, icon),
                React.createElement("span", { className: prefixCls + "-title-text" }, isFunction(treeContext.renderTitle) ? treeContext.renderTitle(props) : title),
                draggable && (React.createElement("span", { className: prefixCls + "-icon " + prefixCls + "-drag-icon" }, 'dragIcon' in icons ? icons.dragIcon : React.createElement(IconDragDotVertical, null)))),
            isFunction(treeContext.renderExtra) && treeContext.renderExtra(props)),
        treeContext.animation && React.createElement(AnimationNode, __assign({}, props))));
}
var TreeNodeComponent = forwardRef(TreeNode);
TreeNodeComponent.displayName = 'TreeNode';
export default React.memo(TreeNodeComponent);
