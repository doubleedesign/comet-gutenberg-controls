import { GalleryControls, GalleryControlsProps } from './GalleryControls';
import { withMockBlockContext } from '../../mocks/with-mock-block-context';
import type { StoryObj, Meta } from '@storybook/react-webpack5';
import { ComponentType } from '@wordpress/element';

// This type allows us to treat the story "args" as the component's "attributes" prop
type StoryArgs = Omit<GalleryControlsProps, 'attributes'> & GalleryControlsProps['attributes'];
type Story = StoryObj<StoryArgs>;

const meta: Meta<StoryArgs> = {
	title: 'Block-Specific Control Groups/GalleryControls',
	component: GalleryControls as unknown as ComponentType<StoryArgs>,
	decorators: [withMockBlockContext],
	args: {
		name: 'comet/gallery',
		lightbox: false,
		captions: false,
	},
	argTypes: {
		name: {
			description: 'The block name as per the WordPress block.json definition',
			control: { type: 'select' },
			options: ['comet/gallery', 'comet-demo-block'],
			table: {
				category: 'Default block props',
				type: { summary: 'string' },
				defaultValue: { summary: 'comet/gallery' },
			},
		},
	},
};
export default meta;

export const Basic: Story = { name: 'GalleryControls' };