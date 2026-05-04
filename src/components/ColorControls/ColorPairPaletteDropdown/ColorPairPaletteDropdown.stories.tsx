import { ColorPairPaletteDropdown, ColorPairPaletteDropdownProps } from './ColorPairPaletteDropdown';
import type { StoryObj, Meta } from '@storybook/react-webpack5';
import { action } from 'storybook/actions';

type Story = StoryObj<ColorPairPaletteDropdownProps>;

const meta: Meta<ColorPairPaletteDropdownProps> = {
	title: 'Internals/ColorPairPaletteDropdown',
	component: ColorPairPaletteDropdown,
	decorators: [],
	args: {
		blockName: 'comet/demo-block',
		label: 'Theme',
		value: {
			foreground: 'primary',
			background: 'secondary',
		},
		onChange: (value) => action('onChange')(value),
	},
	argTypes: {
		blockName: {
			type: 'string',
			description: 'The name of the WordPress block this control is used in, used to determine which pairs are available based on the global config',
		},
		label: {
			type: 'string',
			description: 'The label for the dropdown trigger button',
		},
		value: {
			description: 'The currently selected foreground and background colour values; should match valid ThemeColors',
			table: {
				type: {
					summary: 'ColorPair'
				}
			}
		},
		onChange: {
			type: 'function',
			description: 'Callback function for when a colour pair is selected, receives an object with foreground and background properties',
		}
	},
};
export default meta;

export const Basic: Story = {
	name: 'ColorPairPaletteDropdown'
};