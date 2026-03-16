import { Component, CSSProperties, SVGAttributes } from 'react';
import addFromIconFontCn from './addFromIconFontCn';
export interface IconProps extends Omit<SVGAttributes<SVGElement>, 'className'> {
    style?: CSSProperties;
    type?: string;
    spin?: boolean;
    className?: string | string[];
}
export interface CustomIconComponentProps {
    style?: CSSProperties;
    className?: string;
    width?: string | number;
    height?: string | number;
    fill?: string;
    viewBox?: string;
}
declare class Icon extends Component<IconProps> {
    static displayName: string;
    static addFromIconFontCn: typeof addFromIconFontCn;
    renderIcon: ({ getPrefixCls }: {
        getPrefixCls: any;
    }) => JSX.Element;
    render(): JSX.Element;
}
export default Icon;
