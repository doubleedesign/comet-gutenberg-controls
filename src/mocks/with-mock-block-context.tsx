import React from "react";
import { useState, useCallback } from '@wordpress/element';
import { action } from "storybook/actions";

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
			...context.args,
		}} />
    );
};