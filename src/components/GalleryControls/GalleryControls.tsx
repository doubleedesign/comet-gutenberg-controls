import React from 'react';
import { FieldTooltip } from '../FieldTooltip/FieldTooltip';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { EditorControlProps } from '../types';

export type GalleryControlsProps = EditorControlProps & {
	attributes: {
		lightbox: boolean,
		captions: boolean
	}
};

export const GalleryControls = ({ name, attributes, setAttributes }) => {
	if (name !== 'comet/gallery') {
		return null;
	}

	return (
		<PanelBody title="Gallery options" initialOpen={true}>
			<ToggleControl
				checked={attributes.lightbox}
				label={
					<>
						<span>Enable lightbox</span>
						<FieldTooltip
							tooltip={'When a visitor clicks on an image, open a larger version in an overlay'}
						/>
					</>
				}
				onChange={(value) => setAttributes({ lightbox: value })}
			/>
			<ToggleControl
				checked={attributes.captions}
				label="Show image captions if available"
				onChange={(value) => setAttributes({ captions: value })}
			/>
		</PanelBody>
	);
};
