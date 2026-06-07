import { MOCK_GRADIENTS, MOCK_PALETTE } from './common-defaults';
import { ArgTypes } from 'storybook/internal/csf';
import { ASPECT_RATIOS, CONTAINER_SIZES } from '../components/constants';

export const COMMON_STORY_ARGS = { name: 'comet/demo-block' };

/**
 * Storybook argTypes mapping to the EditorControlProps type,
 * except for attributes which are handled on a per-component basis
 */
export const EDITOR_CONTROL_PROPS_ARGTYPES: Partial<ArgTypes> = {
	name: {
		description: 'The block name as per the WordPress block.json definition',
		control: { disable: true },
		table: {
			category: 'Default block props',
			type: { summary: 'string' },
			defaultValue: { summary: 'comet/demo-block' },
		},
	},
	setAttributes: {
		description: 'The function to update block attributes that is provided by the WordPress block editor',
		control: { disable: true },
		table: {
			category: 'Default block props',
			type: { summary: 'function' },
		},
	},
	context: { control: { disable: true } }
};


export const COLOR_CONTROL_ARGTYPES: Partial<ArgTypes> = {
	colorTheme: {
		description: 'The colour theme to apply to the content, should match a valid ThemeColor',
		control: { type: 'select' },
		options: MOCK_PALETTE.map(item => item.slug),
		table: { category: 'Context', type: { summary: 'ThemeColor' }, },
	}, 
	backgroundColor: {
		description: 'The background colour to apply, should match a valid ThemeColor',
		control: { type: 'select' },
		options: [undefined, ...MOCK_PALETTE.map(item => item.slug)],
		table: { category: 'Context', type: { summary: 'ThemeColor' }, },
	},
	sectionBackground: {
		description: 'The section background colour to apply, should match a valid ThemeColor or ThemeGradient',
		control: { type: 'select' },
		options: [undefined, ...[...MOCK_GRADIENTS, ...MOCK_PALETTE].map(item => item.slug)],
		table: { category: 'Context', type: { summary: 'ThemeColor | ThemeGradient' }, },
	},
};

export const COLOUR_CONTROL_INNER_COMMON_ARGTYPES: Partial<ArgTypes> = {
	label: {
		type: 'string',
		description: 'The label for the dropdown trigger button',
		control: { type: 'text' },
		table: { type: { summary: 'string' }, },
	},
	value: {
		description: 'The colour theme or gradient selected',
		control: { type: 'select' },
		options: MOCK_PALETTE.map(item => item.slug),
		table: { category: 'Context', type: { summary: 'ThemeColor | ThemeGradient | undefined' }, },
	},
	palette: {
		description: 'An array of colour and/or gradient objects available for selection',
		control: { disable: true },
		table: { type: { summary: 'ColourPaletteItem[]' } },
	},
	clearable: {
		type: 'boolean',
		table: { type: { summary: 'boolean' } }
	}
};

export const CONTAINER_SIZE_CONTROL_ARTYPES: Partial<ArgTypes> = {
	size: {
		description: 'The container size to apply to the content',
		control: { type: 'select' },
		options: Object.values(CONTAINER_SIZES).map(item => item.value),
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'contained' },
		}
	},
};

export const ALIGNMENT_CONTROL_ARTYPES: Partial<ArgTypes> = {
	hAlign: {
		description: 'The horizontal alignment to apply to the content if it does not fill the full width of the container',
		control: { type: 'select' },
		options: ['start', 'center', 'end'],
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'start' },
		}
	},
	vAlign: {
		description: 'The vertical alignment to apply to the content if it does not fill the full height of its container, if applicable',
		control: { type: 'select' },
		options: ['start', 'center', 'end'],
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'start' },
		}
	},
};