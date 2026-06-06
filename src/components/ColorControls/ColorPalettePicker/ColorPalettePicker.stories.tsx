import { useState } from '@wordpress/element';
import { ColorPalettePicker, ColorPalettePickerProps } from './ColorPalettePicker';
import type { StoryObj, Meta } from '@storybook/react-webpack5';
import { MOCK_GRADIENTS, MOCK_PALETTE } from '../../../mocks/common-defaults';
import { COLOUR_CONTROL_INNER_COMMON_ARGTYPES } from '../../../mocks/common-story-args';
import { withColourContextProvider } from '../../../mocks/with-colour-context-provider';
import { ColorState } from '../../../types';
import { transformColorValueToKey } from '../../../utils';
import { action } from 'storybook/actions';

type StoryArgs = ColorPalettePickerProps & { value: string; colorContextKey: keyof ColorState };
type Story = StoryObj<StoryArgs>;

const meta: Meta<StoryArgs> = {
	title: 'Internals/ColorPalettePicker',
	component: ColorPalettePicker,
	decorators: [withColourContextProvider],
	args: {
		value: 'primary',
		colors: MOCK_PALETTE,
		clearable: true,
	},
	argTypes: {
		...COLOUR_CONTROL_INNER_COMMON_ARGTYPES,
		colors: { control: { disable: true } },
		gradients: { control: { disable: true } },
	},
	render: function Wrapper(args) {
		const [value, setValue] = useState(args.value);
		const onChange = (newValue?: string) => {
			setValue(transformColorValueToKey(newValue));
			action('onChange')(newValue);
		};

		return <ColorPalettePicker {...args} value={value} onChange={onChange}/>;
	}
};
export default meta;


export const Basic: Story = {
	name: 'Basic',
};

export const Gradients: Story = {
	name: 'Gradients',
	args: {
		colors: undefined,
		gradients: MOCK_GRADIENTS,
		value: 'primary-white'
	},
};
export const Both: Story = {
	name: 'Both',
	args: {
		colors: MOCK_PALETTE,
		gradients: MOCK_GRADIENTS,
	},
};
