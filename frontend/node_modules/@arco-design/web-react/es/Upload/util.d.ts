import { UploadProps } from './interface';
export declare const isAcceptFile: (file: File, propsAccept?: UploadProps['accept']) => boolean;
export declare const getFiles: (fileList: any, accept: any) => any;
export declare const loopDirectory: (items: DataTransferItemList, accept: any, callback: any) => void;
