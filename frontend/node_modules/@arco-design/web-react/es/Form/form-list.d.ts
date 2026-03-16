import { FormListProps, KeyType } from './interface';
declare const List: {
    <SubFieldValue extends unknown = any, SubFieldKey extends KeyType = string, FieldKey extends KeyType = string>(props: FormListProps<SubFieldValue, SubFieldKey, FieldKey>): JSX.Element;
    displayName: string;
};
export default List;
