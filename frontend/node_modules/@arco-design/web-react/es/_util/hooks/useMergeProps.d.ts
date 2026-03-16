export declare type MergePropsOptions = {
    _ignorePropsFromGlobal?: boolean;
};
export default function useMergeProps<PropsType>(componentProps: PropsType & MergePropsOptions, defaultProps: Partial<PropsType>, globalComponentConfig: Partial<PropsType>): PropsType;
