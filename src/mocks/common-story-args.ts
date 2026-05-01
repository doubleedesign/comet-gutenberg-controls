
export const COMMON_STORY_ARGS = {
	name: 'comet/demo-block',
}

/**
 * Storybook argTypes mapping to the EditorControlProps type,
 * except for attributes which are handled on a per-component basis
 */
export const EDITOR_CONTROL_PROPS_ARGTYPES = {
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
