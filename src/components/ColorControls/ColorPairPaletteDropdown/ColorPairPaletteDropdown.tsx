import { useMemo, useRef, useState, useEffect, useCallback } from '@wordpress/element';
import { Dropdown, Button, ColorIndicator } from '@wordpress/components';
import { ColorPair, ThemeColor, ColourPalette } from '../../../types';
import { ColorSwatch } from '../ColorSwatch/ColorSwatch';
import { ColourTypeLabel } from '../constants';
import { useColourContext } from '../../../controllers/ColourContextProvider';
import { ColorPalettePicker } from '../ColorPalettePicker/ColorPalettePicker';
import { transformColorPairsToPalette } from '../../../utils';
import { PopupMenu } from '../../PopupMenu/PopupMenu';

type ColorPairPaletteCommonProps = {
	label?: string;
};

export type ContextualColorPairDropdownProps = ColorPairPaletteCommonProps & {
	blockName: string;
};

export type ColorPairPaletteDropdownProps = ColorPairPaletteCommonProps & {
	value: ColorPair;
	palette: ColourPalette;
	onChange: (newValue: ColorPair) => void;
};

export function ContextualColorPairDropdown({ blockName, ...props }: ContextualColorPairDropdownProps) {
	const { values, onChange } = useColourContext();

	const pairs = comet?.colourPairOverrides?.[blockName] ?? comet?.colourPairs ?? [];
	const palette = transformColorPairsToPalette(pairs);

	// Neither the foreground/colorTheme nor backgroundColor should be undefined,
	// unlike other ColorState controls, hence sticking with the ColorPair type here.
	const mappedValues = useMemo(() => ({
		foreground: values.colorTheme,
		background: values?.backgroundColor,
	} as ColorPair), [values.colorTheme, values.backgroundColor]);

	const handleChange = useCallback((newValues: ColorPair) => {
		onChange({
			colorTheme: newValues.foreground,
			backgroundColor: newValues.background,
		});
	}, []);

	return <ColorPairPaletteDropdown {...props} value={mappedValues} palette={palette} onChange={handleChange} />;
}

export function ColorPairPaletteDropdown({ label = ColourTypeLabel.PAIR, value, palette, onChange }: ColorPairPaletteDropdownProps) {
	const [foreground, setForeground] = useState<ThemeColor>(value?.foreground ?? '');
	const [background, setBackground] = useState<ThemeColor>(value?.background ?? (comet?.globalBackground ?? 'white'));

	const doChange = useCallback((newForeground: ThemeColor, newBackground: ThemeColor) => {
		setForeground(newForeground);
		setBackground(newBackground);
		onChange({
			foreground: newForeground,
			background: newBackground,
		});
	}, [onChange]);

	useEffect(() => {
		if(!palette) return;
		if(Object.values(value).every(val => val === undefined)) return;

		function validatePair(value: ColorPair) {
			return palette.find((pair) => pair.slug === `${value.foreground}-${value.background}`);
		}

		if(!validatePair(value) && palette.length > 0) {
			// If the current value is not valid, default to the first palette option
			const defaultForeground = palette[0].slug.split('-')[0] as ThemeColor;
			const defaultBackground = palette[0].slug.split('-')[1] as ThemeColor;
			doChange(defaultForeground, defaultBackground);
		}
	}, [value, palette]);

	const handleChange = (newValue: string) => {
		// New value is the gradient string; find the matching palette object
		const matchedPair = palette.find((pair) => pair.slug === newValue);
		if (matchedPair) {
			const [newForeground, newBackground] = matchedPair.slug.split('-') as ThemeColor[];
			doChange(newForeground, newBackground);
		}
	};

	const previewIndicator = useMemo(() => {
		// eslint-disable-next-line max-len
		return `linear-gradient(135deg, var(--color-${foreground}) 0%, var(--color-${foreground}) 50%, var(--color-${background}) 50%, var(--color-${background}) 100%)`;
	}, [foreground, background]);

	return (
		<PopupMenu className="comet-color-controls__item"  data-testid="comet-color-pair-selector">
			<PopupMenu.Trigger ariaLabel={label}>
				{label}
				<ColorIndicator
					colorValue={previewIndicator}
					data-testid="comet-color-pair-indicator"
					aria-label={`Selected colours: ${foreground} on ${background}`}
				/>
			</PopupMenu.Trigger>
			<PopupMenu.Content>
				{({ onToggle }) => (
					<ColorPalettePicker
						value={`${foreground}-${background}`}
						gradients={palette}
						previewType="content"
						onChange={(newValue: string) => {
							handleChange(newValue);
							onToggle(); // close dropdown after selection
						}}
					/>
				)}
			</PopupMenu.Content>
		</PopupMenu>
	);
}