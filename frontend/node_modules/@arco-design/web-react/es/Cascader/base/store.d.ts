import { FieldNamesType, CascaderProps } from '../interface';
import Node from './node';
export declare type ConfigType<T> = {
    changeOnSelect?: boolean;
    lazyload?: boolean;
    showEmptyChildren?: boolean;
    filterOption?: CascaderProps<T>['filterOption'];
    fieldNames?: FieldNamesType;
    showParent?: boolean;
};
declare class Store<T> {
    private nodes;
    private flatNodes;
    private config;
    constructor(options: T[], value?: string[][], config?: ConfigType<T>);
    private _calcNodes;
    private _updateFlatNodes;
    /**
     * values: 全部的选中值
     * 根据values更新节点状态。不包含在values的节点都设置为未选中状态
     * @memberof Store
     */
    setNodeCheckedByValue: (initValues: string[][]) => void;
    /**
     * 为当前节点插入子节点。动态加载时候用到
     */
    appendOptionChildren: (node: Node<T>, children: T[]) => void;
    /**
     * 通过 value 查找对应的node节点。
     * value: 是路径节点的value组成的数组
     */
    findNodeByValue: (value: string[]) => Node<T> | null;
    /**
     * 搜索所有label含有关键字的节点
     */
    searchNodeByLabel: (inputStr?: string) => Node<T>[];
    /** 获取所有节点 */
    getOptions: () => Node<T>[];
    /** 获取所有选中状态的节点。 aggregation: 是否聚合节点 */
    getCheckedNodes: () => Node<T>[];
    getCheckedParentNodes: () => Node<T>[];
}
export default Store;
