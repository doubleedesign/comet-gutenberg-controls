import { ComponentType, useState } from '@wordpress/element';
import { ColorPaletteDropdown, ColorPaletteDropdownProps } from './ColorPaletteDropdown';
import type { StoryObj, Meta } from '@storybook/react-webpack5';
import { MOCK_PALETTE, MOCK_GRADIENTS } from '../../../mocks/common-defaults';
import { COLOUR_CONTROL_INNER_COMMON_ARGTYPES } from '../../../mocks/common-story-args';
import { transformColorValueToKey } from '../../../utils';
import { action } from 'storybook/actions';

type StoryArgs = ColorPaletteDropdownProps;
type Story = StoryObj<StoryArgs>;

const meta: Meta<StoryArgs> = {
	title: 'Internals/ColorPaletteDropdown',
	component: ColorPaletteDropdown as ComponentType<StoryArgs>,
	decorators: [],
	args: {
		label: 'Colour',
		palette: MOCK_PALETTE,
		clearable: false,
	},
	argTypes: {
		...COLOUR_CONTROL_INNER_COMMON_ARGTYPES
	},
	parameters: {
		controls: {
			exclude: ['colorContextKey']
		}
	},
	render: function Wrapper(args) {
		const [value, setValue] = useState<string|undefined>('primary');
		const onChange = (newValue?: string) => {
			setValue(transformColorValueToKey(newValue));
			action('onChange')(newValue);
		};

		return <ColorPaletteDropdown {...args} value={value} onChange={onChange}/>;
	}
};
export default meta;

export const Basic: Story = {
	name: 'Basic'
};

export const Gradients: Story = {
	name: 'Gradients',
	args: {
		palette: MOCK_GRADIENTS,
	}
};

export const Both: Story = {
	name: 'Both',
	args: {
		palette: [...MOCK_PALETTE, ...MOCK_GRADIENTS],
	}
};