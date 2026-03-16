import React, { ReactElement } from 'react';
import TabPane, { TabPaneType, TabPaneProps } from './tab-pane';
import { TabsProps } from './interface';
export declare const TabsContext: React.Context<TabsProps & {
    getIdPrefix?: (suffix?: number | string) => {
        tab: string;
        tabpane: string;
    };
    paneChildren?: ReactElement<TabPaneProps, TabPaneType>[];
    prefixCls?: string;
}>;
declare const TabsComponent: React.ForwardRefExoticComponent<TabsProps & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>> & {
    TabPane: typeof TabPane;
};
export default TabsComponent;
export { TabsProps };
