import { ConfigProps } from '.';
import { MessageHookReturnType } from './interface';
export declare type messageFuncType = MessageHookReturnType;
declare function useMessage(commonConfig?: ConfigProps): [MessageHookReturnType, JSX.Element];
export default useMessage;
