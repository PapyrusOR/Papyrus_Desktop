import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useContext } from 'react';
import { IconContext } from '../context';

function IconPlayCircleFillComponent(iconProps, ref) {
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
    className: "".concat(className ? className + ' ' : '').concat(prefixCls, "-icon ").concat(prefixCls, "-icon-play-circle-fill")
  });

  if (spin) {
    props.className = "".concat(props.className, " ").concat(prefixCls, "-icon-loading");
  }

  delete props.spin;
  delete props.isIcon;
  return /*#__PURE__*/React.createElement("svg", _extends({
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "4",
    viewBox: "0 0 48 48"
  }, props), /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    fillRule: "evenodd",
    stroke: "none",
    d: "M44 24c0 11.046-8.954 20-20 20S4 35.046 4 24 12.954 4 24 4s20 8.954 20 20Zm-23.662-7.783C19.302 15.605 18 16.36 18 17.575v12.85c0 1.214 1.302 1.97 2.338 1.358l10.89-6.425c1.03-.607 1.03-2.11 0-2.716l-10.89-6.425Z",
    clipRule: "evenodd"
  }));
}

var IconPlayCircleFill = /*#__PURE__*/React.forwardRef(IconPlayCircleFillComponent);
IconPlayCircleFill.defaultProps = {
  isIcon: true
};
IconPlayCircleFill.displayName = 'IconPlayCircleFill';
export default IconPlayCircleFill;