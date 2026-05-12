/* global wp */
import { useRef, useMemo, useCallback } from '@wordpress/element';
import { EditorControlProps } from '../types';
import { PanelBody } from '@wordpress/components';
import { ThemeColor, ThemeGradient } from '../../types';
import { ColorPaletteDropdown } from './ColorPaletteDropdown/ColorPaletteDropdown';
import { ColorPairPaletteDropdown } from './ColorPairPaletteDropdown/ColorPairPaletteDropdown';
import { useValidatedPalette } from '../../hooks/use-validated-palette';
import { ColorComboPreview } from './ColorComboPreview/ColorComboPreview';

export type ColorControlsProps = EditorControlProps & {
	attributes: {
		colorTheme?: ThemeColor;
		backgroundColor?: ThemeColor;
		sectionBackground?: ThemeColor | ThemeGradient;
	}
};

export const ColorControls = (props: ColorControlsProps) => {
	if(!Object.keys(props?.attributes).some(attr => ['colorTheme', 'backgroundColor', 'sectionBackground'].includes(attr))) {
		return null;
	}

	return (
		<PanelBody title="Colours"
			initialOpen={true}
			className={`comet-color-controls comet-color-controls--${props?.name?.split('/')[1]}`}
		>
			<ColorControlsInner {...props} />
		</PanelBody>
	);
};

function ColorControlsInner({ name, attributes, setAttributes }: ColorControlsProps) {
	const singleColourPalette = useValidatedPalette({ blockName: name, palette: comet?.filteredPalette ?? comet?.palette });
	const singleBackgroundPalette = useValidatedPalette({ blockName: name, palette: comet?.palette });
	if(!singleColourPalette && !singleBackgroundPalette) {
		return;
	}

	const sectionBackgrounds = comet?.sectionBackgrounds ? Object.entries(comet.sectionBackgrounds)
		.map(([key, value]) => {
			return ({
				slug: key,
				name: key,
				color: value
			});
		}) : [];

	const componentDefault = comet?.defaults?.[name.replace('comet/', '')] ?? {};
	const values = useMemo(() => ({
		colorTheme: attributes?.colorTheme ?? componentDefault?.colorTheme ?? null,
		backgroundColor: attributes?.backgroundColor ?? componentDefault?.backgroundColor ?? null,
		sectionBackground: attributes?.sectionBackground ?? componentDefault?.sectionBackground ?? null,
	}), [attributes, componentDefault]);

	// Use refs to keep track of the presence of attribute support without the fields disappearing when the colour field is cleared
	const hasColorThemeSupport = useRef(!!values.colorTheme);
	const hasBackgroundColorSupport = useRef(!!values.backgroundColor);
	const hasSectionBackgroundSupport = useRef(!!values?.sectionBackground && sectionBackgrounds.length > 0);
	if (!hasColorThemeSupport.current && !hasBackgroundColorSupport.current && !hasSectionBackgroundSupport.current) {
		return null;
	}

	const handleChange = useCallback((newValues) => {
		setAttributes(newValues);
	}, [setAttributes]);


	// If background colour is not supported, provide single colour theme option only
	// Note: sectionBackground should not be available without backgroundColor being available as well, but that isn't enforced/validated anywhere
	if (!hasBackgroundColorSupport.current && singleColourPalette) {
		return (
			<div className="comet-color-controls__item">
				<ColorPaletteDropdown
					label="Colour theme"
					value={values.colorTheme}
					palette={singleColourPalette}
					onChange={(newValue) => handleChange({ colorTheme: newValue })}
				/>
			</div>
		);
	}

	// If background colour is supported but colorTheme is not, provide single background colour option only
	// TODO: Are there any cases where there would be backgroundColor and sectionBackground but not colorTheme?
	if (!hasColorThemeSupport.current && hasBackgroundColorSupport.current && singleBackgroundPalette) {
		return (
			<>
				<ColorComboPreview
					backgroundColor={attributes?.backgroundColor as ThemeColor}
				/>
				<div className="comet-color-controls__item">
					<ColorPaletteDropdown
						label="Background colour"
						value={values.backgroundColor}
						palette={singleBackgroundPalette}
						onChange={(newValue) => handleChange({ backgroundColor: newValue })}
					/>
				</div>
			</>
		);
	}

	return (
		<>
			<ColorComboPreview
				colorTheme={attributes?.colorTheme as ThemeColor}
				backgroundColor={attributes?.backgroundColor as ThemeColor}
				sectionBackground={attributes?.sectionBackground}
			/>
			<div className="comet-color-controls__item">
				<ColorPairPaletteDropdown
					value={{
						foreground: values.colorTheme,
						background: values.backgroundColor
					}}
					blockName={name.split('/')[1]}
					onChange={(newValue) => {
						handleChange({
							colorTheme: newValue.foreground,
							backgroundColor: newValue.background
						});
					}}
				/>
			</div>
			{hasSectionBackgroundSupport.current && (
				<div className="comet-color-controls__item">
					<ColorPaletteDropdown
						label="Section background"
						value={values.sectionBackground}
						palette={sectionBackgrounds}
						clearable={true}
						onChange={(newValue) => {
							handleChange({ sectionBackground: newValue });
						}}
					/>
				</div>
			)}
		</>
	);
}