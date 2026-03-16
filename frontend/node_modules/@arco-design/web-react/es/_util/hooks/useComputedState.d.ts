import { ComponentState, PropsWithoutRef } from 'react';
declare type Dependency<T> = PropsWithoutRef<T> | ComponentState;
export default function useComputedState<T>(computed: () => any, deps: Dependency<T>[]): any;
export {};
