import React from 'react';
import { InspectorAdvancedControls, InspectorControls } from '@wordpress/block-editor';
import { LayoutControls } from './LayoutControls/LayoutControls';
import { ColorControls } from './ColorControls/ColorControls';
import { HtmlTag } from './HtmlTag/HtmlTag';
import { EditorControlProps } from './types';
import { GalleryControls } from './GalleryControls/GalleryControls';
import { BannerControls } from './BannerControls/BannerControls';

export type CometBlockControlsProps = EditorControlProps & {
	BlockEdit: React.ComponentType<any>;
};

/**
 * Render the WordPress BlockEdit component with controls for custom attributes
 */
export function CometBlockControls({ BlockEdit, ...props }: CometBlockControlsProps) {
	return (
		<>
			<div className="comet-plugin-blocks-custom-controls">
				<InspectorControls>
					<LayoutControls {...props} />
					<ColorControls {...props} />
					<BannerControls {...props} />
					<GalleryControls {...props} />
				</InspectorControls>
				<InspectorAdvancedControls>
					<HtmlTag {...props} />
				</InspectorAdvancedControls>
			</div>
			<BlockEdit {...props} />
		</>
	);
}