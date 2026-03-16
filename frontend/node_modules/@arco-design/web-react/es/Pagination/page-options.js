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
import React, { useRef, useContext } from 'react';
import Select from '../Select';
import { ConfigContext } from '../ConfigProvider';
var noop = function () { };
var Option = Select.Option;
var _SizeOptions = [10, 20, 30, 40, 50];
function PageOption(props) {
    var selectRef = useRef();
    var locale = useContext(ConfigContext).locale;
    var _a = props.sizeCanChange, sizeCanChange = _a === void 0 ? false : _a, _b = props.onPageSizeChange, onPageSizeChange = _b === void 0 ? noop : _b, rootPrefixCls = props.rootPrefixCls, _c = props.sizeOptions, sizeOptions = _c === void 0 ? _SizeOptions : _c, _d = props.pageSize, pageSize = _d === void 0 ? 10 : _d, size = props.size, selectProps = props.selectProps, disabled = props.disabled;
    return (sizeCanChange && (React.createElement("div", { ref: selectRef, className: rootPrefixCls + "-option", "aria-label": locale.Pagination.pageSize },
        React.createElement(Select, __assign({ value: sizeOptions.indexOf(pageSize) !== -1 ? pageSize : sizeOptions[0], onChange: function (value) {
                onPageSizeChange(value);
            }, size: size, getPopupContainer: function () { return selectRef.current; }, disabled: disabled }, selectProps), sizeOptions.map(function (num) {
            return (React.createElement(Option, { key: num, value: num }, num + " " + locale.Pagination.countPerPage));
        })))));
}
export default PageOption;
