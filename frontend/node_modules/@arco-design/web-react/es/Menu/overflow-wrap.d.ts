import { ReactNode } from 'react';
import type { MenuProps } from './interface';
interface OverflowWrapProps {
    ellipsisText?: ReactNode;
    children: ReactNode;
    onEllipsisChange?: MenuProps['onEllipsisChange'];
}
declare const OverflowWrap: (props: OverflowWrapProps) => JSX.Element;
export default OverflowWrap;
