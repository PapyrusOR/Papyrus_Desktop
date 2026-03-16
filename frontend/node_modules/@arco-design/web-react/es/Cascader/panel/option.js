import React from 'react';
import Checkbox from '../../Checkbox';
var Option = function (props) {
    var prefixCls = props.prefixCls, multiple = props.multiple, option = props.option, renderOption = props.renderOption, selected = props.selected, icons = props.icons;
    var checkboxDisabled = option.disabled || (multiple && option.disableCheckbox);
    return (React.createElement(React.Fragment, null,
        multiple ? (React.createElement(Checkbox, { disabled: checkboxDisabled, checked: option._checked, indeterminate: option._halfChecked, onChange: props.onMultipleChecked, value: option.value })) : (''),
        React.createElement("div", { className: prefixCls + "-list-item-label", onClick: option.disabled ? undefined : props.onClickOption, onMouseEnter: props.onMouseEnter, onDoubleClick: checkboxDisabled ? undefined : props.onDoubleClickOption },
            renderOption ? renderOption() : option.label,
            option.isLeaf ? selected && icons.checked : option.loading ? icons.loading : icons.next)));
};
export default Option;
