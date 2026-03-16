import { ColorPickerMode, GradientColor, HSV, InternalGradientColor } from '../interface';
interface UseColorPickerProps {
    mode?: 'single' | 'gradient' | ['single', 'gradient'];
    value?: string | GradientColor[];
    defaultValue?: string | GradientColor[];
    defaultPopupVisible?: boolean;
    disabledAlpha?: boolean;
    popupVisible?: boolean;
    format?: 'hex' | 'rgb';
    onChange?: (value: string | GradientColor[]) => void;
    onVisibleChange?: (visible: boolean) => void;
}
export declare const useColorPicker: (props: UseColorPickerProps) => {
    value: string | GradientColor[];
    activeMode: ColorPickerMode;
    gradientColors: InternalGradientColor[];
    gradientColorsRef: import("react").MutableRefObject<InternalGradientColor[]>;
    activeColorId: string;
    activeColorIdRef: import("react").MutableRefObject<string>;
    popupVisible: boolean;
    color: {
        hsv: HSV;
        rgb: {
            r: number;
            g: number;
            b: number;
        };
        hex: string;
    };
    alpha: number;
    onHsvChange: (_value: HSV) => void;
    onAlphaChange: (_value: number) => void;
    onVisibleChange: (newVisible: any) => void;
    onActiveModeChange: (newMode: ColorPickerMode) => void;
    onActiveColorIdChange: (newId: string) => void;
    onGradientColorsChange: (newColors: InternalGradientColor[] | ((colors: InternalGradientColor[]) => InternalGradientColor[])) => void;
};
export {};
