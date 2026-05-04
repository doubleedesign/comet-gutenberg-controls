import { BannerControls, BannerControlsProps } from './BannerControls';
import { withMockBlockContext } from '../../mocks/with-mock-block-context';
import type { StoryObj, Meta } from '@storybook/react-webpack5';
import { ComponentType } from '@wordpress/element';

// This type allows us to treat the story "args" as the component's "attributes" prop
type StoryArgs = Omit<BannerControlsProps, 'attributes'> & BannerControlsProps['attributes'];
type Story = StoryObj<StoryArgs>;

const meta: Meta<StoryArgs> = {
	title: 'Block-Specific Control Groups/BannerControls',
	component: BannerControls as ComponentType<StoryArgs>,
	decorators: [withMockBlockContext],
	args: {
		name: 'comet/banner',
		backgroundType: 'overlay',
		backgroundOpacity: 50,
	},
	argTypes: {
		name: {
			description: 'The block name as per the WordPress block.json definition',
			control: { type: 'select' },
			options: ['comet/banner', 'comet-demo-block'],
			table: {
				category: 'Default block props',
				type: { summary: 'string' },
				defaultValue: { summary: 'comet/banner' },
			},
		},
		backgroundType: {
			control: {
				type: 'select',
			},
			options: [undefined, 'content', 'overlay']
		},
		backgroundOpacity: {
			control: {
				type: 'range',
				min: 0,
				max: 100,
				step: 10,
			},
		},
	},
};
export default meta;

export const Basic: Story = { name: 'BannerControls' };