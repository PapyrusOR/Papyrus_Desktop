export default function (cb: (...args: any[]) => void): {
    (...args: any[]): void;
    cancel(): void;
};
