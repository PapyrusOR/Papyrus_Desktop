import { Dayjs } from 'dayjs';
import { DatePickerProps, ModeType, PrivateCType } from '../../interface';
interface InnerDatePickerProps extends DatePickerProps {
    onTimePickerSelect?: (timeString: string, time: Dayjs) => void;
    onMouseEnterCell?: (time: Dayjs, disabled: boolean) => void;
    onMouseLeaveCell?: (time: Dayjs, disabled: boolean) => void;
    pageShowDate?: Dayjs;
    isRangePicker?: boolean;
    rangeValues?: Dayjs[];
    isWeek?: boolean;
    onPrev?: () => void;
    onNext?: () => void;
    onSuperPrev?: () => void;
    onSuperNext?: () => void;
    isSameTime?: (current?: Dayjs, target?: Dayjs) => boolean;
    format?: string;
    index?: number;
    timeValue?: Dayjs;
    isTimePanel?: boolean;
    panelMode?: ModeType;
    setPanelMode?: (mode: ModeType) => void;
    onConfirmValue?: (value: Dayjs) => void;
}
declare function DatePicker(props: InnerDatePickerProps & PrivateCType): JSX.Element;
export default DatePicker;
