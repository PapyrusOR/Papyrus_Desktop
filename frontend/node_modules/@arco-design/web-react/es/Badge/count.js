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
import React, { useState } from 'react';
import cs from '../_util/classNames';
import usePrevious from '../_util/hooks/usePrevious';
import ArcoCSSTransition from '../_util/CSSTransition';
function Count(_a) {
    var _b;
    var prefixCls = _a.prefixCls, maxCount = _a.maxCount, count = _a.count, className = _a.className, style = _a.style;
    var _c = __read(useState(false), 2), isEntered = _c[0], setIsEntered = _c[1];
    var oldCount = usePrevious(count);
    var isChanged = count !== oldCount;
    return (React.createElement(ArcoCSSTransition, { classNames: "badge-zoom", in: count > 0, timeout: 300, appear: true, mountOnEnter: true, unmountOnExit: true, onEntered: function () {
            setIsEntered(true);
        } },
        React.createElement("span", { className: className, style: style },
            React.createElement("span", { key: count, className: cs((_b = {}, _b[prefixCls + "-number-text"] = isEntered && isChanged, _b)) }, maxCount && count > maxCount ? maxCount + "+" : count))));
}
export default Count;
