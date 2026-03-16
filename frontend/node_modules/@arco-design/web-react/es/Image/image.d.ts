import React from 'react';
import { ImageProps } from './interface';
import ImagePreview from './image-preview';
import ImagePreviewGroup from './image-preview-group';
declare const ImageComponent: React.ForwardRefExoticComponent<ImageProps & {
    _index?: number;
} & React.RefAttributes<HTMLDivElement>> & {
    Preview: typeof ImagePreview;
    PreviewGroup: typeof ImagePreviewGroup;
};
export default ImageComponent;
