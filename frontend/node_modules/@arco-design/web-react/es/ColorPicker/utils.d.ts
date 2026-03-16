import { GradientColor, HSV, InternalGradientColor, RGB } from './interface';
interface RGBA extends RGB {
    a: number;
}
export declare const sortGradientColors: (gradientColors: InternalGradientColor[]) => InternalGradientColor[];
export declare const mix: (source: RGBA, target: RGBA, progress: number) => RGBA;
export declare const getGradientString: (value: GradientColor[]) => string;
export declare const renderGradientBackground: (value: GradientColor[]) => string;
export declare const renderBackground: (value: GradientColor[] | string) => string;
export declare const formatRgba: (r: number, g: number, b: number, a: number) => string;
export declare const formatHex: (r: number, g: number, b: number, a: number) => string;
export declare const getColorFromHsv: (hsv: HSV) => {
    hsv: HSV;
    rgb: {
        r: number;
        g: number;
        b: number;
    };
    hex: string;
};
export declare const getRandomId: () => string;
export declare const mapValueToGradientColor: (value: GradientColor[], disabledAlpha: boolean) => InternalGradientColor[];
export declare const getColorByGradients: (gradientColors: InternalGradientColor[], percent: number, id?: string) => InternalGradientColor;
export declare const equalsHsv: (a: HSV, b: HSV) => boolean;
export declare const equalsRgba: (a: RGBA, b: RGBA) => boolean;
export declare const isEqualsColors: (colorA: string | GradientColor[], colorB: string | GradientColor[]) => boolean;
export {};
