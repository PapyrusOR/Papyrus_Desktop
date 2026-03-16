export declare type MenuInfo = {
    keyPath: string[];
    prev: string;
    next: string;
    firstChild?: string;
    lastChild?: string;
    disabled?: boolean;
};
export declare const PROPS_NEED_TO_BE_PASSED_IN_SUBMENU: string[];
export declare const generateInfoMap: (children: any, keyPath?: string[], result?: {
    [key: string]: MenuInfo;
}) => {
    [key: string]: MenuInfo;
};
export declare const processChildren: (children: any, props: any) => Array<Exclude<unknown, boolean | null | undefined>>;
export declare function isChildrenSelected(children: any, keys: string[]): boolean;
