import React from 'react';
import { IntervalConfig } from './hooks/useInterval';
declare type MaskType = {
    key: number | string;
    content: any;
};
interface MaskProps {
    data: MaskType[];
    valueRange?: [number, number];
    vertical?: boolean;
    prefixCls?: string;
    reverse?: boolean;
    onMouseDown?: (val: number) => void;
    intervalConfigs?: IntervalConfig[];
}
declare const _default: React.NamedExoticComponent<MaskProps>;
export default _default;
