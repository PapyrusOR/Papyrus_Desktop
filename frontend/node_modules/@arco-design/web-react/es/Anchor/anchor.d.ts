import React from 'react';
import { AnchorProps } from './interface';
import Link from './link';
declare const AnchorComponent: React.ForwardRefExoticComponent<AnchorProps & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>> & {
    Link: typeof Link;
};
export default AnchorComponent;
