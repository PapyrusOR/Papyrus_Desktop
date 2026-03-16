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
import { isServerRendering } from '../_util/dom';
import { isArray } from '../_util/is';
var defaultBoundaryDistanceValue = 0;
export var getBoundingClientRect = function (dom, options) {
    var position = options.position;
    var _a = dom.getBoundingClientRect(), width = _a.width, height = _a.height, left = _a.left, right = _a.right, top = _a.top, bottom = _a.bottom;
    var boundaryDistance = options.boundaryDistance || {};
    var boundaryDistanceLeft = ('left' in boundaryDistance && boundaryDistance.left) || defaultBoundaryDistanceValue;
    var boundaryDistanceTop = ('top' in boundaryDistance && boundaryDistance.top) || defaultBoundaryDistanceValue;
    var _left;
    var _right;
    var _top;
    var _bottom;
    if (['bottom', 'bl', 'br'].indexOf(position) > -1) {
        _top = top;
        _bottom = bottom; // y 的偏移量会体现在windowHeight 上
    }
    else {
        _top = top - boundaryDistanceTop;
        _bottom = bottom - boundaryDistanceTop;
    }
    if (['right', 'rt', 'rb'].indexOf(position) > -1) {
        _left = left; // x 偏移量会体现在windowWidth 上
        _right = right;
    }
    else {
        _left = left - boundaryDistanceLeft;
        _right = right - boundaryDistanceLeft;
    }
    return {
        width: width,
        height: height,
        left: _left,
        right: _right,
        top: _top,
        bottom: _bottom,
    };
};
// get element's position relative to root element
function getElementPosition(element, elementRect, root, options) {
    if (!root || !element || isServerRendering) {
        return { left: 0, width: 0, height: 0, top: 0 };
    }
    // safari and chrome
    var bodyScroll = function (direction) { return document.documentElement[direction] || document.body[direction]; };
    var pageScrollTop = root === document.body ? bodyScroll('scrollTop') : root.scrollTop;
    var pageScrollLeft = root === document.body ? bodyScroll('scrollLeft') : root.scrollLeft;
    var left = elementRect.left, top = elementRect.top, width = elementRect.width, height = elementRect.height;
    // custom container
    var rootLeft = root === document.body ? 0 : getBoundingClientRect(root, options).left;
    var rootTop = root === document.body ? 0 : getBoundingClientRect(root, options).top;
    var pTop = top + pageScrollTop - rootTop;
    var pLeft = left + pageScrollLeft - rootLeft;
    return {
        left: pLeft,
        top: pTop,
        width: width,
        height: height,
    };
}
var getInsideValue = function (min, max, value) {
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }
    return value;
};
var getPopupAlign = function (propsPopupAlign, showArrow) {
    var horizontalOffset = 0;
    var verticalOffset = 0;
    var resultPopupAlign = {};
    if (!showArrow) {
        resultPopupAlign = __assign({}, propsPopupAlign);
    }
    else {
        resultPopupAlign = __assign({ left: 12, right: 12, top: 12, bottom: 12 }, propsPopupAlign);
    }
    for (var key in resultPopupAlign) {
        if (isArray(resultPopupAlign[key])) {
            var index = 0;
            // top,bottom 时候，第二个参数是纵向偏移量
            if (['top', 'bottom'].indexOf(key) > -1) {
                index = 1;
                horizontalOffset = resultPopupAlign[key][0];
            }
            else {
                verticalOffset = resultPopupAlign[key][1];
            }
            resultPopupAlign[key] = resultPopupAlign[key][index];
        }
    }
    return __assign(__assign({}, resultPopupAlign), { horizontalOffset: horizontalOffset, verticalOffset: verticalOffset });
};
var getChildRect = function (child, mouseLocation, _a) {
    var boundaryDistance = _a.boundaryDistance, position = _a.position;
    return mouseLocation
        ? {
            left: mouseLocation.clientX,
            top: mouseLocation.clientY,
            width: 0,
            height: 0,
            right: mouseLocation.clientX,
            bottom: mouseLocation.clientY,
        }
        : getBoundingClientRect(child, { boundaryDistance: boundaryDistance, position: position });
};
// popup 弹出层的尺寸。 https://github.com/arco-design/arco-design/issues/2132
var getContentSize = function (content) {
    var width = content.offsetWidth;
    var height = content.offsetHeight;
    return {
        width: width,
        height: height,
    };
};
// 获取视口的宽度和高度
var getViewportSize = function (_boundaryDistance) {
    var _a, _b;
    var boundaryDistance = _boundaryDistance || {};
    var xboundaryDistance = 'left' in boundaryDistance
        ? boundaryDistance.left
        : 'right' in boundaryDistance
            ? boundaryDistance.right
            : defaultBoundaryDistanceValue;
    var yboundaryDistance = 'top' in boundaryDistance
        ? boundaryDistance.top
        : 'bottom' in boundaryDistance
            ? boundaryDistance.bottom
            : defaultBoundaryDistanceValue;
    // document.documentElement?.clientHeight 是为了排除横向滚动条的高度影响。
    var windowHeight = (((_a = document.documentElement) === null || _a === void 0 ? void 0 : _a.clientHeight) || window.innerHeight) -
        (yboundaryDistance || defaultBoundaryDistanceValue);
    var windowWidth = (((_b = document.documentElement) === null || _b === void 0 ? void 0 : _b.clientWidth) || window.innerWidth) -
        (xboundaryDistance || defaultBoundaryDistanceValue);
    return {
        windowHeight: windowHeight,
        windowWidth: windowWidth,
    };
};
export default (function (props, content, child, mountContainer, mouseLocation) {
    var autoAlignPopupWidth = props.autoAlignPopupWidth, autoAlignPopupMinWidth = props.autoAlignPopupMinWidth, alignPoint = props.alignPoint, propsStyle = props.style;
    if (!child || !content || !mountContainer) {
        return {};
    }
    var style = {};
    var boundaryDistance = (!props.alignPoint && props.boundaryDistance) || {};
    // 如果跟随鼠标，相当于鼠标位置作为 child
    var childRect = getChildRect(child, alignPoint && mouseLocation, {
        boundaryDistance: boundaryDistance,
        position: props.position,
    });
    var _a = getElementPosition(child, childRect, mountContainer, {
        boundaryDistance: boundaryDistance,
        position: props.position,
    }), left = _a.left, top = _a.top, width = _a.width, height = _a.height;
    var popupAlign = getPopupAlign(props.popupAlign, props.showArrow);
    var alignLeft = popupAlign.left || 0;
    var alignRight = popupAlign.right || 0;
    var alignTop = popupAlign.top || 0;
    var alignBottom = popupAlign.bottom || 0;
    // 通过props.style 传递的width优先级更高
    if (autoAlignPopupWidth && (propsStyle === null || propsStyle === void 0 ? void 0 : propsStyle.width) === undefined) {
        content.style.width = child.offsetWidth + "px";
    }
    if (autoAlignPopupMinWidth) {
        content.style.minWidth = child.offsetWidth + "px";
    }
    var contentSize = getContentSize(content);
    var realPosition = props.position;
    var arrowStyle = {};
    var autoPosition = function (direction) {
        if (!props.autoFitPosition) {
            return;
        }
        // document.documentElement?.clientHeight 是为了排除横向滚动条的高度影响。
        var _a = getViewportSize(boundaryDistance), windowHeight = _a.windowHeight, windowWidth = _a.windowWidth;
        var result = false; // 是否进行了位置调整
        // 视口左侧/顶部到 popupContainer 的距离
        var boundary = {
            left: left - childRect.left,
            top: top - childRect.top,
        };
        var _b = style.top, styleTop = _b === void 0 ? 0 : _b, _c = style.left, styleLeft = _c === void 0 ? 0 : _c;
        // 水平方向微调
        if (direction === 'top' || direction === 'bottom') {
            if (boundary.left > styleLeft && childRect.right > 12) {
                // 左边被遮挡
                style.left = Math.max(boundary.left, left - contentSize.width);
                style.left = Math.max(style.left, left - contentSize.width + 24);
            }
            else if (styleLeft - boundary.left + contentSize.width > windowWidth &&
                windowWidth - childRect.left > 12) {
                // 右侧被遮挡，右侧贴边。如果child在可视区内的宽度小于12，不进行位置调整
                style.left = Math.max(boundary.left, boundary.left + windowWidth - contentSize.width);
                style.left = Math.max(style.left, left - contentSize.width + 24);
            }
        }
        // 垂直方向微调
        if (direction === 'left' || direction === 'right') {
            if (boundary.top > styleTop && childRect.bottom > 12) {
                // 上面
                style.top = boundary.top;
                style.top = Math.max(style.top, top - contentSize.height + childRect.height / 2);
            }
            else if (styleTop - boundary.top + contentSize.height > windowHeight &&
                windowHeight - childRect.top > 12) {
                // 向上微调位置，如果child在可视区内的高度小于12，不进行位置调整
                style.top = Math.max(boundary.top, boundary.top + windowHeight - contentSize.height);
                style.top = Math.max(style.top, top - contentSize.height + childRect.height / 2);
            }
        }
        if (direction === 'top' && boundary.top > styleTop) {
            // 上面被遮挡，判断是否下方空间可容纳弹出层。只需要满足比上方空间大，即使小于弹出层高度，也进行位置调整。
            if (childRect.top < windowHeight - childRect.bottom) {
                // 放到下面
                style.top = Math.min(top + height + (alignTop || 0), boundary.top + windowHeight - contentSize.height);
                result = true;
            }
            else {
                // 贴顶部边界
                style.top = boundary.top;
            }
        }
        if (direction === 'bottom' && styleTop - boundary.top + contentSize.height > windowHeight) {
            // 下部分被遮挡
            if (windowHeight - childRect.bottom < childRect.top) {
                // 放到上面
                style.top = Math.max(top - contentSize.height - (alignBottom || 0), boundary.top);
                result = true;
            }
            else {
                // 贴底边界
                style.top = boundary.top + windowHeight - contentSize.height;
            }
        }
        if (direction === 'left' && boundary.left > styleLeft) {
            // 左边被遮挡
            if (childRect.left < windowWidth - childRect.right) {
                // 放到右边
                style.left = Math.min(width + left + alignRight, boundary.left + windowWidth - contentSize.width);
                result = true;
            }
            else {
                style.left = boundary.left;
            }
        }
        if (direction === 'right' && styleLeft - boundary.left + contentSize.width > windowWidth) {
            // 右边被遮挡
            if (windowWidth - childRect.right < childRect.left) {
                // 放到左边
                style.left = Math.max(left - contentSize.width - alignLeft, boundary.left);
                result = true;
            }
            else {
                // 贴左边界
                style.left = boundary.left + windowWidth - contentSize.width;
            }
        }
        // 限制在popupContainer中，左侧最小为 0px
        if (style.left < 0) {
            style.left = 0;
        }
        else {
            // 限制在popupContainer中，左侧最大为 mountContainer.scrollWidth - contentSize.width，保证弹出层在container内部
            var maxLeft = mountContainer.scrollWidth - contentSize.width;
            style.left = Math.min(maxLeft, style.left);
        }
        return result;
    };
    var horizontalOffset = popupAlign.horizontalOffset || 0;
    var verticalOffset = popupAlign.verticalOffset || 0;
    switch (props.position) {
        case 'top': {
            style.top = top - contentSize.height - alignTop;
            style.left = left + width / 2 - contentSize.width / 2;
            autoPosition('top') && (realPosition = 'bottom');
            style.left += horizontalOffset;
            var arrowLeft_1 = left - Number(style.left) + width / 2;
            arrowStyle.left = getInsideValue(12, contentSize.width - 12, arrowLeft_1);
            break;
        }
        case 'tl':
            style.top = top - contentSize.height - alignTop;
            style.left = left;
            autoPosition('top') && (realPosition = 'bl');
            style.left += horizontalOffset;
            var arrowLeft = left - Number(style.left) + Math.min(width / 2, 50);
            arrowStyle.left = getInsideValue(12, contentSize.width - 12, arrowLeft);
            break;
        case 'tr':
            style.top = -content.clientHeight + top - alignTop;
            style.left = left + width - contentSize.width;
            autoPosition('top') && (realPosition = 'br');
            style.left += horizontalOffset;
            arrowLeft = left - Number(style.left) + Math.max(width / 2, width - 50);
            arrowStyle.left = getInsideValue(12, contentSize.width - 12, arrowLeft);
            break;
        case 'bottom': {
            style.top = height + top + alignBottom;
            style.left = left + width / 2 - contentSize.width / 2;
            autoPosition('bottom') && (realPosition = 'top');
            style.left += horizontalOffset;
            var arrowLeft_2 = left - Number(style.left) + width / 2;
            arrowStyle.left = getInsideValue(12, contentSize.width - 12, arrowLeft_2);
            break;
        }
        case 'bl':
            style.top = height + top + alignBottom;
            style.left = left;
            autoPosition('bottom') && (realPosition = 'tl');
            style.left += horizontalOffset;
            arrowLeft = left - Number(style.left) + Math.min(width / 2, 50);
            arrowStyle.left = getInsideValue(12, contentSize.width - 12, arrowLeft);
            break;
        case 'br':
            style.top = height + top + alignBottom;
            style.left = left + width - contentSize.width;
            autoPosition('bottom') && (realPosition = 'tr');
            style.left += horizontalOffset;
            arrowLeft = left - Number(style.left) + Math.max(width / 2, width - 50);
            arrowStyle.left = getInsideValue(12, contentSize.width - 12, arrowLeft);
            break;
        case 'left': {
            style.top = top + height / 2 - contentSize.height / 2;
            style.left = left - contentSize.width - alignLeft;
            autoPosition('left') && (realPosition = 'right');
            style.top += verticalOffset;
            var arrowTop_1 = top - Number(style.top) + height / 2;
            arrowStyle.top = getInsideValue(12, contentSize.height - 12, arrowTop_1);
            break;
        }
        case 'lt':
            style.top = top;
            style.left = left - contentSize.width - alignLeft;
            autoPosition('left') && (realPosition = 'rt');
            style.top += verticalOffset;
            var arrowTop = top - Number(style.top) + Math.min(height / 2, 50);
            arrowStyle.top = getInsideValue(12, contentSize.height - 12, arrowTop);
            break;
        case 'lb':
            style.top = top + height - contentSize.height;
            style.left = left - contentSize.width - alignLeft;
            autoPosition('left') && (realPosition = 'rb');
            style.top += verticalOffset;
            arrowTop = top - Number(style.top) + Math.max(height / 2, height - 50);
            arrowStyle.top = getInsideValue(12, contentSize.height - 12, arrowTop);
            break;
        case 'right': {
            style.top = top + height / 2 - contentSize.height / 2;
            style.left = width + left + alignRight;
            autoPosition('right') && (realPosition = 'left');
            style.top += verticalOffset;
            var arrowTop_2 = top - Number(style.top) + height / 2;
            arrowStyle.top = getInsideValue(12, contentSize.height - 12, arrowTop_2);
            break;
        }
        case 'rt':
            style.top = top;
            style.left = width + left + alignRight;
            autoPosition('right') && (realPosition = 'lt');
            style.top += verticalOffset;
            arrowTop = top - Number(style.top) + Math.min(height / 2, 50);
            arrowStyle.top = getInsideValue(12, contentSize.height - 12, arrowTop);
            break;
        case 'rb':
            style.top = top + height - contentSize.height;
            style.left = width + left + alignRight;
            autoPosition('right') && (realPosition = 'lb');
            style.top += verticalOffset;
            arrowTop = top - Number(style.top) + Math.max(height / 2, height - 50);
            arrowStyle.top = getInsideValue(12, contentSize.height - 12, arrowTop);
            break;
        default:
            break;
    }
    return {
        style: style,
        arrowStyle: arrowStyle,
        realPosition: realPosition,
    };
});
