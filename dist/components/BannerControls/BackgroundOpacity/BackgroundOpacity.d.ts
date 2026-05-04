import React from 'react';
import { EditorControlProps } from '../../types';
export type BackgroundOpacityProps = EditorControlProps & {
    attributes: {
        backgroundOpacity?: number;
    };
};
export declare const BackgroundOpacity: ({ name, attributes, setAttributes }: BackgroundOpacityProps) => React.JSX.Element | null;
