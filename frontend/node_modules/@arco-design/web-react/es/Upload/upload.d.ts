import React from 'react';
import { UploadProps, UploadItem, UploadInstance } from './interface';
export declare type UploadState = {
    uploadState: {
        [key: string]: UploadItem;
    };
};
declare const UploadRef: React.ForwardRefExoticComponent<UploadProps & {
    children?: React.ReactNode;
} & React.RefAttributes<UploadInstance>>;
export default UploadRef;
export { UploadItem, UploadProps };
