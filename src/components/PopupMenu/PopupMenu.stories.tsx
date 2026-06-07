import { PopupMenu, PopupMenuProps } from './PopupMenu';
import type { StoryObj, Meta } from '@storybook/react-webpack5';
import { ComponentType } from '@wordpress/element';
import { action } from 'storybook/actions';

type StoryArgs = PopupMenuProps;
type Story = StoryObj<StoryArgs>;

const meta: Meta<StoryArgs> = {
	title: 'Internals/PopupMenu',
	component: PopupMenu as ComponentType<StoryArgs>,
	decorators: [],
	args: {
		testId: 'demo-popup-menu',
		className: 'demo-popup-menu',
		onToggle: (args) => action('onToggle')({
			...args, storybook: { caller: 'PopupMenu' }
		}),
		onClose: () => action('onClose')({ storybook: { caller: 'PopupMenu' } }),
	},
	argTypes: {
		testId: {
			description: 'A unique identifier for the popup menu, used for testing purposes',
			type: { name: 'string' },
		},
		className: {
			description: 'Additional CSS class name(s) to apply to the popup menu, to identify the specific instance for styling purposes',
			type: { name: 'string' },
			defaultValue: '',
		}
	},
	render: function Wrapper(args) {

		return (
			<PopupMenu {...args}>
				<PopupMenu.Trigger>
					<>Open Popup</>
				</PopupMenu.Trigger>
				<PopupMenu.Content>
					{(renderProps) => {
						return (
							<>
								<p>Some content inside a popup</p>
								<button onClick={() => {
									action('onToggle')({ storybook: { caller: 'PopupMenu.Content' } });
									renderProps?.onToggle();
								}}>
									Call onToggle
								</button>
								<button onClick={() => {
									action('onClose')({ storybook: { caller: 'PopupMenu.Content' } });
									renderProps?.onClose();
								}}>
									Call onClose
								</button>
							</>
						);
					}}
				</PopupMenu.Content>
			</PopupMenu>
		);
	}
};
export default meta;

export const Basic: Story = { name: 'PopupMenu' };