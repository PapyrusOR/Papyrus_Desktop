import { ReactNode } from 'react';
import { Dayjs } from 'dayjs';
import { CalendarValue } from '../interface';
declare type RowType = {
    time?: Dayjs;
    name?: string;
    weekOfYear?: number;
    isPrev?: boolean;
    isNext?: boolean;
};
export interface PanelBodyProps {
    showWeekList?: boolean;
    isWeek?: boolean;
    prefixCls?: string;
    onSelectDate?: (timeString: string, time: Dayjs) => void;
    CALENDAR_LOCALE?: Record<string, any>;
    disabledDate?: (current: Dayjs) => boolean;
    onMouseEnterCell?: (date: Dayjs, disabled: boolean) => void;
    onMouseLeaveCell?: (date: Dayjs, disabled: boolean) => void;
    dateRender?: (date?: Dayjs) => ReactNode;
    rows?: RowType[][];
    value?: CalendarValue;
    isSameTime?: (current: Dayjs, target: Dayjs) => boolean;
    mode?: 'date' | 'week' | 'month' | 'year' | 'quarter';
    format?: string;
    hideNotInViewDates?: boolean;
    valueShowHover?: Dayjs[];
}
declare function Body(props: PanelBodyProps): JSX.Element;
export default Body;
