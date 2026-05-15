import { render, screen } from '@testing-library/react';
import { ColorControls } from './ColorControls';
import { ThemeColor, ThemeGradient } from '../../types';
import { mockCometConfig } from '../../mocks/mock-comet-config';
import { BACKGROUND_COLOUR_LABEL, COLOUR_PAIR_LABEL, COLOUR_THEME_LABEL, SECTION_BACKGROUND_LABEL } from './constants';

const mockSetAttributes = vi.fn();
const defaultProps = {
	name: 'comet/demo-block',
	attributes: {
		colorTheme: 'white' as ThemeColor,
		backgroundColor: 'primary' as ThemeColor,
		sectionBackground: 'light-dark' as ThemeGradient
	},
	setAttributes: mockSetAttributes
};

describe('ColorControls', () => {
	beforeEach(() => {
		mockCometConfig();
	});

	afterEach(() => {
		// @ts-expect-error TS2551: Property comet does not exist on type Window & typeof globalThis.
		delete window.comet;
	});

	it('should render the control group', () => {
		render(<ColorControls {...defaultProps} />);

		expect(screen.getByRole('heading', { name: /Colours/i })).toBeVisible();
	});

	it('should render the single colour theme selector if there is no background or sectionBackground attribute set', () => {
		render(<ColorControls
			{...defaultProps}
			attributes={{
				colorTheme: 'primary',
				background: undefined,
				sectionBackground: undefined
			}}
		/>);

		expect(screen.getByRole('button', { name: COLOUR_THEME_LABEL })).toBeVisible();
		expect(screen.queryByRole('button', { name: BACKGROUND_COLOUR_LABEL })).not.toBeInTheDocument();
		expect(screen.queryByRole('button', { name: SECTION_BACKGROUND_LABEL })).not.toBeInTheDocument();
	});

	it('should render the single background colour selector if there is no colorTheme attribute set', () => {
		render(<ColorControls
			{...defaultProps}
			attributes={{
				colorTheme: undefined,
				backgroundColor: 'primary',
				sectionBackground: undefined
			}}
		/>);

		expect(screen.getByRole('button', { name: BACKGROUND_COLOUR_LABEL })).toBeVisible();
		expect(screen.queryByRole('button', { name: COLOUR_THEME_LABEL })).not.toBeInTheDocument();
	});

	it('should render the colour pair selector if there is both colourTheme and background attribute set', () => {
		render(<ColorControls
			{...defaultProps}
			attributes={{
				colorTheme: 'primary',
				backgroundColor: 'white',
				sectionBackground: undefined
			}}
		/>);

		expect(screen.getByRole('button', { name: COLOUR_PAIR_LABEL })).toBeVisible();
		expect(screen.queryByRole('button', { name: COLOUR_THEME_LABEL })).not.toBeInTheDocument();
		expect(screen.queryByRole('button', { name: BACKGROUND_COLOUR_LABEL })).not.toBeInTheDocument();
	});

	it('should render the section background selector if the attribute is supported and colorTheme and backgroundColor are not', () => {
		render(<ColorControls
			{...defaultProps}
			attributes={{
				colorTheme: undefined,
				backgroundColor: undefined,
				sectionBackground: 'light-dark'
			}}
		/>);

		expect(screen.getByRole('button', { name: SECTION_BACKGROUND_LABEL })).toBeVisible();
		expect(screen.queryByRole('button', { name: COLOUR_THEME_LABEL })).not.toBeInTheDocument();
		expect(screen.queryByRole('button', { name: BACKGROUND_COLOUR_LABEL })).not.toBeInTheDocument();
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

		expect(screen.queryByRole('button', { name: SECTION_BACKGROUND_LABEL })).not.toBeInTheDocument();
	});

	it('should render the colour pair and section background selectors if all three attributes are supported and the block is not nested', () => {
		render(<ColorControls
			{...defaultProps}
			attributes={{
				colorTheme: 'primary',
				backgroundColor: 'white',
				sectionBackground: 'light-dark'
			}}
			context={{ isNested: false }}
		/>);

		expect(screen.getByRole('button', { name: COLOUR_PAIR_LABEL })).toBeVisible();
		expect(screen.getByRole('button', { name: SECTION_BACKGROUND_LABEL })).toBeVisible();

		expect(screen.queryByRole('button', { name: COLOUR_THEME_LABEL })).not.toBeInTheDocument();
		expect(screen.queryByRole('button', { name: BACKGROUND_COLOUR_LABEL })).not.toBeInTheDocument();
	});
});
