import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useContext } from 'react';
import { IconContext } from '../context';

function IconXiguaColorComponent(iconProps, ref) {
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
    className: "".concat(className ? className + ' ' : '').concat(prefixCls, "-icon ").concat(prefixCls, "-icon-xigua-color")
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
    fill: "#FE163E",
    d: "M381.968 38.684c-202.85 54.614-351.085 232.757-371.89 446.01C-.326 590.018 28.281 630.328 140.108 668.037c104.026 33.808 176.843 101.425 209.351 189.846 40.31 115.729 44.211 122.23 91.023 144.336 40.31 19.504 58.514 19.504 131.332 7.802 211.951-36.41 362.788-171.642 416.101-374.492C1059.434 368.965 882.59 90.697 605.623 32.183 517.2 13.978 470.39 15.279 381.968 38.684zm176.843 322.48c158.64 74.117 201.55 158.638 119.63 237.957-102.725 97.524-240.56 136.534-291.271 80.62-20.806-23.406-24.707-48.112-24.707-161.24s3.901-137.833 24.707-161.239c32.507-36.409 88.421-35.108 171.641 3.901z"
  }));
}

var IconXiguaColor = /*#__PURE__*/React.forwardRef(IconXiguaColorComponent);
IconXiguaColor.defaultProps = {
  isIcon: true
};
IconXiguaColor.displayName = 'IconXiguaColor';
export default IconXiguaColor;