import { Dropdown, Button, ColorIndicator, ColorPalette } from '@wordpress/components';
import { useRef, useCallback, useEffect } from '@wordpress/element';
import { ColorSwatch } from '../../ColorSwatch/ColorSwatch';
import { ThemeColor } from '../../../types';

export type ColorPaletteDropdownProps = {
	label: string;
	value: string;
	palette: Array<{ slug: string; name: string; color: string }>;
	onChange: (value: string) => void;
	clearable?: boolean;
};

export function ColorPaletteDropdown({ label = 'Colour', value, palette, onChange, clearable = false }: ColorPaletteDropdownProps) {
	const triggerRef = useRef();

	const handleChange = useCallback((newValue) => {
		// Handle clearable selector
		if(!newValue) {
			onChange('');

			return;
		}
		
		const name = newValue.replace('var(--color-', '').replace(')', '');
		onChange(name);
	}, [onChange]);

	useEffect(() => {
		if(!palette) return;

		if(!value) return; // allows clearing the value

		function validateValue(value) {
			return palette.find((color) => color.slug === value) !== undefined;
		}

		if(!validateValue(value)) {
			// If the current value is not valid, default to the first palette option
			const defaultColor = palette[0]?.slug ?? '';
			onChange(defaultColor);
		}
	}, [value, palette]);

	return (
		<div data-testid="comet-single-color-selector">
			<Dropdown
				renderToggle={({ onToggle, isOpen }) => (
					<Button onClick={onToggle}
						aria-expanded={isOpen}
						ref={triggerRef}
						__next40pxDefaultSize
					>
						<ColorIndicator
							colorValue={value ? `var(--color-${value})` : undefined}
							data-testid="comet-color-indicator"
							aria-label={value ? `Selected colour: ${value}` : 'No colour selected'}
						/>
						{label}
					</Button>
				)}
				renderContent={({ onToggle, ...props }) => (
					<>
						{value !== undefined && <ColorSwatch backgroundColor={value as ThemeColor} />}
						<ColorPalette
							clearable={clearable}
							value={`var(--color-${value})`}
							colors={palette}
							disableCustomColors={true}
							onChange={(newValue) => {
								handleChange(newValue);
								onToggle(); // close dropdown after selection
							}}
						/>
					</>
				)}
			/>
		</div>
	);
}