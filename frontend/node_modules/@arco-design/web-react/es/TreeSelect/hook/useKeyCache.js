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
import { useRef, useContext } from 'react';
import { ConfigContext } from '../../ConfigProvider';
import cs from '../../_util/classNames';
import { DefaultFieldNames } from '../interface';
import useUpdate from '../../_util/hooks/useUpdate';
import useForceUpdate from '../../_util/hooks/useForceUpdate';
var getKey2NodeProps = function (treedata, prefixCls, fieldNames) {
    var nodeList = [];
    var key2nodeProps = {};
    var currentIndex = 0;
    var loop = function (treeData, father) {
        var totalLength = treeData.length;
        return treeData.map(function (data, index) {
            var children = data[fieldNames.children];
            var key = fieldNames.key in data ? data[fieldNames.key] : ((father === null || father === void 0 ? void 0 : father._key) || '') + "-" + index;
            var nodeProps = __assign(__assign({}, data), { title: data[fieldNames.title], selectable: data[fieldNames.selectable], disabled: data[fieldNames.disabled], disableCheckbox: data[fieldNames.disableCheckbox], checkable: data[fieldNames.checkable], isLeaf: data[fieldNames.isLeaf], key: key, children: children, _key: key, parentKey: father ? father._key : undefined, pathParentKeys: (father && father.pathParentKeys) || [], _level: father._level || 0, _index: currentIndex++ });
            if (totalLength === index + 1) {
                nodeProps.className = cs(prefixCls + "-node-is-tail", nodeProps.className);
            }
            nodeList.push(nodeProps);
            key2nodeProps[key] = nodeProps;
            if (children && children.length) {
                key2nodeProps[key].children = loop(children, {
                    _key: key,
                    _level: nodeProps._level + 1,
                    pathParentKeys: __spreadArray(__spreadArray([], __read(((father === null || father === void 0 ? void 0 : father.pathParentKeys) || [])), false), [key], false),
                });
            }
            return nodeProps;
        });
    };
    loop(treedata || [], {});
    return key2nodeProps;
};
var useKeyCache = function (treeData, fieldNames) {
    var getPrefixCls = useContext(ConfigContext).getPrefixCls;
    var _fieldNames = __assign(__assign({}, DefaultFieldNames), fieldNames);
    var dispatch = useForceUpdate();
    var prefixCls = getPrefixCls('tree');
    var cache = useRef(getKey2NodeProps(treeData, prefixCls, _fieldNames));
    useUpdate(function () {
        cache.current = getKey2NodeProps(treeData, prefixCls, _fieldNames);
        dispatch();
    }, [treeData]);
    return cache.current;
};
export default useKeyCache;
