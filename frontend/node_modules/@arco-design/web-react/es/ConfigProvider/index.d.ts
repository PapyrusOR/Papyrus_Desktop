import React from 'react';
import { ConfigProviderProps } from './interface';
import { ConfigContext } from './context';
declare function ConfigProvider(baseProps: ConfigProviderProps): JSX.Element;
declare namespace ConfigProvider {
    var ConfigContext: React.Context<ConfigProviderProps>;
    var displayName: string;
}
export default ConfigProvider;
export declare const ConfigConsumer: React.Consumer<ConfigProviderProps>;
export { ConfigProviderProps, ConfigContext };
