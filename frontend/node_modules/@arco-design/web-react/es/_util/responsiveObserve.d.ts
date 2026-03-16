export declare type Breakpoint = 'xxxl' | 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export declare type BreakpointMap = Partial<Record<Breakpoint, string>>;
export declare type ScreenMap = Partial<Record<Breakpoint, boolean>>;
export declare const responsiveArray: Breakpoint[];
export declare const responsiveMap: BreakpointMap;
declare type SubscribeFunc = (screens: ScreenMap, breakpointChecked: Breakpoint) => void;
declare const responsiveObserve: {
    matchHandlers: {};
    dispatch(pointMap: ScreenMap, breakpointChecked: Breakpoint): boolean;
    subscribe(func: SubscribeFunc): string;
    unsubscribe(token: string): void;
    unregister(): void;
    register(): void;
};
export default responsiveObserve;
