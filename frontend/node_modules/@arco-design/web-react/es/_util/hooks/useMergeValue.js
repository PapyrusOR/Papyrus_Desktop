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
import { useState, useEffect, useRef } from 'react';
import { isUndefined } from '../is';
import usePrevious from './usePrevious';
export default function useMergeValue(defaultStateValue, props) {
    var _a = props || {}, defaultValue = _a.defaultValue, value = _a.value;
    var firstRenderRef = useRef(true);
    var prevPropsValue = usePrevious(value);
    var _b = __read(useState(!isUndefined(value) ? value : !isUndefined(defaultValue) ? defaultValue : defaultStateValue), 2), stateValue = _b[0], setStateValue = _b[1];
    useEffect(function () {
        // 第一次渲染时候，props.value 已经在useState里赋值给stateValue了，不需要再次赋值。
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        // 外部value等于undefined，也就是一开始有值，后来变成了undefined（
        // 可能是移除了value属性，或者直接传入的undefined），那么就更新下内部的值。
        // 如果value有值，在下一步逻辑中直接返回了value，不需要同步到stateValue
        /**
         *  prevPropsValue !== value: https://github.com/arco-design/arco-design/issues/1686
         *  react18 严格模式下 useEffect 执行两次，可能出现 defaultValue 不生效的问题。
         */
        if (value === undefined && prevPropsValue !== value) {
            setStateValue(value);
        }
    }, [value]);
    var mergedValue = isUndefined(value) ? stateValue : value;
    return [mergedValue, setStateValue, stateValue];
}
