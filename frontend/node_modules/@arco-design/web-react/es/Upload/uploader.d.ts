import React from 'react';
import { UploaderProps, UploadItem, UploadRequestReturn } from './interface';
export declare type UploaderType = {
    upload: (file: UploadItem) => void;
    abort: (file: UploadItem) => void;
    delete: (uid: UploadItem['uid']) => void;
    reupload: (file: UploadItem) => void;
};
declare type UploaderState = {
    uploadRequests: {
        [key: string]: UploadRequestReturn;
    };
};
declare class Uploader extends React.Component<React.PropsWithChildren<UploaderProps>, UploaderState> {
    inputRef: HTMLInputElement | null;
    constructor(props: any);
    upload: (file: UploadItem) => void;
    abort: (file: UploadItem) => void;
    reupload: (file: UploadItem) => void;
    deleteReq: (uid: string) => void;
    delete: (uid: string) => void;
    updateFileStatus: (file: UploadItem, fileList?: UploadItem[]) => void;
    getTargetFile: (file: UploadItem) => UploadItem;
    doUpload: (file: UploadItem) => Promise<void>;
    handleFiles: (files: File[]) => void;
    render(): JSX.Element;
}
export default Uploader;
