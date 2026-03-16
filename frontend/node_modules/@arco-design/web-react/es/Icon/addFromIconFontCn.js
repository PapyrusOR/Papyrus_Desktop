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
import * as React from 'react';
import Icon from './index';
import { isServerRendering } from '../_util/dom';
var scriptUrlCache = [];
export default function addFromIconFontCn(options) {
    if (options === void 0) { options = {}; }
    var src = options.src, _a = options.extraProps, extraProps = _a === void 0 ? {} : _a;
    if (!isServerRendering &&
        typeof src === 'string' &&
        src.length &&
        scriptUrlCache.indexOf(src) === -1) {
        var script = document.createElement('script');
        script.setAttribute('src', src);
        script.setAttribute('data-namespace', src);
        scriptUrlCache.push(src);
        document.body.appendChild(script);
    }
    var Iconfont = React.forwardRef(function (props, ref) {
        var type = props.type, children = props.children, restProps = __rest(props, ["type", "children"]);
        var iconRef = React.useRef();
        React.useImperativeHandle(ref, function () { return iconRef.current; });
        var content;
        if (type) {
            content = React.createElement("use", { xlinkHref: "#" + type });
        }
        if (children) {
            content = children;
        }
        return (React.createElement(Icon, __assign({ type: type }, restProps, extraProps, { ref: function (node) {
                iconRef.current = node;
            } }), content));
    });
    Iconfont.displayName = 'Iconfont';
    return Iconfont;
}
