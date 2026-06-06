import { useState, useMemo, useCallback } from '@wordpress/element';
// @ts-expect-error TS2307: Cannot find module @wordpress/components/build-types/color-palette/types or its corresponding type declarations.
import { ColorPaletteProps } from '@wordpress/components/build-types/color-palette/types';
// @ts-expect-error TS2307: Cannot find module @wordpress/components/build-types/gradient-picker/types or its corresponding type declarations.
import { GradientPickerComponentProps } from '@wordpress/components/src/gradient-picker/types';
import { ColorPalette, GradientPicker } from '@wordpress/components';
import { ColorSwatch } from '../ColorSwatch/ColorSwatch';
import { transformColorValueToKey } from '../../../utils';

// Colour pairs are handled as gradients to an extent (and transformed back and forth in their palette component)
// so we need a way to preview them differently to gradients intended as background/fill colours in the swatch preview here.
type ColorPalettePickerWithGradientsProps = GradientPickerComponentProps & {
	previewType?: 'background' | 'content';
};

export type ColorPalettePickerProps = (ColorPaletteProps | ColorPalettePickerWithGradientsProps);

export type ColorPalettePickerInnerProps = (ColorPaletteProps | GradientPickerComponentProps);

export function ColorPalettePicker({ previewType, value, onChange, ...props }: ColorPalettePickerProps) {
	const [activeValue, setActiveValue] = useState(value);

	const handleChange = useCallback((newValue?: string) => {
		if(!value) {
			setActiveValue(undefined);
			onChange(undefined);

			return;
		}

		const valueKey = transformColorValueToKey(newValue);
		setActiveValue(valueKey);
		onChange(valueKey);
	}, []);

	return (
		<div className="comet-color-palette">
			<ColorSwatch backgroundColor={activeValue} />
			<ColorPalettePickerInner {...props} value={value} onChange={handleChange} />
		</div>
	);
}

function ColorPalettePickerInner({ colors, gradients, value, onChange, ...props }: ColorPalettePickerInnerProps) {
	return (
		<>
			<ColorPalette
				{...props}
				colors={colors}
				disableCustomColors
				value={`var(--color-${value})`}
				onChange={(newValue) => {
					onChange(newValue);
				}}
			/>
			{gradients && gradients.length > 0 && (
				<GradientPicker
					{...props}
					gradients={gradients}
					disableCustomGradients
					value={`var(--gradient-${value})`}
					onChange={(newValue) => {
						onChange(newValue);
					}}
				/>
			)}
		</>
	);
}
