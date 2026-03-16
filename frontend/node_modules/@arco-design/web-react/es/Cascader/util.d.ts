import Store from './base/store';
import { CascaderProps } from './interface';
export declare const ValueSeparator = "__arco_cascader__";
export declare const SHOW_PARENT = "parent";
export declare const SHOW_CHILD = "child";
export declare const PANEL_MODE: {
    cascader: string;
    select: string;
};
export declare function isEmptyValue(value: any): boolean;
export declare function getConfig(props: CascaderProps): {
    showEmptyChildren: boolean;
    changeOnSelect: boolean;
    lazyload: boolean;
    fieldNames: import("./interface").FieldNamesType;
    filterOption: (inputValue: string, option: import(".").NodeProps<any>) => boolean;
    showParent: boolean;
};
export declare function getStore(props: any, value: any): Store<any>;
export declare const transformValuesToSet: (values: string[][]) => Set<unknown>;
export declare const valueInSet: (set: any, value: string[]) => any;
export declare const removeValueFromSet: (set: any, value: string[]) => any;
export declare const formatValue: (value: any, isMultiple: any, store?: any) => string[][] | undefined;
export declare const getMultipleCheckValue: (propsValue: any, store: Store<any>, option: any, _checked: any) => any;
