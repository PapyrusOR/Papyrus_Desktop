import React from 'react';
import Group from './group';
import useCheckbox from './useCheckbox';
import { CheckboxProps } from './interface';
interface ForwardRefCheckboxType extends React.ForwardRefExoticComponent<React.PropsWithoutRef<CheckboxProps> & React.RefAttributes<unknown>> {
    <T extends React.ReactText = any>(props: React.PropsWithChildren<CheckboxProps<T>> & {
        ref?: React.Ref<unknown>;
    }): React.ReactElement;
    Group: typeof Group;
    useCheckbox: typeof useCheckbox;
}
declare const CheckboxComponent: ForwardRefCheckboxType;
export default CheckboxComponent;
export { CheckboxProps };
