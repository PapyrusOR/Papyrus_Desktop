import { ComponentState, PropsWithoutRef } from 'react';
export default function useWatch<T>(value: PropsWithoutRef<T> | ComponentState, callback: (value: any, prevValue: any) => void): void;
