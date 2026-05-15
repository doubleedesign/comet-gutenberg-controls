import { render, screen } from '@testing-library/react';
import { mockCometConfig } from '../../mocks/mock-comet-config';
import { ColumnLayoutControls } from './ColumnLayoutControls';

const mockSetAttributes = vi.fn();
const defaultProps = {
	name: 'comet/demo-block',
	attributes: {},
	setAttributes: mockSetAttributes
};

describe('ColumnLayoutControls', () => {
	beforeEach(() => {
		mockCometConfig();
	});

	afterEach(() => {
		// @ts-expect-error TS2551: Property comet does not exist on type Window & typeof globalThis.
		delete window.comet;
	});

	it('should render', () => {
		render(<ColumnLayoutControls {...defaultProps} />);

		const instance = screen.getByRole('label', { name: /ColumnLayoutControls/i });

		expect(instance).toBeVisible();
	});
});
