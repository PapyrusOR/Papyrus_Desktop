import { SorterInfo } from '../interface';
export default function useSorter(flattenColumns: any, defaultSorters: any): {
    currentSorter: SorterInfo;
    activeSorters: SorterInfo[];
    getNextActiveSorters: (sorter: SorterInfo) => SorterInfo[];
    updateStateSorters: (sorter: SorterInfo, nextActiveSorters: SorterInfo[]) => void;
};
