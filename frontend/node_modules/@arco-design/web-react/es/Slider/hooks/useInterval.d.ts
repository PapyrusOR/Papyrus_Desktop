import { SliderProps } from '..';
export interface IntervalConfig {
    begin: number;
    end: number;
    width: number;
    step: number;
    beginOffset?: number;
    endOffset?: number;
}
declare function useInterval(props: {
    marks: SliderProps['marks'];
    getIntervalConfig?: SliderProps['getIntervalConfig'];
    min: number;
    max: number;
    onlyMarkValue: boolean;
    step: number;
}): {
    intervalConfigs: IntervalConfig[];
    markList: {
        key: string;
        content: any;
    }[];
};
export default useInterval;
