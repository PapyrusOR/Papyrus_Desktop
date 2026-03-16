import { ReactNode, CSSProperties } from 'react';
declare type itemRenderType = (page: number, type: 'page' | 'more' | 'prev' | 'next', originElement: ReactNode) => ReactNode;
export interface PagerProps {
    pageItemStyle?: CSSProperties;
    activePageItemStyle?: CSSProperties;
    disabled?: boolean;
    rootPrefixCls: string;
    pageNum: number;
    current: number;
    onClick: (value: number) => void;
    itemRender?: itemRenderType;
}
export interface JumpPagerProps {
    pageItemStyle?: CSSProperties;
    disabled?: boolean;
    rootPrefixCls: string;
    type: StepType;
    current: number;
    allPages: number;
    jumpPage: number;
    onClick: (value: number) => void;
    icons?: {
        prev?: ReactNode;
        next?: ReactNode;
        more?: ReactNode;
    };
    itemRender?: itemRenderType;
}
export declare enum StepType {
    previous = 0,
    next = 1
}
export interface StepPagerProps {
    pageItemStyle?: CSSProperties;
    disabled?: boolean;
    rootPrefixCls: string;
    type: StepType;
    current: number;
    allPages: number;
    onClick: (value: number) => void;
    icons?: {
        prev?: ReactNode;
        next?: ReactNode;
        more?: ReactNode;
    };
    itemRender?: itemRenderType;
}
/**
 * default pager item
 */
declare function Pager(props: PagerProps): JSX.Element;
/**
 * preJump or nextJump button
 * @param props
 */
export declare const JumpPager: (props: JumpPagerProps) => JSX.Element;
/**
 * previous or next button
 * @param props
 */
export declare const StepPager: (props: StepPagerProps) => JSX.Element;
export default Pager;
