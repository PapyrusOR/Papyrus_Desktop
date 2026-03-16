import React, { PropsWithChildren } from 'react';
interface HoverProps extends React.HTMLAttributes<HTMLSpanElement> {
    size?: 'small' | 'mini' | 'default' | 'large';
    className?: string;
    prefix?: string;
    disabled?: boolean;
    onClick?: (e: any) => void;
}
export default function IconHover(props: PropsWithChildren<HoverProps>): JSX.Element;
export {};
