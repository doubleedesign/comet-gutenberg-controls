import React from 'react';
import { Dropdown, Button, ColorIndicator, ColorPalette } from '@wordpress/components';
import { useRef, useState } from '@wordpress/element';

export type ColorPaletteDropdownProps = {
	label: string;
	hexValue: string;
	palette: Array<{ slug: string; name: string; color: string }>;
	onChange: (value: string) => void;
};

export function ColorPaletteDropdown({ label = 'Colour', hexValue, palette, onChange }: ColorPaletteDropdownProps) {
	const [hex, setHex] = useState(hexValue);
	const triggerRef = useRef();

	const getNameByColorValue = (colorValue) => {
		const color = palette.find((c) => c.color === colorValue);

		return color ? color.slug : colorValue;
	};

	return (
		<Dropdown
			renderToggle={({ onToggle, isOpen }) => (
				<Button onClick={onToggle}
					aria-expanded={isOpen}
					ref={triggerRef}
					__next40pxDefaultSize
				>
					<ColorIndicator colorValue={hex}/>
					{label}
				</Button>
			)}
			renderContent={({ onToggle, ...props }) => (
				<ColorPalette
					value={hex}
					colors={palette}
					disableCustomColors={true}
					onChange={(color) => {
						setHex(color ?? '');
						onChange(getNameByColorValue(color));
						onToggle(); // close dropdown after selection
					}}
				/>
			)}
		/>
	);
}