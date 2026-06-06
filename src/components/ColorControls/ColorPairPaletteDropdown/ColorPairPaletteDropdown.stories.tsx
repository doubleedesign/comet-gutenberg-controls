import { ComponentType, useState } from '@wordpress/element';
import { ColorPairPaletteDropdown, type ColorPairPaletteDropdownProps } from './ColorPairPaletteDropdown';
import type { StoryObj, Meta } from '@storybook/react-webpack5';
import { COLOUR_CONTROL_INNER_COMMON_ARGTYPES } from '../../../mocks/common-story-args';
import { ColorPair } from '../../../types';
import { omit } from 'lodash';
import { withCometConfig } from '../../../mocks/with-comet-config';
import { transformColorPairsToPalette } from '../../../utils';
import { action } from 'storybook/actions';

type StoryArgs = ColorPairPaletteDropdownProps & { value: ColorPair };
type Story = StoryObj<StoryArgs>;

const meta: Meta<StoryArgs> = {
	title: 'Internals/ColorPairPaletteDropdown',
	component: ColorPairPaletteDropdown as ComponentType<StoryArgs>,
	decorators: [withCometConfig],
	args: {
		value: { foreground: 'white', background: 'primary' } as ColorPair,
		palette: []
	},
	argTypes: {
		...(omit(COLOUR_CONTROL_INNER_COMMON_ARGTYPES, ['value'])),
		value: {
			description: 'The currently selected colour pair of ThemeColors',
			control: { type: 'object' },
			table: { category: 'Context', type: { summary: 'ColorPair' }, },
		}
	},
	render: function Wrapper(args) {
		const [value, setValue] = useState<ColorPair>(args.value);
		const palette = transformColorPairsToPalette(comet?.colourPairs ?? []);

		const onChange = (newValue: ColorPair) => {
			setValue(newValue);
			action('onChange')(newValue);
		};

		return <ColorPairPaletteDropdown {...args} value={value} onChange={onChange} palette={palette} />;
	}
};
export default meta;

export const Basic: Story = {
	name: 'ColorPairPaletteDropdown'
};