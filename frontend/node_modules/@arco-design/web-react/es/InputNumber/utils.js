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
/**
 * Judge whether a number is scientific notation
 */
export function isE(number) {
    return !Number.isNaN(Number(number)) && String(number).includes('e');
}
/**
 * Judge whether BigInt is supported by current env
 */
export function supportBigInt() {
    return typeof BigInt === 'function';
}
/**
 * Get precision of a number, include scientific notation like 1e-10
 */
export function getNumberPrecision(number) {
    var numStr = String(number);
    if (isE(number)) {
        var precision_1 = Number(numStr.slice(numStr.indexOf('e-') + 2));
        numStr.replace(/\.(\d+)/, function (_, $1) {
            precision_1 += $1.length;
            return _;
        });
        return precision_1;
    }
    return numStr.includes('.') && validateNumber(numStr)
        ? numStr.length - numStr.indexOf('.') - 1
        : 0;
}
/**
 * Convert number to non-scientific notation
 */
export function toSafeString(number) {
    var nativeNumberStr = String(number);
    if (isE(number)) {
        if (number < Number.MIN_SAFE_INTEGER) {
            return supportBigInt() ? BigInt(number).toString() : Number.MIN_SAFE_INTEGER.toString();
        }
        if (number > Number.MAX_SAFE_INTEGER) {
            return supportBigInt() ? BigInt(number).toString() : Number.MAX_SAFE_INTEGER.toString();
        }
        // This may lose precision, but foFixed must accept argument in the range 0-100
        var precision = getNumberPrecision(nativeNumberStr);
        nativeNumberStr = Number(number).toFixed(Math.min(100, precision));
    }
    return trimNumber(nativeNumberStr).fullStr;
}
/**
 * Judge whether a number is valid
 */
export function validateNumber(num) {
    if (typeof num === 'number') {
        return !Number.isNaN(num);
    }
    if (!num) {
        return false;
    }
    return (
    // 1.1
    /^\s*-?\d+(\.\d+)?\s*$/.test(num) ||
        // 1.
        /^\s*-?\d+\.\s*$/.test(num) ||
        // .1
        /^\s*-?\.\d+\s*$/.test(num));
}
export function trimNumber(numStr) {
    var str = numStr.trim();
    var negative = false;
    str = str
        // Remove negative-label(-) at head.
        .replace(/^-/, function () {
        negative = true;
        return '';
    })
        // Remove useless 0 at decimal end. `1.00100` => `1.001`
        .replace(/(\.\d*[^0])0*$/, '$1')
        // Remove useless decimal.
        .replace(/\.0*$/, '')
        // Remove useless 0 at head.
        .replace(/^0+/, '')
        // Add 0 before empty dot. `.1` => `0.1`
        .replace(/^\./, '0.');
    var trimStr = str || '0';
    var _a = __read(trimStr.split('.'), 2), _b = _a[0], integerStr = _b === void 0 ? '0' : _b, _c = _a[1], decimalStr = _c === void 0 ? '0' : _c;
    if (integerStr === '0' && decimalStr === '0') {
        negative = false;
    }
    var negativeStr = negative ? '-' : '';
    return {
        negative: negative,
        negativeStr: negativeStr,
        trimStr: trimStr,
        integerStr: integerStr,
        decimalStr: decimalStr,
        fullStr: "" + negativeStr + trimStr,
    };
}
