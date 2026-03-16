import React, { ReactNode } from 'react';
export default function useOverrideRef<T>(): [
    (originNode: any) => ReactNode,
    React.MutableRefObject<T>
];
