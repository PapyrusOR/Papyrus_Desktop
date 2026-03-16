import React, { ReactElement } from 'react';
import { ConfigProviderProps } from '../ConfigProvider';
export declare type HolderRef = {
    addInstance?: (ins: ReactElement) => void;
    removeInstance?: (ins: ReactElement) => void;
    getContextConfig?: () => ConfigProviderProps;
};
declare const ContextHolderElement: React.ForwardRefExoticComponent<React.RefAttributes<HolderRef>>;
export default ContextHolderElement;
