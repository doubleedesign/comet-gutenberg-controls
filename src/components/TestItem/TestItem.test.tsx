import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { TestItem } from './TestItem'; 

const mockSetAttributes = vi.fn();
const defaultProps = {
	name: 'comet/demo-block',
	attributes: {},
	setAttributes: mockSetAttributes
};

describe('TestItem', () => {
	test('should mount', () => {
		render(<TestItem {...defaultProps} />);

		const TestItem = screen.getByRole('label', { name: /TestItem/i });

		expect(TestItem).toBeVisible();
	});
});
