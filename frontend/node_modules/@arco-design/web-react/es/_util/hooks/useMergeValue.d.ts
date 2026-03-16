import React from 'react';
export default function useMergeValue<T>(defaultStateValue: T, props?: {
    defaultValue?: T;
    value?: T;
}): [T, React.Dispatch<React.SetStateAction<T>>, T];
