import { ColorIndicator } from '@wordpress/components';
import { useEffect, useMemo } from '@wordpress/element';
import { ColorState, ColourPalette, ThemeColor, ThemeGradient } from '../../../types';
import { ColorPalettePicker } from '../ColorPalettePicker/ColorPalettePicker';
import { useSingleColourContext } from '../../../controllers/ColourContextProvider';
import { PopupMenu } from '../../PopupMenu/PopupMenu';

type ColorPaletteDropdownCommonProps = {
	label: string;
	palette: ColourPalette;
	clearable?: boolean;
};

export type ContextualColorPaletteDropdownProps = ColorPaletteDropdownCommonProps & {
	colorContextKey?: keyof ColorState;
};

export type ColorPaletteDropdownProps = ColorPaletteDropdownCommonProps & {
	value?: ThemeColor | ThemeGradient;
	onChange: (newValue?: ThemeColor | ThemeGradient) => void;
};

export function ContextualColorPaletteDropdown({ colorContextKey, ...props }: ContextualColorPaletteDropdownProps) {
	const { value, onChange } = useSingleColourContext(colorContextKey ?? 'colorTheme');

	return (
		<ColorPaletteDropdown {...props} value={value} onChange={onChange} />
	);
}

export function ColorPaletteDropdown({ value, label, palette, onChange, clearable = false }: ColorPaletteDropdownProps) {
	
	useEffect(() => {
		if(!palette) return;

		if(!value) return; // allows clearing the value

		function validateValue(value: string) {
			return palette.find((color) => color.slug === value) !== undefined;
		}

		// If the current value is not valid, default to the first palette option
		if(!validateValue(value) && palette?.[0]?.slug) {
			onChange(palette[0].slug);
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
		<PopupMenu className="comet-color-controls__item" data-testid="comet-single-color-selector">
			<PopupMenu.Trigger ariaLabel={label}>
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
			</PopupMenu.Trigger>
			<PopupMenu.Content>
				{({ onToggle }) => (
					<ColorPalettePicker
						clearable={clearable}
						value={value}
						colors={singleColours}
						gradients={gradients}
						onChange={(newValue: string) => {
							onChange(newValue);
							onToggle(); // close dropdown after selection
						}}
					/>
				)}
			</PopupMenu.Content>
		</PopupMenu>
	);
}