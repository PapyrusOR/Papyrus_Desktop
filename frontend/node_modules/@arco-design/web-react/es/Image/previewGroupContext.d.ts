/// <reference types="react" />
import { ImagePreviewProps } from './interface';
export interface PreviewUrl {
    url: string;
    preview: boolean;
}
export declare type PreviewUrlMap = Map<number, PreviewUrl>;
export declare type UnRegisterPreviewUrl = (id: number) => void;
export declare type UnRegisterPreviewProps = (id: number) => void;
export declare type RegisterPreviewUrl = (id: number, url: string, preview: boolean) => UnRegisterPreviewUrl;
export declare type RegisterPreviewProps = (id: number, previewProps?: Partial<ImagePreviewProps>) => UnRegisterPreviewProps;
export interface PreviewGroupContextProps {
    previewGroup: boolean;
    previewUrlMap: Map<number, string>;
    previewPropsMap: Map<number, Partial<ImagePreviewProps>>;
    infinite?: boolean;
    currentIndex: number;
    setCurrentIndex: (current: number) => void;
    setPreviewUrlMap: (map: PreviewUrlMap) => void;
    registerPreviewUrl: RegisterPreviewUrl;
    registerPreviewProps: RegisterPreviewProps;
    visible: boolean;
    handleVisibleChange: (visible: boolean, preVisible?: boolean) => void;
}
export declare const PreviewGroupContext: import("react").Context<PreviewGroupContextProps>;
