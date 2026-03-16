import React, { CSSProperties } from 'react';
interface MultiValueItem {
    value: number;
    key: string;
}
interface ControlBarProps {
    style?: CSSProperties;
    className?: string;
    multiple?: boolean;
    value: number | MultiValueItem[];
    onActive?: (key: string) => void;
    onAdd?: (x: number) => void;
    onChange: (x: number) => void;
    renderHandlerStyle?: (key?: string, index?: number) => CSSProperties;
    renderHandlerCenterStyle?: (key?: string, index?: number) => CSSProperties;
}
export declare const ControlBar: React.FC<ControlBarProps>;
export {};
