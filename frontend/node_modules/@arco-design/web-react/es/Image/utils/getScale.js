import { isArray } from '../../_util/is';
export var defaultScales = [
    25, 33, 50, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500,
];
var PreviewScales = /** @class */ (function () {
    function PreviewScales(scales) {
        this.updateScale(scales);
    }
    Object.defineProperty(PreviewScales.prototype, "scales", {
        get: function () {
            return this.scaleAttr;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PreviewScales.prototype, "minScale", {
        get: function () {
            return this.scaleAttr[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PreviewScales.prototype, "maxScale", {
        get: function () {
            return this.scaleAttr[this.scaleAttr.length - 1];
        },
        enumerable: false,
        configurable: true
    });
    PreviewScales.prototype.updateScale = function (scales) {
        var validScales = defaultScales;
        if (isArray(scales) && scales.filter(function (num) { return num > 0; }).length) {
            validScales = scales.filter(function (num) { return num > 0; });
        }
        validScales = validScales.map(function (num) { return +(num / 100).toFixed(2); });
        // 如果缩放比例中不含1， 则需要手动添加在最合适的位置
        if (!validScales.includes(1)) {
            var closestIndex = this.findClosestIndex(1, validScales);
            var closeSale = validScales[closestIndex];
            var addIndex = closeSale < 1 ? closestIndex + 1 : closestIndex;
            validScales.splice(addIndex, 0, 1);
        }
        this.scaleAttr = validScales;
    };
    PreviewScales.prototype.findClosestIndex = function (scale, scales) {
        if (scales === void 0) { scales = this.scaleAttr; }
        if (!scales.length)
            return;
        if (scales.length === 1)
            return 0;
        var closestIndex = scales.length - 1;
        for (var i = 0; i < scales.length; i++) {
            var current = scales[i];
            if (scale === current) {
                closestIndex = i;
                break;
            }
            if (scale < current) {
                var pre = scales[i - 1];
                closestIndex =
                    pre === undefined || Math.abs(pre - scale) <= Math.abs(current - scale) ? i - 1 : i;
                break;
            }
        }
        return closestIndex;
    };
    PreviewScales.prototype.getNextScale = function (cur, type) {
        if (type === void 0) { type = 'zoomIn'; }
        var index = this.scaleAttr.indexOf(cur);
        if (index === -1) {
            index = this.findClosestIndex(cur);
        }
        if (type === 'zoomIn') {
            return index === this.scaleAttr.length - 1 ? cur : this.scaleAttr[index + 1];
        }
        return index === 0 ? cur : this.scaleAttr[index - 1];
    };
    return PreviewScales;
}());
export default PreviewScales;
