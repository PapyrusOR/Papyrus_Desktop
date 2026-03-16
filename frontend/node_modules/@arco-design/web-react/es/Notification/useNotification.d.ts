import { ConfigProps } from '.';
import { NotificationHookReturnType } from './interface';
export declare type notificationFuncType = NotificationHookReturnType;
declare function useNotification(commonConfig?: ConfigProps): [NotificationHookReturnType, JSX.Element];
export default useNotification;
