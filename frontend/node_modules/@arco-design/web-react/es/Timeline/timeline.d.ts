import React from 'react';
import Item from './item';
import { TimelineProps } from './interface';
declare const TimelineComponent: React.ForwardRefExoticComponent<TimelineProps & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>> & {
    Item: typeof Item;
};
export default TimelineComponent;
export { TimelineProps };
