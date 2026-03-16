import React from 'react';
import Group from './group';
import { ButtonProps } from './interface';
declare const ButtonComponent: React.ForwardRefExoticComponent<Partial<{
    htmlType?: "button" | "submit" | "reset";
} & import("./interface").BaseButtonProps & Omit<React.ButtonHTMLAttributes<any>, "className" | "type" | "onClick"> & {
    href: string;
    target?: string;
    anchorProps?: React.HTMLProps<HTMLAnchorElement>;
} & Omit<React.AnchorHTMLAttributes<any>, "className" | "type" | "onClick">> & React.RefAttributes<unknown>> & {
    __BYTE_BUTTON: boolean;
    Group: typeof Group;
};
export default ButtonComponent;
export { ButtonProps };
