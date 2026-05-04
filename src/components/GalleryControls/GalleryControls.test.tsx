import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
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

		const GalleryControls = screen.getByRole('label', { name: /GalleryControls/i });

		expect(GalleryControls).toBeVisible();
	});
});
