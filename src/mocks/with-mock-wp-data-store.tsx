export const withMockWpDataStore = (Story, context) => {
	window.wp = {
		data: {
			select: (store) => {
				if (store === 'core/blocks') {
					return {
						// This gets the block definition including what's in block.json
						// TODO: Could be good to load the actual Comet Components block.jsons and test controls for some specific blocks
						getBlockType: (blockName) => ({}),
					}
				}
				if (store === 'core/block-editor') {
					return {
						getBlockCount: (clientId: string) => context?.args?.blockCount ?? 0
					}
				}
			}
		},
	};

	return <Story />;
}