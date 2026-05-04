import React from 'react';
import { EditorControlProps } from '../types';
export type GalleryControlsProps = EditorControlProps & {
    attributes: {
        lightbox: boolean;
        captions: boolean;
    };
};
export declare const GalleryControls: ({ name, attributes, setAttributes }: {
    name: any;
    attributes: any;
    setAttributes: any;
}) => React.JSX.Element | null;
