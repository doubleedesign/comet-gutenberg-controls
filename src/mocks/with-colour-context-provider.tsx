import wp, { useState, useCallback } from '@wordpress/element';
import { ColourContextProvider } from '../controllers/ColourContextProvider';
import { ColorState } from '../types';
import { action } from 'storybook/actions';

export const withColourContextProvider = (Story, context) => {
	const { args } = context;
	/* eslint-disable @stylistic/object-curly-newline */
	const {
		// default to sectionBackground for demos because it supports both solid colours and gradients
		colorContextKey = 'sectionBackground',
		value
	} = args;

	const [colours, setColours] = useState<ColorState>({
		colorTheme: args.colorTheme ?? (colorContextKey === 'colorTheme' ? value : undefined),
		backgroundColor: args.backgroundColor ?? (colorContextKey === 'backgroundColor' ? value : undefined),
		sectionBackground: args.sectionBackground ?? (colorContextKey === 'sectionBackground' ? value : undefined),
	});

	const mockSetColours = useCallback((newValues: ColorState) => {
		setColours(prev => {
			const next = { ...prev, [colorContextKey]: newValues[colorContextKey] };
			action('ColourContextProvider onChange')(next);

			return next;
		});
	}, [colorContextKey]);

	return (
		<ColourContextProvider values={colours} onChange={mockSetColours}>
			<Story {...context} />
		</ColourContextProvider>
	);
};