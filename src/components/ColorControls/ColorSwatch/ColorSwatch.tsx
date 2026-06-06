import { ColorState } from '../../../types';

export type ColorSwatchProps = Pick<ColorState, 'colorTheme' | 'backgroundColor'>;

export function ColorSwatch({ colorTheme, backgroundColor }: ColorSwatchProps) {
	const defaultBackground = comet?.globalBackground ?? 'white';

	if(!colorTheme && !backgroundColor) {
		return (
			<ColorSwatchInner caption="No colour selected" backgroundColor={undefined} />
		);
	}

	if(!backgroundColor && colorTheme) {
		return (
			<ColorSwatchInner colorTheme={colorTheme} caption={colorTheme} backgroundColor={defaultBackground} />
		);
	}

	if(!colorTheme && backgroundColor) {
		return (
			<ColorSwatchInner backgroundColor={backgroundColor} caption={backgroundColor} />
		);
	}

	return (
		<ColorSwatchInner caption={`${colorTheme} on ${backgroundColor}`} colorTheme={colorTheme} backgroundColor={backgroundColor} />
	);
}

function ColorSwatchInner({ colorTheme, backgroundColor, caption }: ColorSwatchProps & { caption: string }) {
	const backgroundIsGradientOrUndefined = backgroundColor?.includes('-') || backgroundColor === undefined;

	return (
		<figure className="comet-color-swatch" data-testid="comet-color-swatch" aria-label={`Colour preview: ${caption}`}>
			<div className="comet-color-swatch__preview" data-background={backgroundColor} data-color-theme={colorTheme}>
				{(!backgroundIsGradientOrUndefined) ? 'The quick brown fox jumps over the lazy dog' : null}
			</div>
			<figcaption className="comet-color-swatch__caption">
				{caption}
			</figcaption>
		</figure>
	);
}
