import React from 'react';
import Meta from './meta';
import { ListItemProps } from './interface';
declare const ItemComponent: React.ForwardRefExoticComponent<ListItemProps & React.RefAttributes<HTMLDivElement>> & {
    Meta: typeof Meta;
};
export default ItemComponent;
