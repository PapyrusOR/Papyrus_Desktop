export default function include<T extends object, K extends keyof T>(obj: T, keys: Array<K | string>): Partial<T> /** TODO: Pick */;
