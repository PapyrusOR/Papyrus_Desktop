import React from 'react';
import { SelectInnerStateValue, OptionInfo, OptionProps, SelectProps } from './interface';
export declare type OptionInfoMap = Map<OptionProps['value'], OptionInfo>;
declare function preventDefaultEvent(e: any): void;
declare function isEmptyValue(value: any, isMultiple: boolean): boolean;
declare function getValidValue(value: any, isMultiple: boolean, labelInValue: boolean): SelectInnerStateValue;
declare function isSelectOption(child: any): boolean;
declare function isSelectOptGroup(child: any): boolean;
declare function flatChildren({ children, options, filterOption }: Pick<SelectProps, 'children' | 'options' | 'filterOption'>, { inputValue, userCreatedOptions, userCreatingOption, prefixCls, }: {
    inputValue: string;
    userCreatedOptions?: SelectProps['options'];
    userCreatingOption?: SelectProps['options'][number];
    prefixCls: string;
}, { optionInfoMap, optionValueList, customNodeCount, }?: {
    optionInfoMap?: OptionInfoMap;
    optionValueList?: Array<OptionProps['value']>;
    customNodeCount?: number;
}): {
    childrenList: React.ReactElement<any, string | React.JSXElementConstructor<any>>[];
    optionInfoMap: OptionInfoMap;
    optionValueList: (string | number)[];
    optionIndexListForArrowKey: number[];
    hasOptGroup: boolean;
    hasComplexLabelInOptions: boolean;
};
export { preventDefaultEvent, isEmptyValue, getValidValue, isSelectOption, isSelectOptGroup, flatChildren, };
