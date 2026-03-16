export function isValidSearch(text, _a) {
    var split = _a.split;
    return !split || text.indexOf(split) === -1;
}
export function getBeforeSelectionText(_a) {
    var value = _a.value, selectionStart = _a.selectionStart;
    return value.slice(0, selectionStart);
}
export function getLastMeasureIndex(text, prefix) {
    if (prefix === void 0) { prefix = ''; }
    var prefixList = Array.isArray(prefix) ? prefix : [prefix];
    return prefixList.reduce(function (lastMatch, prefixStr) {
        var lastIndex = text.lastIndexOf(prefixStr);
        return lastIndex > lastMatch.location
            ? {
                location: lastIndex,
                prefix: prefixStr,
            }
            : lastMatch;
    }, { location: -1, prefix: '' });
}
