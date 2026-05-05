import { Dropdown, Button, ColorIndicator, ColorPalette, GradientPicker } from '@wordpress/components';
import { useRef, useCallback, useEffect, useMemo } from '@wordpress/element';
import { ColorSwatch } from '../ColorSwatch/ColorSwatch';
import { ColourPaletteItem, ThemeColor } from '../../../types';

export type ColorPaletteDropdownProps = {
	label: string;
	value: string;
	palette: Array<ColourPaletteItem>;
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
		
		const name = newValue.replace('var(--color-', '').replace(')', '').replace('var(--gradient-', '');
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

	const singleColours = useMemo(() => {
		return palette.filter(color => !color.slug.includes('-'));
	}, [palette]);

	const gradients = useMemo(() => {
		return palette.filter(color => color.slug.includes('-')).map(item => ({
			name: item.name,
			slug: item.slug,
			gradient: `var(--gradient-${item.slug})`,
		}));
	}, [palette]);

	return (
		<div data-testid="comet-single-color-selector">
			<Dropdown
				renderToggle={({ onToggle, isOpen }) => (
					<Button onClick={onToggle}
						aria-expanded={isOpen}
						ref={triggerRef}
						__next40pxDefaultSize
					>
						{label}
						{value && value.includes('-') ?
								(
									<ColorIndicator
										colorValue={`var(--gradient-${value})`}
										data-testid="comet-color-indicator"
										aria-label={`Selected colours: ${value.replace('-', ' and ')}`} />
								) : (
									<ColorIndicator
										colorValue={value ? `var(--color-${value})` : undefined}
										data-testid="comet-color-indicator"
										aria-label={value ? `Selected colour: ${value}` : 'No colour selected'}
									/>
								)}

					</Button>
				)}
				renderContent={({ onToggle, ...props }) => (
					<div className="comet-color-selector-content">
						{value !== undefined && <ColorSwatch backgroundColor={value as ThemeColor} />}
						<div className="comet-color-selector-content__pickers">
							{gradients.length > 0 && (
								<GradientPicker
									clearable={clearable}
									value={value ? `var(--gradient-${value})` : undefined}
									gradients={gradients}
									disableCustomGradients={true}
									onChange={(value) => {
										handleChange(value);
										onToggle(); // close dropdown after selection
									}}
								/>
							)}
							{ /* This needs to be here even when there's only gradients, so that the Clear button is kept */ }
							<ColorPalette
								clearable={clearable}
								value={`var(--color-${value})`}
								// @ts-ignore
								colors={singleColours}
								disableCustomColors={true}
								onChange={(newValue) => {
									handleChange(newValue);
									onToggle(); // close dropdown after selection
								}}
							/>
						</div>
					</div>
				)}
			/>
		</div>
	);
}