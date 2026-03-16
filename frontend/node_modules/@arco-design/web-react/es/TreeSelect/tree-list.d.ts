import React from 'react';
import { TreeSelectProps, LabelValue } from './interface';
import { TreeProps } from '../Tree/interface';
interface TreeListProps extends TreeSelectProps {
    value: LabelValue[];
    multiple: boolean;
    filterNode: TreeProps['filterNode'];
    inputValue?: string;
    prefixCls?: string;
}
declare const _default: React.ForwardRefExoticComponent<TreeListProps & React.RefAttributes<unknown>>;
export default _default;
