import { MentionsProps } from './interface';
interface MeasureIndex {
    location: number;
    prefix: string;
}
export declare function isValidSearch(text: string, { split }: MentionsProps): boolean;
export declare function getBeforeSelectionText({ value, selectionStart }: HTMLTextAreaElement): string;
export declare function getLastMeasureIndex(text: string, prefix?: string | string[]): MeasureIndex;
export {};
