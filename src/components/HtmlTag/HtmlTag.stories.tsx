import { HtmlTag, HtmlTagProps } from './HtmlTag';
import { EDITOR_CONTROL_PROPS_ARGTYPES } from '../../mocks/common-story-args';
import { withMockBlockContext } from '../../mocks/with-mock-block-context';
import type { StoryObj, Meta } from '@storybook/react-webpack5';
import { ComponentType } from '@wordpress/element';

// This type allows us to treat the story "args" as the component's "attributes" prop
type StoryArgs = Omit<HtmlTagProps, 'attributes'> & HtmlTagProps['attributes'];
type Story = StoryObj<StoryArgs>;

const meta: Meta<StoryArgs> = {
	title: 'Controls/HtmlTag',
	component: HtmlTag as ComponentType<StoryArgs>,
	decorators: [withMockBlockContext],
	args: {
		tagName: 'div'
	},
	argTypes: {
		...EDITOR_CONTROL_PROPS_ARGTYPES,
		tagName: {
			description: 'The HTML tag to use for the block; some block types may have additional tags available',
			control: { type: 'select' },
			options: ['div', 'section'],
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'div' },
			},
		}
	},
};
export default meta;

export const Basic: Story = {
	name: 'HtmlTag'
};