import React, { ForwardRefExoticComponent } from 'react';
import { InputProps, RefInputType } from './interface';
import Search from './search';
import TextArea from './textarea';
import Password from './password';
import Group from './group';
import { MergePropsOptions } from '../_util/hooks/useMergeProps';
export declare function formatValue(value: any, maxLength: any): any;
declare type InputRefType = ForwardRefExoticComponent<InputProps & React.RefAttributes<RefInputType> & MergePropsOptions> & {
    Search: typeof Search;
    TextArea: typeof TextArea;
    Password: typeof Password;
    Group: typeof Group;
};
declare const InputElement: InputRefType;
export declare type InputRef = InputRefType;
export default InputElement;
