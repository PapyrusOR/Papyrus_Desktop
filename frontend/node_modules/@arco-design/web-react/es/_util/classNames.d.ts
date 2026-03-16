declare type ClassNamesArg = string | string[] | {
    [key: string]: any;
} | undefined | null | boolean;
export default function (...args: ClassNamesArg[]): string;
export {};
