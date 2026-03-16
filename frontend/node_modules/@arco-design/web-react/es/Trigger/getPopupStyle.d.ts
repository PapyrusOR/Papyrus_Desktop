import { CSSProperties } from 'react';
import { TriggerProps, MouseLocationType } from './interface';
export declare const getBoundingClientRect: (dom: any, options: {
    boundaryDistance?: TriggerProps['boundaryDistance'];
    position: TriggerProps['position'];
}) => {
    width: any;
    height: any;
    left: any;
    right: any;
    top: any;
    bottom: any;
};
declare type ReturnType = {
    style?: CSSProperties;
    arrowStyle?: CSSProperties;
    realPosition?: TriggerProps['position'];
};
declare const _default: (props: TriggerProps, content: HTMLElement, child: HTMLElement, mountContainer: Element, mouseLocation: MouseLocationType) => ReturnType;
export default _default;
