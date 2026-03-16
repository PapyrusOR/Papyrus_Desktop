import BaseNotification from '../_class/notification';
import { MessageProps, MessageHookReturnType } from './interface';
export declare type ConfigProps = {
    maxCount?: number;
    prefixCls?: string;
    getContainer?: () => HTMLElement;
    duration?: number;
    rtl?: boolean;
    closable?: boolean;
};
export interface MessageType {
    (): void;
}
declare function addInstance(noticeProps: MessageProps): () => void;
declare class Message extends BaseNotification {
    static useMessage: (config?: ConfigProps) => [MessageHookReturnType, JSX.Element];
    static success: (config: MessageProps | string) => MessageType;
    static info: (config: MessageProps | string) => MessageType;
    static warning: (config: MessageProps | string) => MessageType;
    static error: (config: MessageProps | string) => MessageType;
    static loading: (config: MessageProps | string) => MessageType;
    static normal: (config: MessageProps | string) => MessageType;
    static config: (options?: ConfigProps) => void;
    static clear: () => void;
    static addInstance: typeof addInstance;
    remove: (id: string) => void;
    render(): JSX.Element;
}
export default Message;
export { MessageProps };
