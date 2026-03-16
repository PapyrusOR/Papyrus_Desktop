import React from 'react';
import { InputTagProps } from './interface';
declare type InputTagHandle = {
    focus: () => void;
    blur: () => void;
};
declare const InputTagRef: React.ForwardRefExoticComponent<InputTagProps<any> & React.RefAttributes<InputTagHandle>>;
export default InputTagRef;
export { InputTagProps };
