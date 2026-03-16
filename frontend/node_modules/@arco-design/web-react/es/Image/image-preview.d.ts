import React from 'react';
import { ImagePreviewProps } from './interface';
export declare type ImagePreviewHandle = {
    reset: () => void;
};
declare const PreviewComponent: React.ForwardRefExoticComponent<ImagePreviewProps & React.RefAttributes<ImagePreviewHandle>>;
export default PreviewComponent;
