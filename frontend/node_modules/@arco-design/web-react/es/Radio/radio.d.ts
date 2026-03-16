import React from 'react';
import { RadioProps } from './interface';
declare function Radio(baseProps: RadioProps): JSX.Element;
declare namespace Radio {
    var __BYTE_RADIO: boolean;
    var displayName: string;
    var Group: typeof import("./group").default;
    var GroupContext: React.Context<import("./interface").RadioGroupContextProps>;
}
export default Radio;
export { RadioProps };
