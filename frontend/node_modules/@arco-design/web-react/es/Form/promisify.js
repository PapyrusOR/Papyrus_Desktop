// https://github.com/RyanZim/universalify/blob/master/index.js
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// form validate error
var ValidateError = /** @class */ (function (_super) {
    __extends(ValidateError, _super);
    function ValidateError(errors) {
        var _this = _super.call(this, 'form validate error, get errors by error.errors') || this;
        _this.errors = {};
        _this.errors = errors;
        return _this;
    }
    return ValidateError;
}(Error));
function promisify(fn) {
    return Object.defineProperty(function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (typeof args[args.length - 1] === 'function')
            fn.apply(this, args);
        else {
            return new Promise(function (resolve, reject) {
                args[args.length] = function (err, res) {
                    if (err)
                        return reject(new ValidateError(err));
                    resolve(res);
                };
                args.length++;
                fn.apply(_this, args);
            });
        }
    }, 'name', { value: fn.name });
}
export default promisify;
