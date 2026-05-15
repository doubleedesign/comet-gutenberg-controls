import { ColorControls, ColorControlsProps } from './ColorControls';
import { COLOR_CONTROL_ARGTYPES, COMMON_STORY_ARGS, EDITOR_CONTROL_PROPS_ARGTYPES } from '../../mocks/common-story-args';
import { withMockBlockContext } from '../../mocks/with-mock-block-context';
import type { StoryObj, Meta } from '@storybook/react-webpack5';
import { ComponentType } from '@wordpress/element';

// This type allows us to treat the story "args" as the component's "attributes" prop
type StoryArgs = Omit<ColorControlsProps, 'attributes' | 'context'> & ColorControlsProps['attributes'];
type Story = StoryObj<StoryArgs>;

const meta: Meta<StoryArgs> = {
	title: 'Control Groups/ColorControls',
	component: ColorControls as ComponentType<StoryArgs>,
	decorators: [withMockBlockContext],
	args: {
		...COMMON_STORY_ARGS,
		colorTheme: 'white',
		backgroundColor: 'primary',
		context: {
			isNested: false
		}
	},
	argTypes: {
		...COLOR_CONTROL_ARGTYPES,
		...EDITOR_CONTROL_PROPS_ARGTYPES,
	},
	parameters: {
		controls: {
			exclude: ['attributes', 'context', ...Object.keys(COLOR_CONTROL_ARGTYPES)]
		}
	}
};
export default meta;

export const All: Story = {
	name: 'All colour attributes',
	args: {
		...meta.args,
		sectionBackground: 'light-dark',
	}
};

export const ColorThemeOnly: Story = {
	name: 'Color theme only',
	args: {
		colorTheme: 'primary',
		backgroundColor: undefined,
	}
};

export const SingleBackgroundOnly: Story = {
	name: 'Single background only',
	args: {
		colorTheme: undefined,
		backgroundColor: 'primary',
	}
};

export const ColorThemeAndSingleBackground: Story = {
	name: 'Color theme + single background',
	args: {
		colorTheme: 'primary',
		backgroundColor: 'white',
	},
};