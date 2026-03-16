import { ReactNode } from 'react';
import { Dayjs } from 'dayjs';
import { ModeType, IconsType } from '../interface';
import { Locale } from '../../locale/interface';
export interface HeaderProps {
    prefixCls?: string;
    title?: ReactNode;
    onPrev?: () => void;
    onNext?: () => void;
    onSuperPrev?: () => void;
    onSuperNext?: () => void;
    mode?: ModeType;
    value?: Dayjs;
    onChangePanel?: (mode?: ModeType) => void;
    icons?: IconsType;
    rtl?: boolean;
    DATEPICKER_LOCALE?: Locale['DatePicker'];
}
declare function Header(props: HeaderProps): JSX.Element;
export default Header;
