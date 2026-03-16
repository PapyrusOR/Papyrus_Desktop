import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useContext } from 'react';
import { IconContext } from '../context';

function IconQqZoneComponent(iconProps, ref) {
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
    className: "".concat(className ? className + ' ' : '').concat(prefixCls, "-icon ").concat(prefixCls, "-icon-qq-zone")
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
    d: "M25.1 3.9c.2.1.4.3.5.5l6.8 10L44 17.8c1.1.3 1.7 1.4 1.4 2.5-.1.2-.2.5-.3.7l-7.4 9.5.4 12c0 1.1-.8 2-1.9 2.1-.2 0-.5 0-.7-.1L24 40.4l-11.3 4.1c-1 .4-2.2-.2-2.6-1.2-.1-.3-.1-.6-.1-.8l.4-12L3 20.9c-.7-.9-.5-2.1.4-2.8.2-.2.4-.3.7-.3l11.6-3.4 6.8-10c.5-.9 1.7-1.1 2.6-.5ZM24 9.1l-5.9 8.7-10.1 3 6.5 8.3-.3 10.5 9.9-3.6 9.9 3.6-.3-10.5 6.5-8.3-10.1-3L24 9.1Zm5 11.5c.8 0 1.5.5 1.8 1.2.3.7.1 1.6-.5 2.1L24 29.6h5c1 0 1.9.9 1.9 1.9 0 1-.9 1.9-1.9 1.9H19c-.8 0-1.5-.5-1.8-1.2-.3-.7-.1-1.6.5-2.1l6.3-5.7h-5c-1 0-1.9-.9-1.9-1.9 0-1 .9-1.9 1.9-1.9h10Z"
  }));
}

var IconQqZone = /*#__PURE__*/React.forwardRef(IconQqZoneComponent);
IconQqZone.defaultProps = {
  isIcon: true
};
IconQqZone.displayName = 'IconQqZone';
export default IconQqZone;