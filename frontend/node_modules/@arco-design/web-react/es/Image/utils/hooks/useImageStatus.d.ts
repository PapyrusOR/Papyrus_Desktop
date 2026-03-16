declare type ImageStatusType = 'beforeLoad' | 'loading' | 'error' | 'loaded' | 'lazyload';
export default function useImageStatus(defaultValue: ImageStatusType): {
    status: ImageStatusType;
    isBeforeLoad: boolean;
    isLoading: boolean;
    isError: boolean;
    isLoaded: boolean;
    isLazyLoad: boolean;
    setStatus: import("react").Dispatch<import("react").SetStateAction<ImageStatusType>>;
};
export {};
