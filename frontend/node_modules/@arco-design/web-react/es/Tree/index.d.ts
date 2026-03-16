import React, { Component, DragEvent } from 'react';
import { ConfigContext } from '../ConfigProvider';
import { TreeProps, NodeProps, TreeDataType, NodeInstance, TreeState } from './interface';
export declare type key2nodePropsType = {
    [key: string]: TreeDataType;
};
declare const needMergeKeys: readonly ["style", "className", "height", "size", "blockNode", "autoExpandParent", "checkedStrategy", "fieldNames", "icons", "virtualListProps", "showLine", "selectable", "allowDrop", "actionOnClick", "animation"];
declare type MergedPropsType = {
    [key in typeof needMergeKeys[number]]?: TreeProps[key];
};
declare class Tree extends Component<TreeProps, TreeState> {
    static displayName: string;
    static SHOW_PARENT: "parent";
    static SHOW_ALL: "all";
    static SHOW_CHILD: "child";
    static Node: React.MemoExoticComponent<React.ForwardRefExoticComponent<NodeProps & {
        children?: React.ReactNode;
    } & React.RefAttributes<HTMLDivElement>>>;
    static contextType: React.Context<import("../ConfigProvider").ConfigProviderProps>;
    context: React.ContextType<typeof ConfigContext>;
    static getDerivedStateFromProps(nextProps: TreeProps, state: TreeState): TreeState;
    key2nodeProps: key2nodePropsType;
    dragNode: null | NodeInstance;
    nodeListRef: any;
    dropPosition: 0 | -1 | 1;
    getMergedProps: (baseProps?: any) => MergedPropsType;
    constructor(props: any, context: any);
    scrollIntoView: (_index: number | string, nodeProps?: NodeProps) => void;
    componentDidUpdate(prevProps: any): void;
    getTreeData: () => any;
    needUpdateTreeData: (prevProps: any, props: any) => boolean;
    getFieldInfo: (data: any) => {
        children: any;
        selectable: any;
        checkable: any;
        title: any;
        disabled: any;
        disableCheckbox: any;
        isLeaf: any;
        key: any;
    };
    getNodeList: (treedata: any, prefix?: any) => any[];
    getInitExpandedKeys: (keys: any) => any;
    getInitCheckedKeys: (keys: any) => {
        checkedKeys: any;
        halfCheckedKeys: string[];
    };
    handleSelect: (key: string, e: any) => void;
    handleCheck: (checked: boolean, key: string, e: any) => void;
    handleLoadMore: (node: NodeProps) => void;
    handleNodeDragStart: (e: DragEvent<HTMLSpanElement>, node: NodeProps) => void;
    handleNodeDragEnd: (e: DragEvent<HTMLSpanElement>, node: NodeProps) => void;
    handleNodeDragOver: (e: DragEvent<HTMLSpanElement>, node: NodeProps, dropPosition: any) => void;
    handleNodeDragLeave: (e: DragEvent<HTMLSpanElement>, node: NodeProps) => void;
    isChildOfNode: (node: NodeProps, target: any) => boolean;
    isSameNode: (node1: NodeInstance, node2: NodeInstance) => boolean;
    handleNodeDrop: (e: DragEvent<HTMLSpanElement>, node: NodeProps, dropPosition: number) => void;
    handleAllowDrop: (node: NodeProps, dropPosition: number) => boolean;
    handleExpand: (expanded: boolean, key: string) => void;
    getCacheNode: (key: string[]) => NodeInstance[];
    getDataSet: (dataSet?: any) => {
        expandedKeysSet: any;
        checkedKeysSet: any;
        selectedKeysSet: any;
        halfCheckedKeysSet: any;
    };
    getNodeProps: <T extends NodeProps | NodeProps[]>(nodes: T, dataSet?: any) => T;
    handleExpandEnd: (key: any) => void;
    getTreeState: () => Readonly<TreeState>;
    render(): JSX.Element;
}
export default Tree;
export { TreeProps, NodeProps as TreeNodeProps };
