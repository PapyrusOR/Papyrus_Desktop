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
import React from 'react';
export var getTreeDataFromTreeChildren = function (treeChildren) {
    var loop = function (children) {
        return React.Children.map(children, function (child) {
            if (!React.isValidElement(child)) {
                return;
            }
            var key = child.key;
            return __assign(__assign({}, child.props), { key: key, children: loop(child.props.children) });
        });
    };
    return loop(treeChildren);
};
export function getChildNodeKeys(node, key2nodeProps) {
    var nodes = new Set();
    var loop = function (children) {
        children.map(function (child) {
            var key = child.key;
            var item = key2nodeProps[key];
            if (!item || item.disabled || item.disableCheckbox || item.checkable === false) {
                return;
            }
            nodes.add(key);
            loop(item.children || []);
        });
    };
    if (node) {
        loop(node.children || []);
    }
    return nodes;
}
var updateParent = function (key, key2nodeProps, allKeys, indeterminateKeysSet) {
    var pathParentKeys = __spreadArray([], __read(key2nodeProps[key].pathParentKeys), false);
    // 逐级更新父节点的状态
    pathParentKeys.reverse().some(function (itemKey) {
        var parent = key2nodeProps[itemKey];
        if (parent && !parent.disabled && !parent.disableCheckbox && parent.checkable !== false) {
            var total_1 = 0;
            var number_1 = 0;
            parent.children.some(function (_a) {
                var key = _a.key;
                var item = key2nodeProps[key];
                // 不符合可选条件
                if (!item || item.disabled || item.disableCheckbox || item.checkable === false) {
                    return false;
                }
                total_1++;
                if (allKeys.has(key)) {
                    number_1++;
                }
                else if (indeterminateKeysSet.has(key)) {
                    // 只要有一个半选，就不用再算了 ，父节点是半选
                    number_1 += 0.5;
                    return true;
                }
            });
            if (!number_1 || number_1 === total_1) {
                indeterminateKeysSet.delete(itemKey);
            }
            else {
                indeterminateKeysSet.add(itemKey);
            }
            if (number_1 && number_1 === total_1) {
                allKeys.add(itemKey);
            }
            else {
                allKeys.delete(itemKey);
            }
        }
        else {
            // 断开链接
            return true;
        }
    });
};
// also used by tree-select
export function getCheckedKeysByInitKeys(checkedKeys, key2nodeProps) {
    var checkedKeysSet = new Set(checkedKeys || []);
    var indeterminateKeysSet = new Set();
    var childCheckedKeysSet = new Set();
    checkedKeys.forEach(function (key) {
        if (!childCheckedKeysSet.has(key)) {
            var childKeys = getChildNodeKeys(key2nodeProps[key], key2nodeProps);
            // 选中了节点，就找到所有符合条件的子节点的key.自身的选中状态需要根据children判断。
            childKeys.forEach(function (v) {
                childCheckedKeysSet.add(v);
            });
        }
        if (key2nodeProps[key] &&
            !key2nodeProps[key].pathParentKeys.some(function (_key) { return checkedKeysSet.has(_key); })) {
            updateParent(key, key2nodeProps, checkedKeysSet, indeterminateKeysSet);
        }
    });
    return {
        checkedKeys: __spreadArray([], __read(new Set(__spreadArray(__spreadArray([], __read(checkedKeysSet), false), __read(childCheckedKeysSet), false))), false),
        indeterminateKeys: __spreadArray([], __read(indeterminateKeysSet), false),
    };
}
// also used by tree-select
export function getAllCheckedKeysByCheck(key, checked, checkedKeys, key2nodeProps, indeterminateKeys) {
    if (!key2nodeProps[key]) {
        return {
            checkedKeys: checkedKeys,
            indeterminateKeys: indeterminateKeys,
        };
    }
    var checkedKeysSet = new Set(checkedKeys);
    var indeterminateKeysSet = new Set(indeterminateKeys);
    var childKeys = getChildNodeKeys(key2nodeProps[key], key2nodeProps);
    var allKeys = checkedKeysSet;
    if (checked) {
        // 选中了节点，就找到所有符合条件的子节点的key.自身的选中状态需要根据children判断。
        allKeys.add(key);
        indeterminateKeysSet.delete(key);
        childKeys.forEach(function (v) {
            allKeys.add(v);
        });
    }
    else {
        indeterminateKeysSet.delete(key);
        // 移除所有符合条件的子节点的key
        allKeys.delete(key);
        childKeys.forEach(function (v) {
            allKeys.delete(v);
        });
    }
    // 之后逐级更新父节点的选中状态。
    updateParent(key, key2nodeProps, checkedKeysSet, indeterminateKeysSet);
    return {
        checkedKeys: __spreadArray([], __read(allKeys), false),
        indeterminateKeys: __spreadArray([], __read(indeterminateKeysSet), false),
    };
}
