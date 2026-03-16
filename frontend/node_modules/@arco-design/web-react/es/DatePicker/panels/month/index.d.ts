import { ReactNode } from 'react';
import { Dayjs } from 'dayjs';
import { MonthPickerProps, ModeType, PrivateCType } from '../../interface';
interface InnerMonthPickerProps extends MonthPickerProps {
    rangeValues?: Dayjs[];
    onMouseEnterCell?: (time: Dayjs, disabled: boolean) => void;
    onMouseLeaveCell?: (time: Dayjs, disabled: boolean) => void;
    dateRender?: (currentDate: Dayjs) => ReactNode;
    pageShowDate?: Dayjs;
    isRangePicker?: boolean;
    onSuperPrev?: () => void;
    onSuperNext?: () => void;
    panelMode?: ModeType;
    setPanelMode?: (mode: ModeType) => void;
}
declare function MonthPicker(props: InnerMonthPickerProps & PrivateCType): JSX.Element;
export default MonthPicker;
