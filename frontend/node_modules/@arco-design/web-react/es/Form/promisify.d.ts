declare function promisify<T = any>(fn: (...args: any[]) => any): () => Promise<T>;
export default promisify;
