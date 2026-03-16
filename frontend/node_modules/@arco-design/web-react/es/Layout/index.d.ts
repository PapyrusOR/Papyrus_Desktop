import React from 'react';
import Sider, { SiderContext } from './sider';
import Header from './header';
import Footer from './footer';
import Content from './content';
import { LayoutProps } from './interface';
export interface LayoutState {
    siders: string[];
}
export { SiderContext };
declare const LayoutComponent: React.ForwardRefExoticComponent<LayoutProps & React.RefAttributes<unknown>> & {
    Sider: typeof Sider;
    Header: typeof Header;
    Footer: typeof Footer;
    Content: typeof Content;
};
export default LayoutComponent;
