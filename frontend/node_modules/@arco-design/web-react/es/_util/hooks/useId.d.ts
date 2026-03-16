/**
 * Provide unique component name while using this hook
 * In react 18, React.useId is a better way to choose
 * Related issue: https://github.com/arco-design/arco-design/issues/958
 */
export default function useId(prefix: string): string | undefined;
