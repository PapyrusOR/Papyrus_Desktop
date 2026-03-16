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
import React, { useContext } from 'react';
import { ConfigContext } from '../ConfigProvider';
import { isNumber } from '../_util/is';
export default function DotLoading(props) {
    var getPrefixCls = useContext(ConfigContext).getPrefixCls;
    var prefixCls = getPrefixCls('spin') + "-dot";
    var dotStyle = {
        width: props.size,
        height: props.size,
    };
    var sizeNumber = props.size ? parseInt(String(props.size)) : 0;
    return (React.createElement("div", { className: prefixCls + "-list", style: {
            height: props.size,
            width: isNumber(sizeNumber) && sizeNumber > 0 ? sizeNumber * 7 : '',
        } }, __spreadArray([], __read(new Array(5)), false).map(function (_, index) {
        return React.createElement("div", { key: index, className: prefixCls, style: dotStyle });
    })));
}
