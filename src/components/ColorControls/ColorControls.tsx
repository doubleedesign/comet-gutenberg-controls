/* global wp */
import { useMemo } from '@wordpress/element';
import { EditorControlProps } from '../types';
import { PanelBody } from '@wordpress/components';
import { ThemeColor, ThemeGradient } from '../../types';
import { ContextualColorPaletteDropdown } from './ColorPaletteDropdown/ColorPaletteDropdown';
import { ContextualColorPairDropdown } from './ColorPairPaletteDropdown/ColorPairPaletteDropdown';
import { useValidatedPalette } from '../../hooks/use-validated-palette';
import { ColorComboPreview } from './ColorComboPreview/ColorComboPreview';
import { ColourTypeLabel } from './constants';
import { ColourContextProvider } from '../../controllers/ColourContextProvider';

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

function ContextualColorPairPaletteDropdown(props: { blockName: string }) {
	return null;
}

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

	return (
		<ColourContextProvider values={values} onChange={setAttributes}>
			{showSingleColourThemeControl && singleColourPalette && (
				<ContextualColorPaletteDropdown
					colorContextKey="colorTheme"
					label={ColourTypeLabel.COLOUR_THEME}
					palette={singleColourPalette}
				/>
			)}
			{showSingleBackgroundColourControl && singleBackgroundPalette && (
				<ContextualColorPaletteDropdown
					colorContextKey="backgroundColor"
					label={ColourTypeLabel.BACKGROUND}
					palette={singleBackgroundPalette}
					clearable={true}
				/>
			)}
			{showColourPairControl && (
				<>
					<ColorComboPreview
						colorTheme={attributes?.colorTheme as ThemeColor}
						backgroundColor={attributes?.backgroundColor as ThemeColor}
						sectionBackground={attributes?.sectionBackground !== 'none' ? attributes?.sectionBackground as ThemeColor | ThemeGradient : undefined}
					/>
					<ContextualColorPairDropdown blockName={name.split('/')[1]}/>
				</>
			)}
			{showSectionBackgroundControl && (
				<ContextualColorPaletteDropdown
					colorContextKey="sectionBackground"
					label={ColourTypeLabel.SECTION_BACKGROUND}
					palette={sectionBackgrounds}
					clearable={true}
				/>
			)}
		</ColourContextProvider>
	);
}