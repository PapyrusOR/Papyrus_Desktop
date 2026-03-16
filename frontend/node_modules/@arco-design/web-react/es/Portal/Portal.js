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
import { Component } from 'react';
import ReactDOM from 'react-dom';
var Portal = /** @class */ (function (_super) {
    __extends(Portal, _super);
    function Portal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.container = null;
        return _this;
    }
    // constructor(props) {
    //   super(props);
    //   const { getContainer } = this.props;
    //   this.container = getContainer?.()
    // }
    Portal.prototype.componentDidMount = function () {
        var _this = this;
        this.createContainer();
        this.timer = setTimeout(function () {
            // getContainer 返回ref时，子组件首先执行 componentDidMount,此时ref还未赋值
            if (!_this.container) {
                _this.createContainer();
            }
        });
    };
    Portal.prototype.componentWillUnmount = function () {
        clearTimeout(this.timer);
    };
    Portal.prototype.createContainer = function () {
        var getContainer = this.props.getContainer;
        this.container = getContainer === null || getContainer === void 0 ? void 0 : getContainer();
        this.forceUpdate();
    };
    Portal.prototype.render = function () {
        var children = this.props.children;
        if (this.container) {
            return ReactDOM.createPortal(children, this.container);
        }
        return null;
    };
    return Portal;
}(Component));
export default Portal;
