import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { ColorPaletteDropdown } from './ColorPaletteDropdown'; 

const mockSetAttributes = vi.fn();
const defaultProps = {
	name: 'comet/demo-block',
	attributes: {},
	setAttributes: mockSetAttributes
};

describe('ColorPaletteDropdown', () => {
	test('should mount', () => {
		render(<ColorPaletteDropdown {...defaultProps} />);

		const ColorPaletteDropdown = screen.getByRole('label', { name: /ColorPaletteDropdown/i });

		expect(ColorPaletteDropdown).toBeVisible();
	});
});
