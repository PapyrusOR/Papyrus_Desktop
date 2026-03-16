import { ReactNode, ReactElement } from 'react';
interface OverflowEllipsisProps {
    className?: string | string[];
    items: (ReactElement | ReactNode)[];
    suffixItems: (ReactElement | ReactNode)[];
    ellipsisNode?: (info: {
        ellipsisCount: number;
    }) => ReactNode;
}
export default function OverflowEllipsis(props: OverflowEllipsisProps): JSX.Element;
export {};
