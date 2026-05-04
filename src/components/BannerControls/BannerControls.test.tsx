import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
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

		const BannerControls = screen.getByRole('label', { name: /BannerControls/i });

		expect(BannerControls).toBeVisible();
	});
});
