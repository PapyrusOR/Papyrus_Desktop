import { PropsWithChildren } from 'react';
import { BreadCrumbItemProps } from './interface';
declare function Item(props: PropsWithChildren<BreadCrumbItemProps>): JSX.Element;
declare namespace Item {
    var displayName: string;
}
export default Item;
export { BreadCrumbItemProps };
