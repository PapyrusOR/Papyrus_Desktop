interface ImagePreviewArrowProps {
    current: number;
    previewCount: number;
    infinite?: boolean;
    onPrev?: () => void;
    onNext?: () => void;
}
declare function ImagePreviewArrow(props: ImagePreviewArrowProps): JSX.Element;
export default ImagePreviewArrow;
