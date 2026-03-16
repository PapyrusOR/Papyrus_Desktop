import { MutableRefObject } from 'react';
import { NodeProps } from '../../Tree/interface';
import { LabelValue, TreeSelectProps } from '../interface';
import { KeyCacheType } from './useKeyCache';
declare type valueType = (string | LabelValue)[];
export interface TreeSelectState {
    value: valueType[];
    popupVisible: boolean;
    focused: boolean;
    inputValue: string;
    searchKeys: string[];
}
export declare const parseValue: (v: valueType, key2nodeProps: any, valueMap?: LabelValue[]) => LabelValue[];
declare const useStateValue: (props: TreeSelectProps, key2nodeProps: KeyCacheType, indeterminateKeys: MutableRefObject<string[]>) => [LabelValue[], (v: LabelValue[], extra: {
    trigger?: NodeProps;
    checked?: boolean;
    selected?: boolean;
}) => void];
export default useStateValue;
