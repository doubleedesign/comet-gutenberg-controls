import { ThemeColor, ThemeGradient } from '../../../types';

export type ColorComboPreviewProps = {
	colorTheme?: ThemeColor;
	backgroundColor: ThemeColor;
	sectionBackground?: ThemeColor | ThemeGradient;
};

export function ColorComboPreview({ colorTheme, backgroundColor, sectionBackground }: ColorComboPreviewProps) {

	return (
		<div className="comet-color-combo-preview"
			data-testid="comet-color-combo-preview" 
			data-background={sectionBackground || backgroundColor}
			role="presentation"
		>
			<div className="comet-color-combo-preview__content" data-background={sectionBackground ? backgroundColor : undefined} data-color-theme={colorTheme}>
				<p style={{ color: `var(--color-${colorTheme})` }}>The quick brown fox jumps over the lazy dog</p>
			</div>
		</div>
	);
}
