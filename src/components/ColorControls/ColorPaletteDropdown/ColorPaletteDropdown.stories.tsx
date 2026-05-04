import React, { useState } from 'react';
import { ColorPaletteDropdown, ColorPaletteDropdownProps } from './ColorPaletteDropdown';
import type { StoryObj, Meta } from '@storybook/react-webpack5';
import { MOCK_PALETTE } from '../../../mocks/common-defaults';
import { action } from 'storybook/actions';

type Story = StoryObj<ColorPaletteDropdownProps>;

const meta: Meta<ColorPaletteDropdownProps> = {
	title: 'Internals/ColorPaletteDropdown',
	component: ColorPaletteDropdown,
	decorators: [],
	args: {
		label: 'Colour',
		value: MOCK_PALETTE.find(c => c.slug === 'primary')?.slug || '',
		palette: MOCK_PALETTE,
		onChange: (value) => action('onChange')(value),
	},
	argTypes: {
		label: {
			type: 'string',
			description: 'The label for the dropdown trigger button',
		},
		value: {
			type: 'string',
			description: 'The currently selected colour value in hexadecimal format; should match a valid ThemeColor',
		},
		palette: {
			description: 'An array of colour objects available for selection, each with a slug, name, and color value that align to a valid ThemeColor',
		},
		onChange: {
			type: 'function',
			description: 'Callback function for when a colour is selected',
		}
	},
	render: function Wrapper(args) {
		// Somewhat mock the block attribute context so the component doesn't need an extra layer of state management
		// of the current value just so it will update in Storybook on change
		const [value, setValue] = useState(args.value);

		return (
			<ColorPaletteDropdown
				{...args}
				value={value}
				onChange={(newValue) => {
					setValue(newValue);
					args.onChange(newValue);
				}} />
		);
	}
};
export default meta;

export const Basic: Story = {
	name: 'ColorPaletteDropdown'
};