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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
import merge from 'lodash/merge';
import { useEffect, useRef, useState } from 'react';
import { isServerRendering } from '../../_util/dom';
import { getPixelRatio } from './utils';
import { isNumber } from '../../_util/is';
var toNumber = function (value, defaultValue) {
    if (isNumber(value)) {
        return value;
    }
    var numberVal = parseFloat(value);
    return isNumber(numberVal) ? numberVal : defaultValue;
};
var defaultOptions = {
    width: 100,
    gap: [100, 100],
    fontStyle: {
        fontSize: '16px',
        color: 'rgba(0, 0, 0, 0.15)',
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
    },
    getContainer: function () { return document.body; },
};
// 计量文本宽度和高度。
var measureTextSize = function (ctx, contents, rotate) {
    var width = 0;
    var height = 0;
    var lineSize = [];
    contents.forEach(function (content) {
        var _a = ctx.measureText(content), textWidth = _a.width, fontBoundingBoxAscent = _a.fontBoundingBoxAscent, fontBoundingBoxDescent = _a.fontBoundingBoxDescent;
        var textHeight = fontBoundingBoxAscent + fontBoundingBoxDescent;
        if (textWidth > width) {
            width = textWidth;
        }
        height += textHeight;
        lineSize.push({ height: textHeight, width: textWidth });
    });
    var angle = (rotate * Math.PI) / 180;
    return {
        originWidth: width,
        originHeight: height,
        // rotate 旋转后的实际占位宽度
        width: Math.ceil(Math.abs(Math.sin(angle) * height) + Math.abs(Math.cos(angle) * width)),
        // rotate 旋转后的实际占位高度
        height: Math.ceil(Math.abs(Math.sin(angle) * width) + Math.abs(height * Math.cos(angle))),
        lineSize: lineSize,
    };
};
// 画布绘制转为base64url
var getCanvasData = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var offset, rotate, image, content, fontStyle, canvas, ctx, ratio, contents, setCanvas, renderContent;
    return __generator(this, function (_a) {
        offset = options.offset, rotate = options.rotate, image = options.image, content = options.content, fontStyle = options.fontStyle;
        canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
        ratio = getPixelRatio(ctx);
        contents = [].concat(content || '');
        setCanvas = function (_a) {
            var height = _a.height, width = _a.width;
            var canvasWidth = 2 * offset[0] + width;
            var canvasHeight = 2 * offset[1] + height;
            canvas.setAttribute('width', canvasWidth * ratio + "px");
            canvas.setAttribute('height', canvasHeight * ratio + "px");
            canvas.style.width = canvasWidth + "px";
            canvas.style.height = canvasHeight + "px";
            ctx.translate((canvasWidth * ratio) / 2, (canvasHeight * ratio) / 2);
            ctx.scale(ratio, ratio);
            var RotateAngle = (rotate * Math.PI) / 180;
            ctx.rotate(RotateAngle);
        };
        renderContent = function () {
            var fontSize = fontStyle.fontSize, color = fontStyle.color, fontWeight = fontStyle.fontWeight, fontFamily = fontStyle.fontFamily;
            var realFontSize = toNumber(fontSize, 0) || fontStyle.fontSize;
            // font, scale 需参与文本尺寸计量
            ctx.font = fontWeight + " " + realFontSize + "px " + fontFamily;
            var measureSize = measureTextSize(ctx, contents, rotate);
            var width = options.width || measureSize.width;
            var height = options.height || measureSize.height;
            setCanvas({ width: width, height: height });
            ctx.fillStyle = color;
            ctx.font = fontWeight + " " + realFontSize + "px " + fontFamily;
            // 如果不设置，会导致旋转后的部分文字被遮盖
            ctx.textBaseline = 'top';
            contents.forEach(function (content, index) {
                var _a = measureSize.lineSize[index], lineHeight = _a.height, lineWidth = _a.width;
                var xStartPoint = -lineWidth / 2;
                var yStartPoint = -(options.height || measureSize.originHeight) / 2 + lineHeight * index;
                ctx.fillText(content, xStartPoint, yStartPoint, options.width || measureSize.originWidth);
            });
            return { base64Url: canvas.toDataURL(), height: height, width: width };
        };
        if (image) {
            return [2 /*return*/, new Promise(function (resolve) {
                    var img = new Image();
                    img.crossOrigin = 'anonymous';
                    img.referrerPolicy = 'no-referrer';
                    img.src = image;
                    img.onload = function () {
                        var width = options.width, height = options.height;
                        if (!width || !height) {
                            if (width) {
                                height = (img.height / img.width) * width;
                            }
                            else {
                                width = (img.width / img.height) * height;
                            }
                        }
                        setCanvas({ width: width, height: height });
                        ctx.drawImage(img, -width / 2, -height / 2, width, height);
                        return resolve({ base64Url: canvas.toDataURL(), width: width, height: height });
                    };
                    img.onerror = function () {
                        return renderContent();
                    };
                })];
        }
        return [2 /*return*/, renderContent()];
    });
}); };
var getMergeOptions = function (o) {
    var _a, _b, _c, _d, _e, _f;
    var options = o || {};
    var _options = __assign(__assign({ rotate: -20, zIndex: 1 }, options), { fontStyle: __assign(__assign({}, defaultOptions.fontStyle), options.fontStyle), width: toNumber(options.width, options.image ? defaultOptions.width : undefined), height: toNumber(options.height, undefined), getContainer: options.getContainer, gap: [
            toNumber((_a = options.gap) === null || _a === void 0 ? void 0 : _a[0], defaultOptions.gap[0]),
            toNumber(((_b = options.gap) === null || _b === void 0 ? void 0 : _b[1]) || ((_c = options.gap) === null || _c === void 0 ? void 0 : _c[0]), defaultOptions.gap[1]),
        ] });
    _options.offset = [
        toNumber((_d = _options.offset) === null || _d === void 0 ? void 0 : _d[0], _options.gap[0] / 2),
        toNumber(((_e = _options.offset) === null || _e === void 0 ? void 0 : _e[1]) || ((_f = _options.offset) === null || _f === void 0 ? void 0 : _f[0]), _options.gap[0] / 2),
    ];
    return _options;
};
export default function useWatermark(params) {
    var _a = __read(useState(params || {}), 2), options = _a[0], setOptions = _a[1];
    var watermarkDiv = useRef();
    var mutationObserver = useRef();
    var mergeOptions = getMergeOptions(options);
    var zIndex = mergeOptions.zIndex, gap = mergeOptions.gap;
    var container = isServerRendering
        ? null
        : (options === null || options === void 0 ? void 0 : options.getContainer)
            ? options.getContainer()
            : defaultOptions.getContainer();
    var setOrResetContainer = function (dom, type) {
        var _a, _b;
        if (!container || !dom) {
            return;
        }
        var dataKey = 'data-arco-watermark-origin-position';
        if (type === 'set') {
            container.append(dom);
            container.setAttribute(dataKey, ((_a = container.style) === null || _a === void 0 ? void 0 : _a.position) || '');
            container.style.position = 'relative';
        }
        else {
            (_b = dom.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(dom);
            container.style.position = container.getAttribute(dataKey);
            container.removeAttribute(dataKey);
        }
    };
    var clearMutationObserver = function () {
        if (mutationObserver.current) {
            mutationObserver.current.disconnect();
        }
        mutationObserver.current = null;
    };
    var createWatermarkElement = function () {
        if (container) {
            var div = document.createElement('div');
            watermarkDiv.current = div;
            setOrResetContainer(watermarkDiv.current, 'set');
            return div;
        }
    };
    // 清除元素和监听等
    var clearEffect = function () {
        clearMutationObserver();
        var dom = watermarkDiv.current;
        watermarkDiv.current = null;
        setOrResetContainer(dom, 'reset');
    };
    var setWaterMark = function () {
        if (!container) {
            return;
        }
        getCanvasData(mergeOptions).then(function (_a) {
            var _b;
            var base64Url = _a.base64Url, width = _a.width, height = _a.height;
            clearMutationObserver();
            var wmStyle = "\n  width:100%;\n  height:100%;\n  position:absolute;\n  top:0;\n  left:0;\n  bottom:0;\n  right:0;\n  pointer-events: none;\n  z-index:" + zIndex + ";\n  background-position: 0 0;\n  background-size:" + (gap[0] + width) + "px " + (gap[1] + height) + "px;\n  background-repeat: repeat;\n  background-image:url(" + base64Url + ")";
            if (!watermarkDiv.current) {
                createWatermarkElement();
            }
            (_b = watermarkDiv.current) === null || _b === void 0 ? void 0 : _b.setAttribute('style', wmStyle.trim());
            if (container) {
                mutationObserver.current = new MutationObserver(function (mutations) {
                    var isChanged = mutations.some(function (record) {
                        var target = record.target;
                        if (target) {
                            // watermarkDiv 被删除时会触发
                            if (target.isSameNode(container)) {
                                var changedNodes = [].slice
                                    .call(record.removedNodes)
                                    .concat([].slice.call(record.addedNodes).map(function (x) { return x.parentNode; }));
                                return changedNodes.some(function (x) { return x === watermarkDiv.current; });
                            }
                            if (target.isSameNode(watermarkDiv.current) && record.type === 'attributes') {
                                return true;
                            }
                        }
                    });
                    if (isChanged) {
                        clearEffect();
                        setWaterMark();
                    }
                });
                mutationObserver.current.observe(container, {
                    attributes: true,
                    subtree: true,
                    childList: true,
                });
            }
        });
    };
    useEffect(function () {
        setWaterMark();
    }, [options]);
    useEffect(function () {
        clearEffect();
        // 销毁重建
        setWaterMark();
        return function () {
            clearEffect();
        };
    }, [container]);
    return {
        setWatermark: function (newOptions) {
            setOptions(merge({}, options, newOptions));
        },
        destroy: function () {
            clearEffect();
        },
    };
}
