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
import { useState } from 'react';
import usePrevious from '../../_util/hooks/usePrevious';
import { getTreeDataFromTreeChildren } from '../../Tree/util';
import useUpdate from '../../_util/hooks/useUpdate';
export default function useTreeData(props) {
    var prevProps = usePrevious(props) || {};
    var getData = function () {
        return props.treeData || getTreeDataFromTreeChildren(props.children);
    };
    var _a = __read(useState(getData()), 2), treeData = _a[0], setTreeData = _a[1];
    useUpdate(function () {
        if (props.treeData !== prevProps.treeData || props.children !== prevProps.children) {
            setTreeData(getData());
        }
    }, [props]);
    return [treeData];
}
