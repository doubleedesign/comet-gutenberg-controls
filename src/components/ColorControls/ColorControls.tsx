/* global wp */
import React from 'react';
import { useState, useRef, useMemo, useCallback } from '@wordpress/element';
import { EditorControlProps } from '../types';
import { PanelBody } from '@wordpress/components';
import { ColourPalette, ThemeColor, ThemeGradient } from '../../types';
import { ColorPaletteDropdown } from './ColorPaletteDropdown/ColorPaletteDropdown';
import { ColorPairPaletteDropdown } from './ColorPairPaletteDropdown/ColorPairPaletteDropdown';
import { useValidatedPalette } from '../../hooks/use-validated-palette';

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
	const palette = useValidatedPalette({ blockName: name });
	if(!palette) {
		return null;
	}

	const componentDefault = comet?.defaults[name.replace('comet/', '')] ?? {};
	const values = useMemo(() => ({
		colorTheme: attributes?.colorTheme ?? componentDefault?.colorTheme ?? null,
		backgroundColor: attributes?.backgroundColor ?? componentDefault?.backgroundColor ?? null,
		sectionBackground: attributes?.sectionBackground ?? componentDefault?.sectionBackground ?? null,
	}), [attributes, componentDefault]);

	// Use refs to keep track of the presence of attribute support without the fields disappearing when the colour field is cleared
	const hasColorThemeSupport = useRef(!!values.colorTheme);
	const hasBackgroundColorSupport = useRef(!!values.backgroundColor);
	const hasSectionBackgroundSupport = useRef(!!values?.sectionBackground);
	if (!hasColorThemeSupport.current && !hasBackgroundColorSupport.current && !hasSectionBackgroundSupport.current) {
		return null;
	}

	const handleChange = useCallback((newValues) => {
		setAttributes(newValues);
	}, [setAttributes]);

	// TODO: This component needs a bunch more work in terms of handling valid combinations of background/section background,
	//  including changing the available values when the selection changes

	// If background colour is not supported, provide single colour theme option only
	// Note: sectionBackground should not be available without backgroundColor being available as well, but that isn't enforced/validated anywhere
	if (!hasBackgroundColorSupport.current) {
		return (
			<div className="comet-color-controls__item">
				<ColorPaletteDropdown
					label="Theme"
					value={values.colorTheme}
					palette={palette}
					onChange={handleChange}
				/>
			</div>
		);
	}

	return (
		<>
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
						palette={palette}
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