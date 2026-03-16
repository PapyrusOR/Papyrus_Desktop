import React, { ReactNode, CSSProperties } from 'react';
import { TooltipPosition } from './interface';
interface SliderButtonProps {
    style?: CSSProperties;
    disabled?: boolean;
    prefixCls: string;
    value: number;
    maxValue?: number;
    minValue?: number;
    vertical?: boolean;
    tooltipVisible?: boolean;
    tooltipPosition?: TooltipPosition;
    formatTooltip?: (value: number) => string | ReactNode;
    getTooltipContainer?: () => Element;
    onMoving?: (x: number, y: number) => void;
    onMoveEnd?: () => void;
    onMoveBegin?: () => void;
    onArrowEvent?: (type: 'addition' | 'subtraction') => void;
}
declare const _default: React.MemoExoticComponent<(props: SliderButtonProps) => JSX.Element>;
export default _default;
