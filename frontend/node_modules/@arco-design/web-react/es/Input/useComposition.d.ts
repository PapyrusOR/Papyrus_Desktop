import { ChangeEventHandler, CompositionEventHandler, KeyboardEventHandler } from 'react';
import { InputProps, TextAreaProps } from './interface';
export default function useComposition({ value, maxLength, onChange, onKeyDown, onPressEnter, beforeTriggerValueChangeCallback, normalizeHandler, }: {
    value: string;
    maxLength: number;
    onChange: InputProps['onChange'];
    onKeyDown: InputProps['onKeyDown'] | TextAreaProps['onKeyDown'];
    onPressEnter: InputProps['onPressEnter'];
    beforeTriggerValueChangeCallback?: (newValue: string) => void;
    normalizeHandler?: (type: InputProps['normalizeTrigger'][number]) => InputProps['normalize'];
}): {
    compositionValue: string;
    triggerValueChangeCallback: typeof onChange;
    compositionHandler: CompositionEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    valueChangeHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    keyDownHandler: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};
