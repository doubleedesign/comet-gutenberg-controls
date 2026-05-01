
export const COMMON_STORY_ARGS = {
	name: 'comet/demo-block',
}

export const COMMON_STORY_ARGTYPES = {
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
