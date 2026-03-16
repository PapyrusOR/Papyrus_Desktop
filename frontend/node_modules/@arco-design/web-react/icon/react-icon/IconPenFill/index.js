import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useContext } from 'react';
import { IconContext } from '../context';

function IconPenFillComponent(iconProps, ref) {
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
    className: "".concat(className ? className + ' ' : '').concat(prefixCls, "-icon ").concat(prefixCls, "-icon-pen-fill")
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
    d: "M31.07 8.444H43.07V37.444H31.07z",
    transform: "rotate(45 31.07 8.444)"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    stroke: "none",
    d: "M33.9 5.615a2 2 0 0 1 2.829 0l5.657 5.657a2 2 0 0 1 0 2.829l-1.415 1.414-8.485-8.486L33.9 5.615ZM17.636 38.85 9.15 30.363l-3.61 10.83a1 1 0 0 0 1.265 1.265l10.83-3.61Z"
  }));
}

var IconPenFill = /*#__PURE__*/React.forwardRef(IconPenFillComponent);
IconPenFill.defaultProps = {
  isIcon: true
};
IconPenFill.displayName = 'IconPenFill';
export default IconPenFill;