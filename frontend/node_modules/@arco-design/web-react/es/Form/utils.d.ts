import { PropertyPath } from 'lodash';
import { ReactNode } from 'react';
import { IndexedObject, FormProps } from './interface';
import { RulesProps } from '..';
export declare function cloneDeep(value: any): any;
export declare const formatValidateMsg: (validateMessages: FormProps['validateMessages'], info: {
    label: ReactNode;
}) => any;
export declare function set<T extends IndexedObject>(target: T, field: PropertyPath, value: any): T;
export declare function get<T extends IndexedObject, R = any>(target: T, field: PropertyPath, defaultValue?: R): R;
export declare function iterativelyGetKeys(_obj: any, _prefix?: string): any;
export declare function isSyntheticEvent(e: any): boolean;
export declare function schemaValidate(field: any, value: any, _rules: RulesProps[], validateMessages: any): Promise<unknown>;
export declare function isFieldMatch(field: any, fields: any): any;
export declare const ID_SUFFIX = "_input";
