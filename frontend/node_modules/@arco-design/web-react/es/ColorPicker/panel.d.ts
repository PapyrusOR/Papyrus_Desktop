import React, { ReactNode } from 'react';
import { Color, ColorPickerMode, GradientColor, HSV, InternalGradientColor } from './interface';
interface PanelProps {
    value: string | GradientColor[];
    mode: ColorPickerMode | ColorPickerMode[];
    activeMode: ColorPickerMode;
    gradientColors: InternalGradientColor[];
    activeColorId: string;
    activeColorIdRef: React.MutableRefObject<string>;
    color: Color;
    alpha: number;
    disabledAlpha: boolean;
    showHistory?: boolean;
    historyColors?: string[];
    showPreset?: boolean;
    presetColors?: string[];
    renderHistory?: () => ReactNode;
    renderPreset?: () => ReactNode;
    renderPickSection?: () => ReactNode;
    renderFooter?: () => ReactNode;
    onHsvChange: (value: HSV) => void;
    onAlphaChange: (value: number) => void;
    onActiveModeChange: (value: ColorPickerMode) => void;
    onGradientColorsChange: (value: InternalGradientColor[] | ((colors: InternalGradientColor[]) => InternalGradientColor[])) => void;
    onActiveColorIdChange: (index: string) => void;
}
export declare const Panel: React.FC<PanelProps>;
export {};
