import type { ConfigProviderProps } from '../ConfigProvider';
export declare function setConfigProviderProps(configProviderProps: ConfigProviderProps): void;
export declare function getConfigProviderProps(): ConfigProviderProps;
export declare type ModalConfigType = {
    prefixCls?: string;
    simple?: boolean;
};
export declare const setModalConfig: (config: ModalConfigType) => void;
export declare const getModalConfig: () => ModalConfigType;
export declare const destroyList: Array<Function>;
