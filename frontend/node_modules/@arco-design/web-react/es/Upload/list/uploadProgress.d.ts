import { FC } from 'react';
import { UploadListProps, CustomIconType } from '../interface';
import { ProgressProps } from '../../Progress';
import { UploadItem } from '../upload';
declare const UploadProgress: FC<{
    listType?: UploadListProps['listType'];
    file: UploadItem;
    prefixCls: string;
    progressProps?: Partial<ProgressProps>;
    onReupload?: UploadListProps['onReupload'];
    onUpload?: UploadListProps['onUpload'];
    onAbort?: UploadListProps['onAbort'];
} & CustomIconType>;
export default UploadProgress;
