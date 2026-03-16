import React from 'react';
import Item from './item';
import { ListProps } from './interface';
interface ForwardRefListType extends React.ForwardRefExoticComponent<React.PropsWithoutRef<ListProps> & React.RefAttributes<HTMLDivElement>> {
    <T = any>(props: React.PropsWithChildren<ListProps<T>> & {
        ref?: React.Ref<HTMLDivElement>;
    }): React.ReactElement;
    Item: typeof Item;
}
declare const ListComponent: ForwardRefListType;
export default ListComponent;
export { ListProps };
