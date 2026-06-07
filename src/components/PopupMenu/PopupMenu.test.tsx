import { render, screen, waitFor } from '@testing-library/react';
import { PopupMenu } from './PopupMenu';
import { act } from 'react';

const mockOnToggle = vi.fn();
const mockOnClose = vi.fn();
const defaultProps = {
	onToggle: mockOnToggle,
	onClose: mockOnClose
};

describe('PopupMenu', () => {
	beforeEach(() => {
		mockOnToggle.mockClear();
		mockOnClose.mockClear();
	});

	it('renders when it has the expected children', () => {
		render(
			<PopupMenu {...defaultProps}>
				<PopupMenu.Trigger>Open</PopupMenu.Trigger>
				<PopupMenu.Content>{() => <>Some content</>}</PopupMenu.Content>
			</PopupMenu>
		);

		expect(screen.getByRole('button', { name: /open/i })).toBeVisible();
	});

	it('does not render when it does not have content', () => {
		render(
			<PopupMenu {...defaultProps}>
				<PopupMenu.Trigger>Open</PopupMenu.Trigger>
			</PopupMenu>
		);

		expect(screen.queryByRole('button', { name: /open/i })).not.toBeInTheDocument();
	});

	it('does not render when it does not have a trigger', () => {
		render(
			<PopupMenu {...defaultProps}>
				<PopupMenu.Content>{() => <>Some content</>}</PopupMenu.Content>
			</PopupMenu>
		);

		expect(screen.queryByText(/some content/i)).not.toBeInTheDocument();
	});

	it('does not render when it has an invalid child', () => {
		render(
			<PopupMenu {...defaultProps}>
				<PopupMenu.Trigger>Open</PopupMenu.Trigger>
				<PopupMenu.Content>{() => <>Some content</>}</PopupMenu.Content>
				<div>Invalid content</div>
			</PopupMenu>
		);

		expect(screen.queryByRole('button', { name: /open/i })).not.toBeInTheDocument();
		expect(screen.queryByText(/some content/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/invalid content/i)).not.toBeInTheDocument();
	});

	it('renders the content and calls onToggle correctly when the trigger is clicked', async () => {
		render(
			<PopupMenu {...defaultProps}>
				<PopupMenu.Trigger>Open</PopupMenu.Trigger>
				<PopupMenu.Content>{() => <>Some content</>}</PopupMenu.Content>
			</PopupMenu>
		);

		await act(() => {
			const trigger = screen.getByRole('button', { name: /open/i });
			trigger.click();
		});

		expect(mockOnToggle).toHaveBeenCalledWith({ isOpen: true });
		expect(mockOnToggle).toHaveBeenCalledTimes(1);
		
		expect(screen.getByText(/some content/i)).toBeVisible();

	});

	it('closes the content and calls onToggle and onClose correctly when the trigger is clicked again', async () => {
		render(
			<PopupMenu {...defaultProps}>
				<PopupMenu.Trigger>Open</PopupMenu.Trigger>
				<PopupMenu.Content>{() => <>Some content</>}</PopupMenu.Content>
			</PopupMenu>
		);

		const trigger = screen.getByRole('button', { name: /open/i });
		await act(() => trigger.click());
		expect(screen.getByText(/some content/i)).toBeVisible();

		await act(() => trigger.click());
		expect(screen.queryByText(/some content/i)).not.toBeInTheDocument();

		expect(mockOnToggle).toHaveBeenCalledWith({ isOpen: false });
		expect(mockOnToggle).toHaveBeenCalledTimes(2);
		expect(mockOnClose).toHaveBeenCalledTimes(1);
	});
});
