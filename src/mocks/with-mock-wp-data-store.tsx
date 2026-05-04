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
							colors: []
						})
					}
				}
			}
		},
	};

	// @ts-expect-error TS2874: This JSX tag requires wp to be in scope, but it could not be found.
	return <Story />;
}