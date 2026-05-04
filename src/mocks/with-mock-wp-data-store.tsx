import React from 'react';

export const withMockWpDataStore = (Story, context) => {
	// @ts-expect-error TS2339: Property wp does not exist on type Window & typeof globalThi
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
							// This would get the colors from theme.json
							colors: []
						})
					}
				}
			}
		},
	};

	return <Story />;
}