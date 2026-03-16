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
import { valueInSet, transformValuesToSet } from '../util';
import { isArray, isFunction, isString } from '../../_util/is';
import Node from './node';
var Store = /** @class */ (function () {
    function Store(options, value, config) {
        var _this = this;
        this.nodes = [];
        this.flatNodes = [];
        this.config = {};
        // 初始化节点状态，附加状态信息字段： _checked,_halfChecked,parent,disabled
        this._calcNodes = function (options, parent) {
            if (!options) {
                return [];
            }
            return options.map(function (option, index) {
                return new Node(__assign(__assign({}, option), { _index: index }), _this.config, parent);
            });
        };
        // this.flatNodes 保存所有可能的选中项
        this._updateFlatNodes = function () {
            var leafOnly = !_this.config.changeOnSelect;
            _this.flatNodes = [];
            var traversal = function (option) {
                if (!option)
                    return;
                // 在 loadMore 模式下，只有确实是叶子节点的才能被选中
                // 即：isLeaf 为 true，或者在懒加载模式下已经加载完成且没有子节点
                var isActualLeaf = option.isLeaf ||
                    (_this.config.lazyload &&
                        option.loaded &&
                        (!option.children || option.children.length === 0));
                if (!leafOnly || isActualLeaf) {
                    _this.flatNodes.push(option);
                }
                if (isArray(option.children)) {
                    option.children.forEach(function (x) {
                        traversal(x);
                    });
                }
            };
            _this.nodes.forEach(function (node) {
                traversal(node);
            });
        };
        /**
         * values: 全部的选中值
         * 根据values更新节点状态。不包含在values的节点都设置为未选中状态
         * @memberof Store
         */
        this.setNodeCheckedByValue = function (initValues) {
            var valuesSet = transformValuesToSet(initValues);
            // 根据value设置节点初始选中状态
            _this.flatNodes.forEach(function (node) {
                var checked = false;
                if (_this.config.showParent) {
                    if (node.pathValue.some(function (_, index, arr) { return valueInSet(valuesSet, arr.slice(0, index + 1)); })) {
                        checked = true;
                    }
                }
                else if (valueInSet(valuesSet, node.pathValue)) {
                    checked = true;
                }
                node.setCheckedStateIgnoreDisabled(checked);
            });
        };
        /**
         * 为当前节点插入子节点。动态加载时候用到
         */
        this.appendOptionChildren = function (node, children) {
            if (children && node) {
                // const checked = node._checked;
                // node.setCheckedProperty(false);
                var options = _this._calcNodes(children, node);
                node.children = options;
                // 标记节点已加载完成
                node.setLoading(false);
                _this._updateFlatNodes();
                if (_this.config.changeOnSelect) {
                    // node.setCheckedProperty(checked);
                }
                else if (node._checked && children.length > 0) {
                    // 在多选模式下，如果节点有了子节点，需要取消其选中状态
                    // 因为此时它不再是叶子节点
                    node.setCheckedState(false);
                }
            }
        };
        /**
         * 通过 value 查找对应的node节点。
         * value: 是路径节点的value组成的数组
         */
        this.findNodeByValue = function (value) {
            if (!value || !value.length) {
                return null;
            }
            var list = _this.nodes;
            var targetNode = null;
            var _loop_1 = function (i) {
                var v = value[i];
                var item = (list || []).find(function (x) { return x.value === v; });
                if (!item) {
                    return "break";
                }
                targetNode = item;
                list = item.children;
            };
            for (var i = 0; i < value.length; i++) {
                var state_1 = _loop_1(i);
                if (state_1 === "break")
                    break;
            }
            return targetNode;
        };
        /**
         * 搜索所有label含有关键字的节点
         */
        this.searchNodeByLabel = function (inputStr) {
            if (!inputStr) {
                return _this.flatNodes;
            }
            var filterOption = _this.config.filterOption;
            var filterMethod = isFunction(filterOption)
                ? filterOption
                : function (inputValue, node) {
                    return isString(node.label) && node.label.indexOf(inputValue) > -1;
                };
            return _this.flatNodes.filter(function (item) {
                var pathNodes = item.getPathNodes();
                return pathNodes.some(function (node) {
                    return filterMethod(inputStr, node._data);
                });
            });
        };
        /** 获取所有节点 */
        this.getOptions = function () {
            return _this.nodes;
        };
        /** 获取所有选中状态的节点。 aggregation: 是否聚合节点 */
        this.getCheckedNodes = function () {
            if (_this.config.showParent) {
                return _this.getCheckedParentNodes();
            }
            return _this.flatNodes.filter(function (node) {
                return node._checked;
            });
        };
        // 按照父节点纬度聚合当前所有选中节点。
        this.getCheckedParentNodes = function () {
            var result = new Set();
            _this.flatNodes.forEach(function (node) {
                if (node._checked) {
                    var pathnodes = node.getPathNodes();
                    pathnodes.some(function (node) {
                        if (node._checked) {
                            if (!result.has(node)) {
                                result.add(node);
                            }
                            return true;
                        }
                    });
                }
            });
            return Array.from(result);
        };
        this.config = __assign({}, config);
        var values = Array.isArray(value) ? value : [];
        this.nodes = this._calcNodes(options, null);
        // 根据nodes获取选中值
        this._updateFlatNodes();
        this.setNodeCheckedByValue(values);
    }
    return Store;
}());
export default Store;
