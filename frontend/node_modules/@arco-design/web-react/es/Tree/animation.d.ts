/**
 * 该组件用来切换tree 展开收起时的动画
 */
import { PropsWithChildren } from 'react';
import { NodeProps } from './interface';
declare const TreeAnimation: (props: PropsWithChildren<NodeProps>) => JSX.Element;
export default TreeAnimation;
