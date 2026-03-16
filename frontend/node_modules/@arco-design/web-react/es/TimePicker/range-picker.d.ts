import { Dayjs } from 'dayjs';
import { RangePickerProps } from './interface';
interface InnerRangePickerProps extends RangePickerProps {
    focusedInputIndex?: number;
    changeFocusedInputIndex?: (index: number) => void;
    popupVisible?: boolean;
    onConfirmValue?: (value: Dayjs[]) => void;
    valueShow?: Dayjs[];
    setValueShow?: (valueShow: Dayjs[]) => void;
}
declare function RangePicker(props: InnerRangePickerProps): JSX.Element;
export default RangePicker;
