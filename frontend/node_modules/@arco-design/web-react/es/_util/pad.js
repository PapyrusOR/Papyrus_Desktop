export function padStart(string, length, char) {
    if (char === void 0) { char = ' '; }
    var s = String(string);
    if (!length) {
        return s;
    }
    var newString = s.length < length ? "" + char + s : s;
    return newString.length < length ? padStart(newString, length, char) : newString;
}
export function padEnd(string, length, char) {
    if (char === void 0) { char = ' '; }
    var s = String(string);
    if (!length) {
        return s;
    }
    var newString = s.length < length ? "" + s + char : s;
    return newString.length < length ? padEnd(newString, length, char) : newString;
}
