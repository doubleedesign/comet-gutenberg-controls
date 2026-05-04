import { EditorControlProps } from '../types';
export type HtmlTagProps = EditorControlProps & {
    attributes: {
        tagName?: string;
    };
};
export declare const HtmlTag: ({ name, attributes, setAttributes }: HtmlTagProps) => JSX.Element | null;
