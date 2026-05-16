/* global wp */
import { useRef, useMemo, useCallback, useEffect } from '@wordpress/element';
import { EditorControlProps } from '../types';
import { PanelBody } from '@wordpress/components';
import { ThemeColor, ThemeGradient } from '../../types';
import { ColorPaletteDropdown } from './ColorPaletteDropdown/ColorPaletteDropdown';
import { ColorPairPaletteDropdown } from './ColorPairPaletteDropdown/ColorPairPaletteDropdown';
import { useValidatedPalette } from '../../hooks/use-validated-palette';
import { ColorComboPreview } from './ColorComboPreview/ColorComboPreview';
import { BACKGROUND_COLOUR_LABEL, COLOUR_THEME_LABEL, COLOUR_PAIR_LABEL, SECTION_BACKGROUND_LABEL } from './constants';

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

function ColorControlsInner({ name, context, attributes, setAttributes }: ColorControlsProps) {
	const singleColourPalette = useValidatedPalette({
		blockName: name,
		palette: comet?.filteredPalette ?? comet?.palette
	});
	const singleBackgroundPalette = useValidatedPalette({
		blockName: name,
		isNested: context?.isNested || attributes.sectionBackground !== undefined || attributes.sectionBackground !== 'none',
		palette: comet?.palette
	});
	const sectionBackgrounds = comet?.sectionBackgrounds
		? Object.entries(comet?.sectionBackgrounds).map(([key, value]) => ({ slug: key, name: key, color: value }))
		: [];

	if (!singleColourPalette && !singleBackgroundPalette && !sectionBackgrounds) {
		return;
	}

	const hasColorThemeSupport = Object.keys(attributes).includes('colorTheme');
	const hasBackgroundColorSupport = Object.keys(attributes).includes('backgroundColor');
	const hasSectionBackgroundSupport = sectionBackgrounds.length > 0 && Object.keys(attributes).includes('sectionBackground');
	if (!hasColorThemeSupport && !hasBackgroundColorSupport && !hasSectionBackgroundSupport) {
		return null;
	}

	const componentDefault = comet?.defaults?.[name.replace('comet/', '')] ?? {};
	const values = useMemo(() => ({
		colorTheme: attributes?.colorTheme ?? componentDefault?.colorTheme ?? null,
		backgroundColor: attributes?.backgroundColor ?? componentDefault?.backgroundColor ?? null,
		sectionBackground: attributes?.sectionBackground ?? componentDefault?.sectionBackground ?? null,
	}), [attributes, componentDefault]);

	const showColourPairControl =  hasBackgroundColorSupport && hasColorThemeSupport;
	const showSingleColourThemeControl =!showColourPairControl && !hasBackgroundColorSupport && hasColorThemeSupport;
	const showSingleBackgroundColourControl = !showColourPairControl && hasBackgroundColorSupport && !hasColorThemeSupport;
	const showSectionBackgroundControl = useMemo(() => hasSectionBackgroundSupport && !context?.isNested, [context?.isNested]);

	const handleChange = useCallback((newValues) => {
		setAttributes(newValues);
	}, [setAttributes]);

	return (
		<>
			{showColourPairControl && (
				<ColorComboPreview
					colorTheme={attributes?.colorTheme as ThemeColor}
					backgroundColor={attributes?.backgroundColor as ThemeColor}
					sectionBackground={attributes?.sectionBackground !== 'none' ? attributes?.sectionBackground as ThemeColor | ThemeGradient : undefined}
				/>
			)}
			{showSingleColourThemeControl && (
				<div className="comet-color-controls__item">
					<ColourThemeSelector values={values} palette={singleBackgroundPalette} handleChange={handleChange} />
				</div>
			)}
			{showSingleBackgroundColourControl && (
				<BackgroundColourSelector
					attributes={attributes}
					values={values}
					palette={singleBackgroundPalette}
					handleChange={(newValue: string) => handleChange({ backgroundColor: newValue })}
					clearable={['comet/group'].includes(name)}
				/>
			)}
			{showColourPairControl && (
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
			)}
			{showSectionBackgroundControl && (
				<div className="comet-color-controls__item">
					<SectionBackgroundSelector
						values={values}
						palette={sectionBackgrounds}
						handleChange={(newValue: string) => {
							handleChange({ sectionBackground: newValue });
						}}
					/>
				</div>
			)}
		</>
	);
}


function ColourThemeSelector({ values, palette, handleChange }) {
	return (
		<ColorPaletteDropdown
			label={COLOUR_THEME_LABEL}
			value={values.colorTheme}
			palette={palette}
			onChange={handleChange}
		/>
	);
}

function BackgroundColourSelector({ attributes, values, palette, handleChange, clearable = false }) {
	return (
		<>
			<ColorComboPreview
				backgroundColor={attributes?.backgroundColor as ThemeColor}
			/>
			<div className="comet-color-controls__item">
				<ColorPaletteDropdown
					label={BACKGROUND_COLOUR_LABEL}
					value={values.backgroundColor !== 'none' ? values.backgroundColor : undefined}
					palette={palette}
					onChange={handleChange}
					clearable={clearable}
				/>
			</div>
		</>
	);
}

function SectionBackgroundSelector({ values, palette, handleChange }) {
	return (
		<ColorPaletteDropdown
			label={SECTION_BACKGROUND_LABEL}
			value={values.sectionBackground !== 'none' ? values.sectionBackground : undefined}
			palette={palette}
			clearable={true}
			onChange={handleChange}
		/>
	);
}