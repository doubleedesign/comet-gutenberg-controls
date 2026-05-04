import {MOCK_PALETTE} from "./common-defaults";
import {ArgTypes} from "storybook/internal/csf";

export const COMMON_STORY_ARGS = {
	name: 'comet/demo-block',
}

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
    }
}


export const COLOR_CONTROL_ARGTYPES: Partial<ArgTypes> = {
	colorTheme: {
		description: 'The colour theme to apply to the content, should match a valid ThemeColor',
		control: { type: 'select' },
		options: MOCK_PALETTE.map(item => item.slug),
		table: {
			type: { summary: 'ThemeColor' },
		},
	},
	backgroundColor: {
		description: 'The background colour to apply, should match a valid ThemeColor',
		control: { type: 'select' },
		options: [undefined, ...MOCK_PALETTE.map(item => item.slug)],
		table: {
			type: { summary: 'ThemeColor' },
		},
	},
	sectionBackground: {
		description: 'The section background colour to apply, should match a valid ThemeColor or ThemeGradient',
		control: { type: 'select' },
		options: [undefined, ...MOCK_PALETTE.map(item => item.slug)],
		table: {
			type: { summary: 'ThemeColor | ThemeGradient' },
		},
	},
}