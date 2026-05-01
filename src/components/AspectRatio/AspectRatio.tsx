import React from 'react';
import { FieldTooltip } from '../FieldTooltip/FieldTooltip';
import { SelectControl } from '@wordpress/components';
import { EditorControlProps } from '../types';
import { type AspectRatio as AspectRatioOption } from '../../types';

export type AspectRatioProps = EditorControlProps & {
	attributes: {
		aspectRatio?: AspectRatioOption
	}
};

export const AspectRatio = ({ name, attributes, setAttributes }: AspectRatioProps) => {
	if (!attributes?.aspectRatio || !comet.aspectRatios) {
		return null;
	}

	const options = comet.aspectRatios.map((ratio: AspectRatioOption) => ({
		label: `${sentence_case(ratio.name)} (${ratio.value})`,
		value: ratio.value,
	}));

	const label = name === 'comet/gallery' ? <>
		Aspect ratio
		<FieldTooltip
			tooltip={'The preferred aspect ratio for the image previews'}
		/>
	</> : 'Aspect ratio';

	return (
		<SelectControl
			label={label}
			size={'__unstable-large'}
			value={attributes.aspectRatio}
			options={options}
			onChange={(newRatio) => setAttributes({ aspectRatio: newRatio })}
		/>
	);
};

function sentence_case(text: string) {
	return text
		.toLowerCase()
		.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
		.replaceAll('_', ' ');
}
