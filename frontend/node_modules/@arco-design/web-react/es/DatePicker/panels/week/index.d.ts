import { Dayjs } from 'dayjs';
import { WeekPickerProps, PrivateCType, ModeType } from '../../interface';
interface InnerWeekPickerProps extends WeekPickerProps {
    isRangePicker?: boolean;
    rangeValues?: Dayjs[];
    pageShowDate?: Dayjs;
    onPrev?: () => void;
    onNext?: () => void;
    onSuperPrev?: () => void;
    onSuperNext?: () => void;
    localeName?: string;
    panelMode?: ModeType;
    setPanelMode?: (mode: ModeType) => void;
}
declare function WeekPicker(props: InnerWeekPickerProps & PrivateCType): JSX.Element;
export default WeekPicker;
