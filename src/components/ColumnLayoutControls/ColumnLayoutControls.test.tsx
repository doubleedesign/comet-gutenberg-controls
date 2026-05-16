import { render, screen } from '@testing-library/react';
import { ColumnLayout, ColumnLayoutControls } from './ColumnLayoutControls';

const mockGetBlockCount = vi.fn();
const mockSetAttributes = vi.fn();
const defaultProps = {
	name: 'comet/columns',
	attributes: {
		size: 'contained',
		qty: 2,
		columnLayout: 'even' as ColumnLayout,
		hAlign: 'center',
		vAlign: 'start',
	},
	setAttributes: mockSetAttributes
};

describe('ColumnLayoutControls', () => {
	beforeEach(() => {
		vi.resetAllMocks();
		window.wp = {
			data: {
				select: (store: string) => {
					if (store === 'core/block-editor') {
						return { getBlockCount: mockGetBlockCount };
					}
				} 
			} 
		};
	});

	afterEach(() => {
		// @ts-expect-error TS2551: Property comet does not exist on type Window & typeof globalThis.
		delete window.comet;
		delete window.wp;
	});

	describe('Column count', () => {

		it('renders the column count selector', () => {
			mockGetBlockCount.mockReturnValue(2);
			render(<ColumnLayoutControls {...defaultProps} />);

			expect(screen.getByRole('radiogroup', { name: 'Maximum number of columns' })).toBeVisible();
		});

		it('disables the column count selector options that are less than the current number of inner blocks', () => {
			mockGetBlockCount.mockReturnValue(3);
			render(<ColumnLayoutControls {...defaultProps} attributes={{ ...defaultProps.attributes, qty: 3 }}/>);

			expect(screen.getByRole('radio', { name: /2 columns/ })).toBeDisabled();
		});

		it('enables the column count selector options that are equal to or greater than the current number of inner blocks', () => {
			mockGetBlockCount.mockReturnValue(3);
			render(<ColumnLayoutControls {...defaultProps} attributes={{ ...defaultProps.attributes, qty: 3 }}/>);

			expect(screen.getByRole('radio', { name: /3 columns/ })).toBeEnabled();
			expect(screen.getByRole('radio', { name: /4 columns/ })).toBeEnabled();
		});

		it('automatically updates the column count selection if the current number of inner blocks exceeds the selected column count', () => {
			mockGetBlockCount.mockReturnValue(3);
			render(<ColumnLayoutControls {...defaultProps} attributes={{ ...defaultProps.attributes, qty: 2 }}/>);

			expect(mockSetAttributes).toHaveBeenCalledWith({ qty: 3 });
		});
	});

	describe('Column layout', () => {

		it('renders the layout selector if the number of columns selected is greater than the current number of inner blocks', () => {
			mockGetBlockCount.mockReturnValue(1);
			render(<ColumnLayoutControls {...defaultProps} />);

			expect(screen.getByRole('radiogroup', { name: 'Column layout' })).toBeVisible();
		});

		it('does not render the layout selector if the number of columns selected matches the current number of inner blocks', () => {
			mockGetBlockCount.mockReturnValue(2);
			render(<ColumnLayoutControls {...defaultProps} />);

			expect(screen.queryByRole('radiogroup', { name: 'Column layout' })).not.toBeInTheDocument();
		});

		it('automatically updates the selected layout to "even" if the number of inner blocks matches the number of columns selected', () => {
			mockGetBlockCount.mockReturnValueOnce(3);
			render(<ColumnLayoutControls {...defaultProps} attributes={{ ...defaultProps.attributes, qty: 3, columnLayout: 'expand-last' }}/>);

			expect(mockSetAttributes).toHaveBeenCalledWith(expect.objectContaining({ columnLayout: 'even' }));
		});
	});

	describe('Alignment controls', () => {
		it('renders the vertical alignment control', () => {
			mockGetBlockCount.mockReturnValue(2);
			render(<ColumnLayoutControls {...defaultProps} />);

			expect(screen.getByRole('radiogroup', { name: 'Vertical alignment' })).toBeVisible();
		});

		it('renders the horizontal alignment control if the number of columns selected is greater than the current number of inner blocks', () => {
			mockGetBlockCount.mockReturnValue(2);
			render(<ColumnLayoutControls {...defaultProps} attributes={{ ...defaultProps.attributes, qty: 3 }}/>);

			expect(screen.getByRole('radiogroup', { name: 'Horizontal alignment' })).toBeVisible();
		});

		it('does not render the horizontal alignment control if the number of columns selected matches the current number of inner blocks', () => {
			mockGetBlockCount.mockReturnValue(2);
			render(<ColumnLayoutControls {...defaultProps} />);

			expect(screen.queryByRole('radiogroup', { name: 'Horizontal alignment' })).not.toBeInTheDocument();
		});

		it('automatically updates the horizontal alignment selection to "center" if the number of inner blocks matches the number of columns selected', () => {
			mockGetBlockCount.mockReturnValueOnce(3);
			render(<ColumnLayoutControls {...defaultProps} attributes={{ ...defaultProps.attributes, qty: 3, hAlign: 'start' }}/>);

			expect(mockSetAttributes).toHaveBeenCalledWith(expect.objectContaining({ hAlign: 'center' }));
		});
	});
});
