import React, { CSSProperties } from 'react';
import { ImagePreviewActionProps } from './interface';
interface ImagePreviewToolbarProps {
    style?: CSSProperties;
    className?: string | string[];
    prefixCls: string;
    previewPrefixCls: string;
    simple: boolean;
    actions: ImagePreviewActionProps[];
    actionsLayout: string[];
    defaultActions: ImagePreviewActionProps[];
}
declare const _default: React.ForwardRefExoticComponent<ImagePreviewToolbarProps & React.RefAttributes<unknown>>;
export default _default;
