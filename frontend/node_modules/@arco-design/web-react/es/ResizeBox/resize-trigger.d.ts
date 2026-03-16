import { CSSProperties, ReactNode, PropsWithChildren } from 'react';
export interface ResizeTriggerProps {
    style?: CSSProperties;
    className?: string | string[];
    /** 方向，可选值为水平 `horizontal`，垂直 `vertical` */
    direction: string;
    /** 定制图标 */
    icon?: ReactNode;
    /** 鼠标按下的事件 */
    onMouseDown?: (e: any) => void;
    /** resize 事件 */
    onResize?: (e: any) => void;
    /** 支持伸缩 */
    resizable?: boolean;
    /** 支持快速收缩 */
    collapsible?: {
        prev?: {
            icon?: ReactNode;
            onClick?: (e: any) => void;
            collapsed?: boolean;
        };
        next?: {
            icon?: ReactNode;
            onClick?: (e: any) => void;
            collapsed?: boolean;
        };
    };
    renderChildren?: (prev: ReactNode, trigger: ReactNode, next: ReactNode) => ReactNode;
}
export default function ResizeTrigger(props: PropsWithChildren<ResizeTriggerProps>): JSX.Element;
