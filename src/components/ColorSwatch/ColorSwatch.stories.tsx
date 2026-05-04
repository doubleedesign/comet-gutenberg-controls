import React from 'react';
import { ColorSwatch, ColorSwatchProps } from './ColorSwatch';
import type { StoryObj, Meta } from '@storybook/react-webpack5';
import { ComponentType } from '@wordpress/element';
import { COLOR_CONTROL_ARGTYPES } from '../../mocks/common-story-args';

type Story = StoryObj<ColorSwatchProps>;

const meta: Meta<ColorSwatchProps> = {
	title: 'Internals/ColorSwatch',
	component: ColorSwatch as ComponentType<ColorSwatchProps>,
	args: {
		colorTheme: 'primary',
		backgroundColor: 'light'
	},
	argTypes: {
		colorTheme: {
			...COLOR_CONTROL_ARGTYPES['colorTheme'],
			// @ts-ignore
			options: [undefined, ...COLOR_CONTROL_ARGTYPES?.colorTheme?.options]
		},
		backgroundColor: COLOR_CONTROL_ARGTYPES['backgroundColor'],
	},
};
export default meta;

export const Basic: Story = { name: 'ColorSwatch' };