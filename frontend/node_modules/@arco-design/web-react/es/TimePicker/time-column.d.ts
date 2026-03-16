declare type ListItem = {
    label?: string;
    value?: number | string;
    disabled?: boolean;
    selected?: boolean;
};
export interface TimeColumnProps {
    prefixCls?: string;
    list?: ListItem[];
    value?: number | string;
    onHandleSelect?: (value?: number | string, unit?: string) => void;
    unit?: 'hour' | 'minute' | 'second' | 'ampm';
    popupVisible?: boolean;
    scrollSticky?: boolean;
}
export default function TimeColumn(props: TimeColumnProps): JSX.Element;
export {};
