import React, { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { ColorPaletteDropdown } from './ColorPaletteDropdown';
import { MOCK_PALETTE } from '../../../mocks/common-defaults';
import { mockCometConfig } from '../../../mocks/mock-comet-config';
import { mockMatchMedia } from '../../../mocks/mock-match-media';

const mockOnChange = vi.fn();
const defaultProps = {
	label: 'Colour',
	value: 'primary',
	palette: MOCK_PALETTE,
	onChange: mockOnChange
};


describe('ColorPaletteDropdown', () => {
	beforeEach(() => {
		mockCometConfig();
		mockMatchMedia();
	});

	afterEach(() => {
		// @ts-expect-error TS2551: Property comet does not exist on type Window & typeof globalThis.
		delete window.comet;
	});

	it('renders', () => {
		render(<ColorPaletteDropdown {...defaultProps} />);

		expect(screen.getByRole('button', { name: /Colour/i })).toBeVisible();
	});

	it('displays the correct color indicator if the provided value is valid', () => {
		render(<ColorPaletteDropdown {...defaultProps} />);

		const indicator = screen.getByTestId('comet-color-indicator');
		expect(indicator).toHaveAccessibleName('Selected colour: primary');
	});

	it('displays the selector and preview when the button is clicked', async () => {
		render(<ColorPaletteDropdown {...defaultProps} />);

		await waitFor(() => {
			const button = screen.getByRole('button', { name: /Colour/i });
			button.click();
		});

		expect(await screen.findByRole('listbox', { name: /color picker/ })).toBeVisible();
		expect(screen.getByTestId('comet-color-swatch')).toBeVisible();
	});

	it('displays the correct preview in the selector', async () => {
		render(<ColorPaletteDropdown {...defaultProps} />);

		await waitFor(() => {
			const button = screen.getByRole('button', { name: /Colour/i });
			button.click();
		});

		const indicator = screen.getByTestId('comet-color-swatch');
		expect(indicator).toHaveAccessibleName('Colour preview: primary');
	});

	it('displays the correct selected option in the selector', async () => {
		render(<ColorPaletteDropdown {...defaultProps} />);

		await waitFor(() => {
			const button = screen.getByRole('button', { name: /Colour/i });
			button.click();
		});

		const option = screen.getByRole('option', { name: /primary/i });
		expect(option).toHaveAttribute('aria-selected', 'true');
	});

	it('calls the onChange function with the first palette colour if an invalid value is provided', () => {
		render(<ColorPaletteDropdown
			{...defaultProps}
			palette={MOCK_PALETTE.filter(c => c.slug !== 'info')}
			value="info"/>
		);

		expect(mockOnChange).toHaveBeenCalledWith('primary');
	});

	it('calls the onChange function with the correct value when a new colour is selected', async () => {
		render(<ColorPaletteDropdown {...defaultProps} />);

		await waitFor(() => {
			const button = screen.getByRole('button', { name: /Colour/i });
			button.click();
		});

		await waitFor(() => {
			const option = screen.getByRole('option', { name: /accent/i });
			option.click();
		});

		expect(mockOnChange).toHaveBeenCalledWith('accent');
	});
});
