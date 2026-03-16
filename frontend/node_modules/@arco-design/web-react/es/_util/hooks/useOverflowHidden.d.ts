interface Option {
    hidden: boolean;
}
export default function useOverflowHidden(getContainer: () => HTMLElement, { hidden }: Option): (() => void)[];
export {};
