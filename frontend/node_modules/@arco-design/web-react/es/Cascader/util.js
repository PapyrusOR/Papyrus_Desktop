import { isArray } from '../_util/is';
import Store from './base/store';
export var ValueSeparator = '__arco_cascader__';
export var SHOW_PARENT = 'parent';
export var SHOW_CHILD = 'child';
export var PANEL_MODE = {
    cascader: 'cascader',
    select: 'select',
};
export function isEmptyValue(value) {
    return !value || (isArray(value) && value.length === 0);
}
export function getConfig(props) {
    return {
        showEmptyChildren: props.showEmptyChildren,
        changeOnSelect: props.changeOnSelect,
        lazyload: !!props.loadMore,
        fieldNames: props.fieldNames,
        filterOption: props.filterOption,
        showParent: props.mode === 'multiple' && !props.changeOnSelect && props.checkedStrategy === SHOW_PARENT,
    };
}
export function getStore(props, value) {
    var tmp = value ? (Array.isArray(value[0]) ? value : [value]) : [];
    return new Store(props.options || [], tmp, getConfig(props));
}
export var transformValuesToSet = function (values) {
    var _values = values || [];
    var valuesSet = _values.reduce(function (set, next) {
        // 'next' could be a string.
        set.add([].concat(next).join(ValueSeparator));
        return set;
    }, new Set());
    return valuesSet;
};
export var valueInSet = function (set, value) {
    var _value = value || [];
    return set.has(_value.join(ValueSeparator));
};
export var removeValueFromSet = function (set, value) {
    var _value = value || [];
    return set.delete(_value.join(ValueSeparator));
};
export var formatValue = function (value, isMultiple, store) {
    var _value = [];
    if (value === undefined) {
        _value = [];
    }
    else if (isMultiple) {
        _value = value;
    }
    else {
        _value = [value];
    }
    if (store && store.config.showParent) {
        var checkedNodes = store.getCheckedNodes();
        var valuesSet_1 = transformValuesToSet(checkedNodes.map(function (node) { return node.pathValue; }));
        var result_1 = [];
        var temp_1 = {};
        _value.map(function (v) {
            v.some(function (_, index, arr) {
                var curVal = arr.slice(0, index + 1);
                var pass = valueInSet(valuesSet_1, curVal);
                if (pass && !temp_1[curVal.join(ValueSeparator)]) {
                    result_1.push(curVal);
                    temp_1[curVal.join(ValueSeparator)] = 1;
                }
                return pass;
            });
        });
        return result_1;
    }
    return _value;
};
// change check status to false
var deny2Checked = function (option) {
    var deny = function (options) {
        return !Array.isArray(options)
            ? false
            : options.every(function (item) {
                if (item._checked || item.disabled) {
                    return true;
                }
                return deny(item.children);
            });
    };
    return option._halfChecked && deny(option === null || option === void 0 ? void 0 : option.children);
};
export var getMultipleCheckValue = function (propsValue, store, option, _checked) {
    var checked = _checked && deny2Checked(option) ? false : _checked;
    var beforeValueSet = store.getCheckedNodes().reduce(function (set, node) {
        set.add(node.pathValue.join(ValueSeparator));
        return set;
    }, new Set());
    option.setCheckedState(checked);
    var checkedNodes = store.getCheckedNodes();
    var currentValue = checkedNodes.map(function (node) { return node.pathValue; });
    var currentValueSet = transformValuesToSet(currentValue);
    var newValueSet = new Set();
    return propsValue
        .filter(function (v) {
        // v 不在 beforeValueSet 中，说明 v 不包含对应的option。直接返回true，不应该清除掉。
        if (!valueInSet(beforeValueSet, v) || valueInSet(currentValueSet, v)) {
            newValueSet.add(v.join(ValueSeparator));
            return true;
        }
    })
        .concat(currentValue.filter(function (v) {
        return !valueInSet(newValueSet, v);
    }));
};
