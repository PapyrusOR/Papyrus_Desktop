import BTween from 'b-tween';
import { isString, isWindow } from '../_util/is';
export function findNode(dom, selector) {
    // handle id start with number
    // e.g. id #123
    var s = isString(selector) && selector[0] === '#' ? "[id='" + selector.replace('#', '') + "']" : selector;
    try {
        return dom.querySelector(s);
    }
    catch (e) {
        console.error(e);
        return null;
    }
}
export function slide(el, top, cb) {
    var tween = new BTween({
        from: {
            scrollTop: el.scrollTop,
        },
        to: {
            scrollTop: top,
        },
        easing: 'quartOut',
        duration: 300,
        onUpdate: function (keys) {
            el.scrollTop = keys.scrollTop;
        },
        onFinish: function () {
            cb === null || cb === void 0 ? void 0 : cb();
        },
    });
    tween.start();
}
export function getContainer(targetContainer) {
    if (isString(targetContainer)) {
        return findNode(document, targetContainer);
    }
    return targetContainer || window;
}
export function getContainerElement(scrollContainer) {
    return isWindow(scrollContainer) ? document.documentElement || document.body : scrollContainer;
}
