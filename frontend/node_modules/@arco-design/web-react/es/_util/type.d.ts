import React from 'react';
export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare type Tag = string | typeof React.Component;
export declare type ValueOrFunc<T> = T | ((any: any) => T);
