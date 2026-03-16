export declare const defaultScales: number[];
declare type ZoomType = 'zoomIn' | 'zoomOut';
declare class PreviewScales {
    private scaleAttr;
    constructor(scales: number[]);
    get scales(): any;
    get minScale(): any;
    get maxScale(): any;
    updateScale(scales: number[]): void;
    private findClosestIndex;
    getNextScale(cur: number, type?: ZoomType): number;
}
export default PreviewScales;
