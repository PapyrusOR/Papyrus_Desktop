import { Component } from 'react';
interface BaseNoticeState {
    notices: {
        [key: string]: any;
    }[];
    position?: string;
}
declare class BaseNotice extends Component<any, BaseNoticeState> {
    constructor(props: any);
    add: (noticeProps: any) => string;
    update: (newNotice: any) => void;
    remove(id: string): void;
    clear: () => void;
}
export default BaseNotice;
