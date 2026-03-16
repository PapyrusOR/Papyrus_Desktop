declare function useStateWithPromise<T>(defaultVal: T): [T, (updater: any) => Promise<T>];
export default useStateWithPromise;
