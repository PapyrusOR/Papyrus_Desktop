import React from 'react';
import { TabsProps } from '../tabs';
import { ReturnType } from '../hook/useDomSize';
interface TabNavIconProps {
    direction: TabsProps['direction'];
    align: 'left' | 'right';
    headerSize: ReturnType;
    headerWrapperSize: ReturnType;
    currentOffset: number;
    prefixCls?: string;
    icon?: React.ReactNode;
    iconPos?: 'prev' | 'next';
    rtl?: boolean;
    onChange?: (offset: number) => void;
}
declare const TabNavIcon: (props: TabNavIconProps) => JSX.Element;
export default TabNavIcon;
