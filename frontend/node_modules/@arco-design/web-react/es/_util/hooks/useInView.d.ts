interface UserInViewProps extends IntersectionObserverInit {
    onChange?: (inView: boolean, entry: IntersectionObserverEntry) => void;
    defaultInView?: boolean;
    unobserverOnEnter?: boolean;
    target?: Element;
}
declare function useInView(props: UserInViewProps): {
    inView: boolean;
    observer: IntersectionObserver;
};
export default useInView;
