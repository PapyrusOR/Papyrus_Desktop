import { CSSProperties, PropsWithChildren } from 'react';
import { TriggerProps } from '../Trigger';
interface TriggerForToolbarProps {
    style?: CSSProperties;
    className?: string | string[];
    prefixCls: string;
    popup: TriggerProps['popup'];
}
export declare const TriggerForToolbar: (props: PropsWithChildren<TriggerForToolbarProps>) => JSX.Element;
export {};
