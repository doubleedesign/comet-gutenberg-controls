import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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

		expect(screen.getByRole('heading', { name: /Layout/i })).toBeVisible();
	});
});
