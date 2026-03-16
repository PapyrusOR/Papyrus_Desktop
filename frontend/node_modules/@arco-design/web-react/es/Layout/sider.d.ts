import React from 'react';
import { SiderProps } from './interface';
export declare const SiderContext: React.Context<{
    siderCollapsed: boolean;
    collapsedWidth: string | number;
}>;
declare const SiderComponent: React.ForwardRefExoticComponent<SiderProps & React.RefAttributes<unknown>> & {
    __ARCO_SIGN__: 'sider';
};
export default SiderComponent;
