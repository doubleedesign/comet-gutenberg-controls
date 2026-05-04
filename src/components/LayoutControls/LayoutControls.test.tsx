import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { LayoutControls } from './LayoutControls'; 

const mockSetAttributes = vi.fn();
const defaultProps = {
	name: 'comet/demo-block',
	attributes: {},
	setAttributes: mockSetAttributes
};

describe('LayoutControls', () => {
	test('should mount', () => {
		render(<LayoutControls {...defaultProps} />);

		const LayoutControls = screen.getByRole('label', { name: /LayoutControls/i });

		expect(LayoutControls).toBeVisible();
	});
});
