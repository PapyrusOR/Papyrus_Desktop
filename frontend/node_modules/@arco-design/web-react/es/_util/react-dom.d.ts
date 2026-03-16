import { ReactElement, ReactInstance } from 'react';
/**
 *
 * @param element
 * @param instance: 兜底 findDOMNode 查找，一般都是 this
 * @returns
 */
export declare const findDOMNode: (element: any, instance?: ReactInstance) => any;
export declare const callbackOriginRef: (children: any, node: any) => void;
export declare const setCreateRoot: (_createRoot: any) => void;
export declare const render: (node: any, el: any) => {
    render: (container: ReactElement) => void;
    _unmount: () => void;
};
