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
import * as React from 'react';
/**
 * Create visual height for content
 */
var Filler = function (_a) {
    var height = _a.height, offset = _a.offset, children = _a.children, propsOuterStyle = _a.outerStyle, propsInnerStyle = _a.innerStyle;
    var outerStyle = {};
    var innerStyle = {
        display: 'flex',
        flexDirection: 'column',
    };
    if (offset !== undefined) {
        outerStyle = __assign({ height: height, position: 'relative', overflow: 'hidden', zIndex: 0 }, propsOuterStyle);
        innerStyle = __assign(__assign(__assign({}, innerStyle), { transform: "translateY(" + offset + "px)", position: 'absolute', left: 0, right: 0, top: 0 }), propsInnerStyle);
    }
    else {
        outerStyle = __assign({}, propsOuterStyle);
        innerStyle = __assign(__assign({}, innerStyle), propsInnerStyle);
    }
    return (React.createElement("div", { style: outerStyle },
        React.createElement("div", { style: innerStyle }, children)));
};
export default Filler;
