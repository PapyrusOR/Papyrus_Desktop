import { CSSProperties } from 'react';
import { ImageProps } from './interface';
interface ImageFooterProps {
    style?: CSSProperties;
    className?: string | string[];
    title?: ImageProps['title'];
    description?: ImageProps['description'];
    actions?: ImageProps['actions'];
    prefixCls: string;
    simple?: boolean;
}
export declare const ImageFooter: (props: ImageFooterProps) => JSX.Element;
export {};
