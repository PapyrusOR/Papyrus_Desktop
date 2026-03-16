export function resolveItemData(cols, _a) {
    var span = _a.span, offset = _a.offset, suffix = _a.suffix;
    var originSpan = span !== null && span !== void 0 ? span : 1;
    var originOffset = offset !== null && offset !== void 0 ? offset : 0;
    var minOffset = Math.min(originOffset, cols);
    var minSpan = Math.min(minOffset > 0 ? originSpan + originOffset : originSpan, cols);
    return {
        span: minSpan,
        offset: minOffset,
        suffix: suffix,
    };
}
export function setItemVisible(_a) {
    var cols = _a.cols, collapsed = _a.collapsed, collapsedRows = _a.collapsedRows, itemDataList = _a.itemDataList;
    var overflow = false;
    var displayIndexList = [];
    function isOverflow(span) {
        return Math.ceil(span / cols) > collapsedRows;
    }
    if (collapsed) {
        var spanSum = 0;
        for (var i = 0; i < itemDataList.length; i++) {
            if (itemDataList[i].suffix) {
                spanSum += itemDataList[i].span;
                displayIndexList.push(i);
            }
        }
        if (!isOverflow(spanSum)) {
            var current = 0;
            while (current < itemDataList.length) {
                var item = itemDataList[current];
                if (!item.suffix) {
                    spanSum += item.span;
                    if (isOverflow(spanSum)) {
                        break;
                    }
                    displayIndexList.push(current);
                }
                current++;
            }
        }
        overflow = itemDataList.some(function (item, index) { return !item.suffix && !displayIndexList.includes(index); });
    }
    else {
        displayIndexList = itemDataList.map(function (_, index) { return index; });
    }
    return {
        overflow: overflow,
        displayIndexList: displayIndexList,
    };
}
