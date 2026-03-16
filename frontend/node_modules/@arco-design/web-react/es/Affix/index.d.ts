import React from 'react';
import { AffixProps } from './interface';
declare type AffixHandle = {
    updatePosition: () => void;
};
declare const AffixComponent: React.ForwardRefExoticComponent<AffixProps & {
    children?: React.ReactNode;
} & React.RefAttributes<AffixHandle>>;
export default AffixComponent;
export { AffixProps };
