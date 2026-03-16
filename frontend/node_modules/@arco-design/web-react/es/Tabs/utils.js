import { Enter } from '../_util/keycode';
export var getRectDiff = function (node, parentNode) {
    var nodeRect = node.getBoundingClientRect();
    var parentRect = parentNode.getBoundingClientRect();
    var scaleX = parentNode.offsetWidth / parentRect.width;
    var scaleY = parentNode.offsetHeight / parentRect.height;
    return {
        left: (nodeRect.left - parentRect.left) * scaleX,
        top: (nodeRect.top - parentRect.top) * scaleY,
        right: (nodeRect.right - parentRect.right) * scaleX,
        bottom: (nodeRect.bottom - parentRect.bottom) * scaleY,
    };
};
// 浏览器默认行为影响，比如说input的autofocus，会导致wrapper自动滚动到focus元素
// 需要手动校准一下
// https://github.com/arco-design/arco-design/issues/422
export var updateScrollOffset = function (parentNode, direction) {
    var scrollLeft = parentNode.scrollLeft;
    var scrollTop = parentNode.scrollTop;
    if (direction === 'horizontal' && scrollLeft) {
        parentNode.scrollTo({ left: -1 * scrollLeft });
    }
    if (direction === 'vertical' && scrollTop) {
        parentNode.scrollTo({ top: -1 * scrollTop });
    }
};
export var getKeyDownEvent = function (_a) {
    var onPressEnter = _a.onPressEnter;
    return {
        onKeyDown: function (e) {
            var keyCode = e.keyCode || e.which;
            if (keyCode === Enter.code) {
                onPressEnter(e);
            }
        },
    };
};
