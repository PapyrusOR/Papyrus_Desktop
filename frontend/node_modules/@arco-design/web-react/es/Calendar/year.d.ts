import { Dayjs } from 'dayjs';
import { CalendarProps } from './interface';
interface YearProps extends CalendarProps {
    prefixCls?: string;
    pageData?: any;
    mergedValue?: Dayjs;
    selectHandler?: (time: Dayjs, disabled: boolean) => void;
    mergedPageShowDate?: Dayjs;
    CALENDAR_LOCALE?: Record<string, any>;
    innerMode?: 'day' | 'week' | 'month' | 'year';
}
declare function Year(props: YearProps): JSX.Element;
export default Year;
