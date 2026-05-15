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
	const hasSectionBackgroundSupport = useRef(sectionBackgrounds.length > 0 && Object.keys(attributes).includes('sectionBackground'));
	if (!hasColorThemeSupport.current && !hasBackgroundColorSupport.current && !hasSectionBackgroundSupport.current) {
		return null;
	}

	const handleChange = useCallback((newValues) => {
		setAttributes(newValues);
	}, [setAttributes]);

	// Handle only section background being supported (should only occur when the block can have inner blocks and is not nested)
	if ((hasSectionBackgroundSupport.current && !hasColorThemeSupport.current && !hasBackgroundColorSupport.current) && !context?.isNested) {
		return (
			<div className="comet-color-controls__item">
				<SectionBackgroundSelector
					values={values}
					palette={sectionBackgrounds}
					handleChange={(newValue: string) => {
						handleChange({ sectionBackground: newValue });
					}}
				/>
			</div>
		);
	}

	// Otherwise, if background colour is not supported, provide single colour theme option only
	if (!hasBackgroundColorSupport.current) {
		return (
			<div className="comet-color-controls__item">
				<ColourThemeSelector values={values} palette={singleBackgroundPalette} handleChange={handleChange} />
			</div>
		);
	}

	// If background colour is supported but colorTheme is not, provide single background colour option only
	if (!hasColorThemeSupport.current && hasBackgroundColorSupport.current) {
		return (
			<BackgroundColourSelector
				attributes={attributes}
				values={values} palette={singleBackgroundPalette}
				handleChange={(newValue: string) => handleChange({ backgroundColor: newValue })}
			/>
		);
	}

	// If both colour theme and background colour are supported, provide the combined selector and preview,
	// along with section background if that is also supported
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
			{(hasSectionBackgroundSupport.current && !context?.isNested) && (
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

function BackgroundColourSelector({ attributes, values, palette, handleChange }) {
	return (
		<>
			<ColorComboPreview
				backgroundColor={attributes?.backgroundColor as ThemeColor}
			/>
			<div className="comet-color-controls__item">
				<ColorPaletteDropdown
					label={BACKGROUND_COLOUR_LABEL}
					value={values.backgroundColor}
					palette={palette}
					onChange={handleChange}
				/>
			</div>
		</>
	);
}

function SectionBackgroundSelector({ values, palette, handleChange }) {
	return (
		<ColorPaletteDropdown
			label={SECTION_BACKGROUND_LABEL}
			value={values.sectionBackground}
			palette={palette}
			clearable={true}
			onChange={handleChange}
		/>
	);
}