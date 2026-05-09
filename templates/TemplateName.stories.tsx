import { TemplateName, TemplateNameProps } from './TemplateName';
import { COMMON_STORY_ARGS, EDITOR_CONTROL_PROPS_ARGTYPES } from '../../mocks/common-story-args';
import { withMockBlockContext } from '../../mocks/with-mock-block-context';
import type { StoryObj, Meta } from '@storybook/react-webpack5';
import { ComponentType } from '@wordpress/element';

// This type allows us to treat the story "args" as the component's "attributes" prop
type StoryArgs = Omit<TemplateNameProps, 'attributes'> & TemplateNameProps['attributes'];
type Story = StoryObj<StoryArgs>;

const meta: Meta<StoryArgs> = {
	title: 'Controls/TemplateName',
	component: TemplateName as ComponentType<StoryArgs>,
	decorators: [withMockBlockContext],
	args: {
		...COMMON_STORY_ARGS,
		// component attributes here
	},
	argTypes: {
		...EDITOR_CONTROL_PROPS_ARGTYPES,
		// component attribute details here
	},
};
export default meta;

export const Basic: Story = { name: 'TemplateName' };