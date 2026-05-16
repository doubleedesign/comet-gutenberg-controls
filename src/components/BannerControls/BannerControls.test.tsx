import { render, screen } from '@testing-library/react';
import { BannerControls } from './BannerControls'; 

const mockSetAttributes = vi.fn();
const defaultProps = {
	name: 'comet/demo-block',
	attributes: {},
	setAttributes: mockSetAttributes
};

describe('BannerControls', () => {
	test('should mount', () => {
		render(<BannerControls {...defaultProps} />);

		expect(screen.getByRole('label', { name: /BannerControls/i })).toBeVisible();
	});
});
