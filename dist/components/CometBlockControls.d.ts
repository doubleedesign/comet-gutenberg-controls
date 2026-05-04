import { type ComponentType } from '@wordpress/block-editor';
import { EditorControlProps } from './types';
export type CometBlockControlsProps = EditorControlProps & {
    BlockEdit: ComponentType<any>;
};
/**
 * Render the WordPress BlockEdit component with controls for custom attributes
 */
export declare function CometBlockControls({ BlockEdit, ...props }: CometBlockControlsProps): JSX.Element;
