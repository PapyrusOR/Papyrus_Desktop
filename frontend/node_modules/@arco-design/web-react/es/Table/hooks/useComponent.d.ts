import { ComponentsProps } from '../interface';
export default function useComponent(components: ComponentsProps): {
    getHeaderComponentOperations: (nodes: {
        selectionNode?: import("react").ReactNode;
        expandNode?: import("react").ReactNode;
    }) => {
        name?: string;
        node?: import("react").ReactNode;
        width?: number;
    }[];
    getBodyComponentOperations: (nodes: {
        selectionNode?: import("react").ReactNode;
        expandNode?: import("react").ReactNode;
    }) => {
        name?: string;
        node?: import("react").ReactNode | ((record: any) => import("react").ReactNode);
        width?: number;
    }[];
    ComponentTable: any;
    ComponentHeaderWrapper: any;
    ComponentThead: any;
    ComponentHeaderRow: any;
    ComponentTh: any;
    ComponentHeaderCell: any;
    ComponentBodyWrapper: any;
    ComponentTbody: any;
    ComponentBodyRow: any;
    ComponentTd: any;
    ComponentBodyCell: any;
};
