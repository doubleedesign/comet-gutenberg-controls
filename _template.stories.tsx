import React from 'react';
import { ComponentName, ComponentNameProps } from './ComponentName';
import { EDITOR_CONTROL_PROPS_ARGTYPES } from '../../mocks/common-story-args';
import { withMockBlockContext } from '../../mocks/with-mock-block-context';
import type { StoryObj, Meta } from '@storybook/react';
import { ComponentType } from '@wordpress/element';

// This type allows us to treat the story "args" as the component's "attributes" prop
type StoryArgs = Omit<ComponentNameProps, 'attributes'> & ComponentNameProps['attributes'];
type Story = StoryObj<StoryArgs>;

const meta: Meta<StoryArgs> = {
	title: 'Controls/ComponentName',
	component: ComponentName as ComponentType<StoryArgs>,
	decorators: [withMockBlockContext],
	args: {
		// component attributes here
	},
	argTypes: {
		...EDITOR_CONTROL_PROPS_ARGTYPES,
		// component attribute details here
	},
};
export default meta;

export const Basic: Story = {
	name: 'ComponentName'
};