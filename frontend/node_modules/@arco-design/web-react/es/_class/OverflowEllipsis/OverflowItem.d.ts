import { ReactNode } from 'react';
interface OverflowItemProps {
    className?: string | string[];
    onResize: (node: HTMLDivElement) => void;
    unregister: (node: HTMLDivElement) => void;
    hidden?: boolean;
    children: ReactNode;
}
export default function OverflowItem(props: OverflowItemProps): JSX.Element;
export {};
