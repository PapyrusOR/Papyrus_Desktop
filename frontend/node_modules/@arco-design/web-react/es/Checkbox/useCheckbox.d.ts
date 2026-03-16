export declare type ResultType<T> = {
    /** 当前选中项 */
    selected: T[];
    /** 只选中传入参数的选项 */
    setSelected: (value: T[]) => void;
    /** 设置选项的选中状态 */
    setValueSelected: (value: T | T[], selected?: boolean) => void;
    /** 选中全部 */
    selectAll: () => void;
    /** 取消全部选中 */
    unSelectAll: () => void;
    /** 是否选项被选中 */
    isSelected: (value: T) => boolean;
    /** 切换选项选中状态。不传参数时，会切换所有选项的选中状态 */
    toggle: (value?: T | T[]) => void;
    /** 是否全部选项被选中 */
    isAllSelected: () => boolean;
    /** 是否只有部分选项选中 */
    isPartialSelected: () => boolean;
};
declare const useCheckbox: <T>(values: T[], defaultSelected?: T[]) => ResultType<T>;
export default useCheckbox;
