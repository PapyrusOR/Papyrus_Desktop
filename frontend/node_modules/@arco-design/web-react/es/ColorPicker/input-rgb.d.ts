import { Color, HSV } from './interface';
interface InputRgbProps {
    color: Color;
    alpha: number;
    onHsvChange: (value: HSV) => void;
    onAlphaChange: (value: number) => void;
    disabledAlpha?: boolean;
}
export declare const InputRgb: ({ color, alpha, onHsvChange, onAlphaChange, disabledAlpha, }: InputRgbProps) => JSX.Element;
export {};
