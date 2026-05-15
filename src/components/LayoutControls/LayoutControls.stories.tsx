import { LayoutControls, LayoutControlsProps } from './LayoutControls';
import {
	ALIGNMENT_CONTROL_ARTYPES,
	CONTAINER_SIZE_CONTROL_ARTYPES,
	EDITOR_CONTROL_PROPS_ARGTYPES
} from '../../mocks/common-story-args';
import { withMockBlockContext } from '../../mocks/with-mock-block-context';
import type { StoryObj, Meta } from '@storybook/react-webpack5';
import { ComponentType } from '@wordpress/element';
import { ASPECT_RATIOS, CONTAINER_SIZES } from '../constants';

// This type allows us to treat the story "args" as the component's "attributes" prop
type StoryArgs = Omit<LayoutControlsProps, 'attributes'> & LayoutControlsProps['attributes'];
type Story = StoryObj<StoryArgs>;

const meta: Meta<StoryArgs> = {
	title: 'Control Groups/LayoutControls',
	component: LayoutControls as ComponentType<StoryArgs>,
	decorators: [withMockBlockContext], 
	args: {
		size: 'contained',
		aspectRatio: '1:1',
		layout: 'grid',
		itemCount: 3,
		maxPerRow: 3,
		orientation: undefined,
		hAlign: 'start',
		vAlign: 'start',
		order: 'row',
	},
	argTypes: {
		...EDITOR_CONTROL_PROPS_ARGTYPES,
		...CONTAINER_SIZE_CONTROL_ARTYPES,
		aspectRatio: {
			description: 'The aspect ratio to apply to images, where applicable',
			control: { type: 'select' },
			options: Object.values(ASPECT_RATIOS).map(item => item.value),
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: '1:1' },
			}
		},
		// FIXME: When this control is set to undefined, the orientation should appear if it is not undefined (currently it only does if you force reload the story)
		layout: {
			description: 'The group layout to apply to the content, if applicable',
			control: { type: 'select' },
			options: [undefined, 'list', 'grid'],
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'list' },
			}
		},
		itemCount: {
			description: 'The number of items to display for blocks that show groups of items',
			control: { type: 'number' },
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '3' },
			}
		},
		maxPerRow: {
			description: 'The number of items to display per row for blocks that show groups of items in a grid layout',
			control: { type: 'number', min: 1, max: 6 },
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '3' },
			}
		},
		orientation: {
			description: 'The layout orientation to apply to the content, if applicable',
			control: { type: 'select' },
			options: [undefined, 'vertical', 'horizontal'],
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'vertical' },
			}
		},
		...ALIGNMENT_CONTROL_ARTYPES,
		order: {
			description: 'The order to apply to the content, if applicable; intended for blocks that have 2-column content layouts to faciliate easy swapping',
			control: { type: 'select' },
			options: ['row', 'row-reverse'],
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'row' },
			}
		}
	},
};
export default meta;

export const Basic: Story = {
	name: 'LayoutControls'
};