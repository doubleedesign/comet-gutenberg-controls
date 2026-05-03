import React from 'react';
import { EditorControlProps } from '../types';
export type HtmlTagProps = EditorControlProps & {
    attributes: {
        tagName?: string;
    };
};
export declare const HtmlTag: ({ name, attributes, setAttributes }: HtmlTagProps) => React.JSX.Element | null;
