var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import React, { useContext, useEffect, useRef, useState } from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import Input from '../Input';
import Select from '../Select';
import { ArrowDown, ArrowUp, Enter, Esc } from '../_util/keycode';
import { getBeforeSelectionText, getLastMeasureIndex, isValidSearch } from './utils';
import useMergeValue from '../_util/hooks/useMergeValue';
import useMergeProps from '../_util/hooks/useMergeProps';
var TextArea = Input.TextArea;
var FunctionalKeyCodeList = [Esc.code, Enter.code, ArrowUp.code, ArrowDown.code];
var defaultProps = {
    prefix: '@',
    split: ' ',
    rows: 1,
    position: 'bl',
    alignTextarea: true,
};
function Mentions(baseProps, ref) {
    var _a;
    var _b = useContext(ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var props = useMergeProps(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Mentions);
    var style = props.style, className = props.className, options = props.options, prefix = props.prefix, split = props.split, position = props.position, alignTextarea = props.alignTextarea, filterOption = props.filterOption, triggerProps = props.triggerProps, getPopupContainer = props.getPopupContainer, onChange = props.onChange, onSearch = props.onSearch, notFoundContent = props.notFoundContent, rest = __rest(props, ["style", "className", "options", "prefix", "split", "position", "alignTextarea", "filterOption", "triggerProps", "getPopupContainer", "onChange", "onSearch", "notFoundContent"]);
    var prefixCls = getPrefixCls('mentions');
    var refSelect = useRef(null);
    var refMeasure = useRef(null);
    var refTextarea = useRef(null);
    var _c = __read(useMergeValue('', {
        value: props.value,
        defaultValue: props.defaultValue,
    }), 2), value = _c[0], setValue = _c[1];
    var _d = __read(useState({
        measuring: false,
        location: 0,
        text: '',
        prefix: '',
    }), 2), measureInfo = _d[0], setMeasureInfo = _d[1];
    useEffect(function () {
        if (refTextarea.current && refMeasure.current) {
            refMeasure.current.scrollTop = refTextarea.current.dom.scrollTop;
        }
    });
    var stopMeasure = function () {
        setMeasureInfo(__assign(__assign({}, measureInfo), { measuring: false, location: 0, text: '' }));
    };
    var handleOptionSelect = function (optionValue) {
        var measureStart = measureInfo.location;
        var measureEnd = measureInfo.location + measureInfo.text.length;
        var head = value.slice(0, measureStart);
        var tail = value.slice(measureEnd + 1);
        head += !head || head.endsWith(split) || head.endsWith('\n') ? '' : split;
        tail = (!tail || tail.startsWith(split) || tail.startsWith('\n') ? '' : split) + tail;
        // If the content already exists before or after the matched content, add a split character
        var match = "" + measureInfo.prefix + optionValue;
        var nextValue = "" + head + match + tail;
        setValue(nextValue);
        stopMeasure();
        onChange && onChange(nextValue);
    };
    var textAreaEventHandlers = {
        onChange: function (value) {
            setValue(value);
            onChange && onChange(value);
        },
        onKeyDown: function (event) {
            var keyCode = event.keyCode || event.which;
            if (keyCode === Esc.code) {
                refTextarea.current && refTextarea.current.blur();
            }
            if (refSelect.current) {
                refSelect.current.hotkeyHandler(event);
                if (keyCode === Enter.code || keyCode === ArrowUp.code || keyCode === ArrowDown.code) {
                    event.preventDefault();
                }
            }
        },
        onKeyUp: function (event) {
            var key = event.key, keyCode = event.which, target = event.target;
            // return immediately when hit any one of the function keys
            if (~FunctionalKeyCodeList.indexOf(keyCode)) {
                return;
            }
            var textBeforeSelection = getBeforeSelectionText(target);
            var _a = getLastMeasureIndex(textBeforeSelection, prefix), measureIndex = _a.location, measurePrefix = _a.prefix;
            var measureText = textBeforeSelection.slice(measureIndex + measurePrefix.length);
            if (measureIndex > -1 && isValidSearch(measureText, props)) {
                if (key === measurePrefix ||
                    measureInfo.measuring ||
                    measureText !== measureInfo.text ||
                    // fix: https://github.com/arco-design/arco-design/issues/2829
                    textBeforeSelection.includes(measurePrefix)) {
                    setMeasureInfo({
                        measuring: true,
                        text: measureText,
                        prefix: measurePrefix,
                        location: measureIndex,
                    });
                }
                onSearch && onSearch(measureText, measurePrefix);
            }
            else if (measureInfo.measuring) {
                stopMeasure();
            }
        },
        onBlur: stopMeasure,
    };
    // Pass [value: undefined] to Select, make sure onChange callback will always be triggered
    // Only parameter of Select.onChange is needed, Select.value is not important cause Select is hidden
    return (React.createElement("div", { ref: ref, style: style, className: cs("" + prefixCls, (_a = {}, _a[prefixCls + "-align-textarea"] = alignTextarea, _a[prefixCls + "-rtl"] = rtl, _a), className) },
        React.createElement(TextArea, __assign({ ref: refTextarea, className: prefixCls + "-textarea", value: value }, textAreaEventHandlers, rest)),
        React.createElement("div", { ref: refMeasure, className: prefixCls + "-measure" },
            value.slice(0, measureInfo.location),
            React.createElement(Select, { ref: refSelect, options: options, inputValue: measureInfo.text, notFoundContent: notFoundContent, triggerElement: React.createElement("span", { className: prefixCls + "-measure-trigger" }, measureInfo.prefix), triggerProps: __assign({ popupVisible: measureInfo.measuring, autoAlignPopupWidth: alignTextarea, position: position }, triggerProps), filterOption: filterOption, getPopupContainer: getPopupContainer, value: undefined, onChange: handleOptionSelect }),
            value.slice(measureInfo.location + measureInfo.prefix.length))));
}
var MentionsComponent = React.forwardRef(Mentions);
MentionsComponent.displayName = 'Mentions';
export default MentionsComponent;
