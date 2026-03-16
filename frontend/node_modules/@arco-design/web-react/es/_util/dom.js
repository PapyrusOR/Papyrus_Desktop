import { NOOP } from './constant';
export var isServerRendering = (function () {
    try {
        return !(typeof window !== 'undefined' && document !== undefined);
    }
    catch (e) {
        return true;
    }
})();
export var on = (function () {
    if (isServerRendering) {
        return NOOP;
    }
    return function (element, event, handler, options) {
        element && element.addEventListener(event, handler, options || false);
    };
})();
export var off = (function () {
    if (isServerRendering) {
        return NOOP;
    }
    return function (element, event, handler, options) {
        element && element.removeEventListener(event, handler, options || false);
    };
})();
export var contains = function (root, ele) {
    if (!root) {
        return false;
    }
    if (root.contains) {
        return root.contains(ele);
    }
    var node = ele;
    while (node) {
        if (node === root) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
};
export var isScrollElement = function (element) {
    var clientHeight = element === document.documentElement ? element.clientHeight : element.offsetHeight;
    var clientWidth = element === document.documentElement ? element.clientWidth : element.offsetWidth;
    return element.scrollHeight > clientHeight || element.scrollWidth > clientWidth;
};
/**
 * 从当前节点向上查找所有的滚动元素
 * @param container 当前节点
 * @param top 查找到 top 节点就终止，不再继续查找
 * @returns
 */
export var getScrollElements = function (container, top) {
    if (top === void 0) { top = document.documentElement; }
    var scrollElements = [];
    var element = container;
    while (element && element !== top) {
        if (isScrollElement(element)) {
            scrollElements.push(element);
        }
        element = element.parentElement;
    }
    return scrollElements;
};
