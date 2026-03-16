import { ImageProps } from '../../interface';
interface ShowFooterProps {
    title: ImageProps['title'];
    description: ImageProps['description'];
    actions: ImageProps['actions'];
}
export default function useShowFooter(props: ShowFooterProps): (string | number)[];
export {};
