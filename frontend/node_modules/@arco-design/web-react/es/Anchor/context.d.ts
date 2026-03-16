/// <reference types="react" />
import { AnchorProps } from '..';
interface AnchorContext {
    currentLink: string;
    onLinkClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => void;
    addLink: (href: string, node: HTMLElement) => void;
    removeLink: (href: string) => void;
    direction: AnchorProps['direction'];
}
declare const _default: import("react").Context<AnchorContext>;
export default _default;
