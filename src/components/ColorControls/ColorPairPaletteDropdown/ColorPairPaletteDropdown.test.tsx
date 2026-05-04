import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { ColorPairPaletteDropdown } from './ColorPairPaletteDropdown'; 

const mockSetAttributes = vi.fn();
const defaultProps = {
	name: 'comet/demo-block',
	attributes: {},
	setAttributes: mockSetAttributes
};

describe('ColorPairPaletteDropdown', () => {
	test('should mount', () => {
		render(<ColorPairPaletteDropdown {...defaultProps} />);

		const ColorPairPaletteDropdown = screen.getByRole('label', { name: /ColorPairPaletteDropdown/i });

		expect(ColorPairPaletteDropdown).toBeVisible();
	});
});
