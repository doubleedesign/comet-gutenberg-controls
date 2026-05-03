import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { TemplateName } from './TemplateName'; 

const mockSetAttributes = vi.fn();
const defaultProps = {
	name: 'comet/demo-block',
	attributes: {},
	setAttributes: mockSetAttributes
};

describe('TemplateName', () => {
	test('should mount', () => {
		render(<TemplateName {...defaultProps} />);

		const TemplateName = screen.getByRole('label', { name: /TemplateName/i });

		expect(TemplateName).toBeVisible();
	});
});
