import React from 'react';
import { EditorControlProps } from './types';
export type CometBlockControlsProps = EditorControlProps & {
    BlockEdit: React.ComponentType<any>;
};
/**
 * Render the WordPress BlockEdit component with controls for custom attributes
 */
export declare function CometBlockControls({ BlockEdit, ...props }: CometBlockControlsProps): React.JSX.Element;
