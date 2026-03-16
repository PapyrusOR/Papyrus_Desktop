import * as React from 'react';
import { IconProps } from './index';
export interface IconfontOptions {
    src?: string;
    extraProps?: {
        [key: string]: any;
    };
}
export default function addFromIconFontCn(options?: IconfontOptions): React.FC<IconProps & React.RefAttributes<unknown>>;
