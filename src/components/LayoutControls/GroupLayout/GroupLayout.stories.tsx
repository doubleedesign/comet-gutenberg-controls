import React from 'react';
import { GroupLayout, GroupLayoutProps } from './GroupLayout';
import { EDITOR_CONTROL_PROPS_ARGTYPES } from '../../../mocks/common-story-args';
import { withMockBlockContext } from '../../../mocks/with-mock-block-context';
import type { StoryObj, Meta } from '@storybook/react';
import { ComponentType } from '@wordpress/element';

// This type allows us to treat the story "args" as the component's "attributes" prop
type StoryArgs = Omit<GroupLayoutProps, 'attributes'> & GroupLayoutProps['attributes'];
type Story = StoryObj<StoryArgs>;

const meta: Meta<StoryArgs> = {
	title: 'Controls/GroupLayout',
	component: GroupLayout as unknown as ComponentType<StoryArgs>,
	decorators: [withMockBlockContext],
	args: {
		layout: 'list'
	},
	argTypes: {
		...EDITOR_CONTROL_PROPS_ARGTYPES,
		layout: {
			description: 'The layout to use for the group; some block types may have additional layouts available',
			control: { type: 'select' },
			options: ['list', 'grid'],
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'list' },
			},
		}
	},
};
export default meta;

export const Basic: Story = {
	name: 'GroupLayout'
};
