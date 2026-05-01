import React from "react";
import { useState, useCallback } from '@wordpress/element';
import { action } from "storybook/actions";

/**
 * Decorator that provides handling of the things that the block editor passes into a block control,
 * - mock of the setAttributes function so we can see the behaviour we would generally expect to see at the control level,
 * 	 plus logging it in the Actions tab for demonstration and debugging.
 * - the ability to use the Storybook args as block attributes directly
 * 	 instead of needing an args: { attributes: {} } structure that would suck for the controls.
 *
 * @param Story
 * @param context
 */
export const withMockBlockContext = (Story, context) => {
    const { name, ...blockAttrs } = context.args || {};
    const [attributes, setAttributes] = useState(blockAttrs);

    const mockSetAttributes = useCallback((newValues: any) => {
        action('setAttributes')(newValues);
        setAttributes((prevAttributes: any) => ({ ...prevAttributes, ...newValues }));
    }, [setAttributes]);

	return (
		<Story args={{
			name: name,
			attributes: attributes,
			setAttributes: mockSetAttributes,
		}} />
	);
};