import { OptionProps } from '../interface';
import { ConfigType } from './store';
export interface NodeProps<T> extends OptionProps {
    value: string;
    label: string;
    isLeaf?: boolean;
    /** 是否选中 */
    _checked: boolean;
    /** 层级 */
    _level?: number;
    /** 是否半选 */
    _halfChecked: boolean;
    /** 当前选项节点的父节点 */
    parent: NodeProps<T> | null;
    /** 当前选项节点路径的所有节点的值 */
    pathValue: string[];
    /** 下一级选项 */
    children?: NodeProps<T>[];
    /** 是否在加载中 */
    loading?: boolean;
    /** 是否加载完成 */
    loaded?: boolean;
    pathLabel: string[];
}
declare class Node<T> {
    value: string;
    label: string;
    disabled?: boolean;
    _level?: number;
    _index?: number;
    isLeaf?: boolean;
    disableCheckbox?: boolean;
    _checked: boolean;
    /** 是否半选 */
    _halfChecked: boolean;
    /** 当前选项节点的父节点 */
    parent: Node<T> | null;
    /** 当前选项节点路径的所有节点的值 */
    pathValue: string[];
    pathLabel: string[];
    /** 下一级选项 */
    children?: Node<T>[];
    /** 是否在加载中 */
    loading?: boolean;
    /** 是否加载完成 */
    loaded?: boolean;
    config: ConfigType<T>;
    _data?: NodeProps<T>;
    constructor(data: T, config?: ConfigType<T>, parent?: Node<T>);
    private _initNode;
    /**
     * 根据this.children 计算是否当前node半选状态
     * 假设半选是 0.5，全选是1，不选是0。
     * 那么只有当前节点的所有children加起来等于children.length，才是全选，否则和大于0，就是半选。
     */
    private _isHalfChecked;
    /**
     *
     * @param checked 选中状态
     * @param ignoreDisabled 是否忽略节点禁用设置选中状态，一般在初始化设置选中状态时传参为true
     */
    private _setNodeChildrenChecked;
    getSelfChildrenValue: () => any[];
    updateHalfState: (checked: boolean) => void;
    setCheckedProperty: (checked: boolean) => void;
    setCheckedState: (checked: boolean) => void;
    setCheckedStateIgnoreDisabled: (checked: boolean) => void;
    /**
     * 遍历节点的parent，获取当前节点的路径节点。
     * node: { label: '1-1-1', parent: { label: '1-1', parent: { label: '1' }, ... }, ...}
     * @return [node.parent.parent, node.parent, node]
     * @memberof Store
     */
    getPathNodes: () => Node<T>[];
    getChildren: () => Node<T>[];
    setLoading: (loading?: boolean) => void;
}
export default Node;
