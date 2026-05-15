import { ColumnLayoutControls, ColumnLayoutControlsProps } from './ColumnLayoutControls';
import {
	ALIGNMENT_CONTROL_ARTYPES,
	COMMON_STORY_ARGS, CONTAINER_SIZE_CONTROL_ARTYPES,
	EDITOR_CONTROL_PROPS_ARGTYPES
} from '../../mocks/common-story-args';
import { withMockBlockContext } from '../../mocks/with-mock-block-context';
import type { StoryObj, Meta } from '@storybook/react-webpack5';
import { ComponentType } from '@wordpress/element';
import { CONTAINER_SIZES } from '../constants';

// This type allows us to treat the story "args" as the component's "attributes" prop
type StoryArgs = Omit<ColumnLayoutControlsProps, 'attributes'> & ColumnLayoutControlsProps['attributes'];
type Story = StoryObj<StoryArgs>;

const meta: Meta<StoryArgs> = {
	title: 'Block-Specific Control Groups/ColumnLayoutControls',
	component: ColumnLayoutControls as ComponentType<StoryArgs>,
	decorators: [withMockBlockContext],
	args: {
		...COMMON_STORY_ARGS,
		name: 'comet/columns',
		size: 'contained',
		hAlign: 'center',
		vAlign: 'start',
		columnLayout: 'even',
		blockCount: 2
	},
	argTypes: {
		...EDITOR_CONTROL_PROPS_ARGTYPES,
		...CONTAINER_SIZE_CONTROL_ARTYPES,
		...ALIGNMENT_CONTROL_ARTYPES,
		blockCount: {
			name: 'Block count',
			description: 'Mock block editor data of how many innerBlocks the block currently has',
			type: { name: 'number', required: false },
			defaultValue: 2,
			control: {
				type: 'number',
				min: 0,
				step: 1,
				max: 4
			},
			table: {
				category: 'Block editor context',
			}
		},
		clientId: {
			control: { disable: true }
		}
	},
	parameters: {
		controls: {
			exclude: ['context', 'attributes']
		}
	},
};
export default meta;

export const Basic: Story = { name: 'ColumnLayoutControls' };