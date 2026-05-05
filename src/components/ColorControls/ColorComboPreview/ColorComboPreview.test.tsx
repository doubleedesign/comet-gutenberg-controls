import { render, screen } from '@testing-library/react';
import { mockCometConfig } from '../../../mocks/mock-comet-config';
import { ColorComboPreview } from './ColorComboPreview';

const defaultProps = {};

describe('ColorComboPreview', () => {
	beforeEach(() => {
		mockCometConfig();
	});

	afterEach(() => {
		// @ts-expect-error TS2551: Property comet does not exist on type Window & typeof globalThis.
		delete window.comet;
	});

	it('should render', () => {
		render(<ColorComboPreview {...defaultProps} />);
	});
});
