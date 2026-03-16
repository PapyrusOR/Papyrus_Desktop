import { ReactElement } from 'react';
import { TabsProps } from './tabs';
import { TabPaneProps, TabPaneType } from './tab-pane';
interface TabContentProps extends Pick<TabsProps, 'animation' | 'activeTab' | 'direction' | 'lazyload' | 'destroyOnHide'> {
    prefixCls: string;
    paneChildren: ReactElement<TabPaneProps, TabPaneType>[];
}
export default function TabContent(props: TabContentProps): JSX.Element;
export {};
