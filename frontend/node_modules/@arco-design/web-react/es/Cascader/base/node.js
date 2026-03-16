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
import { DefaultFieldNames } from '../cascader';
var Node = /** @class */ (function () {
    function Node(data, config, parent) {
        var _this = this;
        /** 当前选项节点路径的所有节点的值 */
        this.pathValue = [];
        this.pathLabel = [];
        this.config = {};
        this._initNode = function (option, parent) {
            if (parent === void 0) { parent = null; }
            var _a = _this.config, showEmptyChildren = _a.showEmptyChildren, lazyload = _a.lazyload;
            var fieldNames = __assign(__assign({}, DefaultFieldNames), _this.config.fieldNames);
            var children = option[fieldNames.children];
            var isLeaf = Array.isArray(children)
                ? showEmptyChildren
                    ? false
                    : children.length === 0
                : true;
            if (lazyload) {
                if (fieldNames.isLeaf in option) {
                    isLeaf = !!option[fieldNames.isLeaf];
                }
                else {
                    isLeaf = false;
                }
            }
            var nodeValue = option[fieldNames.value];
            var nodeLabel = option[fieldNames.label];
            var newOption = __assign(__assign({}, option), { value: nodeValue, label: nodeLabel, isLeaf: isLeaf, loading: false, loaded: false, disabled: (parent && parent.disabled) || option[fieldNames.disabled], parent: parent, pathValue: parent ? __spreadArray(__spreadArray([], __read(parent.pathValue), false), [nodeValue], false) : [nodeValue], pathLabel: parent ? __spreadArray(__spreadArray([], __read(parent.pathLabel), false), [nodeLabel], false) : [nodeLabel], _level: parent ? parent._level + 1 : 0, _checked: false, _halfChecked: false });
            _this._data = __assign(__assign({}, newOption), { parent: newOption.parent && newOption.parent._data });
            Object.keys(newOption).forEach(function (key) {
                _this[key] = newOption[key];
            });
            if (children && children.length) {
                _this.children = children.map(function (data, index) {
                    return new Node(__assign(__assign({}, data), { _index: index }), _this.config, _this);
                });
                _this._data.children = _this.children.map(function (node) { return node._data; });
            }
        };
        /**
         * 根据this.children 计算是否当前node半选状态
         * 假设半选是 0.5，全选是1，不选是0。
         * 那么只有当前节点的所有children加起来等于children.length，才是全选，否则和大于0，就是半选。
         */
        this._isHalfChecked = function () {
            if (!_this.children || _this.children.length === 0) {
                return false;
            }
            var checkedLen = _this.children.reduce(function (total, prev) {
                var num = prev._halfChecked ? 0.5 : prev._checked ? 1 : 0;
                return total + num;
            }, 0);
            return checkedLen !== _this.children.length && checkedLen > 0;
        };
        /**
         *
         * @param checked 选中状态
         * @param ignoreDisabled 是否忽略节点禁用设置选中状态，一般在初始化设置选中状态时传参为true
         */
        this._setNodeChildrenChecked = function (checked, ignoreDisabled) {
            if (!ignoreDisabled && _this.disabled) {
                return;
            }
            if (_this.children && _this.children.length) {
                _this.children.forEach(function (item) {
                    if (item.disabled) {
                        if (ignoreDisabled) {
                            item.setCheckedStateIgnoreDisabled(checked);
                        }
                    }
                    else {
                        item.setCheckedState(checked);
                    }
                });
                _this.updateHalfState(checked);
            }
        };
        this.getSelfChildrenValue = function () {
            var result = [];
            var join = function (pathValue, nodes) {
                if (!nodes || !nodes.length) {
                    result.push(pathValue);
                    return;
                }
                (nodes || []).forEach(function (node) {
                    join(node.pathValue, node.children);
                });
            };
            join(_this.pathValue, _this.children);
            return result;
        };
        this.updateHalfState = function (checked) {
            _this._halfChecked = _this._isHalfChecked();
            if (_this._halfChecked) {
                // 如果是半选状态，_checked 应该为 false
                _this._checked = false;
            }
            else if (_this.children && _this.children.length > 0) {
                // 有子节点的情况：检查是否所有子节点都被选中
                var allChildrenChecked = _this.children.every(function (child) { return child._checked; });
                _this._checked = allChildrenChecked;
            }
            else if (checked && _this.config.lazyload && !_this.config.changeOnSelect) {
                // 没有子节点的情况：使用传入的 checked 值，但需要检查是否为真正的叶子节点
                var isActualLeaf = _this.isLeaf || (_this.loaded && (!_this.children || _this.children.length === 0));
                _this._checked = isActualLeaf ? checked : false;
            }
            else {
                // 没有子节点且非 loadMore 模式的情况
                _this._checked = checked;
            }
        };
        // 直接设置选中状态
        this.setCheckedProperty = function (checked) {
            // 在 loadMore 模式下，只有真正的叶子节点才能被选中
            if (checked && _this.config.lazyload && !_this.config.changeOnSelect) {
                var isActualLeaf = _this.isLeaf || (_this.loaded && (!_this.children || _this.children.length === 0));
                if (!isActualLeaf) {
                    // 如果不是真正的叶子节点，不允许设置为选中状态
                    return;
                }
            }
            _this._checked = checked;
            _this._halfChecked = false;
        };
        // 设置当前节点选中状态
        this.setCheckedState = function (checked) {
            var noNeedToUpdate = checked ? _this._checked : !_this._checked && !_this._halfChecked;
            if (_this.disabled || noNeedToUpdate) {
                return;
            }
            _this.setCheckedProperty(checked);
            // 父子节点关联
            if (!_this.config.changeOnSelect) {
                _this._setNodeChildrenChecked(checked);
                var parent_1 = _this.parent;
                while (parent_1 && !parent_1.disabled) {
                    // 当半选状态时，设置_checked为false。保证点击半选状态的节点时，执行选中操作。
                    parent_1.updateHalfState(checked);
                    parent_1 = parent_1.parent;
                }
            }
        };
        // 忽略禁用设置选中状态
        this.setCheckedStateIgnoreDisabled = function (checked) {
            if (checked === Boolean(_this._checked)) {
                return;
            }
            _this.setCheckedProperty(checked);
            if (!_this.config.changeOnSelect) {
                _this._setNodeChildrenChecked(checked, true);
                var parent_2 = _this.parent;
                while (parent_2) {
                    // 当半选状态时，设置_checked为false。保证点击半选状态的节点时，执行选中操作。
                    parent_2.updateHalfState(checked);
                    parent_2 = parent_2.parent;
                }
            }
        };
        /**
         * 遍历节点的parent，获取当前节点的路径节点。
         * node: { label: '1-1-1', parent: { label: '1-1', parent: { label: '1' }, ... }, ...}
         * @return [node.parent.parent, node.parent, node]
         * @memberof Store
         */
        this.getPathNodes = function () {
            var nodes = [_this];
            var parent = _this.parent;
            while (parent) {
                nodes.unshift(parent);
                parent = parent.parent;
            }
            return nodes;
        };
        this.getChildren = function () {
            return _this.children;
        };
        this.setLoading = function (loading) {
            _this.loading = loading;
            if (loading || loading === undefined) {
                _this.loaded = false;
            }
            if (loading === false) {
                _this.loaded = true;
            }
        };
        this.config = config || {};
        this._initNode(data, parent || null);
    }
    return Node;
}());
export default Node;
