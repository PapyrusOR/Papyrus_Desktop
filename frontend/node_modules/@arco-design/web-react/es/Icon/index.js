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
import React, { Component } from 'react';
import addFromIconFontCn from './addFromIconFontCn';
import cs from '../_util/classNames';
import { ConfigConsumer } from '../ConfigProvider';
var Icon = /** @class */ (function (_super) {
    __extends(Icon, _super);
    function Icon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderIcon = function (_a) {
            var _b;
            var getPrefixCls = _a.getPrefixCls;
            var _c = _this.props, className = _c.className, spin = _c.spin, children = _c.children, type = _c.type, rest = __rest(_c, ["className", "spin", "children", "type"]);
            var defaultProps = {
                width: '1em',
                height: '1em',
                fill: 'currentColor',
            };
            var iconProps = __assign(__assign({}, defaultProps), rest);
            var prefixCls = getPrefixCls('icon');
            var classNames = cs(prefixCls, type, (_b = {},
                _b[prefixCls + "-loading"] = spin,
                _b), className);
            iconProps.className = classNames;
            return React.createElement("svg", __assign({}, iconProps), children);
        };
        return _this;
    }
    Icon.prototype.render = function () {
        return React.createElement(ConfigConsumer, null, this.renderIcon);
    };
    Icon.displayName = 'Icon';
    Icon.addFromIconFontCn = addFromIconFontCn;
    return Icon;
}(Component));
export default Icon;
