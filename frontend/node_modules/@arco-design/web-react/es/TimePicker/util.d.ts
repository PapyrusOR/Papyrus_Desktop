import { Dayjs } from 'dayjs';
export declare function getColumnsFromFormat(format: any): {
    list: string[];
    use12Hours: boolean;
};
export declare function scrollTo(element: HTMLElement, to: number, duration: number): void;
export declare function getFormatTime(time: Dayjs): Dayjs;
