import * as React from 'react';
interface FillerProps {
    /** Total height of list */
    height: number;
    /** offset value of the first element of the viewport */
    offset?: number;
    outerStyle?: React.CSSProperties;
    innerStyle?: React.CSSProperties;
    children: React.ReactNode;
}
/**
 * Create visual height for content
 */
declare const Filler: React.FC<FillerProps>;
export default Filler;
