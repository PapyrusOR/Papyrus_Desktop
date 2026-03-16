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
import { toSafeString, trimNumber, validateNumber, getNumberPrecision, supportBigInt, } from './utils';
var BigIntDecimal = /** @class */ (function () {
    function BigIntDecimal(value) {
        this.origin = '';
        this.origin = String(value);
        if ((!value && value !== 0) || !this.origin.trim()) {
            this.isEmpty = true;
            return;
        }
        if (value === '-') {
            this.isNaN = true;
            return;
        }
        var safeValueString = toSafeString(value);
        if (validateNumber(safeValueString)) {
            var _a = trimNumber(safeValueString), negative = _a.negative, trimStr = _a.trimStr;
            var _b = __read(trimStr.split('.'), 2), integerStr = _b[0], _c = _b[1], decimalStr = _c === void 0 ? '0' : _c;
            this.isNegative = negative;
            this.integer = BigInt(integerStr);
            this.decimal = BigInt(decimalStr);
            this.decimalLen = decimalStr.length;
        }
        else {
            this.isNaN = true;
        }
    }
    Object.defineProperty(BigIntDecimal.prototype, "isInvalid", {
        get: function () {
            return this.isEmpty || this.isNaN;
        },
        enumerable: false,
        configurable: true
    });
    BigIntDecimal.prototype.getMark = function () {
        return this.isNegative ? '-' : '';
    };
    BigIntDecimal.prototype.getIntegerStr = function () {
        return this.integer.toString();
    };
    BigIntDecimal.prototype.getDecimalStr = function () {
        return this.decimal.toString().padStart(this.decimalLen, '0');
    };
    BigIntDecimal.prototype.alignDecimal = function (decimalLength) {
        return BigInt("" + this.getMark() + this.getIntegerStr() + this.getDecimalStr().padEnd(decimalLength, '0'));
    };
    BigIntDecimal.prototype.negate = function () {
        var numStr = this.toString();
        return new BigIntDecimal(numStr.startsWith('-') ? numStr.slice(1) : "-" + numStr);
    };
    BigIntDecimal.prototype.add = function (value) {
        var offset = new BigIntDecimal(value);
        if (offset.isInvalid) {
            return this;
        }
        if (this.isInvalid) {
            return offset;
        }
        var maxDecimalLength = Math.max(this.decimalLen, offset.decimalLen);
        var thisAlignedDecimal = this.alignDecimal(maxDecimalLength);
        var offsetAlignedDecimal = offset.alignDecimal(maxDecimalLength);
        var valueStr = (thisAlignedDecimal + offsetAlignedDecimal).toString();
        var _a = trimNumber(valueStr), negativeStr = _a.negativeStr, trimStr = _a.trimStr;
        var hydrateValueStr = "" + negativeStr + trimStr.padStart(maxDecimalLength + 1, '0');
        return new BigIntDecimal(hydrateValueStr.slice(0, -maxDecimalLength) + "." + hydrateValueStr.slice(-maxDecimalLength));
    };
    BigIntDecimal.prototype.equals = function (target) {
        return this.toString() === (target === null || target === void 0 ? void 0 : target.toString());
    };
    BigIntDecimal.prototype.less = function (target) {
        return this.isInvalid || target.isInvalid
            ? false
            : this.add(target.negate().toString()).toNumber() < 0;
    };
    BigIntDecimal.prototype.toNumber = function () {
        return this.isNaN ? NaN : Number(this.toString());
    };
    BigIntDecimal.prototype.toString = function (options) {
        if (options === void 0) { options = { safe: true }; }
        var safe = options.safe, precision = options.precision;
        var result = safe
            ? this.isInvalid
                ? ''
                : trimNumber("" + this.getMark() + this.getIntegerStr() + "." + this.getDecimalStr()).fullStr
            : this.origin;
        return typeof precision === 'number' ? toFixed(result, precision) : result;
    };
    return BigIntDecimal;
}());
var NumberDecimal = /** @class */ (function () {
    function NumberDecimal(value) {
        this.origin = '';
        this.origin = String(value);
        this.number = Number(value);
        if ((!value && value !== 0) || !this.origin.trim()) {
            this.isEmpty = true;
        }
        else {
            this.isNaN = Number.isNaN(this.number);
        }
    }
    Object.defineProperty(NumberDecimal.prototype, "isInvalid", {
        get: function () {
            return this.isEmpty || this.isNaN;
        },
        enumerable: false,
        configurable: true
    });
    NumberDecimal.prototype.negate = function () {
        return new NumberDecimal(-this.toNumber());
    };
    NumberDecimal.prototype.equals = function (target) {
        return this.toNumber() === (target === null || target === void 0 ? void 0 : target.toNumber());
    };
    NumberDecimal.prototype.less = function (target) {
        return this.isInvalid || target.isInvalid
            ? false
            : this.add(target.negate().toString()).toNumber() < 0;
    };
    NumberDecimal.prototype.add = function (value) {
        var offset = new NumberDecimal(value);
        if (offset.isInvalid) {
            return this;
        }
        if (this.isInvalid) {
            return offset;
        }
        var result = this.number + offset.number;
        if (result > Number.MAX_SAFE_INTEGER) {
            return new NumberDecimal(Number.MAX_SAFE_INTEGER);
        }
        if (result < Number.MIN_SAFE_INTEGER) {
            return new NumberDecimal(Number.MIN_SAFE_INTEGER);
        }
        var maxPrecision = Math.max(getNumberPrecision(this.number), getNumberPrecision(offset.number));
        return new NumberDecimal(result.toFixed(maxPrecision));
    };
    NumberDecimal.prototype.toNumber = function () {
        return this.number;
    };
    NumberDecimal.prototype.toString = function (options) {
        if (options === void 0) { options = { safe: true }; }
        var safe = options.safe, precision = options.precision;
        var result = safe ? (this.isInvalid ? '' : toSafeString(this.number)) : this.origin;
        return typeof precision === 'number' ? toFixed(result, precision) : result;
    };
    return NumberDecimal;
}());
export function getDecimal(value) {
    return supportBigInt() ? new BigIntDecimal(value) : new NumberDecimal(value);
}
/**
 * Replace String.prototype.toFixed like Math.round
 * If cutOnly is true, just slice the tail
 * e.g. Decimal.toFixed(0.15) will return 0.2, not 0.1
 */
export function toFixed(numStr, precision, cutOnly) {
    if (cutOnly === void 0) { cutOnly = false; }
    if (numStr === '') {
        return '';
    }
    var separator = '.';
    var _a = trimNumber(numStr), negativeStr = _a.negativeStr, integerStr = _a.integerStr, decimalStr = _a.decimalStr;
    var precisionDecimalStr = "" + separator + decimalStr;
    var numberWithoutDecimal = "" + negativeStr + integerStr;
    if (precision >= 0) {
        var advancedNum = Number(decimalStr[precision]);
        if (advancedNum >= 5 && !cutOnly) {
            var advancedDecimal = getDecimal(numStr).add(negativeStr + "0." + '0'.repeat(precision) + (10 - advancedNum));
            return toFixed(advancedDecimal.toString(), precision, cutOnly);
        }
        return precision === 0
            ? numberWithoutDecimal
            : "" + numberWithoutDecimal + separator + decimalStr
                .padEnd(precision, '0')
                .slice(0, precision);
    }
    return "" + numberWithoutDecimal + (precisionDecimalStr === '.0' ? '' : precisionDecimalStr);
}
