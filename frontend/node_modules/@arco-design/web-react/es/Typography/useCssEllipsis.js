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
import { useMemo } from 'react';
import { isUndefined } from '../_util/is';
var supportCss = function (key, value) {
    if (typeof window !== 'undefined' && window.CSS && window.CSS.supports) {
        if (!isUndefined(value)) {
            return window.CSS.supports(key, value);
        }
        return window.CSS.supports(key);
    }
    if (typeof document !== 'undefined' && document.createElement) {
        var elem = document.createElement('div');
        elem.setAttribute("style", key + ":" + value + ";");
        return typeof elem.style[key] !== 'undefined';
    }
    return false;
};
var mutiEllipsisAttr = {
    display: ' -webkit-box',
    '-webkit-line-clamp': 2,
};
var isSupportMuti = function () {
    return Object.entries(mutiEllipsisAttr).every(function (_a) {
        var _b = __read(_a, 2), key = _b[0], value = _b[1];
        return supportCss(key, value);
    });
};
function useCssEllipsis(props) {
    var cssEllipsis = props.cssEllipsis, _a = props.ellipsisStr, ellipsisStr = _a === void 0 ? '...' : _a, suffix = props.suffix, rows = props.rows;
    var simpleEllipsis = useMemo(function () {
        if (!cssEllipsis || (rows > 1 && !isSupportMuti())) {
            return false;
        }
        return ellipsisStr === '...' && !suffix;
    }, [ellipsisStr, cssEllipsis, rows, suffix]);
    var singleRowStyle = {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    };
    var mutiRowsStyle = {
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
        overflow: 'hidden',
        WebkitLineClamp: "" + props.rows,
        WebkitBoxOrient: 'vertical',
        display: '-webkit-box',
    };
    return {
        simpleEllipsis: simpleEllipsis,
        ellipsisStyle: simpleEllipsis ? (props.rows > 1 ? mutiRowsStyle : singleRowStyle) : {},
    };
}
export default useCssEllipsis;
