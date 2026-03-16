import { ReactElement } from 'react';
import { Dayjs } from 'dayjs';
import { PickerProps, CalendarValue } from './interface';
interface InnerPickerProps extends PickerProps {
    defaultValue?: CalendarValue | CalendarValue[];
    value?: CalendarValue | CalendarValue[];
    onSelect?: (value: string | string[], dayjsValue: Dayjs | Dayjs[]) => void;
    onChange?: (value: string | string[], dayjsValue: Dayjs | Dayjs[]) => void;
    isRangePicker?: boolean;
    picker?: ReactElement;
    hideFooter?: boolean;
    order?: boolean;
}
declare const Picker: (baseProps: InnerPickerProps) => JSX.Element;
export default Picker;
