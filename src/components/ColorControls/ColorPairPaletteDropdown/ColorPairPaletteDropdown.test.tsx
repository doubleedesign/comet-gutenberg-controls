import { render, screen, waitFor } from '@testing-library/react';
import { mockCometConfig } from '../../../mocks/mock-comet-config';
import { ColorPairPaletteDropdown } from './ColorPairPaletteDropdown';
import { mockMatchMedia } from '../../../mocks/mock-match-media';

const mockOnChange = vi.fn();
const defaultProps = {
	blockName: 'comet/demo-block',
	value: {
		foreground: 'primary',
		background: 'light',
	},
	onChange: mockOnChange
};

describe('ColorPairPaletteDropdown', () => {

	it('renders', () => {
		render(<ColorPairPaletteDropdown {...defaultProps} />);

		expect(screen.getByRole('button', { name: /Theme/i })).toBeVisible();
	});

	it('displays the selector and preview when the button is clicked', async () => {
		render(<ColorPairPaletteDropdown {...defaultProps} />);

		await waitFor(() => {
			const button = screen.getByRole('button', { name: /Theme/i });
			button.click();
		});

		expect(await screen.findByRole('listbox', { name: /Custom color picker/ })).toBeVisible();
		expect(screen.getByTestId('comet-color-swatch')).toBeVisible();
	});

	it('displays the correct indicator based on the value prop if it is a valid pair', () => {
		render(<ColorPairPaletteDropdown {...defaultProps} />);

		const indicator = screen.getByTestId('comet-color-pair-indicator');
		expect(indicator).toHaveAccessibleName('Selected colours: primary on light');
	});

	it('defaults to the first palette value if the provided value is not in the colour pairs in the global config', () => {
		render(<ColorPairPaletteDropdown {...defaultProps} value={{ foreground: 'warning', background: 'primary' }} />);

		const indicator = screen.getByTestId('comet-color-pair-indicator');
		expect(indicator).toHaveAccessibleName('Selected colours: primary on white'); // see mockCometConfig for the values
	});

	it('calls the onChange function if an invalid pair is automatically swapped to the first valid one', () => {
		render(<ColorPairPaletteDropdown {...defaultProps} value={{ foreground: 'warning', background: 'primary' }} />);

		expect(mockOnChange).toHaveBeenCalledWith({ foreground: 'primary', background: 'white' });
	});

	it('calls the onChange function with the correct values when a new pair is selected', async () => {
		render(<ColorPairPaletteDropdown {...defaultProps} />);

		await waitFor(() => {
			const button = screen.getByRole('button', { name: /Theme/i });
			button.click();
		});

		await waitFor(() => {
			const option = screen.getByRole('option', { name: /accent on dark/i });
			option.click();
		});

		expect(mockOnChange).toHaveBeenCalledWith({ foreground: 'accent', background: 'dark' });
	});

	it('updates the indicator when a new pair is selected', async () => {
		render(<ColorPairPaletteDropdown {...defaultProps} />);

		await waitFor(() => {
			const button = screen.getByRole('button', { name: /Theme/i });
			button.click();
		});

		await waitFor(() => {
			const option = screen.getByRole('option', { name: /accent on dark/i });
			option.click();
		});

		const indicator = screen.getByTestId('comet-color-pair-indicator');
		expect(indicator).toHaveAccessibleName('Selected colours: accent on dark');
	});

	it('shows the new value in the preview if it is opened again after a selection', async () => {
		render(<ColorPairPaletteDropdown {...defaultProps} />);

		await waitFor(() => {
			const button = screen.getByRole('button', { name: /Theme/i });
			button.click();
		});

		await waitFor(() => {
			const option = screen.getByRole('option', { name: /accent on dark/i });
			option.click();
		});

		await waitFor(() => {
			const button = screen.getByRole('button', { name: /Theme/i });
			button.click();
		});

		expect(screen.getByRole('figure')).toHaveAccessibleName('Colour preview: accent on dark');
	});

	it('shows the new value in the picker if it is opened again after a selection', async () => {
		render(<ColorPairPaletteDropdown {...defaultProps} />);

		await waitFor(() => {
			const button = screen.getByRole('button', { name: /Theme/i });
			button.click();
		});

		await waitFor(() => {
			const option = screen.getByRole('option', { name: /accent on dark/i });
			option.click();
		});

		await waitFor(() => {
			const button = screen.getByRole('button', { name: /Theme/i });
			button.click();
		});

		const selectedOption = await screen.findByRole('option', { name: /accent on dark/i });
		expect(selectedOption).toHaveAttribute('aria-selected', 'true');
	});

});
