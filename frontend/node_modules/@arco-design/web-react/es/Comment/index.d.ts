import React from 'react';
import { CommentProps } from './interface';
declare const CommentRef: React.ForwardRefExoticComponent<CommentProps & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
export default CommentRef;
export { CommentProps };
