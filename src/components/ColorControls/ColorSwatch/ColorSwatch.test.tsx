import { render, screen } from '@testing-library/react';
import { ColorSwatch } from './ColorSwatch'; 

const mockSetAttributes = vi.fn();
const defaultProps = {};

describe('ColorSwatch', () => {
	test('should mount', () => {
		render(<ColorSwatch {...defaultProps} />);

		expect(screen.getByRole('label', { name: /Colour/i })).toBeVisible();
	});
});
