import { ReactNode } from 'react';
import { Dayjs } from 'dayjs';
import { TimePickerProps, CalendarValue } from './interface';
interface InnerTimePickerProps extends TimePickerProps {
    confirmBtnDisabled?: boolean;
    popupVisible?: boolean;
    step?: {
        hour?: number;
        minute?: number;
        second?: number;
    };
    disabledHours?: () => number[];
    disabledMinutes?: (selectedHour: any) => number[];
    disabledSeconds?: (selectedHour: any, selectedMinute: any) => number[];
    hideDisabledOptions?: boolean;
    onConfirmValue?: (value: Dayjs) => void;
    isRangePicker?: boolean;
    extra?: ReactNode;
    valueShow?: CalendarValue;
    setValueShow?: (valueShow: Dayjs) => void;
    hideFooter?: boolean;
}
declare function TimePicker(props: InnerTimePickerProps): JSX.Element;
export default TimePicker;
