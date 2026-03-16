import React from 'react';
import CollapseItem from './item';
import { CollapseProps } from './interface';
export declare const CollapseContext: React.Context<Pick<CollapseProps, "expandIcon" | "expandIconPosition" | "lazyload" | "destroyOnHide" | "triggerRegion"> & {
    activeKeys: string[];
    onToggle?: (_key: string, _e: any) => void;
}>;
declare const CollapseComponent: React.ForwardRefExoticComponent<CollapseProps & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>> & {
    Item: typeof CollapseItem;
};
export default CollapseComponent;
export { CollapseProps };
