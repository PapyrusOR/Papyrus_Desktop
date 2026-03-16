import { ColorPickerMode, GradientColor } from './interface';
export declare const getMode: (mode: ColorPickerMode | ColorPickerMode[]) => ColorPickerMode | ColorPickerMode[];
export declare const isSingleMode: (mode: ColorPickerMode | ColorPickerMode[]) => mode is ColorPickerMode.Single;
export declare const isGradientMode: (mode: ColorPickerMode | ColorPickerMode[]) => mode is ColorPickerMode.Gradient;
export declare const isMultiMode: (mode: ColorPickerMode | ColorPickerMode[]) => mode is ColorPickerMode[];
export declare const getInitialActiveMode: (mode: ColorPickerMode | ColorPickerMode[]) => ColorPickerMode;
export declare const getModeByValue: (value: string | GradientColor[], defaultValue: string | GradientColor[], mode: ColorPickerMode | ColorPickerMode[]) => ColorPickerMode;
