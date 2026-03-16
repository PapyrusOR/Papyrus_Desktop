export interface Decimal {
    readonly isEmpty: boolean;
    readonly isNaN: boolean;
    readonly isInvalid: boolean;
    toNumber: () => number;
    toString: (option?: {
        safe: boolean;
        precision?: number;
    }) => string;
    equals: (target: Decimal) => boolean;
    less: (target: Decimal) => boolean;
    negate: () => Decimal;
    add: (target: string | number) => Decimal;
}
export declare function getDecimal(value: string | number): Decimal;
/**
 * Replace String.prototype.toFixed like Math.round
 * If cutOnly is true, just slice the tail
 * e.g. Decimal.toFixed(0.15) will return 0.2, not 0.1
 */
export declare function toFixed(numStr: string, precision?: number, cutOnly?: boolean): string;
