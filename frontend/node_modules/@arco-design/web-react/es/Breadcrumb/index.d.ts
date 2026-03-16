import React from 'react';
import Item from './item';
import { BreadcrumbProps } from './interface';
declare const BreadcrumbComponent: React.ForwardRefExoticComponent<BreadcrumbProps & React.RefAttributes<unknown>> & {
    Item: typeof Item;
};
export default BreadcrumbComponent;
export { BreadcrumbProps };
