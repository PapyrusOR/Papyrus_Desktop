import { MutableRefObject } from 'react';
export declare type ReturnType = {
    height: number;
    width: number;
    domRect?: DOMRect;
};
export default function DomSize<T extends HTMLElement>(): [
    MutableRefObject<T>,
    ReturnType,
    React.Dispatch<React.SetStateAction<ReturnType>>
];
