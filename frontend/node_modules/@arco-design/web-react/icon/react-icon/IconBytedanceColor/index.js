import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useContext } from 'react';
import { IconContext } from '../context';

function IconBytedanceColorComponent(iconProps, ref) {
  var _useContext = useContext(IconContext),
      _useContext$prefixCls = _useContext.prefixCls,
      prefixCls = _useContext$prefixCls === void 0 ? 'arco' : _useContext$prefixCls;

  var spin = iconProps.spin,
      className = iconProps.className;

  var props = _objectSpread(_objectSpread({
    "aria-hidden": true,
    focusable: false,
    ref: ref
  }, iconProps), {}, {
    className: "".concat(className ? className + ' ' : '').concat(prefixCls, "-icon ").concat(prefixCls, "-icon-bytedance-color")
  });

  if (spin) {
    props.className = "".concat(props.className, " ").concat(prefixCls, "-icon-loading");
  }

  delete props.spin;
  delete props.isIcon;
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 1024 1024",
    fill: "none",
    stroke: "currentColor"
  }, props), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("style", null)), /*#__PURE__*/React.createElement("path", {
    fill: "#325AB4",
    d: "M280.416 794.112 128 829.952v-636.32l152.416 35.84z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#78E6DC",
    d: "M928 828.48 800 864V160l128 35.52z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#3C8CFF",
    d: "M480 798.304 352 832V480l128 33.696z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#00C8D2",
    d: "M576 449.696 704 416v352l-128-33.696z"
  }));
}

var IconBytedanceColor = /*#__PURE__*/React.forwardRef(IconBytedanceColorComponent);
IconBytedanceColor.defaultProps = {
  isIcon: true
};
IconBytedanceColor.displayName = 'IconBytedanceColor';
export default IconBytedanceColor;