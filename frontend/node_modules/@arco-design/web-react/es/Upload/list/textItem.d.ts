import React from 'react';
import { UploadItem } from '../upload';
import { UploadListProps } from '../interface';
import { ConfigProviderProps } from '../../ConfigProvider';
declare const _default: React.ForwardRefExoticComponent<UploadListProps & {
    file: UploadItem;
    locale: ConfigProviderProps['locale'];
} & React.RefAttributes<HTMLDivElement>>;
export default _default;
