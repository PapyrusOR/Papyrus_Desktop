import { ReactInstance } from 'react';
import BaseNotification from '../_class/notification';
import { NotificationProps, NotificationHookReturnType } from './interface';
export declare type ConfigProps = {
    maxCount?: number;
    prefixCls?: string;
    getContainer?: () => HTMLElement;
    duration?: number;
    rtl?: boolean;
};
declare class Notification extends BaseNotification {
    static useNotification: (config?: ConfigProps) => [NotificationHookReturnType, JSX.Element];
    static success: (config: NotificationProps) => ReactInstance;
    static info: (config: NotificationProps) => ReactInstance;
    static warning: (config: NotificationProps) => ReactInstance;
    static error: (config: NotificationProps) => ReactInstance;
    static normal: (config: NotificationProps) => ReactInstance;
    static config: (options?: ConfigProps) => void;
    static clear: () => void;
    static remove: (id: string) => void;
    static addInstance: (config: NotificationProps) => ReactInstance;
    remove: (id: string) => void;
    render(): JSX.Element;
}
export default Notification;
export { NotificationProps };
