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

function IconCodeSandboxComponent(iconProps, ref) {
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
    className: "".concat(className ? className + ' ' : '').concat(prefixCls, "-icon ").concat(prefixCls, "-icon-code-sandbox")
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
    d: "m25.002 1.6 17.9 10.3c.6.4 1 1 1 1.7v20.7c0 .7-.4 1.4-1 1.7l-17.9 10.4c-.6.4-1.4.4-2 0l-17.9-10.3c-.6-.4-1-1-1-1.7V13.7c0-.7.4-1.4 1-1.7l17.9-10.4c.6-.4 1.4-.4 2 0Zm13.5 12.4-7.9-4.5-6.6 4.5-6.5-4-7.3 4.3 13.8 8.7 14.5-9Zm-16.5 26.4V26.3l-14-8.9v7.9l8 5.5V37l6 3.4Zm4 0 6-3.5v-5.2l8-5.5v-8.9l-14 8.9v14.2Z"
  }));
}

var IconCodeSandbox = /*#__PURE__*/_react.default.forwardRef(IconCodeSandboxComponent);

IconCodeSandbox.defaultProps = {
  isIcon: true
};
IconCodeSandbox.displayName = 'IconCodeSandbox';
var _default = IconCodeSandbox;
exports.default = _default;