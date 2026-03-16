import React from 'react';
import { EllipsisConfig } from './interface';
interface IEllipsis extends EllipsisConfig {
    width: number;
    renderMeasureContent: (slicedNode: any, isEllipsis: boolean) => React.ReactNode;
    expanding?: boolean;
    simpleEllipsis?: boolean;
}
export declare enum MEASURE_STATUS {
    INIT = 0,
    BEFORE_MEASURE = 1,
    MEASURING = 2,
    MEASURE_END = 3,
    NO_NEED_ELLIPSIS = 4
}
declare function useEllipsis(props: React.PropsWithChildren<IEllipsis>): {
    ellipsisNode: any;
    isEllipsis: boolean;
    measureStatus: MEASURE_STATUS;
};
export default useEllipsis;
