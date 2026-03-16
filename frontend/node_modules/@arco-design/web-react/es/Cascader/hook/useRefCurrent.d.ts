import { DependencyList } from 'react';
declare function useCurrentRef<T>(initFunc: () => T, deps: DependencyList): T;
export default useCurrentRef;
