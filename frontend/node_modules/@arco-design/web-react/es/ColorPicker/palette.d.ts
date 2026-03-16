import { Color } from './interface';
interface PaletteProps {
    color: Color;
    onChange: (s: number, v: number) => void;
}
export declare const Palette: ({ color, onChange }: PaletteProps) => JSX.Element;
export {};
