import React from 'react';
import Item from './item';
import ItemGroup from './item-group';
import SubMenu from './sub-menu';
import { MenuProps } from './interface';
declare const MenuComponent: React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<unknown>> & {
    Item: typeof Item;
    ItemGroup: typeof ItemGroup;
    SubMenu: typeof SubMenu;
    __ARCO_MENU__: boolean;
};
export default MenuComponent;
export { MenuProps, MenuSubMenuProps, MenuItemGroupProps, MenuItemProps } from './interface';
