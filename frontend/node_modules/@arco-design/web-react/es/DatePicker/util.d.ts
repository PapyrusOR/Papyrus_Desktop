import { Dayjs } from 'dayjs';
export declare function isTimeArrayChange(prevTime: Dayjs[], nextTime: Dayjs[]): boolean;
export declare function getAvailableDayjsLength(value: any): 0 | 1 | 2;
export declare function isDisabledDate(cellDate: any, disabledDate: any, mode: any): boolean;
declare type WeekStartType = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export declare function getDefaultWeekStart(dayjsLocale: string): WeekStartType;
export declare function getLocaleDayjsValue(date: Dayjs | undefined, dayjsLocale: string): Dayjs | undefined;
export declare function getFormatByIndex(format: string | string[], index: number): string;
export {};
