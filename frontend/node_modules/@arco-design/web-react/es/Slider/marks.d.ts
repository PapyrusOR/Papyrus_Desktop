import React from 'react';
import { IntervalConfig } from './hooks/useInterval';
declare type MaskType = {
    key: number | string;
    content: any;
};
interface MaskProps {
    data: MaskType[];
    vertical?: boolean;
    prefixCls?: string;
    onMouseDown?: (val: number) => void;
    reverse?: boolean;
    intervalConfigs?: IntervalConfig[];
}
declare const _default: React.NamedExoticComponent<MaskProps>;
export default _default;
