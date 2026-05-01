import React from 'react';
import { HtmlTag } from './HtmlTag';
import { COMMON_STORY_ARGTYPES } from '../../mocks/common-story-args';
import { withMockBlockContext } from '../../mocks/with-mock-block-context';

export default {
	title: 'Controls/HtmlTag',
	component: HtmlTag,
	decorators: [withMockBlockContext],
	args: {
		tagName: 'div'
	},
	argTypes: {
		...COMMON_STORY_ARGTYPES,
		tagName: {
			description: 'The HTML tag to use for the block',
			control: { type: 'select' },
			options: ['div', 'section', 'figure'],
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: 'div' },
			},
		}
	},
}; 

export const Basic = {
	name: 'HtmlTag'
};
