import { ColorControls, ColorControlsProps } from './ColorControls';
import { COLOR_CONTROL_ARGTYPES, COMMON_STORY_ARGS, EDITOR_CONTROL_PROPS_ARGTYPES } from '../../mocks/common-story-args';
import { withMockBlockContext } from '../../mocks/with-mock-block-context';
import type { StoryObj, Meta } from '@storybook/react-webpack5';
import { ComponentType } from '@wordpress/element';

// This type allows us to treat the story "args" as the component's "attributes" prop
type StoryArgs = Omit<ColorControlsProps, 'attributes'> & ColorControlsProps['attributes'];
type Story = StoryObj<StoryArgs>;

const meta: Meta<StoryArgs> = {
	title: 'Control Groups/ColorControls',
	component: ColorControls as ComponentType<StoryArgs>,
	decorators: [withMockBlockContext],
	args: {
		...COMMON_STORY_ARGS,
		colorTheme: 'white',
		backgroundColor: 'primary',
		sectionBackground: 'light-dark'
	},
	argTypes: {
		...COLOR_CONTROL_ARGTYPES,
		...EDITOR_CONTROL_PROPS_ARGTYPES,
	},
	parameters: {
		controls: {
			exclude: ['attributes', ...Object.keys(COLOR_CONTROL_ARGTYPES)]
		}
	}
};
export default meta;

export const Basic: Story = {
	name: 'ColorControls'
};