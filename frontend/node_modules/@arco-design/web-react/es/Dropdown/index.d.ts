import React from 'react';
import Button from './button';
import { DropdownProps } from './interface';
declare const DropdownComponent: React.ForwardRefExoticComponent<DropdownProps & React.RefAttributes<unknown>> & {
    Button: typeof Button;
};
export default DropdownComponent;
export { DropdownProps };
