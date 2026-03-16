import React from 'react';
import { MenuItemProps } from './interface';
declare const ItemComponent: React.ForwardRefExoticComponent<MenuItemProps & React.RefAttributes<unknown>> & {
    menuType: string;
};
export default ItemComponent;
