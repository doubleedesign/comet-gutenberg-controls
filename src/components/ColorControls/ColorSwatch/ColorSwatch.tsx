import { ColorState } from '../../../types';

export type ColorSwatchProps = Pick<ColorState, 'colorTheme' | 'backgroundColor'>;

export function ColorSwatch({ colorTheme, backgroundColor }: ColorSwatchProps) {
	if(!colorTheme || !backgroundColor) {
		return null;
	}

	if(!backgroundColor) {
		return (
			<ColorSwatchInner colorTheme={colorTheme} caption={colorTheme} />
		);
	}

	if(!colorTheme) {
		return (
			<ColorSwatchInner backgroundColor={backgroundColor} caption={backgroundColor} />
		);
	}

	return (
		<ColorSwatchInner caption={`${colorTheme} on ${backgroundColor}`} colorTheme={colorTheme} backgroundColor={backgroundColor} />
	);
}

function ColorSwatchInner({ colorTheme, backgroundColor, caption }: ColorSwatchProps & { caption: string }) {
	return (
		<figure className="comet-color-swatch" data-testid="comet-color-swatch" aria-label={`Colour preview: ${caption}`}>
			<div className="comet-color-swatch__preview" data-background={backgroundColor} data-color-theme={colorTheme}>
				The quick brown fox jumps over the lazy dog
			</div>
			<figcaption className="comet-color-swatch__caption">
				{caption}
			</figcaption>
		</figure>
	);
}
