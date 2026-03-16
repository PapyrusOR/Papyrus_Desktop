import React, { Component, ReactNode } from 'react';
import { FormControlProps, FieldError, FormItemContextProps, KeyType, FormItemProps } from './interface';
import { NotifyType, StoreChangeInfo } from './store';
/**
 * 👀 👀 👀：不要在业务中直接调用，下个大版本将不会对外导出
 */
export default class Control<FormData = any, FieldValue = FormData[keyof FormData], FieldKey extends KeyType = keyof FormData> extends Component<FormControlProps<FormData, FieldValue, FieldKey>> {
    static defaultProps: {
        trigger: string;
        triggerPropName: string;
    };
    static isFormControl: boolean;
    static contextType: React.Context<FormItemContextProps<any, any, string | number | symbol>>;
    context: FormItemContextProps<FormData, FieldValue, FieldKey>;
    private errors;
    private warnings;
    private validateStatus;
    private touched;
    private isDestroyed;
    private childrenElement;
    private removeRegisterField;
    constructor(props: FormControlProps<FormData, FieldValue, FieldKey>, context: FormItemContextProps<FormData, FieldValue, FieldKey>);
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    componentWillUnmount(): void;
    private triggerStateCollect;
    private toggleValidateStatus;
    private toggleTouched;
    private setWarnings;
    private setErrors;
    getErrors: () => FieldError<FieldValue> | null;
    getWarnings: () => ReactNode[];
    isTouched: () => boolean;
    getValidateStatus: () => FormItemProps['validateStatus'];
    hasFieldProps: () => boolean;
    private clearFormItemError;
    private updateFormItem;
    private getFieldValue;
    onStoreChange: (type: NotifyType, info: StoreChangeInfo<FieldKey> & {
        current: any;
    }) => void;
    innerSetFieldValue: (field: FieldKey, value: FieldValue) => void;
    validateFieldOnly: () => Promise<{
        error: FieldError<FieldValue> | null;
        value: FieldValue;
        field: FieldKey;
    }>;
    /**
     *
     * @param triggerType the value of validateTrigger.
     * @returns
     */
    validateField: (triggerType?: string) => Promise<{
        error: FieldError<FieldValue> | null;
        value: FieldValue;
        field: FieldKey;
    }>;
    /**
     * 收集rules里的validateTrigger字段
     */
    getValidateTrigger(): string[];
    handleTrigger: (_value: any, ...args: any[]) => void;
    renderControl(children: React.ReactNode, id: any): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    getChild: () => React.ReactNode;
    render(): React.ReactNode;
}
