import { SelectProps } from '../Select/interface';
export interface PageOptionProps {
    disabled?: boolean;
    rootPrefixCls?: string;
    sizeCanChange?: boolean;
    sizeOptions?: number[];
    onPageSizeChange?: (value: any) => void;
    pageSize?: number;
    size?: 'mini' | 'small' | 'default' | 'large';
    selectProps?: Partial<SelectProps>;
}
declare function PageOption(props: PageOptionProps): JSX.Element;
export default PageOption;
