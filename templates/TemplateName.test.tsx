import { render, screen } from '@testing-library/react';
import { mockCometConfig } from '../../mocks/mock-comet-config';
import { TemplateName } from './TemplateName';

const mockSetAttributes = vi.fn();
const defaultProps = {
	name: 'comet/demo-block',
	attributes: {},
	setAttributes: mockSetAttributes
};

describe('TemplateName', () => {
	beforeEach(() => {
		mockCometConfig();
	});

	afterEach(() => {
		// @ts-expect-error TS2551: Property comet does not exist on type Window & typeof globalThis.
		delete window.comet;
	});

	it('should render', () => {
		render(<TemplateName {...defaultProps} />);

		const instance = screen.getByRole('label', { name: /TemplateName/i });

		expect(instance).toBeVisible();
	});
});
