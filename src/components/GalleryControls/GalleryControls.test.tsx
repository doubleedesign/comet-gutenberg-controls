import { render, screen } from '@testing-library/react';
import { GalleryControls } from './GalleryControls'; 

const mockSetAttributes = vi.fn();
const defaultProps = {
	name: 'comet/demo-block',
	attributes: {},
	setAttributes: mockSetAttributes
};

describe('GalleryControls', () => {
	test('should mount', () => {
		render(<GalleryControls {...defaultProps} />);

		expect(screen.getByRole('label', { name: /Gallery options/i })).toBeVisible();
	});
});
