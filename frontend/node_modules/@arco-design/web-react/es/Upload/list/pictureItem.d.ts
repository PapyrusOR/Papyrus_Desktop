import React from 'react';
import { ConfigProviderProps } from '../../ConfigProvider';
import { UploadListProps } from '../interface';
import { UploadItem } from '../upload';
declare const _default: React.ForwardRefExoticComponent<UploadListProps & {
    file: UploadItem;
    locale: ConfigProviderProps['locale'];
} & React.RefAttributes<HTMLDivElement>>;
export default _default;
