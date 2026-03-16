import React, { PropsWithChildren, ReactText } from 'react';
import { CheckboxGroupProps } from './interface';
export declare const CheckboxGroupContext: React.Context<{
    disabled?: boolean;
    isCheckboxGroup: boolean;
    onGroupChange: (_optionValue: any, _checked: boolean, e: Event) => void;
    checkboxGroupValue: ReactText[];
    registerValue: (value: ReactText) => void;
    unRegisterValue: (value: ReactText) => void;
}>;
export declare const ClearCheckboxGroupContext: ({ children }: PropsWithChildren<{}>) => JSX.Element;
declare function Group<T extends React.ReactText>(props: PropsWithChildren<CheckboxGroupProps<T>>): JSX.Element;
declare namespace Group {
    var displayName: string;
}
export default Group;
export { CheckboxGroupProps };
