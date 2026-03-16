interface MultiValueItem {
    value: [number, number];
    key: string;
}
interface ControlBlockParams {
    value: [number, number] | MultiValueItem[];
    multiple?: boolean;
    onActive?: (key: string) => void;
    onAdd?: (value: [number, number]) => void;
    onChange: (value: [number, number], key?: string) => void;
}
export declare const useControlBlock: ({ value, multiple, onActive, onAdd, onChange, }: ControlBlockParams) => {
    active: boolean;
    blockRef: import("react").MutableRefObject<HTMLDivElement>;
    handlerRef: import("react").MutableRefObject<HTMLDivElement>;
    onMouseDown: (ev: MouseEvent) => void;
};
export {};
