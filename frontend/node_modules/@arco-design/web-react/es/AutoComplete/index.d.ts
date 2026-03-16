import React from 'react';
import Select from '../Select/select';
import { RefInputType } from '../Input/interface';
import { AutoCompleteProps } from './interface';
declare const AutoCompleteComponent: React.ForwardRefExoticComponent<AutoCompleteProps & React.RefAttributes<RefInputType>> & {
    Option: React.ForwardRefExoticComponent<import("../Select/interface").OptionProps & React.RefAttributes<unknown>> & {
        __ARCO_SELECT_OPTION__?: boolean;
    };
    OptGroup: typeof Select.OptGroup;
};
export default AutoCompleteComponent;
export { AutoCompleteProps };
