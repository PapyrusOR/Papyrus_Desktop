import { ReactNode } from 'react';
import { ModalProps } from './modal';
export interface ConfirmProps extends ModalProps {
    content?: ReactNode;
    icon?: ReactNode | null;
    isNotice?: boolean;
    noticeType?: string;
}
export declare const normalizeConfig: (_config: ConfirmProps) => ConfirmProps;
declare function confirm(config: ConfirmProps, renderFunc?: (props: ConfirmProps) => void): {
    close: () => void;
    update: (newConfig: ConfirmProps) => void;
};
export default confirm;
