import React from 'react';
import { useMemo, useRef, useState } from '@wordpress/element';
import { Dropdown, Button, ColorIndicator, GradientPicker } from '@wordpress/components';
import { ColorPair } from '../../../types';
import { ColorSwatch } from '../../ColorSwatch/ColorSwatch';

export type ColorPairPaletteDropdownProps = {
	blockName: string;
	label?: string;
	value: ColorPair;
	onChange: (value: { foreground: string; background: string }) => void;
};

export function ColorPairPaletteDropdown({ blockName, label = 'Theme', value, onChange }) {
	const [foreground, setForeground] = useState(value?.foreground ?? '');
	const [background, setBackground] = useState(value?.background !== 'transparent' ? value?.background : (comet?.globalBackground ?? 'white'));
	const triggerRef = useRef();
	const pairs = comet?.colourPairOverrides[blockName] ?? comet?.colourPairs ?? [];

	const palette = pairs.map((pair: ColorPair) => ({
		name: `${pair.foreground} on ${pair.background}`,
		slug: `${pair.foreground}-${pair.background}`,
		// eslint-disable-next-line max-len
		gradient: `linear-gradient(135deg, var(--color-${pair.foreground}) 0%, var(--color-${pair.foreground}) 50%, var(--color-${pair.background}) 50%, var(--color-${pair.background}) 100%)`,
	}));

	const gradientPreview = useMemo(() => {
		// eslint-disable-next-line max-len
		return `linear-gradient(135deg, var(--color-${foreground}) 0%, var(--color-${foreground}) 50%, var(--color-${background}) 50%, var(--color-${background}) 100%)`;
	}, [foreground, background]);

	const handleChange = (newValue) => {
		// New value is the gradient string; find the matching palette object
		const matchedPair = palette.find((pair) => pair.gradient === newValue);

		if (matchedPair) {
			const [newForeground, newBackground] = matchedPair.slug.split('-');
			setForeground(newForeground);
			setBackground(newBackground);
			onChange({
				foreground: newForeground,
				background: newBackground,
			});
		}
	};

	return (
		<Dropdown
			renderToggle={({ onToggle, isOpen }) => (
				<Button onClick={onToggle}
					aria-expanded={isOpen}
					ref={triggerRef}
					__next40pxDefaultSize
				>
					<ColorIndicator colorValue={gradientPreview}/>
					{label}
				</Button>
			)}
			renderContent={({ isOpen, onToggle }) => (
				<>
					<ColorSwatch colorTheme={foreground} backgroundColor={background} />
					<GradientPicker
						value={gradientPreview}
						gradients={palette}
						disableCustomGradients={true}
						className={`comet-color-controls comet-color-controls--${blockName}`}
						onChange={(value) => {
							handleChange(value);
							onToggle(); // close dropdown after selection
						}}
					/>
				</>
			)}
		/>
	);
}