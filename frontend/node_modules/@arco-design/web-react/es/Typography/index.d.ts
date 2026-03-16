/// <reference types="react" />
import Title from './title';
import Text from './text';
import Paragraph from './paragraph';
import Ellipsis from './ellipsis';
declare const Typography: import("react").ForwardRefExoticComponent<import("./interface").TypographyProps & import("react").RefAttributes<unknown>> & {
    Title: typeof Title;
    Text: typeof Text;
    Paragraph: typeof Paragraph;
    Ellipsis: typeof Ellipsis;
};
export default Typography;
export { TypographyProps, TypographyTitleProps, TypographyParagraphProps, TypographyTextProps, TypographyEllipsisProps, EllipsisConfig, } from './interface';
