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
import scrollIntoView from 'scroll-into-view-if-needed';
import { isFunction } from './is';
export default function (node, options) {
    if (node) {
        scrollIntoView(node, __assign({ block: 'start', behavior: 'auto', scrollMode: 'if-needed' }, options));
        var height = node.offsetHeight;
        var scaleHeight = node.getBoundingClientRect().height;
        // trigger 带有scale动画，在 scrollIntoView 的时候，动画未执行完全，此时通过 getBoundingClientRect 获取到的 height 是 scale 后的高度。
        // 所以需要额外滚动一点距离。
        if (options && options.boundary && height !== scaleHeight) {
            // scrollIntoView 的 boundary是函数或者Element类型
            var parentNode = (isFunction(options.boundary) ? options.boundary(node) : options.boundary);
            parentNode.scrollTop = Math.round(parentNode.scrollTop * (height / scaleHeight));
        }
    }
}
