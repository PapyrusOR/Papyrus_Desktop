import React, { Component, ReactNode, CSSProperties } from 'react';
import { ConfigContext } from '../ConfigProvider/context';
export interface NoticeProps {
    style?: CSSProperties;
    className?: string;
    title?: ReactNode | string;
    content?: ReactNode | string;
    duration?: number;
    showIcon?: boolean;
    icon?: ReactNode;
    id?: string;
    onClose?: (id: any) => void;
    position?: string;
    type?: string;
    btn?: ReactNode;
    prefixCls?: string;
    classPrefixCls?: string;
    iconPrefix?: string;
    noticeType?: 'message' | 'notification';
    update?: boolean;
    closable?: boolean;
    rtl?: boolean;
    closeIcon?: ReactNode;
}
declare class Notice extends Component<NoticeProps, {}> {
    static defaultProps: {
        type: string;
        showIcon: boolean;
        noticeType: string;
        duration: number;
    };
    static contextType: React.Context<import("../ConfigProvider").ConfigProviderProps>;
    context: React.ContextType<typeof ConfigContext>;
    wrapper: Element;
    timer: any;
    rootDOMRef: any;
    constructor(props: any);
    getRootDOMNode: () => any;
    componentDidMount(): void;
    componentDidUpdate(nextProps: any): void;
    componentWillUnmount(): void;
    startTimer: () => void;
    removeTimer: () => void;
    onClose: React.MouseEventHandler<HTMLSpanElement>;
    renderIcon: () => JSX.Element;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    render(): JSX.Element;
}
export default Notice;
