import { FieldTooltip } from './FieldTooltip';

export default {
	title: 'Internals/FieldTooltip',
	component: FieldTooltip,
	args: {
		tooltip: 'The quick brown fox jumps over the lazy dog'
	},
	argTypes: {
		tooltip: {
			description: 'The text to show within the tooltip',
			control: { type: 'text' },
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: '' },
			},
		}
	},
};

export const Basic = {
	name: 'FieldTooltip'
};
