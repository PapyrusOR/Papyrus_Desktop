import { PropsWithChildren, ForwardRefExoticComponent } from 'react';
import { TabPaneProps } from './interface';
export declare type TabPaneType = ForwardRefExoticComponent<PropsWithChildren<TabPaneProps>> & {
    isTabPane: boolean;
};
declare const TabPaneRef: TabPaneType;
export default TabPaneRef;
export { TabPaneProps };
