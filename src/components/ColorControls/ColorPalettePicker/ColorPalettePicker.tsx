import { useState, useMemo, useCallback, useRef } from '@wordpress/element';
// @ts-expect-error TS2307: Cannot find module @wordpress/components/build-types/color-palette/types or its corresponding type declarations.
import { ColorPaletteProps } from '@wordpress/components/build-types/color-palette/types';
// @ts-expect-error TS2307: Cannot find module @wordpress/components/build-types/gradient-picker/types or its corresponding type declarations.
import { GradientPickerComponentProps } from '@wordpress/components/src/gradient-picker/types';
import { ColorPalette } from '@wordpress/components';
import { ColorSwatch } from '../ColorSwatch/ColorSwatch';
import { transformColorKeyToValue, transformColorValueToKey } from '../../../utils';
import { useHoverAndFocus } from '../../../hooks/use-hover-and-focus';
import { difference } from 'lodash';

// Colour pairs are handled as gradients to an extent (and transformed back and forth in their palette component)
// so we need a way to preview them differently to gradients intended as background/fill colours in the swatch preview here.
type ColorPalettePickerWithGradientsProps = GradientPickerComponentProps & {
	previewType?: 'background' | 'content';
};

export type ColorPalettePickerProps = (ColorPaletteProps | ColorPalettePickerWithGradientsProps);

export type ColorPalettePickerInnerProps = (ColorPaletteProps | GradientPickerComponentProps);

export function ColorPalettePicker({ previewType, value, onChange, ...props }: ColorPalettePickerProps) {
	const elementRef = useRef<HTMLDivElement>(null);
	const [activeValue, setActiveValue] = useState(value);

	// Because the individual colour palette swatches are buried deep in the imported components,
	// which don't have callback props for the events we want to use,
	// this is a somewhat hacky way of finding them to temporarily swap our preview swatch on hover/focus.
	useHoverAndFocus({
		element: elementRef?.current,
		onEnterFocusableChild: () => {},
		onLeaveFocusableChild: () => setActiveValue(value),
	});

	// Handle an actual selection change (click/Enter)
	const handleChange = useCallback((newValue?: string) => {
		const valueKey = transformColorValueToKey(newValue);
		setActiveValue(valueKey);
		onChange(valueKey);
	}, []);

	return (
		<div ref={elementRef} className="comet-color-palette">
			<ColorSwatch backgroundColor={activeValue} />
			<ColorPalettePickerInner {...props} value={value} onChange={handleChange} />
		</div>
	);
}

function ColorPalettePickerInner({ colors = [], gradients = [], value, onChange, ...props }: ColorPalettePickerInnerProps) {
	const statusColors = useMemo(() => colors.filter(color => ['success', 'info', 'warning', 'error'].includes(color.slug)), [colors]);
	const brandColors = useMemo(() => difference(colors, statusColors), [colors, statusColors]);

	// Because we are working with a limited palette and CSS variables instead of raw colour values,
	// with some CSS adjustments we don't actually need to use the gradient-specific palette component
	// - we can treat them all as colours
	const combinedBrandPalette = useMemo(() => {
		return [...brandColors, ...gradients].reduce((acc, item) => {
			if ('color' in item) {
				acc.push(item);

				return acc;
			}

			if (['success', 'info', 'warning', 'error'].some(status => item.slug.includes(status))) {
				return acc;
			}

			acc.push({
				name: item.name,
				slug: item.slug,
				color: item.gradient,
			});

			return acc;
		}, []);
	}, [colors, gradients]);

	const combinedStatusPalette = useMemo(() => {
		return [...statusColors, ...gradients].reduce((acc, item) => {
			if ('color' in item) {
				acc.push(item);

				return acc;
			}

			if (!['success', 'info', 'warning', 'error'].some(status => item.slug.includes(status))) {
				return acc;
			}

			acc.push({
				name: item.name,
				slug: item.slug,
				color: item.gradient,
			});

			return acc;
		}, []);
	}, [colors, gradients]);

	const multiPalette = useMemo(() => {
		return [
			{ name: 'Brand colours', slug: 'brand', colors: combinedBrandPalette },
			{ name: 'Status colours', slug: 'status', colors: combinedStatusPalette },
		];
	}, [brandColors, statusColors]);

	return (
		<ColorPalette
			{...props}
			asButtons
			headingLevel="3"
			colors={statusColors.length > 0 ? multiPalette : combinedBrandPalette}
			disableCustomColors
			value={transformColorKeyToValue(value)}
			onChange={(newValue, index, slug) => {
				onChange(slug);
			}}
		/>
	);
}
