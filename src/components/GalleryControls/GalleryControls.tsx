import { FieldTooltip } from '../FieldTooltip/FieldTooltip';
import {
	__experimentalToggleGroupControl,
	__experimentalToggleGroupControlOption,
	PanelBody,
	ToggleControl
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { EditorControlProps } from '../types';

export type GalleryControlsProps = EditorControlProps & {
	attributes: {
		lightbox: boolean,
		externalLinks: boolean,
		captions: boolean,
		imageCrop: boolean,
	}
};

export const GalleryControls = ({ name, attributes, setAttributes }) => {
	if (name !== 'comet/gallery') {
		return null;
	}
	const [clickBehaviour, setClickBehaviour] = useState<string>('none');

	const ToggleGroupControl = __experimentalToggleGroupControl;
	const ToggleGroupControlOption = __experimentalToggleGroupControlOption;

	return (
		<PanelBody title="Gallery options" initialOpen={true}>
			<ToggleGroupControl
				className="comet-toggle-group"
				__next40pxDefaultSize
				isBlock
				label="Click behaviour"
				onChange={(value) => {
					setClickBehaviour((value as string|undefined) ?? 'none');

					switch(value) {
						case 'lightbox':
							setAttributes({ lightbox: true, externalLinks: false });
							break;
						case 'links':
							setAttributes({ lightbox: false, externalLinks: true });
							break;
						default:
							setAttributes({ lightbox: false, externalLinks: false });
					}
				}}
				value={clickBehaviour}
			>
				<ToggleGroupControlOption
					label="None"
					value="none"
				/>
				<ToggleGroupControlOption
					label="Lightbox"
					value="lightbox"
					showTooltip
					aria-label={'When a visitor clicks on an image, open a larger version in an overlay'}
				/>
				<ToggleGroupControlOption
					label="Links"
					value="links"
					showTooltip
					aria-label={'When a visitor clicks on an image that has an external URL set, open that URL in a new tab'}
				/>
			</ToggleGroupControl>
			<ToggleControl
				checked={attributes.captions}
				label="Show image captions if available"
				onChange={(value) => setAttributes({ captions: value })}
			/>
			<ToggleControl
				checked={attributes.imageCrop}
				label={
					<>
						<span>Crop images</span>
						<FieldTooltip
							tooltip={'If enabled, images will scale and be centered in the available space; if disabled they will be cropped to fill the space. This setting does not affect the image when open in the lightbox.'}
						/>
					</>
				}
				onChange={(value) => setAttributes({ imageCrop: value })}
			/>
		</PanelBody>
	);
};
