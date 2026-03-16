import React from 'react';
import Meta from './meta';
import Grid from './grid';
import { CardProps } from './interface';
declare const CardComponent: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<unknown>> & {
    Meta: typeof Meta;
    Grid: typeof Grid;
};
export default CardComponent;
export { CardProps };
