import React from 'react';
import { ImagePreviewGroupProps } from './interface';
export { ImagePreviewGroupProps };
export interface ImagePreviewGroupHandle {
    reset: () => void;
}
declare const PreviewGroupComponent: React.ForwardRefExoticComponent<ImagePreviewGroupProps & {
    children?: React.ReactNode;
} & React.RefAttributes<ImagePreviewGroupHandle>>;
export default PreviewGroupComponent;
