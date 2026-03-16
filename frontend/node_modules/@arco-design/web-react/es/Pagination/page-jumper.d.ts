export interface PageJumperProps {
    disabled?: boolean;
    rootPrefixCls?: string;
    totalPages: number;
    current: number;
    simple?: boolean | {
        showJumper?: boolean;
    };
    onPageChange?: (value: any) => void;
    size?: 'mini' | 'small' | 'default' | 'large';
}
declare function PageJumper(props: PageJumperProps): JSX.Element;
export default PageJumper;
