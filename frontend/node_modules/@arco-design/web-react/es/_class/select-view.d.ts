import React, { ReactNode, CSSProperties, ReactElement } from 'react';
import { InputTagProps } from '../InputTag';
import { InputComponentProps } from '../Input/interface';
import { PopoverProps } from '../Popover';
export interface SelectViewCommonProps extends Pick<InputTagProps<unknown>, 'animation' | 'renderTag' | 'dragToSort'> {
    id?: string;
    style?: CSSProperties;
    className?: string | string[];
    children?: ReactNode;
    inputValue?: string;
    /**
     * @zh 选择框默认文字。
     * @en Placeholder of element
     */
    placeholder?: string;
    /**
     * @zh 是否需要边框
     * @en Whether to render border
     * @defaultValue true
     */
    bordered?: boolean;
    /**
     * @zh
     * 使单选模式可搜索，传入 `{ retainInputValue: true }` 在搜索框聚焦时保留现有内容
     * 传入 `{ retainInputValueWhileSelect: true }` 在多选选择时保留输入框内容。
     * @en
     * Whether single mode Select is searchable. `{ retainInputValue: true }` to retain the existing content when the search box is focused,
     * `{ retainInputValueWhileSelect: true }` to retain the existing content when multiple selection is selected.
     */
    showSearch?: boolean | {
        retainInputValue?: boolean;
        retainInputValueWhileSelect?: boolean;
    };
    /**
     * @zh 分别不同尺寸的选择器。对应 `24px`, `28px`, `32px`, `36px`
     * @en Height of element, `24px` `28px` `32px` `36px`
     */
    size?: 'mini' | 'small' | 'default' | 'large';
    /**
     * @zh 是否为禁用状态。
     * @en Whether is disabled
     */
    disabled?: boolean;
    /**
     * @zh 是否是错误状态。(废弃，下个大版本移除，使用 status='error' 替代)
     * @en Whether the textarea is error.(Deprecated, removed in the next major version, use status='error' instead)
     * @deprecated
     */
    error?: boolean;
    /**
     * @zh 状态
     * @en Status
     * @version 2.45.0
     */
    status?: 'error' | 'warning';
    /**
     * @zh 是否为加载状态。
     * @en Whether is in loading
     */
    loading?: boolean;
    /**
     * @zh 允许清除值。
     * @en Whether allow to clear selected options
     */
    allowClear?: boolean;
    /**
     * @zh 最多显示多少个 `tag`，仅在多选或标签模式有效。设置 `responsive` 响应式显示标签数不建议在选项较多时使用，可能存在性能问题，
     * @en The maximum number of `tags` is displayed, only valid in `multiple` and `label` mode. Setting the number of `responsive` responsive display tags is not recommended when there are many options, as there may be performance issues.
     * @version Object type in 2.37.0. `responsive ` in `2.62.0`
     */
    maxTagCount?: number | 'responsive' | {
        count: number | 'responsive';
        render?: (invisibleTagCount: number) => ReactNode;
        showPopover?: boolean | Partial<PopoverProps>;
    };
    /**
     * @zh 前缀。
     * @en Customize select suffix
     * @version 2.11.0
     */
    prefix?: ReactNode;
    /**
     * @zh 自定义选择框后缀图标。
     * @en Customize select suffix icon
     */
    suffixIcon?: ReactNode;
    /**
     * @zh 自定义箭头图标，设置为 `null` 不显示箭头图标。
     * @en Customize select arrow icon.
     */
    arrowIcon?: ReactNode | null;
    /**
     * @zh 多选时配置选中项的删除图标。当传入`null`，不显示删除图标。
     * @en Customize the delete icon of tags selected in `multiple` and `label` mode.
     */
    removeIcon?: ReactNode | null;
    /**
     * @zh `allowClear` 时配置清除按钮的图标。
     * @en Configure the icon of the clear button when `allowClear`.
     * @version 2.26.0
     */
    clearIcon?: ReactNode;
    /**
     * @zh 设置宽度自适应。minWidth 默认为 0，maxWidth 默认为 100%
     * @en auto width. minWidth defaults to 0, maxWidth defaults to 100%
     * @version 2.54.0
     */
    autoWidth?: boolean | {
        minWidth?: CSSProperties['minWidth'];
        maxWidth?: CSSProperties['maxWidth'];
    };
    /**
     * @zh 选择框前添加元素
     * @en The label text displayed before (on the left side of) the select field
     * @version 2.41.0
     */
    addBefore?: ReactNode;
    /**
     * @zh 鼠标点击下拉框时的回调
     * @en Callback when the mouse clicks on the drop-down box
     */
    onClick?: (e: any) => void;
    /**
     * @zh 键盘输入时的回调
     * @en Callback when keyboard pressed
     * @version 2.40.0
     */
    onKeyDown?: (e: any) => void;
}
export interface SelectViewProps extends SelectViewCommonProps {
    value?: any;
    popupVisible?: boolean;
    allowCreate?: boolean;
    isEmptyValue: boolean;
    isMultiple?: boolean;
    prefixCls: string;
    rtl?: boolean;
    ariaControls?: string;
    renderText: (value: any) => {
        text: any;
        disabled: any;
    };
    renderView?: (eleView: ReactElement) => ReactElement;
    onSort?: (value: any) => void;
    onRemoveCheckedItem?: (item: any, index: number, e: any) => void;
    onChangeInputValue?: InputComponentProps['onChange'];
    onPaste?: (e: any) => void;
    onClear?: (e: any) => void;
    onFocus?: (e: any) => void;
    onBlur?: (e: any) => void;
}
export declare type SelectViewHandle = {
    dom: HTMLDivElement;
    getRootDOMNode: () => HTMLDivElement;
    focus: () => void;
    blur: () => void;
    getWidth: () => number;
};
declare const SelectViewComponent: React.ForwardRefExoticComponent<SelectViewProps & React.RefAttributes<SelectViewHandle>>;
export default SelectViewComponent;
