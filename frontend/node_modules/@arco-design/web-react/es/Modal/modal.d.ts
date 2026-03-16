import { PropsWithChildren, ForwardRefExoticComponent } from 'react';
import { ConfirmProps } from './confirm';
import { ModalConfigType } from './config';
import useModal from './useModal';
import { ModalProps, ModalReturnProps } from './interface';
export interface ModalComponent extends ForwardRefExoticComponent<PropsWithChildren<ModalProps>> {
    confirm: (props: ConfirmProps) => ModalReturnProps;
    info: (props: ConfirmProps) => ModalReturnProps;
    success: (props: ConfirmProps) => ModalReturnProps;
    warning: (props: ConfirmProps) => ModalReturnProps;
    error: (props: ConfirmProps) => ModalReturnProps;
    config: (config: ModalConfigType) => void;
    destroyAll: () => void;
    useModal: typeof useModal;
}
declare const ExportedModalComponent: ModalComponent;
export default ExportedModalComponent;
export { ModalProps, ModalReturnProps };
