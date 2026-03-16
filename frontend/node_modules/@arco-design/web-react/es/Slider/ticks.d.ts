import React from 'react';
import { IntervalConfig } from './hooks/useInterval';
interface TicksProps {
    min: number;
    max: number;
    valueRange: [number, number];
    prefixCls: string;
    vertical: boolean;
    reverse?: boolean;
    intervalConfigs?: IntervalConfig[];
}
declare const _default: React.NamedExoticComponent<TicksProps>;
export default _default;
