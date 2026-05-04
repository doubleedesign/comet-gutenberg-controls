import React from 'react';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { ColorControls } from './ColorControls';
import { ThemeColor, ThemeGradient } from '../../types';
import { mockCometConfig } from '../../mocks/mock-comet-config';

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

		expect(screen.getByRole('button', { name: /Colour/i })).toBeVisible();
		expect(screen.getByTestId('comet-single-color-selector')).toBeVisible();
		expect(screen.queryByTestId('comet-color-pair-selector')).not.toBeInTheDocument();
		expect(screen.queryByTestId('comet-section-background-selector')).not.toBeInTheDocument();
	});

	it('should render the colour pair selector if there is a background attribute set', () => {
		render(<ColorControls
			{...defaultProps}
			attributes={{
				colorTheme: 'primary',
				backgroundColor: 'white',
				sectionBackground: undefined
			}}
		/>);

		expect(screen.getByRole('button', { name: /Theme/i })).toBeVisible();
		expect(screen.getByTestId('comet-color-pair-selector')).toBeVisible();
		expect(screen.queryByTestId('comet-single-color-selector')).not.toBeInTheDocument();
		expect(screen.queryByTestId('comet-section-background-selector')).not.toBeInTheDocument();
	});
});
