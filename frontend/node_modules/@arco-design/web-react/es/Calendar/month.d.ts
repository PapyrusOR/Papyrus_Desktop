import { Dayjs } from 'dayjs';
import { CalendarProps } from './interface';
export interface MonthProps extends CalendarProps {
    prefixCls?: string;
    cell?: boolean;
    pageData?: any;
    mergedValue?: Dayjs;
    selectHandler?: (time: Dayjs, disabled: boolean) => void;
    innerMode?: 'day' | 'week' | 'month' | 'year';
    mergedPageShowDate?: Dayjs;
    CALENDAR_LOCALE?: Record<string, any>;
}
export declare function getAllDaysByTime(props: CalendarProps, time: Dayjs): any;
declare function Month(props: MonthProps): JSX.Element;
export default Month;
