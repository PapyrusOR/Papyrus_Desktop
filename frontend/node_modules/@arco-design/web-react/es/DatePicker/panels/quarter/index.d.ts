import { ReactNode } from 'react';
import { Dayjs } from 'dayjs';
import { QuarterPickerProps, ModeType, PrivateCType } from '../../interface';
interface InnerQuarterPickerProps extends QuarterPickerProps {
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
declare function QuarterPicker(props: InnerQuarterPickerProps & PrivateCType): JSX.Element;
export default QuarterPicker;
