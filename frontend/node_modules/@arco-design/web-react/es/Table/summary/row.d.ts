import { ReactNode, HTMLAttributes } from 'react';
import { Omit } from '../../_util/type';
interface SummaryRowProps extends Omit<HTMLAttributes<HTMLTableRowElement>, 'children'> {
    children?: ReactNode;
}
declare function Row(props: SummaryRowProps): JSX.Element;
export default Row;
