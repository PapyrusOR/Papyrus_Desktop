import { ReactElement } from 'react';
import { SummaryProps } from '../interface';
declare function Summary(props: SummaryProps): ReactElement<any, string | import("react").JSXElementConstructor<any>>;
declare namespace Summary {
    var Row: typeof import("./row").default;
    var Cell: typeof import("./cell").default;
}
export default Summary;
