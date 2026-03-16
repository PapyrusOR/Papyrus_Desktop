import React from 'react';
import { SwitchProps } from './interface';
export interface SwitchState {
    checked: boolean;
}
declare const SwitchComponent: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<unknown>> & {
    __BYTE_SWITCH: boolean;
};
export default SwitchComponent;
export { SwitchProps };
