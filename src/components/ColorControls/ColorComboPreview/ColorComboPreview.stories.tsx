import { ColorComboPreview, ColorComboPreviewProps } from './ColorComboPreview';
import { COLOR_CONTROL_ARGTYPES } from '../../../mocks/common-story-args';
import type { StoryObj, Meta } from '@storybook/react-webpack5';

type Story = StoryObj<ColorComboPreviewProps>;

const meta: Meta<ColorComboPreviewProps> = {
	title: 'Internals/ColorComboPreview',
	component: ColorComboPreview,
	args: {
		colorTheme: 'light',
		backgroundColor: 'primary',
		sectionBackground: 'white-secondary'
	},
	argTypes: COLOR_CONTROL_ARGTYPES
};
export default meta;

export const Basic: Story = { name: 'ColorComboPreview' };