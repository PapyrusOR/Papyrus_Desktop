import React from 'react';
import { Color, HSV } from './interface';
interface InputHexProps {
    color: Color;
    alpha: number;
    onHsvChange: (value: HSV) => void;
    onAlphaChange: (value: number) => void;
    disabledAlpha?: boolean;
}
export declare const InputHex: React.FC<InputHexProps>;
export {};
