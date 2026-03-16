import React from 'react';
import Step from './step';
import { StepsProps } from './interface';
declare const StepsComponent: React.ForwardRefExoticComponent<StepsProps & React.RefAttributes<unknown>> & {
    Step: typeof Step;
};
export default StepsComponent;
export { StepsProps };
