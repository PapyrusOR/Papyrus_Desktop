import React from 'react';
import { TooltipProps } from './interface';
export declare type TooltipHandle = {
    updatePopupPosition: () => void;
};
declare const TooltipComponent: React.ForwardRefExoticComponent<TooltipProps & {
    children?: React.ReactNode;
} & React.RefAttributes<TooltipHandle>>;
export default TooltipComponent;
export { TooltipProps };
