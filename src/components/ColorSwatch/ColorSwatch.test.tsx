import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { ColorSwatch } from './ColorSwatch'; 

const mockSetAttributes = vi.fn();
const defaultProps = {
	name: 'comet/demo-block',
	attributes: {},
	setAttributes: mockSetAttributes
};

describe('ColorSwatch', () => {
	test('should mount', () => {
		render(<ColorSwatch {...defaultProps} />);

		const ColorSwatch = screen.getByRole('label', { name: /ColorSwatch/i });

		expect(ColorSwatch).toBeVisible();
	});
});
