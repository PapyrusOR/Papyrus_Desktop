"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _context = require("../context");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function IconWechatComponent(iconProps, ref) {
  var _useContext = (0, _react.useContext)(_context.IconContext),
      _useContext$prefixCls = _useContext.prefixCls,
      prefixCls = _useContext$prefixCls === void 0 ? 'arco' : _useContext$prefixCls;

  var spin = iconProps.spin,
      className = iconProps.className;

  var props = _objectSpread(_objectSpread({
    "aria-hidden": true,
    focusable: false,
    ref: ref
  }, iconProps), {}, {
    className: "".concat(className ? className + ' ' : '').concat(prefixCls, "-icon ").concat(prefixCls, "-icon-wechat")
  });

  if (spin) {
    props.className = "".concat(props.className, " ").concat(prefixCls, "-icon-loading");
  }

  delete props.spin;
  delete props.isIcon;
  return /*#__PURE__*/_react.default.createElement("svg", (0, _extends2.default)({
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "4",
    viewBox: "0 0 48 48"
  }, props), /*#__PURE__*/_react.default.createElement("path", {
    fill: "currentColor",
    stroke: "none",
    d: "M32.09 16.362a14.39 14.39 0 0 0-6.927 1.716 13.087 13.087 0 0 0-5.008 4.676 11.936 11.936 0 0 0-1.856 6.473c.01 1.137.185 2.273.517 3.36h-1.505a26.653 26.653 0 0 1-4.766-.593l-.925-.166-5.665 2.93 1.55-4.848C3.179 26.783 1.018 23.077 1 18.792a11.951 11.951 0 0 1 2.188-6.927 14.943 14.943 0 0 1 5.938-5.027 18.579 18.579 0 0 1 8.248-1.837A18.82 18.82 0 0 1 24.8 6.506a16.863 16.863 0 0 1 5.893 4.128 11.963 11.963 0 0 1 2.992 5.817 17.922 17.922 0 0 0-1.595-.09Zm-20.152-.414a2.167 2.167 0 0 0 1.505-.471c.405-.378.62-.908.593-1.46a1.881 1.881 0 0 0-.592-1.46 2.025 2.025 0 0 0-1.506-.535 2.778 2.778 0 0 0-1.67.535c-.454.323-.728.849-.728 1.401a1.708 1.708 0 0 0 .727 1.523 2.925 2.925 0 0 0 1.671.467ZM47 28.99a9.573 9.573 0 0 1-1.59 5.193c-1.128 1.6-2.52 3-4.129 4.128l1.258 4.129-4.51-2.413h-.243a20.758 20.758 0 0 1-4.6.76 15.538 15.538 0 0 1-7.03-1.59 13.089 13.089 0 0 1-5.008-4.313 10.501 10.501 0 0 1-1.838-5.939 10.29 10.29 0 0 1 1.838-5.92c1.266-1.847 3-3.334 5.008-4.313a15.579 15.579 0 0 1 7.03-1.59 14.919 14.919 0 0 1 6.761 1.59 13.286 13.286 0 0 1 5.09 4.312 10.004 10.004 0 0 1 1.94 5.966H47ZM23.407 11.955a2.77 2.77 0 0 0-1.747.534 1.65 1.65 0 0 0-.76 1.46c-.017.584.27 1.146.76 1.46.498.36 1.1.544 1.716.535a2.083 2.083 0 0 0 1.505-.472c.368-.404.561-.925.534-1.46a1.834 1.834 0 0 0-.534-1.532 1.887 1.887 0 0 0-1.532-.534h.063v.009h-.005Zm5.256 15.03a2.016 2.016 0 0 0 1.46-.498c.332-.288.525-.7.534-1.137a1.612 1.612 0 0 0-.534-1.136 2.062 2.062 0 0 0-1.46-.499 1.58 1.58 0 0 0-1.092.499c-.305.296-.49.71-.498 1.136.009.427.184.84.498 1.137.288.305.679.48 1.092.499Zm8.953 0a2.016 2.016 0 0 0 1.46-.498c.332-.288.525-.7.534-1.137a1.558 1.558 0 0 0-.593-1.136 2.12 2.12 0 0 0-1.401-.499 1.493 1.493 0 0 0-1.092.499c-.305.296-.49.71-.498 1.136.009.427.184.84.498 1.137.279.305.674.49 1.092.499Z"
  }));
}

var IconWechat = /*#__PURE__*/_react.default.forwardRef(IconWechatComponent);

IconWechat.defaultProps = {
  isIcon: true
};
IconWechat.displayName = 'IconWechat';
var _default = IconWechat;
exports.default = _default;