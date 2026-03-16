import React from 'react';
import Tree from '../Tree';
import { TreeSelectProps, RefTreeSelectType } from './interface';
declare const TreeSelectComponent: React.ForwardRefExoticComponent<TreeSelectProps & {
    children?: React.ReactNode;
} & React.RefAttributes<RefTreeSelectType>> & {
    Node: typeof Tree.Node;
    SHOW_ALL: typeof Tree.SHOW_ALL;
    SHOW_PARENT: typeof Tree.SHOW_PARENT;
    SHOW_CHILD: typeof Tree.SHOW_CHILD;
};
export default TreeSelectComponent;
