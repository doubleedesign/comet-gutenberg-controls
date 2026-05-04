import React from 'react';
import { EditorControlProps } from '../types';
import { ThemeColor } from '../../types';

export type ColorSwatchProps = {
	colorTheme?: ThemeColor;
	backgroundColor?: ThemeColor;
};

export function ColorSwatch({ colorTheme, backgroundColor }: ColorSwatchProps) {
	if(!colorTheme && !backgroundColor) {
		return null;
	}

	if(!backgroundColor) {
		return (
			<figure className="comet-color-swatch">
				<div className="comet-color-swatch__preview" data-background={colorTheme}>
				</div>
				<figcaption className="comet-color-swatch__caption">
					{colorTheme}
				</figcaption>
			</figure>
		);
	}

	if(!colorTheme) {
		return (
			<figure className="comet-color-swatch">
				<div className="comet-color-swatch__preview" data-background={backgroundColor}>
				</div>
				<figcaption className="comet-color-swatch__caption">
					{backgroundColor}
				</figcaption>
			</figure>
		);
	}

	return (
		<figure className="comet-color-swatch">
			<div className="comet-color-swatch__preview" data-background={backgroundColor} data-color-theme={colorTheme}>
				The quick brown fox jumps over the lazy dog
			</div>
			<figcaption className="comet-color-swatch__caption">
				{colorTheme} on {backgroundColor}
			</figcaption>
		</figure>
	);
}
