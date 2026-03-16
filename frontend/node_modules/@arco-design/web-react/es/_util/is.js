var _a, _b;
import { isValidElement } from 'react';
import ReactDOM from 'react-dom';
import { isForwardRef } from 'react-is';
var opt = Object.prototype.toString;
export function isArray(obj) {
    return opt.call(obj) === '[object Array]';
}
export function isObject(obj) {
    return opt.call(obj) === '[object Object]';
}
export function isString(obj) {
    return opt.call(obj) === '[object String]';
}
export function isNumber(obj) {
    return opt.call(obj) === '[object Number]' && obj === obj; // eslint-disable-line
}
export function isRegExp(obj) {
    return opt.call(obj) === '[object RegExp]';
}
export function isFile(obj) {
    return opt.call(obj) === '[object File]';
}
export function isBlob(obj) {
    return opt.call(obj) === '[object Blob]';
}
function isHex(color) {
    return /^#[a-fA-F0-9]{3}$|#[a-fA-F0-9]{6}$/.test(color);
}
function isRgb(color) {
    return /^rgb\((\s*\d+\s*,?){3}\)$/.test(color);
}
function isRgba(color) {
    return /^rgba\((\s*\d+\s*,\s*){3}\s*\d(\.\d+)?\s*\)$/.test(color);
}
export function isColor(color) {
    return isHex(color) || isRgb(color) || isRgba(color);
}
export function isUndefined(obj) {
    return obj === undefined;
}
export function isNull(obj) {
    return obj === null;
}
export function isNullOrUndefined(obj) {
    return obj === null || obj === undefined;
}
export function isFunction(obj) {
    return typeof obj === 'function';
}
export function isEmptyObject(obj) {
    return isObject(obj) && Object.keys(obj).length === 0;
}
export function isEmptyReactNode(content, trim) {
    if (content === null || content === undefined || content === false) {
        return true;
    }
    if (typeof content === 'string' && (trim ? content.trim() === '' : content === '')) {
        return true;
    }
    return false;
}
export function isExist(obj) {
    return obj || obj === 0;
}
export function isWindow(el) {
    return el === window;
}
export function isDayjs(time) {
    // dayjs.isDayjs 在实际应用场景，比如多个版本的 dayjs 会失效
    return (isObject(time) &&
        (('$y' in time &&
            '$M' in time &&
            '$D' in time &&
            '$d' in time &&
            '$H' in time &&
            '$m' in time &&
            '$s' in time) ||
            time._isAMomentObject) // 兼容 moment 的验证
    );
}
export function isBoolean(value) {
    return typeof value === 'boolean';
}
export var isReactComponent = function (element) {
    return element && isValidElement(element) && typeof element.type === 'function';
};
export var isClassComponent = function (element) {
    var _a;
    return isReactComponent(element) && !!((_a = element.type.prototype) === null || _a === void 0 ? void 0 : _a.isReactComponent);
};
// element 是合成的 dom 元素或者字符串，数字等
export var isDOMElement = function (element) {
    return isValidElement(element) && typeof element.type === 'string';
};
export var isReact18 = Number((_a = ReactDOM.version) === null || _a === void 0 ? void 0 : _a.split('.')[0]) > 17;
export var isReact19 = Number((_b = ReactDOM.version) === null || _b === void 0 ? void 0 : _b.split('.')[0]) > 18;
// 基本copy:  https://github.com/facebook/react/blob/main/packages/react-is/src/ReactIs.js
// 改动了点逻辑
var isForwardRefReact = function (object) {
    if (!isReact19) {
        return isForwardRef(object);
    }
    // react 19 兜底走以下逻辑
    var REACT_ELEMENT_TYPE = Symbol.for('react.element');
    // react 19 改名了
    var NEW_REACT_ELEMENT_TYPE = Symbol.for('react.transitional.element');
    var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
    if (typeof object === 'object' && object !== null) {
        var $$typeof = object.$$typeof;
        if ($$typeof === REACT_ELEMENT_TYPE || $$typeof === NEW_REACT_ELEMENT_TYPE) {
            var type = object.type;
            var $$typeofType = type && type.$$typeof;
            return $$typeofType === REACT_FORWARD_REF_TYPE;
        }
    }
    return false;
};
// 传入的元素是否可以设置 ref 饮用
export var supportRef = function (element) {
    if (isDOMElement(element)) {
        return true;
    }
    if (isForwardRefReact(element)) {
        return true;
    }
    if (isReactComponent(element)) {
        return isClassComponent(element); // 函数组件且没有被 forwardRef，无法设置 ref
    }
    return false;
};
