import React from 'react';
import OptGroup from './opt-group';
import Option from './option';
import { SelectProps, SelectHandle } from './interface';
declare const SelectComponent: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<SelectHandle>> & {
    Option: typeof Option;
    OptGroup: typeof OptGroup;
};
export { SelectHandle };
export default SelectComponent;
