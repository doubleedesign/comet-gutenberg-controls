import { render, screen } from '@testing-library/react';
import { mockCometConfig } from '../../../mocks/mock-comet-config';
import { ColorComboPreview } from './ColorComboPreview';

const defaultProps = {};

describe('ColorComboPreview', () => {

	it('should render', () => {
		render(<ColorComboPreview {...defaultProps} />);
	});
});
