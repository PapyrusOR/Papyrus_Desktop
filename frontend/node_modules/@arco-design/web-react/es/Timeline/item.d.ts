import React from 'react';
import { TimelineItemProps } from './interface';
declare const TimelineItem: React.ForwardRefExoticComponent<TimelineItemProps & React.RefAttributes<HTMLDivElement>> & {
    isTimelineItem?: boolean;
};
export default TimelineItem;
export { TimelineItemProps };
