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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
// just to resolve CssTransition findDOMNode
import React, { cloneElement, isValidElement, useMemo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { supportRef } from './is';
import { callbackOriginRef, findDOMNode } from './react-dom';
export default function ArcoCSSTransition(props) {
    var children = props.children, rest = __rest(props, ["children"]);
    var nodeRef = useRef();
    var flagRef = useRef();
    var dom = useMemo(function () {
        // 只处理 div， span 之类的 children 即可
        if (props.nodeRef === undefined && supportRef(children) && isValidElement(children)) {
            flagRef.current = true;
            return cloneElement(children, {
                ref: function (node) {
                    nodeRef.current = findDOMNode(node);
                    callbackOriginRef(children, node);
                },
            });
        }
        flagRef.current = false;
        return children;
    }, [children, props.nodeRef]);
    if (flagRef.current) {
        ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'].forEach(function (key) {
            if (props[key]) {
                rest[key] = function (_maybeNode) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    props[key].apply(props, __spreadArray([nodeRef.current], __read(args), false));
                };
            }
        });
    }
    return (React.createElement(CSSTransition, __assign({}, rest, { nodeRef: flagRef.current ? nodeRef : undefined }), dom));
}
