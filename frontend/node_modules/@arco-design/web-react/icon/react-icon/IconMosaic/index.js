import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useContext } from 'react';
import { IconContext } from '../context';

function IconMosaicComponent(iconProps, ref) {
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
    className: "".concat(className ? className + ' ' : '').concat(prefixCls, "-icon ").concat(prefixCls, "-icon-mosaic")
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
    stroke: "none",
    d: "M6 7h4v4H6V7ZM6 23h4v4H6v-4ZM6 38h4v4H6v-4ZM14 15h4v4h-4v-4ZM14 31h4v4h-4v-4ZM22 7h4v4h-4V7ZM22 23h4v4h-4v-4ZM22 38h4v4h-4v-4ZM30 15h4v4h-4v-4ZM30 31h4v4h-4v-4ZM38 7h4v4h-4V7ZM38 23h4v4h-4v-4ZM38 38h4v4h-4v-4Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 7h4v4H6V7ZM6 23h4v4H6v-4ZM6 38h4v4H6v-4ZM14 15h4v4h-4v-4ZM14 31h4v4h-4v-4ZM22 7h4v4h-4V7ZM22 23h4v4h-4v-4ZM22 38h4v4h-4v-4ZM30 15h4v4h-4v-4ZM30 31h4v4h-4v-4ZM38 7h4v4h-4V7ZM38 23h4v4h-4v-4ZM38 38h4v4h-4v-4Z"
  }));
}

var IconMosaic = /*#__PURE__*/React.forwardRef(IconMosaicComponent);
IconMosaic.defaultProps = {
  isIcon: true
};
IconMosaic.displayName = 'IconMosaic';
export default IconMosaic;