import React from 'react';
import { AspectRatio, AspectRatioProps } from './AspectRatio';
import { EDITOR_CONTROL_PROPS_ARGTYPES } from '../../../mocks/common-story-args';
import { withMockBlockContext } from '../../../mocks/with-mock-block-context';
import type { StoryObj, Meta } from '@storybook/react-webpack5';
import { ComponentType } from '@wordpress/element';

// This type allows us to treat the story "args" as the component's "attributes" prop
type StoryArgs = Omit<AspectRatioProps, 'attributes'> & AspectRatioProps['attributes'];
type Story = StoryObj<StoryArgs>;

const meta: Meta<StoryArgs> = {
	title: 'Controls/AspectRatio',
	component: AspectRatio as ComponentType<StoryArgs>,
	decorators: [withMockBlockContext],
	args: {
		aspectRatio: {
			name: 'STANDARD',
			value: '4:3'
		}
	},
	argTypes: {
		...EDITOR_CONTROL_PROPS_ARGTYPES,
		aspectRatio: {
			description: 'Key-value pairs representing the available aspect ratios, provided by the global `comet` configuration object.',
			control: { disable: true }
		}
	},
};
export default meta;

export const Basic: Story = {
	name: 'AspectRatio'
};