import { ReactNode } from 'react';
import { Dayjs } from 'dayjs';
import { RangePickerProps, IconsType, PrivateCType, ModeType } from '../../interface';
interface InnerRangePickerProps extends RangePickerProps {
    disabledDate?: (current: Dayjs) => boolean;
    dateRender?: (currentDate: Dayjs) => ReactNode;
    icons?: IconsType;
    locale?: Record<string, any>;
    pageShowDates?: Dayjs[];
    onSelectPanel?: (dateString: string, date: Dayjs) => void;
    onMouseEnterCell?: (time: Dayjs, disabled: boolean) => void;
    onMouseLeaveCell?: (time: Dayjs, disabled: boolean) => void;
    onPrev?: () => void;
    onSuperPrev?: () => void;
    onNext?: () => void;
    onSuperNext?: () => void;
    localeName?: string;
    onTimePickerSelect?: (index: number, timeString: string, time: Dayjs) => void;
    setRangePageShowDates?: (dates: Dayjs[], index: number) => void;
    disabledTimePickerIndex?: number;
    timeValues?: Dayjs[];
    isTimePanel?: boolean;
    valueShowHover?: Dayjs[];
    panelModes?: ModeType[];
    setPanelModes?: (modes: ModeType[]) => void;
}
declare function RangePicker(props: InnerRangePickerProps & PrivateCType): JSX.Element;
export default RangePicker;
