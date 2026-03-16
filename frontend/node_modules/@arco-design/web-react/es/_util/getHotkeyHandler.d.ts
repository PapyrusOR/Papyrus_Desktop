export interface Key {
    /** Keyboard key code */
    code: number;
    /** Ctrl / ⌃ */
    ctrl?: boolean;
    /** Shift key */
    shift?: boolean;
    /** Alt / ⌥ */
    alt?: boolean;
    /** meta ⌘ / ⊞ */
    meta?: boolean;
}
/**
 * @param hotkeyMap - 快捷键描述对象
 */
export default function getHotkeyHandler(hotkeyMap: Map<Key | number, Function>): (event: KeyboardEvent) => void;
