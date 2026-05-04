import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { ColorControls } from './ColorControls'; 

const mockSetAttributes = vi.fn();
const defaultProps = {
	name: 'comet/demo-block',
	attributes: {},
	setAttributes: mockSetAttributes
};

describe('ColorControls', () => {
	test('should mount', () => {
		render(<ColorControls {...defaultProps} />);

		const ColorControls = screen.getByRole('label', { name: /ColorControls/i });

		expect(ColorControls).toBeVisible();
	});
});
