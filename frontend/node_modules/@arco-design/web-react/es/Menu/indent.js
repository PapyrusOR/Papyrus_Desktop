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
import MenuContext from './context';
export default function MenuIndent(props) {
    var prefixCls = props.prefixCls, levelIndent = props.levelIndent;
    var collapse = useContext(MenuContext).collapse;
    var level = props.level - 1;
    return !collapse && level > 0 ? (React.createElement("span", null, __spreadArray([], __read(new Array(level)), false).map(function (_, index) {
        return (React.createElement("span", { key: index, className: prefixCls + "-indent", style: { width: levelIndent } }));
    }))) : null;
}
