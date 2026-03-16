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
import React, { useMemo, useRef, useState } from 'react';
import useUpdate from '../_util/hooks/useUpdate';
import throttleByRaf from '../_util/throttleByRaf';
import { isNumber, isString } from '../_util/is';
import useIsomorphicLayoutEffect from '../_util/hooks/useIsomorphicLayoutEffect';
// line-height baseline
var MEASURE_LINE_HEIGHT_TEXT = 'hxj';
export var MEASURE_STATUS;
(function (MEASURE_STATUS) {
    MEASURE_STATUS[MEASURE_STATUS["INIT"] = 0] = "INIT";
    MEASURE_STATUS[MEASURE_STATUS["BEFORE_MEASURE"] = 1] = "BEFORE_MEASURE";
    MEASURE_STATUS[MEASURE_STATUS["MEASURING"] = 2] = "MEASURING";
    MEASURE_STATUS[MEASURE_STATUS["MEASURE_END"] = 3] = "MEASURE_END";
    MEASURE_STATUS[MEASURE_STATUS["NO_NEED_ELLIPSIS"] = 4] = "NO_NEED_ELLIPSIS";
})(MEASURE_STATUS || (MEASURE_STATUS = {}));
function useEllipsis(props) {
    var children = props.children, _a = props.rows, rows = _a === void 0 ? 1 : _a, width = props.width, expanding = props.expanding, renderMeasureContent = props.renderMeasureContent, simpleEllipsis = props.simpleEllipsis, onEllipsis = props.onEllipsis, suffix = props.suffix, expandNodes = props.expandNodes, expandable = props.expandable, ellipsisStr = props.ellipsisStr;
    var singleRowNode = useRef();
    var mirrorNode = useRef();
    var _b = __read(useState([0, 0, 0]), 2), binarySearchIndex = _b[0], setBinarySearchIndex = _b[1];
    var _c = __read(useState(0), 2), lineHeight = _c[0], setLineHeight = _c[1];
    var _d = __read(useState(MEASURE_STATUS.NO_NEED_ELLIPSIS), 2), status = _d[0], setStatus = _d[1];
    var _e = __read(binarySearchIndex, 3), startLoc = _e[0], midLoc = _e[1], endLoc = _e[2];
    var _f = __read(useState(false), 2), isEllipsis = _f[0], setIsEllipsis = _f[1];
    var nodeList = useMemo(function () { return React.Children.toArray(children); }, [children]);
    var closedLoc = useRef(0);
    useUpdate(function () {
        onEllipsis && onEllipsis(isEllipsis);
    }, [isEllipsis]);
    var isSimpleNode = function (node) {
        return isString(node) || isNumber(node);
    };
    var getTotalLen = function (list) {
        var total = 0;
        list.forEach(function (node) {
            if (isSimpleNode(node)) {
                total += String(node).length;
            }
            else {
                total += 1;
            }
        });
        return total;
    };
    var totalLen = useMemo(function () { return getTotalLen(nodeList); }, [nodeList]);
    var updateSearchIndex = throttleByRaf(function (searchIndex) { return setBinarySearchIndex(searchIndex); });
    var getSlicedNode = function (sliceLen) {
        var slicedNode = [];
        var currentLen = 0;
        if (sliceLen >= totalLen) {
            return nodeList;
        }
        for (var index in nodeList) {
            var node = nodeList[index];
            if (currentLen >= sliceLen) {
                return slicedNode;
            }
            var currentNodeLen = isSimpleNode(node) ? String(node).length : 1;
            if (currentNodeLen > sliceLen - currentLen) {
                slicedNode.push(String(node).slice(0, sliceLen - currentLen));
                currentLen = sliceLen;
                return slicedNode;
            }
            currentLen += currentNodeLen;
            slicedNode.push(node);
        }
        return slicedNode;
    };
    var measure = function () {
        var _a, _b;
        if (lineHeight) {
            if (status === MEASURE_STATUS.INIT) {
                var maxHeight = rows * lineHeight;
                var mirrorHeight = (_a = mirrorNode.current) === null || _a === void 0 ? void 0 : _a.offsetHeight;
                var currentEllipsis = mirrorHeight > maxHeight;
                // simpleEllipsis 和 expanding 情况下: 只用判断空间是否足够，不用计算折叠零界
                if (!currentEllipsis || simpleEllipsis || expanding) {
                    setStatus(MEASURE_STATUS.MEASURE_END);
                    setIsEllipsis(currentEllipsis);
                    setBinarySearchIndex([0, totalLen, totalLen]);
                }
                else {
                    setIsEllipsis(true);
                    setStatus(MEASURE_STATUS.BEFORE_MEASURE);
                }
            }
            else if (status === MEASURE_STATUS.BEFORE_MEASURE) {
                var totalWidth = singleRowNode === null || singleRowNode === void 0 ? void 0 : singleRowNode.current.offsetWidth;
                var closedWidth = rows * width;
                if (totalWidth > rows * width) {
                    var startRatio = Math.max(closedWidth / totalWidth - 0.1, 0);
                    var endRatio = Math.min(closedWidth / totalWidth + 0.1, 1);
                    var closedStartLoc = Math.floor(startRatio * totalLen);
                    var closedEndLoc = Math.ceil(endRatio * totalLen);
                    var closedMiddleLoc = Math.floor((closedStartLoc + closedEndLoc) / 2);
                    closedLoc.current = closedMiddleLoc;
                }
                setStatus(MEASURE_STATUS.MEASURING);
            }
            else if (status === MEASURE_STATUS.MEASURING) {
                if (startLoc !== endLoc - 1) {
                    var mirrorHeight = (_b = mirrorNode.current) === null || _b === void 0 ? void 0 : _b.offsetHeight;
                    var maxHeight = rows * lineHeight;
                    var nextStartLoc = startLoc;
                    var nextEndLoc = endLoc;
                    if (mirrorHeight <= maxHeight) {
                        nextStartLoc = midLoc;
                    }
                    else {
                        nextEndLoc = midLoc;
                    }
                    var nextMidLoc = Math.floor((nextEndLoc + nextStartLoc) / 2);
                    updateSearchIndex([nextStartLoc, nextMidLoc, nextEndLoc]);
                }
                else {
                    updateSearchIndex([startLoc, startLoc, startLoc]);
                    setStatus(MEASURE_STATUS.MEASURE_END);
                }
            }
        }
    };
    useIsomorphicLayoutEffect(function () {
        if (props.rows && width) {
            setBinarySearchIndex([0, Math.floor(totalLen / 2), totalLen]);
            setStatus(MEASURE_STATUS.INIT);
        }
        else {
            setStatus(MEASURE_STATUS.NO_NEED_ELLIPSIS);
        }
    }, [
        totalLen,
        simpleEllipsis,
        expanding,
        width,
        suffix,
        expandNodes,
        expandable,
        ellipsisStr,
        props.rows,
    ]);
    useIsomorphicLayoutEffect(function () {
        if (singleRowNode.current && status === MEASURE_STATUS.INIT) {
            var offsetHeight = singleRowNode.current.offsetHeight;
            setLineHeight(offsetHeight);
        }
    }, [status]);
    useIsomorphicLayoutEffect(function () {
        measure();
    }, [status, midLoc, startLoc, endLoc, lineHeight]);
    var basicStyle = {
        zIndex: -999,
        position: 'fixed',
        opacity: 0,
        padding: 0,
        margin: 0,
    };
    var singleRowNodeStyle = __assign({ whiteSpace: 'nowrap' }, basicStyle);
    // 用css省略的话，需要覆盖单行省略样式
    var mirrorNodeStyle = simpleEllipsis
        ? __assign({ textOverflow: 'clip' }, basicStyle) : basicStyle;
    var ellipsisNode;
    if (status === MEASURE_STATUS.INIT || status === MEASURE_STATUS.BEFORE_MEASURE) {
        ellipsisNode = (React.createElement("div", null,
            React.createElement("div", { ref: singleRowNode, style: singleRowNodeStyle }, status === MEASURE_STATUS.INIT
                ? MEASURE_LINE_HEIGHT_TEXT
                : renderMeasureContent(children, false)),
            React.createElement("div", { ref: mirrorNode, style: __assign({ width: width }, mirrorNodeStyle) }, renderMeasureContent(children, isEllipsis))));
        ellipsisNode = ellipsisNode.props.children;
    }
    else if (status === MEASURE_STATUS.MEASURING) {
        // 计算过程中的占位展示，避免计算造成的抖动
        // 不能设置 width 否则在 table 中会再次造成 resize
        var showStyle = {
            height: lineHeight * rows,
            overflow: 'hidden',
        };
        ellipsisNode = (React.createElement("div", null,
            React.createElement("div", { ref: mirrorNode, style: __assign({ width: width }, mirrorNodeStyle) }, renderMeasureContent(getSlicedNode(midLoc), isEllipsis)),
            React.createElement("div", { style: showStyle }, getSlicedNode(closedLoc.current))));
        ellipsisNode = ellipsisNode.props.children;
    }
    else if (status === MEASURE_STATUS.MEASURE_END) {
        ellipsisNode = renderMeasureContent(getSlicedNode(midLoc), isEllipsis);
    }
    else if (status === MEASURE_STATUS.NO_NEED_ELLIPSIS) {
        ellipsisNode = renderMeasureContent(children, false);
    }
    return { ellipsisNode: ellipsisNode, isEllipsis: isEllipsis, measureStatus: status };
}
export default useEllipsis;
