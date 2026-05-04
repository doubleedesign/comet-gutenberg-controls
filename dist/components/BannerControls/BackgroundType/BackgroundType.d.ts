import React from 'react';
import { EditorControlProps } from '../../types';
export type BackgroundTypeProps = EditorControlProps & {
    attributes: {
        backgroundType?: 'content' | 'overlay';
    };
};
export declare const BackgroundType: ({ attributes, setAttributes }: BackgroundTypeProps) => React.JSX.Element | null;
