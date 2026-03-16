/**
 * Judge whether a number is scientific notation
 */
export declare function isE(number: string | number): boolean;
/**
 * Judge whether BigInt is supported by current env
 */
export declare function supportBigInt(): boolean;
/**
 * Get precision of a number, include scientific notation like 1e-10
 */
export declare function getNumberPrecision(number: string | number): number;
/**
 * Convert number to non-scientific notation
 */
export declare function toSafeString(number: number | string): string;
/**
 * Judge whether a number is valid
 */
export declare function validateNumber(num: string | number): boolean;
export declare function trimNumber(numStr: string): {
    negative: boolean;
    negativeStr: string;
    trimStr: string;
    integerStr: string;
    decimalStr: string;
    fullStr: string;
};
