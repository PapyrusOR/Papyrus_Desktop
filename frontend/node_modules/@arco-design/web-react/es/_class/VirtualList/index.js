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
import React, { useEffect, useImperativeHandle, useRef, useMemo, useState, } from 'react';
import { getValidScrollTop, getCompareItemRelativeTop, getItemAbsoluteTop, getItemRelativeTop, getNodeHeight, getRangeIndex, getScrollPercentage, GHOST_ITEM_KEY, getLongestItemIndex, getLocationItem, } from './utils/itemUtil';
import { raf, caf } from '../../_util/raf';
import { isFunction, isNumber } from '../../_util/is';
import usePrevious from '../../_util/hooks/usePrevious';
import { findListDiffIndex, getIndexByStartLoc } from './utils/algorithmUtil';
import Filler from './Filler';
import useStateWithPromise from '../../_util/hooks/useStateWithPromise';
import useIsFirstRender from '../../_util/hooks/useIsFirstRender';
import useForceUpdate from '../../_util/hooks/useForceUpdate';
import ResizeObserver from '../../_util/resizeObserver';
import useIsomorphicLayoutEffect from '../../_util/hooks/useIsomorphicLayoutEffect';
// height of the virtual element, used to calculate total height of the virtual list
var DEFAULT_VIRTUAL_ITEM_HEIGHT = 32;
var KEY_VIRTUAL_ITEM_HEIGHT = "__virtual_item_height_" + Math.random().toFixed(5).slice(2);
// after collecting the real height of the first screen element, calculate the virtual ItemHeight to trigger list re-rendering
var useComputeVirtualItemHeight = function (refItemHeightMap) {
    var forceUpdate = useForceUpdate();
    var heightMap = refItemHeightMap.current;
    useEffect(function () {
        // virtual item height should be static as possible, otherwise it is easy to cause jitter
        if (Object.keys(heightMap).length && !heightMap[KEY_VIRTUAL_ITEM_HEIGHT]) {
            heightMap[KEY_VIRTUAL_ITEM_HEIGHT] = Object.entries(heightMap).reduce(function (sum, _a, currentIndex, array) {
                var _b = __read(_a, 2), currentHeight = _b[1];
                var nextSum = sum + currentHeight;
                return currentIndex === array.length - 1 ? Math.round(nextSum / array.length) : nextSum;
            }, 0);
            forceUpdate();
        }
    }, [Object.keys(heightMap).length]);
};
// cache the constructed results of child nodes to avoid redrawing of child nodes caused by re-construction during drawing
var useCacheChildrenNodes = function (children) {
    var refCacheMap = useRef({});
    var refPrevChildren = useRef(children);
    useEffect(function () {
        refPrevChildren.current = children;
    }, [children]);
    // children change means state of parent component is updated, so clear cache
    if (children !== refPrevChildren.current) {
        refCacheMap.current = {};
    }
    return function (item, index, props) {
        if (!refCacheMap.current.hasOwnProperty(index)) {
            refCacheMap.current[index] = children(item, index, props);
        }
        return refCacheMap.current[index];
    };
};
var VirtualList = React.forwardRef(function (props, ref) {
    var style = props.style, className = props.className, children = props.children, _a = props.data, data = _a === void 0 ? [] : _a, itemKey = props.itemKey, _b = props.threshold, threshold = _b === void 0 ? 100 : _b, _c = props.wrapper, WrapperTagName = _c === void 0 ? 'div' : _c, _d = props.height, propHeight = _d === void 0 ? '100%' : _d, _e = props.isStaticItemHeight, isStaticItemHeight = _e === void 0 ? true : _e, propItemHeight = props.itemHeight, measureLongestItem = props.measureLongestItem, scrollOptions = props.scrollOptions, onScroll = props.onScroll, _f = props.needFiller, needFiller = _f === void 0 ? true : _f, outerStyle = props.outerStyle, innerStyle = props.innerStyle, _g = props.wrapperChild, WrapperChildTagName = _g === void 0 ? React.Fragment : _g, restProps = __rest(props, ["style", "className", "children", "data", "itemKey", "threshold", "wrapper", "height", "isStaticItemHeight", "itemHeight", "measureLongestItem", "scrollOptions", "onScroll", "needFiller", "outerStyle", "innerStyle", "wrapperChild"]);
    // Compatible with setting the height of the list through style.maxHeight
    var styleListMaxHeight = (style && style.maxHeight) || propHeight;
    var refItemHeightMap = useRef({});
    var _h = __read(useState(200), 2), stateHeight = _h[0], setStateHeight = _h[1];
    var renderChild = useCacheChildrenNodes(children);
    useComputeVirtualItemHeight(refItemHeightMap);
    // Elements with the same height, the height of the item is based on the first rendering
    var itemCount = data.length;
    var itemHeight = propItemHeight ||
        refItemHeightMap.current[KEY_VIRTUAL_ITEM_HEIGHT] ||
        DEFAULT_VIRTUAL_ITEM_HEIGHT;
    var viewportHeight = isNumber(styleListMaxHeight) ? styleListMaxHeight : stateHeight;
    var itemCountVisible = Math.ceil(viewportHeight / itemHeight);
    var itemTotalHeight = itemHeight * itemCount;
    var isVirtual = threshold !== null && itemCount >= threshold && itemTotalHeight > viewportHeight;
    var refList = useRef(null);
    var refRafId = useRef(null);
    var refLockScroll = useRef(false);
    var refIsVirtual = useRef(isVirtual);
    // The paddingTop of the record scrolling list is used to correct the scrolling distance
    var scrollListPadding = useMemo(function () {
        if (refList.current) {
            var getPadding = function (property) {
                return +window.getComputedStyle(refList.current)[property].replace(/\D/g, '');
            };
            return {
                top: getPadding('paddingTop'),
                bottom: getPadding('paddingBottom'),
            };
        }
        return { top: 0, bottom: 0 };
    }, [refList.current]);
    var _j = __read(useStateWithPromise({
        // measure status
        status: 'NONE',
        // render range info
        startIndex: 0,
        endIndex: 0,
        itemIndex: 0,
        itemOffsetPtg: 0,
        // scroll info
        startItemTop: 0,
        scrollTop: 0,
    }), 2), state = _j[0], setState = _j[1];
    var prevData = usePrevious(data) || [];
    var isFirstRender = useIsFirstRender();
    var getItemKey = function (item, index) {
        return typeof itemKey === 'function'
            ? itemKey(item, index)
            : typeof itemKey === 'string'
                ? item[itemKey]
                : item.key || index;
    };
    var getItemKeyByIndex = function (index, items) {
        if (items === void 0) { items = data; }
        if (index === items.length) {
            return GHOST_ITEM_KEY;
        }
        var item = items[index];
        return item !== undefined ? getItemKey(item, index) : null;
    };
    var getCachedItemHeight = function (key) {
        return refItemHeightMap.current[key] || itemHeight;
    };
    var internalScrollTo = function (relativeScroll) {
        var compareItemIndex = relativeScroll.itemIndex, compareItemRelativeTop = relativeScroll.relativeTop;
        var _a = refList.current, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
        var originScrollTop = state.scrollTop;
        var maxScrollTop = scrollHeight - clientHeight;
        var bestSimilarity = Number.MAX_VALUE;
        var bestScrollTop = null;
        var bestItemIndex = null;
        var bestItemOffsetPtg = null;
        var bestStartIndex = null;
        var bestEndIndex = null;
        var missSimilarity = 0;
        for (var i = 0; i < maxScrollTop; i++) {
            var scrollTop = getIndexByStartLoc(0, maxScrollTop, originScrollTop, i);
            var scrollPtg = getScrollPercentage({ scrollTop: scrollTop, scrollHeight: scrollHeight, clientHeight: clientHeight });
            var _b = getRangeIndex(scrollPtg, itemCount, itemCountVisible), itemIndex = _b.itemIndex, itemOffsetPtg = _b.itemOffsetPtg, startIndex = _b.startIndex, endIndex = _b.endIndex;
            if (startIndex <= compareItemIndex && compareItemIndex <= endIndex) {
                var locatedItemRelativeTop = getItemRelativeTop({
                    itemHeight: getCachedItemHeight(getItemKeyByIndex(itemIndex)),
                    itemOffsetPtg: itemOffsetPtg,
                    clientHeight: clientHeight,
                    scrollPtg: scrollPtg,
                });
                var compareItemTop = getCompareItemRelativeTop({
                    locatedItemRelativeTop: locatedItemRelativeTop,
                    locatedItemIndex: itemIndex,
                    compareItemIndex: compareItemIndex,
                    startIndex: startIndex,
                    endIndex: endIndex,
                    itemHeight: itemHeight,
                    getItemKey: getItemKeyByIndex,
                    itemElementHeights: refItemHeightMap.current,
                });
                var similarity = Math.abs(compareItemTop - compareItemRelativeTop);
                if (similarity < bestSimilarity) {
                    bestSimilarity = similarity;
                    bestScrollTop = scrollTop;
                    bestItemIndex = itemIndex;
                    bestItemOffsetPtg = itemOffsetPtg;
                    bestStartIndex = startIndex;
                    bestEndIndex = endIndex;
                    missSimilarity = 0;
                }
                else {
                    missSimilarity += 1;
                }
            }
            if (missSimilarity > 10) {
                break;
            }
        }
        if (bestScrollTop !== null) {
            refLockScroll.current = true;
            refList.current.scrollTop = bestScrollTop;
            setState(__assign(__assign({}, state), { status: 'MEASURE_START', scrollTop: bestScrollTop, itemIndex: bestItemIndex, itemOffsetPtg: bestItemOffsetPtg, startIndex: bestStartIndex, endIndex: bestEndIndex }));
        }
        refRafId.current = raf(function () {
            refLockScroll.current = false;
        });
    };
    // Record the current element position when the real list is scrolled, and ensure that the position is correct after switching to the virtual list
    var rawListScrollHandler = function (event) {
        var _a = refList.current, rawScrollTop = _a.scrollTop, clientHeight = _a.clientHeight, scrollHeight = _a.scrollHeight;
        var scrollTop = getValidScrollTop(rawScrollTop, scrollHeight - clientHeight);
        var scrollPtg = getScrollPercentage({
            scrollTop: scrollTop,
            clientHeight: clientHeight,
            scrollHeight: scrollHeight,
        });
        var _b = getLocationItem(scrollPtg, itemCount), index = _b.index, offsetPtg = _b.offsetPtg;
        setState(__assign(__assign({}, state), { scrollTop: scrollTop, itemIndex: index, itemOffsetPtg: offsetPtg }));
        event && (onScroll === null || onScroll === void 0 ? void 0 : onScroll(event, { index: index }));
    };
    // Modify the state and recalculate the position in the next render
    var virtualListScrollHandler = function (event, isInit) {
        if (isInit === void 0) { isInit = false; }
        // Do NOT use refList.current.scrollHeight
        // We should use Filler's height as total scroll height
        // Filler's translate style may make refList.current.scrollHeight larger than Filler's height
        var scrollHeight = itemTotalHeight;
        var _a = refList.current, rawScrollTop = _a.scrollTop, clientHeight = _a.clientHeight;
        var scrollTop = getValidScrollTop(rawScrollTop, scrollHeight - clientHeight);
        // Prevent jitter
        if (!isInit && (scrollTop === state.scrollTop || refLockScroll.current)) {
            return;
        }
        var scrollPtg = getScrollPercentage({
            scrollTop: scrollTop,
            clientHeight: clientHeight,
            scrollHeight: scrollHeight,
        });
        var _b = getRangeIndex(scrollPtg, itemCount, itemCountVisible), itemIndex = _b.itemIndex, itemOffsetPtg = _b.itemOffsetPtg, startIndex = _b.startIndex, endIndex = _b.endIndex;
        setState(__assign(__assign({}, state), { scrollTop: scrollTop, itemIndex: itemIndex, itemOffsetPtg: itemOffsetPtg, startIndex: startIndex, endIndex: endIndex, status: 'MEASURE_START' }));
        event && (onScroll === null || onScroll === void 0 ? void 0 : onScroll(event, { index: itemIndex }));
    };
    useEffect(function () {
        return function () {
            refRafId.current && caf(refRafId.current);
        };
    }, []);
    // rerender when the number of visible elements changes
    useEffect(function () {
        if (refList.current) {
            if (isFirstRender) {
                refList.current.scrollTop = 0;
            }
            virtualListScrollHandler(null, true);
        }
    }, [itemCountVisible]);
    // Handle additions and deletions of list items or switching the virtual state
    useEffect(function () {
        if (!refList.current)
            return;
        var changedItemIndex = null;
        var switchTo = refIsVirtual.current !== isVirtual ? (isVirtual ? 'virtual' : 'raw') : '';
        refIsVirtual.current = isVirtual;
        if (viewportHeight && prevData.length !== data.length) {
            var diff = findListDiffIndex(prevData, data, getItemKey);
            changedItemIndex = diff ? diff.index : null;
        }
        // No need to correct the position when the number of elements in the real list changes
        if (switchTo || (isVirtual && changedItemIndex)) {
            var clientHeight = refList.current.clientHeight;
            var locatedItemRelativeTop = getItemRelativeTop({
                itemHeight: getCachedItemHeight(getItemKeyByIndex(state.itemIndex, prevData)),
                itemOffsetPtg: state.itemOffsetPtg,
                scrollPtg: getScrollPercentage({
                    scrollTop: state.scrollTop,
                    scrollHeight: prevData.length * itemHeight,
                    clientHeight: clientHeight,
                }),
                clientHeight: clientHeight,
            });
            if (switchTo === 'raw') {
                var rawTop = locatedItemRelativeTop;
                for (var index = 0; index < state.itemIndex; index++) {
                    rawTop -= getCachedItemHeight(getItemKeyByIndex(index));
                }
                refList.current.scrollTop = -rawTop;
                refLockScroll.current = true;
                refRafId.current = raf(function () {
                    refLockScroll.current = false;
                });
            }
            else {
                internalScrollTo({
                    itemIndex: state.itemIndex,
                    relativeTop: locatedItemRelativeTop,
                });
            }
        }
    }, [data, isVirtual]);
    useIsomorphicLayoutEffect(function () {
        if (state.status === 'MEASURE_START' && refList.current) {
            var _a = refList.current, scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
            var scrollPtg = getScrollPercentage({
                scrollTop: scrollTop,
                scrollHeight: scrollHeight,
                clientHeight: clientHeight,
            });
            // Calculate the top value of the first rendering element
            var startItemTop = getItemAbsoluteTop({
                scrollPtg: scrollPtg,
                clientHeight: clientHeight,
                scrollTop: scrollTop - (scrollListPadding.top + scrollListPadding.bottom) * scrollPtg,
                itemHeight: getCachedItemHeight(getItemKeyByIndex(state.itemIndex)),
                itemOffsetPtg: state.itemOffsetPtg,
            });
            for (var index = state.itemIndex - 1; index >= state.startIndex; index--) {
                startItemTop -= getCachedItemHeight(getItemKeyByIndex(index));
            }
            setState(__assign(__assign({}, state), { startItemTop: startItemTop, status: 'MEASURE_DONE' }));
        }
    }, [state]);
    useImperativeHandle(ref, function () { return ({
        dom: refList.current,
        getRootDOMNode: function () { return refList.current; },
        // Scroll to a certain height or an element
        scrollTo: function (arg) {
            refRafId.current && caf(refRafId.current);
            refRafId.current = raf(function () {
                var _a;
                if (!refList.current)
                    return;
                if (typeof arg === 'number') {
                    refList.current.scrollTop = arg;
                    return;
                }
                var index = 'index' in arg
                    ? arg.index
                    : 'key' in arg
                        ? data.findIndex(function (item, index) { return getItemKey(item, index) === arg.key; })
                        : 0;
                var item = data[index];
                if (!item) {
                    return;
                }
                var align = typeof arg === 'object' && ((_a = arg.options) === null || _a === void 0 ? void 0 : _a.block)
                    ? arg.options.block
                    : (scrollOptions === null || scrollOptions === void 0 ? void 0 : scrollOptions.block) || 'nearest';
                var _b = refList.current, clientHeight = _b.clientHeight, scrollTop = _b.scrollTop;
                if (isVirtual && !isStaticItemHeight) {
                    if (align === 'nearest') {
                        var itemIndex = state.itemIndex, itemOffsetPtg = state.itemOffsetPtg;
                        if (Math.abs(itemIndex - index) < itemCountVisible) {
                            var itemTop = getItemRelativeTop({
                                itemHeight: getCachedItemHeight(getItemKeyByIndex(itemIndex)),
                                itemOffsetPtg: itemOffsetPtg,
                                clientHeight: clientHeight,
                                scrollPtg: getScrollPercentage(refList.current),
                            });
                            if (index < itemIndex) {
                                for (var i = index; i < itemIndex; i++) {
                                    itemTop -= getCachedItemHeight(getItemKeyByIndex(i));
                                }
                            }
                            else {
                                for (var i = itemIndex; i < index; i++) {
                                    itemTop += getCachedItemHeight(getItemKeyByIndex(i));
                                }
                            }
                            // When the target element is within the field of view, exit directly
                            if (itemTop < 0 || itemTop > clientHeight) {
                                align = itemTop < 0 ? 'start' : 'end';
                            }
                            else {
                                return;
                            }
                        }
                        else {
                            align = index < itemIndex ? 'start' : 'end';
                        }
                    }
                    setState(__assign(__assign({}, state), { startIndex: Math.max(0, index - itemCountVisible), endIndex: Math.min(itemCount - 1, index + itemCountVisible) })).then(function () {
                        var itemHeight = getCachedItemHeight(getItemKey(item, index));
                        internalScrollTo({
                            itemIndex: index,
                            relativeTop: align === 'start'
                                ? 0
                                : (clientHeight - itemHeight) / (align === 'center' ? 2 : 1),
                        });
                    });
                }
                else {
                    var indexItemHeight = getCachedItemHeight(getItemKeyByIndex(index));
                    var itemTop = 0;
                    for (var i = 0; i < index; i++) {
                        itemTop += getCachedItemHeight(getItemKeyByIndex(i));
                    }
                    var itemBottom = itemTop + indexItemHeight;
                    var itemMiddle = itemTop + indexItemHeight / 2;
                    // If item is visible, skip scrolling
                    if (itemMiddle > scrollTop && itemMiddle < clientHeight + scrollTop) {
                        return;
                    }
                    if (align === 'nearest') {
                        if (itemTop < scrollTop) {
                            align = 'start';
                        }
                        else if (itemBottom > scrollTop + clientHeight) {
                            align = 'end';
                        }
                    }
                    var viewportHeight_1 = clientHeight - indexItemHeight;
                    refList.current.scrollTop =
                        itemTop - (align === 'start' ? 0 : viewportHeight_1 / (align === 'center' ? 2 : 1));
                }
            });
        },
    }); }, [data, itemHeight, state]);
    var renderChildren = function (list, startIndex) {
        return list.map(function (item, index) {
            var originIndex = startIndex + index;
            var node = renderChild(item, originIndex, {
                style: {},
                itemIndex: index,
            });
            var key = getItemKey(item, originIndex);
            return React.cloneElement(node, {
                key: key,
                ref: function (ele) {
                    var _a, _b;
                    var heightMap = refItemHeightMap.current;
                    // Minimize the measurement of element height as much as possible to avoid frequent triggering of browser reflow
                    // Method getNodeHeight get the clientHeight from the DOM referred by React ref. If result is wrong, check the ref of this element
                    if (ele &&
                        state.status === 'MEASURE_START' &&
                        (!isStaticItemHeight || heightMap[key] === undefined)) {
                        if (isStaticItemHeight) {
                            if (!heightMap[KEY_VIRTUAL_ITEM_HEIGHT]) {
                                heightMap[KEY_VIRTUAL_ITEM_HEIGHT] = getNodeHeight(ele, true);
                            }
                            heightMap[key] = heightMap[KEY_VIRTUAL_ITEM_HEIGHT];
                        }
                        else {
                            heightMap[key] = getNodeHeight(ele, true);
                        }
                    }
                    if (isFunction((_a = node) === null || _a === void 0 ? void 0 : _a.ref)) {
                        (_b = node) === null || _b === void 0 ? void 0 : _b.ref(ele);
                    }
                },
            });
        });
    };
    // Render the widest element to provide the maximum width of the container initially
    var refLongestItemIndex = useRef(null);
    // Don't add `renderChild` to the array dependency, it will change every time when rerender
    useEffect(function () {
        refLongestItemIndex.current = null;
    }, [data]);
    var renderLongestItem = function () {
        if (measureLongestItem) {
            var index = refLongestItemIndex.current === null
                ? getLongestItemIndex(data)
                : refLongestItemIndex.current;
            var item = data[index];
            refLongestItemIndex.current = index;
            return item ? (React.createElement("div", { style: { height: 1, overflow: 'hidden', opacity: 0 } }, renderChild(item, index, { style: {} }))) : null;
        }
        return null;
    };
    return (React.createElement(ResizeObserver, { onResize: function () {
            if (refList.current && !isNumber(styleListMaxHeight)) {
                var clientHeight = refList.current.clientHeight;
                setStateHeight(clientHeight);
            }
        }, getTargetDOMNode: function () { return refList.current; } },
        React.createElement(WrapperTagName, __assign({ ref: refList, style: __assign(__assign({ overflowY: 'auto', overflowAnchor: 'none' }, style), { maxHeight: styleListMaxHeight }), className: className, onScroll: isVirtual ? virtualListScrollHandler : rawListScrollHandler }, restProps), isVirtual ? (React.createElement(React.Fragment, null,
            React.createElement(Filler, { height: itemTotalHeight, outerStyle: outerStyle, innerStyle: innerStyle, offset: state.status === 'MEASURE_DONE' ? state.startItemTop : 0 },
                React.createElement(WrapperChildTagName, null, renderChildren(data.slice(state.startIndex, state.endIndex + 1), state.startIndex))),
            renderLongestItem())) : needFiller ? (React.createElement(Filler, { height: viewportHeight, outerStyle: outerStyle, innerStyle: innerStyle },
            React.createElement(WrapperChildTagName, null, renderChildren(data, 0)))) : (React.createElement(WrapperChildTagName, null, renderChildren(data, 0))))));
});
VirtualList.displayName = 'VirtualList';
export default VirtualList;
