import React from 'react';
import Countdown from './countdown';
import { StatisticProps } from './interface';
declare const StatisticComponent: React.ForwardRefExoticComponent<StatisticProps & React.RefAttributes<unknown>> & {
    Countdown: typeof Countdown;
};
export default StatisticComponent;
export { StatisticProps };
