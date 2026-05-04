/* global wp */
import React from 'react';
import { RangeControl } from '@wordpress/components';
import { EditorControlProps } from '../../types';

export type BackgroundOpacityProps = EditorControlProps & {
	attributes: {
		backgroundOpacity?: number;
	}
};

export const BackgroundOpacity = ({ name, attributes, setAttributes }: BackgroundOpacityProps) => {
	if (!attributes?.backgroundOpacity) {
		return null;
	}

	const defaultValue =
		comet?.defaults?.[name.replace('comet/', '')]?.backgroundOpacity
		?? wp?.data?.select('core/blocks')?.getBlockType(name)?.attributes?.backgroundOpacity?.default
		?? 0;

	return (
		<RangeControl
			__next40pxDefaultSize
			initialPosition={attributes.backgroundOpacity ?? defaultValue}
			onChange={(value) => setAttributes({ backgroundOpacity: value })}
			label="Background opacity"
			max={100}
			min={0}
			allowReset={true}
			resetFallbackValue={defaultValue}
		/>
	);
};
