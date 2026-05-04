import { LayoutControls, LayoutControlsProps } from './LayoutControls';
import { EDITOR_CONTROL_PROPS_ARGTYPES } from '../../mocks/common-story-args';
import { withMockBlockContext } from '../../mocks/with-mock-block-context';
import type { StoryObj, Meta } from '@storybook/react-webpack5';
import { ComponentType } from '@wordpress/element';

// This type allows us to treat the story "args" as the component's "attributes" prop
type StoryArgs = Omit<LayoutControlsProps, 'attributes'> & LayoutControlsProps['attributes'];
type Story = StoryObj<StoryArgs>;

const meta: Meta<StoryArgs> = {
	title: 'Control Groups/LayoutControls',
	component: LayoutControls as ComponentType<StoryArgs>,
	decorators: [withMockBlockContext], 
	args: {
		size: 'contained',
		groupLayout: 'list',
		orientation: 'vertical',
		hAlign: 'start',
		vAlign: 'start',
		aspectRatio: '1:1'
	},
	argTypes: {
		...EDITOR_CONTROL_PROPS_ARGTYPES,
		// component attribute details here
	},
};
export default meta;

export const Basic: Story = {
	name: 'LayoutControls'
};