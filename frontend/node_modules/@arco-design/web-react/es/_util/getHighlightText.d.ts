export default function getHighlightText<T>({ nodeList, pattern, highlightClassName, }: {
    nodeList: T;
    pattern: string;
    highlightClassName: string;
}): T;
