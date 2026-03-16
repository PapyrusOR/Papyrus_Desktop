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
import React, { Component } from 'react';
import Portal from './Portal';
var PortalWrapper = /** @class */ (function (_super) {
    __extends(PortalWrapper, _super);
    function PortalWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PortalWrapper.prototype.componentWillUnmount = function () {
        this.instance = null;
    };
    PortalWrapper.prototype.render = function () {
        var _this = this;
        var _a = this.props, forceRender = _a.forceRender, visible = _a.visible;
        return forceRender || visible || this.instance ? (React.createElement(Portal, __assign({ ref: function (ref) { return (_this.instance = ref); } }, this.props))) : null;
    };
    PortalWrapper.displayName = 'Portal';
    PortalWrapper.defaultProps = {
        getContainer: function () { return document.body; },
    };
    return PortalWrapper;
}(Component));
export default PortalWrapper;
