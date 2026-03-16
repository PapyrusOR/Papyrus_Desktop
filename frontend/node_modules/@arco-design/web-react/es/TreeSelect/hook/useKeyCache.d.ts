import { TreeSelectDataType } from '../interface';
export declare type KeyCacheType = {
    [key: string]: TreeSelectDataType;
};
declare const useKeyCache: (treeData: any, fieldNames: any) => KeyCacheType;
export default useKeyCache;
