export default function omit<T extends object, K extends keyof T>(obj: T, keys: Array<K | string>): Omit<T, K>;
