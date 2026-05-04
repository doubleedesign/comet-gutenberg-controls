/* global wp */
import React from 'react';
import { useState, useRef } from '@wordpress/element';
import { EditorControlProps } from '../types';
import { PanelBody } from '@wordpress/components';
import { ColourPalette, ThemeColor, ThemeGradient } from '../../types';
import { ColorPaletteDropdown } from './ColorPaletteDropdown/ColorPaletteDropdown';
import { ColorPairPaletteDropdown } from './ColorPairPaletteDropdown/ColorPairPaletteDropdown';

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

	let palette: ColourPalette = Object.entries(comet?.palette)
		?.filter(([key, value]) => !['black', 'white'].includes(key))
		?.map(([key, value]) => ({ slug: key, name: key, color: value as string }))
		?? wp.data.select('core/block-editor').getSettings().colors;

	// Most blocks shouldn't have access to the status/message type colours, only brand colours, whereas others are the opposite
	if (['comet/callout'].includes(name)) {
		palette = palette.filter(color => ['error', 'success', 'info', 'warning'].includes(color.slug));
	}
	else if (['comet/separator'].includes(name)) {
		palette = palette.filter(color => !['error', 'success', 'info', 'warning', 'light'].includes(color.slug));
	}
	else if (['comet/copy', 'comet/copy-image'].includes(name)) {
		palette = palette.filter(color => !['error', 'success', 'info', 'warning', 'light', 'accent'].includes(color.slug));
	}
	else {
		palette = palette.filter(color => !['error', 'success', 'info', 'warning'].includes(color.slug));
	}

	if (!palette || palette.length === 0) {
		// eslint-disable-next-line max-len
		console.error('No colour palette found in component library configuration. You can use theme.json or the comet_canvas_theme_colours filter to add colours. Developers: See set_colours() in ThemeStyle.php in the plugin source for more implementation details.');

		return null;
	}

	const componentDefault = comet?.defaults[name.replace('comet/', '')] ?? {};
	const startValues = {
		colorTheme: attributes?.colorTheme ?? componentDefault?.colorTheme ?? null,
		backgroundColor: attributes?.backgroundColor ?? componentDefault?.backgroundColor ?? null,
		sectionBackground: attributes?.sectionBackground ?? componentDefault?.sectionBackground ?? null,
	};

	// Use refs to keep track of the presence of attribute support without the fields disappearing when the colour field is cleared
	const hasColorThemeSupport = useRef(!!startValues.colorTheme);
	const hasBackgroundColorSupport = useRef(!!startValues.backgroundColor);
	const hasSectionBackgroundSupport = useRef(!!startValues?.sectionBackground);

	if (!hasColorThemeSupport.current && !hasBackgroundColorSupport.current && !hasSectionBackgroundSupport.current) {
		return null;
	}

	const [foregroundColor, setForegroundColor] = useState(startValues.colorTheme);
	const [backgroundColors, setBackgroundColors] = useState(
		(startValues.sectionBackground && startValues.sectionBackground !== 'inherit')
			? [startValues.sectionBackground, startValues.backgroundColor]
			: [startValues.backgroundColor]
	);

	const getValueByColorName = (colorName?: string) => {
		if(!colorName) return undefined;

		const color = palette.find((c) => c.slug === colorName);

		return color ? color.color : colorName;
	};

	const handleThemeChange = (name: string) => {
		setForegroundColor(name);
		setAttributes({ colorTheme: name ?? '' });
	};

	const handleBackgroundChange = (value) => {
		setBackgroundColors(value);
		setAttributes({ backgroundColors: value ?? [] });
	};

	// If background colour is not supported, provide single colour theme option
	// Note: sectionBackground should not be available without backgroundColor being available as well, but that isn't enforced/validated anywhere
	if (!hasBackgroundColorSupport.current) {
		return (
			<div className="comet-color-controls__item">
				<ColorPaletteDropdown
					label="Theme"
					hexValue={getValueByColorName(attributes?.colorTheme) ?? ''}
					palette={palette}
					onChange={handleThemeChange}
				/>
			</div>
		);
	}

	// If section background is supported
	// if(hasSectionBackgroundSupport.current) {
	// 	return (
	// 		<ColorTripletSelector
	// 			value={{
	// 				foreground: foregroundColor,
	// 				backgrounds: backgroundColors
	// 			}}
	// 			blockName={name.split('/')[1]}
	// 			onChange={(newValues) => {
	// 				handleThemeChange(newValues.foreground);
	// 				handleBackgroundChange(newValues.backgrounds);
	// 			}}
	// 		/>
	// 	);
	// }

	// If both colour theme and background colour are available but not section background, provide colour pair selection
	return (
		<div className="comet-color-controls__item">
			<ColorPairPaletteDropdown
				value={{
					foreground: foregroundColor,
					background: backgroundColors[0],
				}}
				blockName={name.split('/')[1]}
				onChange={(newValue) => {
					handleThemeChange(newValue.foreground);
					handleBackgroundChange(newValue.background);
				}}
			/>
		</div>
	);
};


// function ColorTripletSelector({ blockName, value, onChange }) {
// 	const triggerRef = useRef();
// 	const sectionBackground = value.backgrounds[0] !== 'transparent' ? value.backgrounds[0] : '';
// 	const sectionPalette =  Object.keys(comet?.sectionBackgrounds ?? []).map((option) => ({
// 		name: option,
// 		slug: option,
// 		gradient: option
// 	}));
//
// 	sectionPalette.unshift({ name: 'From theme', slug: '', gradient: '' });
// 	sectionPalette.unshift({ name: 'Transparent', slug: '', gradient: '' });
//
// 	const handleChange = (values) => {
// 		onChange(values);
// 	};
//
// 	return (
// 		<>
// 			<div className="comet-color-controls__item">
// 				<ColorPairPaletteDropdown blockName={blockName} value={value} onChange={({ foreground, background }) => {
// 					handleChange({ foreground, backgrounds: [sectionBackground, background] });
// 				}} />
// 			</div>
// 			<div className="comet-color-controls__item">
// 				<Dropdown
// 					renderToggle={({ onToggle, isOpen }) => (
// 						<Button onClick={onToggle}
// 							aria-expanded={isOpen}
// 							ref={triggerRef}
// 							__next40pxDefaultSize
// 						>
// 							<ColorIndicator colorValue="" />
// 							Section background
// 						</Button>
// 					)}
// 					renderContent={({ isOpen, onToggle }) => (
// 						<GradientPicker
// 							label="Section background"
// 							value={sectionBackground}
// 							gradients={sectionPalette}
// 							disableCustomGradients={true}
// 							className={`comet-color-controls comet-color-controls--${blockName}`}
// 							onChange={(value) => {
// 								handleChange({ backgrounds: [value] });
// 								onToggle(); // close dropdown after selection
// 							}}
// 							clearable={true}
// 						/>
// 					)}
// 				/>
// 			</div>
// 		</>
// 	);
// }
