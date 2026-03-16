import React, { useEffect, useRef, forwardRef } from 'react';
import cs from '../_util/classNames';
import Input from '../Input';
import mergedToString from '../_util/mergedToString';
function EditContent(props, ref) {
    var prefixCls = props.prefixCls, children = props.children, setEditing = props.setEditing, editableConfig = props.editableConfig, style = props.style;
    var className = cs(prefixCls + "-typography", prefixCls + "-edit-content", props.className);
    var str = mergedToString(children);
    var input = useRef(null);
    useEffect(function () {
        input.current && input.current.focus && input.current.focus();
        if (input.current && input.current.dom) {
            var length_1 = input.current.dom.value.length;
            input.current.dom.setSelectionRange(length_1, length_1);
        }
    }, []);
    function onEnd() {
        setEditing(false);
        editableConfig.onEnd && editableConfig.onEnd(str);
    }
    function onChange(value) {
        editableConfig.onChange && editableConfig.onChange(value);
    }
    function onBlur() {
        onEnd();
    }
    return (React.createElement("div", { className: className, style: style, ref: ref },
        React.createElement(Input.TextArea, { className: prefixCls + "-edit-content-textarea", onBlur: onBlur, ref: input, value: str, autoSize: true, onChange: onChange, onPressEnter: onEnd })));
}
export default forwardRef(EditContent);
