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

function IconSoundFillComponent(iconProps, ref) {
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
    className: "".concat(className ? className + ' ' : '').concat(prefixCls, "-icon ").concat(prefixCls, "-icon-sound-fill")
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
    d: "m14 15 10-7v32l-10-7H6V15h8Z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    fill: "currentColor",
    stroke: "none",
    d: "M24.924 6.226A2 2 0 0 1 26 8v32a2 2 0 0 1-3.147 1.639L13.37 35H6a2 2 0 0 1-2-2V15a2 2 0 0 1 2-2h7.37l9.483-6.638a2 2 0 0 1 2.07-.136ZM35.314 35.042c6.248-6.249 6.248-16.38 0-22.628l2.828-2.828c7.81 7.81 7.81 20.474 0 28.284l-2.828-2.828Z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    fill: "currentColor",
    stroke: "none",
    d: "M29.657 29.728a8 8 0 0 0 0-11.314l2.828-2.828c4.687 4.686 4.687 12.284 0 16.97l-2.828-2.828Z"
  }));
}

var IconSoundFill = /*#__PURE__*/_react.default.forwardRef(IconSoundFillComponent);

IconSoundFill.defaultProps = {
  isIcon: true
};
IconSoundFill.displayName = 'IconSoundFill';
var _default = IconSoundFill;
exports.default = _default;