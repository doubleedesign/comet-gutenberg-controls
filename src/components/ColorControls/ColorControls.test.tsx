import { render, screen } from '@testing-library/react';
import { ColorControls } from './ColorControls';
import { ThemeColor, ThemeGradient } from '../../types';
import { ColourTypeLabel } from './constants';

const mockSetAttributes = vi.fn();
const defaultProps = {
	name: 'comet/demo-block',
	setAttributes: mockSetAttributes
};

describe('ColorControls', () => {

	it('renders the control group', () => {
		render(<ColorControls {...defaultProps}
			attributes={{
				colorTheme: 'white' as ThemeColor,
				backgroundColor: 'primary' as ThemeColor,
				sectionBackground: 'light-dark' as ThemeGradient
			}} />);

		expect(screen.getByRole('heading', { name: /Colours/i })).toBeVisible();
	});

	it('renders the single colour theme selector if there is no background or sectionBackground attribute set', () => {
		render(<ColorControls
			{...defaultProps}
			attributes={{ colorTheme: 'primary', }}
		/>);

		expect(screen.getByRole('button', { name: ColourTypeLabel.COLOUR_THEME })).toBeVisible();
		expect(screen.queryByRole('button', { name: ColourTypeLabel.BACKGROUND })).not.toBeInTheDocument();
		expect(screen.queryByRole('button', { name: ColourTypeLabel.SECTION_BACKGROUND })).not.toBeInTheDocument();
	});

	it('renders the single background colour selector if there is no colorTheme attribute set', () => {
		render(<ColorControls
			{...defaultProps}
			attributes={{ backgroundColor: 'primary', }}
		/>);

		expect(screen.getByRole('button', { name: ColourTypeLabel.BACKGROUND })).toBeVisible();
		expect(screen.queryByRole('button', { name: ColourTypeLabel.COLOUR_THEME })).not.toBeInTheDocument();
	});

	it('renders the colour pair selector if there is both colourTheme and background attribute set', () => {
		render(<ColorControls
			{...defaultProps}
			attributes={{
				colorTheme: 'primary',
				backgroundColor: 'white',
			}}
		/>);

		expect(screen.getByRole('button', { name: ColourTypeLabel.PAIR })).toBeVisible();
		expect(screen.queryByRole('button', { name: ColourTypeLabel.COLOUR_THEME })).not.toBeInTheDocument();
		expect(screen.queryByRole('button', { name: ColourTypeLabel.BACKGROUND })).not.toBeInTheDocument();
	});

	it('renders the section background selector if the attribute is supported and colorTheme and backgroundColor are not', () => {
		render(<ColorControls
			{...defaultProps}
			attributes={{ sectionBackground: 'light-dark' }}
		/>);

		expect(screen.getByRole('button', { name: ColourTypeLabel.SECTION_BACKGROUND })).toBeVisible();
		expect(screen.queryByRole('button', { name: ColourTypeLabel.COLOUR_THEME })).not.toBeInTheDocument();
		expect(screen.queryByRole('button', { name: ColourTypeLabel.BACKGROUND })).not.toBeInTheDocument();
	});

	it('should not render the section background selector if the block is nested', () => {
		render(<ColorControls
			{...defaultProps}
			attributes={{
				colorTheme: 'primary',
				backgroundColor: 'white',
				sectionBackground: 'light-dark'
			}}
			context={{ isNested: true }}
		/>);

		expect(screen.queryByRole('button', { name: ColourTypeLabel.SECTION_BACKGROUND })).not.toBeInTheDocument();
	});

	it('renders the colour pair and section background selectors if all three attributes are supported and the block is not nested', () => {
		render(<ColorControls
			{...defaultProps}
			attributes={{
				colorTheme: 'primary',
				backgroundColor: 'white',
				sectionBackground: 'light-dark'
			}}
			context={{ isNested: false }}
		/>);

		expect(screen.getByRole('button', { name: ColourTypeLabel.PAIR })).toBeVisible();
		expect(screen.getByRole('button', { name: ColourTypeLabel.SECTION_BACKGROUND })).toBeVisible();

		expect(screen.queryByRole('button', { name: ColourTypeLabel.COLOUR_THEME })).not.toBeInTheDocument();
		expect(screen.queryByRole('button', { name: ColourTypeLabel.BACKGROUND })).not.toBeInTheDocument();
	});
});
