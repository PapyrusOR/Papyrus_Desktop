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

function IconQuestionCircleFillComponent(iconProps, ref) {
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
    className: "".concat(className ? className + ' ' : '').concat(prefixCls, "-icon ").concat(prefixCls, "-icon-question-circle-fill")
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
    fillRule: "evenodd",
    stroke: "none",
    d: "M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Zm-3.862-24.021a.461.461 0 0 0 .462-.462 2.37 2.37 0 0 1 .636-1.615C21.64 17.48 22.43 17 23.988 17c1.465 0 2.483.7 3.002 1.493.555.848.446 1.559.182 1.914-.328.444-.736.853-1.228 1.296-.15.135-.335.296-.533.468-.354.308-.75.654-1.067.955C23.22 24.195 22 25.686 22 28v.013a1 1 0 0 0 1.006.993l2.008-.012a.993.993 0 0 0 .986-1c.002-.683.282-1.19 1.101-1.97.276-.262.523-.477.806-.722.21-.18.439-.379.713-.626.57-.513 1.205-1.13 1.767-1.888 1.516-2.047 1.161-4.634-.05-6.485C29.092 14.398 26.825 13 23.988 13c-2.454 0-4.357.794-5.642 2.137-1.25 1.307-1.742 2.954-1.746 4.37 0 .26.21.472.47.472h3.068Zm1.868 14.029a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V32a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2.008Z",
    clipRule: "evenodd"
  }));
}

var IconQuestionCircleFill = /*#__PURE__*/_react.default.forwardRef(IconQuestionCircleFillComponent);

IconQuestionCircleFill.defaultProps = {
  isIcon: true
};
IconQuestionCircleFill.displayName = 'IconQuestionCircleFill';
var _default = IconQuestionCircleFill;
exports.default = _default;