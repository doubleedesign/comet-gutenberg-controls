export const withMockWpDataStore = (Story, context) => {
	window.wp = {
		data: {
			select: (store) => {
				if (store === 'core/blocks') {
					return {
						getBlockType: () => ({
							// This would get the attributes object from block.json
							attributes: {}
						}),
					}
				}
				if (store === 'core/block-editor') {
					return {
						getSettings: () => ({
							colors: []
						})
					}
				}
			}
		},
	};

	return <Story />;
}