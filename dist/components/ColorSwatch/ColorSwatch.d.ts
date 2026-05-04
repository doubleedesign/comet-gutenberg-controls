import { ThemeColor } from '../../types';
export type ColorSwatchProps = {
    colorTheme?: ThemeColor;
    backgroundColor?: ThemeColor;
};
export declare function ColorSwatch({ colorTheme, backgroundColor }: ColorSwatchProps): JSX.Element | null;
