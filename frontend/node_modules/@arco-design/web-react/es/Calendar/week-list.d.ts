interface WeekListProps {
    prefixCls?: string;
    dayStartOfWeek?: 0 | 1;
    isWeek?: boolean;
    CALENDAR_LOCALE?: Record<string, any>;
    panel?: boolean;
    innerMode?: 'day' | 'week' | 'month' | 'year';
}
declare function WeekList(props: WeekListProps): JSX.Element;
export default WeekList;
