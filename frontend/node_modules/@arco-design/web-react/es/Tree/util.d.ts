import { ReactNode } from 'react';
import { TreeDataType } from './interface';
import { key2nodePropsType } from '.';
export declare const getTreeDataFromTreeChildren: (treeChildren: ReactNode) => any;
export declare function getChildNodeKeys(node: TreeDataType, key2nodeProps: key2nodePropsType): Set<string>;
export declare function getCheckedKeysByInitKeys(checkedKeys: string[], key2nodeProps: any): {
    checkedKeys: string[];
    indeterminateKeys: string[];
};
export declare function getAllCheckedKeysByCheck(key: string, checked: boolean, checkedKeys: string[], key2nodeProps: key2nodePropsType, indeterminateKeys: string[]): {
    checkedKeys: string[];
    indeterminateKeys: string[];
};
