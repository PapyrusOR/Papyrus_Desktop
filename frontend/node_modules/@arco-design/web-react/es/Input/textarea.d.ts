import React from 'react';
import { TextAreaProps } from './interface';
export declare type RefTextAreaType = {
    /** 使输入框失去焦点 */
    blur: () => void;
    /** 使输入框获取焦点 */
    focus: () => void;
    /** textarea dom元素 */
    dom: HTMLTextAreaElement;
};
declare const TextAreaRef: React.ForwardRefExoticComponent<TextAreaProps & React.RefAttributes<RefTextAreaType>>;
export default TextAreaRef;
