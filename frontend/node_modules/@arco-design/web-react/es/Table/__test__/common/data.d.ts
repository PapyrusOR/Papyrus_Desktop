export interface TestData {
    key: string;
    name: string;
    address: string;
    sex: 'male' | 'female';
    age: number;
    email: string;
}
export interface MultipleSorterTestData {
    key: string;
    name: string;
    age: number;
    scoreA: number;
    scoreB: number;
    scoreC: number;
}
export declare const data: TestData[];
export interface TestTreeData extends TestData {
    children?: TestTreeData[];
}
export declare const treeData: TestTreeData[];
export declare const multipleSorterData: {
    key: string;
    name: string;
    age: number;
    scoreA: number;
    scoreB: number;
    scoreC: number;
}[];
